import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

interface TouchLockOverlayProps {
  isLocked: boolean;
  onUnlock: () => void;
}

export const TouchLockOverlay: React.FC<TouchLockOverlayProps> = ({
  isLocked,
  onUnlock,
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  if (!isLocked) return null;

  const startUnlockTimer = () => {
    setProgress(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    timerRef.current = setTimeout(() => {
      onUnlock();
      resetTimer();
    }, 1500);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    progressAnim.setValue(0);
    setProgress(0);
  };

  return (
    <View style={styles.lockContainer} pointerEvents="box-none">
      {/* Invisible overlay absorbing accidental touches while paper is on screen */}
      <View style={styles.touchShield} pointerEvents="auto" />

      {/* Floating Status Badge & Unlock Button */}
      <View style={styles.controlCenter}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusIcon}>🔒</Text>
          <View>
            <Text style={styles.statusTitle}>Skrin Dikunci</Text>
            <Text style={styles.statusSubtitle}>Letak kertas & mula tekap lukisan!</Text>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPressIn={startUnlockTimer}
          onPressOut={resetTimer}
        >
          <View style={styles.unlockButton}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
            <Text style={styles.unlockButtonText}>🔓 Tekan Lama Untuk Buka</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lockContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  touchShield: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  controlCenter: {
    alignItems: 'center',
    gap: 12,
    zIndex: 1000,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#09090B',
    borderWidth: 1,
    borderColor: '#27272A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  statusSubtitle: {
    color: '#A1A1AA',
    fontSize: 11,
    fontWeight: '500',
  },
  unlockButton: {
    position: 'relative',
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: '#3F3F46',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    zIndex: 1,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    zIndex: 2,
  },
});
