import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { TouchLockOverlay } from '@/components/TouchLockOverlay';
import { TracingHeader } from '@/components/TracingHeader';
import { TracingToolbar } from '@/components/TracingToolbar';
import { TracingGuidedTourOverlay } from '@/components/TracingGuidedTourOverlay';
import { Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { StorageService } from '@/services/StorageService';
import { TracingImage, TracingStudioConfig } from '@/types/TracingTypes';

interface TracingStudioScreenProps {
  image: TracingImage;
  onBack: () => void;
  onOpenSettingsModal?: () => void;
  language?: Language;
  themeMode?: ThemeMode;
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
  onOpenSettingsModal,
  language = 'bm',
  themeMode = 'light',
}) => {
  const [config, setConfig] = useState<TracingStudioConfig>(DEFAULT_CONFIG);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isSelected, setIsSelected] = useState(true);
  const [isWizardVisible, setIsWizardVisible] = useState(false);

  useEffect(() => {
    // Auto open wizard on initial entry if user hasn't opted out
    StorageService.getHasSeenWizard().then((hasSeen) => {
      if (!hasSeen) {
        setIsWizardVisible(true);
      }
    });
  }, []);

  const t = TRANSLATIONS[language];

  // Layout refs to measure image center for rotation
  const imageBoxRef = useRef<View>(null);
  const imageCenterRef = useRef<{ x: number; y: number }>({ x: 200, y: 300 });

  const initialPinchDist = useRef<number | null>(null);
  const initialScale = useRef<number>(1.0);
  const initialRotationAngle = useRef<number | null>(null);
  const initialRotation = useRef<number>(0);
  const handleStartScale = useRef<number>(1.0);

  const handleUpdateConfig = (newPartial: Partial<TracingStudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...newPartial }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setPanOffset({ x: 0, y: 0 });
    setIsSelected(true);
  };

  const getDistance = (touches: any[]) => {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngleDegrees = (touches: any[]) => {
    const dx = touches[1].pageX - touches[0].pageX;
    const dy = touches[1].pageY - touches[0].pageY;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  // Main Image Pan, Pinch & 360° Touch Rotation Responder
  const imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !config.isLocked,
    onMoveShouldSetPanResponder: () => !config.isLocked,
    onPanResponderGrant: (evt) => {
      if (config.isLocked) return;
      setIsSelected(true);

      if (imageBoxRef.current) {
        imageBoxRef.current.measureInWindow((x, y, w, h) => {
          imageCenterRef.current = { x: x + w / 2, y: y + h / 2 };
        });
      }

      if (evt.nativeEvent.touches.length === 2) {
        initialPinchDist.current = getDistance(evt.nativeEvent.touches);
        initialScale.current = config.scale;
        initialRotationAngle.current = getAngleDegrees(evt.nativeEvent.touches);
        initialRotation.current = config.rotation;
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      if (config.isLocked) return;

      // Handle 2-finger pinch-zoom AND 360° touch rotation
      if (evt.nativeEvent.touches.length === 2 && initialPinchDist.current) {
        const currentDist = getDistance(evt.nativeEvent.touches);
        const factor = currentDist / initialPinchDist.current;
        const newScale = Math.min(6.0, Math.max(0.2, initialScale.current * factor));

        let newRotation = config.rotation;
        if (initialRotationAngle.current !== null) {
          const currentAngle = getAngleDegrees(evt.nativeEvent.touches);
          const angleDelta = currentAngle - initialRotationAngle.current;
          let calculatedRotation = Math.round((initialRotation.current + angleDelta) % 360);
          if (calculatedRotation < 0) calculatedRotation += 360;
          newRotation = calculatedRotation;
        }

        setConfig((prev) => ({
          ...prev,
          scale: newScale,
          rotation: newRotation,
        }));
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
      initialRotationAngle.current = null;
      setPanOffset({
        x: panOffset.x + gestureState.dx,
        y: panOffset.y + gestureState.dy,
      });
    },
  });

  // Top Knob 360° Touch Rotation Responder
  const rotateKnobResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (evt) => {
        const touchX = evt.nativeEvent.pageX;
        const touchY = evt.nativeEvent.pageY;
        const center = imageCenterRef.current;
        const rad = Math.atan2(touchY - center.y, touchX - center.x);
        let deg = Math.round(rad * (180 / Math.PI)) + 90;
        if (deg < 0) deg += 360;
        deg = deg % 360;
        setConfig((prev) => ({ ...prev, rotation: deg }));
      },
    })
  ).current;

  // Corner Resize Responders
  const createCornerResizeResponder = (cornerMultiplier: { x: number; y: number }) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        handleStartScale.current = config.scale;
      },
      onPanResponderMove: (_, gestureState) => {
        const delta =
          (gestureState.dx * cornerMultiplier.x + gestureState.dy * cornerMultiplier.y) / 120;
        const newScale = Math.min(6.0, Math.max(0.2, handleStartScale.current + delta));
        setConfig((prev) => ({ ...prev, scale: newScale }));
      },
      onPanResponderRelease: () => {
        handleStartScale.current = config.scale;
      },
    });
  };

  const bottomRightResponder = useRef(createCornerResizeResponder({ x: 1, y: 1 })).current;
  const topLeftResponder = useRef(createCornerResizeResponder({ x: -1, y: -1 })).current;
  const topRightResponder = useRef(createCornerResizeResponder({ x: 1, y: -1 })).current;
  const bottomLeftResponder = useRef(createCornerResizeResponder({ x: -1, y: 1 })).current;

  const getImageFilterStyles = () => {
    let opacity = config.opacity;
    if (config.filterMode === 'lineArt') {
      opacity = 0.85;
    } else if (config.filterMode === 'invert') {
      opacity = 0.95;
    }

    return { opacity };
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
        onOpenSettingsModal={onOpenSettingsModal}
        onOpenWizard={() => setIsWizardVisible(true)}
        language={language}
        themeMode={themeMode}
      />

      {/* Main Interactive Canvas Area */}
      <TouchableWithoutFeedback onPress={() => setIsSelected(false)}>
        <View
          style={[
            styles.canvasArea,
            { backgroundColor: config.filterMode === 'invert' ? '#000000' : '#FFFFFF' },
          ]}
        >
          {/* Transform Container */}
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
          >
            {/* Image Box */}
            <View
              ref={imageBoxRef}
              style={[
                styles.imageBox,
                isSelected && !config.isLocked && styles.selectedBoundingBox,
              ]}
              {...imagePanResponder.panHandlers}
            >
              <Image
                source={{ uri: image.uri }}
                style={[styles.canvasImage, getImageFilterStyles()]}
                resizeMode="contain"
              />
            </View>

            {/* Transform Handles */}
            {isSelected && !config.isLocked && (
              <>
                {/* 360° Top Rotation Handle Touch Area */}
                <View
                  style={styles.rotateHandleKnobTouchArea}
                  {...rotateKnobResponder.panHandlers}
                >
                  <View style={styles.rotateHandleLine} />
                  <View style={styles.rotateHandleCircle}>
                    <AppIcon name="reset" size={12} color="#3B82F6" />
                  </View>
                </View>

                {/* 4 Corner Touch Target Handles */}
                <View
                  style={[styles.cornerTouchArea, styles.topLeftTouch]}
                  {...topLeftResponder.panHandlers}
                >
                  <View style={styles.cornerHandleDot} />
                </View>

                <View
                  style={[styles.cornerTouchArea, styles.topRightTouch]}
                  {...topRightResponder.panHandlers}
                >
                  <View style={styles.cornerHandleDot} />
                </View>

                <View
                  style={[styles.cornerTouchArea, styles.bottomLeftTouch]}
                  {...bottomLeftResponder.panHandlers}
                >
                  <View style={styles.cornerHandleDot} />
                </View>

                <View
                  style={[styles.cornerTouchArea, styles.bottomRightTouch]}
                  {...bottomRightResponder.panHandlers}
                >
                  <View style={styles.cornerHandleDot} />
                </View>
              </>
            )}
          </View>

          {/* Canvas Floating Quick "Lock Screen" Button */}
          {!config.isLocked && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.floatingCanvasLockButton}
              onPress={() => {
                handleUpdateConfig({ isLocked: true });
                setIsSelected(false);
              }}
            >
              <AppIcon name="lock" size={14} color="#FFFFFF" />
              <Text style={styles.floatingCanvasLockText}>{t.lockScreen}</Text>
            </TouchableOpacity>
          )}

          {/* Lightbox Overlay */}
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
        language={language}
        themeMode={themeMode}
      />

      {/* Touch Lock Screen Overlay */}
      <TouchLockOverlay
        isLocked={config.isLocked}
        onUnlock={() => handleUpdateConfig({ isLocked: false })}
        language={language}
      />

      {/* Interactive Guided Tour & Spotlight Overlay */}
      <TracingGuidedTourOverlay
        visible={isWizardVisible}
        onClose={() => setIsWizardVisible(false)}
        brightness={config.brightness}
        onChangeBrightness={(val) => handleUpdateConfig({ brightness: val })}
        onLockAndStartTracing={() => {
          handleUpdateConfig({ isLocked: true });
          setIsSelected(false);
        }}
        onDontShowAgainToggle={(dontShow) => {
          StorageService.saveHasSeenWizard(dontShow);
        }}
        language={language}
        themeMode={themeMode}
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
    width: '80%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
  rotateHandleKnobTouchArea: {
    position: 'absolute',
    top: -38,
    alignSelf: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    justifyContent: 'center',
    zIndex: 100,
  },
  rotateHandleLine: {
    width: 2,
    height: 12,
    backgroundColor: '#3B82F6',
    position: 'absolute',
    bottom: 4,
  },
  rotateHandleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 2,
  },
  cornerTouchArea: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  cornerHandleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  topLeftTouch: {
    top: -22,
    left: -22,
  },
  topRightTouch: {
    top: -22,
    right: -22,
  },
  bottomLeftTouch: {
    bottom: -22,
    left: -22,
  },
  bottomRightTouch: {
    bottom: -22,
    right: -22,
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
  floatingCanvasLockText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  lightboxFilter: {
    ...StyleSheet.absoluteFill,
  },
});
