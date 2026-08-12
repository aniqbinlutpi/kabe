import React, { useRef, useState } from 'react';
import {
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TouchLockOverlay } from '@/components/TouchLockOverlay';
import { TracingHeader } from '@/components/TracingHeader';
import { TracingToolbar } from '@/components/TracingToolbar';
import { TracingImage, TracingStudioConfig } from '@/types/TracingTypes';

interface TracingStudioScreenProps {
  image: TracingImage;
  onBack: () => void;
}

const DEFAULT_CONFIG: TracingStudioConfig = {
  scale: 1.0,
  rotation: 0,
  position: { x: 0, y: 0 },
  brightness: 1.0,
  contrast: 1.0,
  opacity: 1.0,
  filterMode: 'normal',
  flipHorizontal: false,
  flipVertical: false,
  isLocked: false,
};

export const TracingStudioScreen: React.FC<TracingStudioScreenProps> = ({
  image,
  onBack,
}) => {
  const [config, setConfig] = useState<TracingStudioConfig>(DEFAULT_CONFIG);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(true);

  // Store initial touch values for pinch zoom & resize handles
  const initialPinchDist = useRef<number | null>(null);
  const initialScale = useRef<number>(1.0);
  const initialHandleScale = useRef<number>(1.0);
  const initialTouchY = useRef<number>(0);

  const handleUpdateConfig = (newPartial: Partial<TracingStudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...newPartial }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setPanOffset({ x: 0, y: 0 });
    setIsSelected(true);
  };

  // Distance helper for pinch gesture
  const getDistance = (touches: any[]) => {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Main Image Pan & Pinch Gesture Responder
  const imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !config.isLocked,
    onMoveShouldSetPanResponder: () => !config.isLocked,
    onPanResponderGrant: (evt, gestureState) => {
      if (config.isLocked) return;
      setIsSelected(true);
      if (evt.nativeEvent.touches.length === 2) {
        initialPinchDist.current = getDistance(evt.nativeEvent.touches);
        initialScale.current = config.scale;
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      if (config.isLocked) return;

      // Handle 2-finger pinch to zoom
      if (evt.nativeEvent.touches.length === 2 && initialPinchDist.current) {
        const currentDist = getDistance(evt.nativeEvent.touches);
        const factor = currentDist / initialPinchDist.current;
        const newScale = Math.min(5.0, Math.max(0.3, initialScale.current * factor));
        setConfig((prev) => ({ ...prev, scale: newScale }));
        return;
      }

      // Handle 1-finger pan/drag position
      if (evt.nativeEvent.touches.length === 1) {
        setConfig((prev) => ({
          ...prev,
          position: {
            x: panOffset.x + gestureState.dx,
            y: panOffset.y + gestureState.dy,
          },
        }));
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (config.isLocked) return;
      initialPinchDist.current = null;
      setPanOffset({
        x: panOffset.x + gestureState.dx,
        y: panOffset.y + gestureState.dy,
      });
    },
  });

  // Corner Resize Handle Drag Responder (Figma/Canva style)
  const resizeHandlePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !config.isLocked,
    onMoveShouldSetPanResponder: () => !config.isLocked,
    onPanResponderGrant: (evt) => {
      if (config.isLocked) return;
      initialHandleScale.current = config.scale;
      initialTouchY.current = evt.nativeEvent.pageY;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (config.isLocked) return;
      // Calculate drag distance along diagonal to scale image up or down
      const delta = (gestureState.dx + gestureState.dy) / 150;
      const newScale = Math.min(5.0, Math.max(0.3, initialHandleScale.current + delta));
      setConfig((prev) => ({ ...prev, scale: newScale }));
    },
    onPanResponderRelease: () => {
      initialHandleScale.current = config.scale;
    },
  });

  const getImageFilterStyles = () => {
    let opacity = config.opacity;
    if (config.filterMode === 'lineArt') {
      opacity = 0.85;
    } else if (config.filterMode === 'invert') {
      opacity = 0.95;
    }

    return {
      opacity,
    };
  };

  return (
    <View style={styles.screenContainer}>
      {/* Top Header */}
      <TracingHeader
        title={image.title}
        isLocked={config.isLocked}
        onBack={onBack}
        onToggleLock={() => {
          handleUpdateConfig({ isLocked: true });
          setIsSelected(false);
        }}
        onReset={handleReset}
      />

      {/* Main Interactive Canvas Area */}
      <TouchableWithoutFeedback onPress={() => setIsSelected(false)}>
        <View
          style={[
            styles.canvasArea,
            { backgroundColor: config.filterMode === 'invert' ? '#000000' : '#FFFFFF' },
          ]}
        >
          <View
            style={[
              styles.imageTransformWrapper,
              {
                transform: [
                  { translateX: config.position.x },
                  { translateY: config.position.y },
                  { scale: config.scale },
                  { rotate: `${config.rotation}deg` },
                  { scaleX: config.flipHorizontal ? -1 : 1 },
                  { scaleY: config.flipVertical ? -1 : 1 },
                ],
              },
            ]}
            {...imagePanResponder.panHandlers}
          >
            {/* Image Container with Selection Bounding Box */}
            <View
              style={[
                styles.imageBox,
                isSelected && !config.isLocked && styles.selectedBoundingBox,
              ]}
            >
              <Image
                source={{ uri: image.uri }}
                style={[styles.canvasImage, getImageFilterStyles()]}
                resizeMode="contain"
              />

              {/* Transform Bounding Box Handles (Shown when selected & unlocked) */}
              {isSelected && !config.isLocked && (
                <>
                  {/* Top Rotation Knob */}
                  <View style={styles.rotateHandleKnob} pointerEvents="box-none">
                    <View style={styles.rotateHandleCircle} />
                  </View>

                  {/* 4 Corner Resize Handles */}
                  <View
                    style={[styles.cornerHandle, styles.topLeftHandle]}
                    {...resizeHandlePanResponder.panHandlers}
                  />
                  <View
                    style={[styles.cornerHandle, styles.topRightHandle]}
                    {...resizeHandlePanResponder.panHandlers}
                  />
                  <View
                    style={[styles.cornerHandle, styles.bottomLeftHandle]}
                    {...resizeHandlePanResponder.panHandlers}
                  />
                  <View
                    style={[styles.cornerHandle, styles.bottomRightHandle]}
                    {...resizeHandlePanResponder.panHandlers}
                  />
                </>
              )}
            </View>
          </View>

          {/* Canvas Floating Quick "🔒 Lock Screen" Button (Wireframe Feature!) */}
          {!config.isLocked && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.floatingCanvasLockButton}
              onPress={() => {
                handleUpdateConfig({ isLocked: true });
                setIsSelected(false);
              }}
            >
              <Text style={styles.floatingCanvasLockIcon}>🔒</Text>
              <Text style={styles.floatingCanvasLockText}>Lock Screen</Text>
            </TouchableOpacity>
          )}

          {/* High Brightness / Tracing Lightbox Overlay Simulation */}
          <View
            style={[
              styles.lightboxFilter,
              {
                backgroundColor: `rgba(255, 255, 255, ${Math.max(0, 1 - config.brightness)})`,
              },
            ]}
            pointerEvents="none"
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Bottom Control Toolbar */}
      <TracingToolbar
        config={config}
        onChangeConfig={handleUpdateConfig}
        isLocked={config.isLocked}
      />

      {/* Touch Lock Screen Overlay for paper tracing */}
      <TouchLockOverlay
        isLocked={config.isLocked}
        onUnlock={() => handleUpdateConfig({ isLocked: false })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  canvasArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  imageTransformWrapper: {
    width: '85%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBoundingBox: {
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'solid',
  },
  canvasImage: {
    width: '100%',
    height: '100%',
  },
  rotateHandleKnob: {
    position: 'absolute',
    top: -24,
    alignSelf: 'center',
    alignItems: 'center',
  },
  rotateHandleCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  cornerHandle: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    zIndex: 10,
  },
  topLeftHandle: {
    top: -8,
    left: -8,
  },
  topRightHandle: {
    top: -8,
    right: -8,
  },
  bottomLeftHandle: {
    bottom: -8,
    left: -8,
  },
  bottomRightHandle: {
    bottom: -8,
    right: -8,
  },
  floatingCanvasLockButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#09090B',
    borderWidth: 1,
    borderColor: '#3F3F46',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 90,
  },
  floatingCanvasLockIcon: {
    fontSize: 14,
  },
  floatingCanvasLockText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  lightboxFilter: {
    ...StyleSheet.absoluteFill,
  },
});
