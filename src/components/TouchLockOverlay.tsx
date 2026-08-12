import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { Language, TRANSLATIONS } from '@/constants/Translations';

interface TouchLockOverlayProps {
  isLocked: boolean;
  onUnlock: () => void;
  language?: Language;
}

export const TouchLockOverlay: React.FC<TouchLockOverlayProps> = ({
  isLocked,
  onUnlock,
  language = 'bm',
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  if (!isLocked) return null;

  const t = TRANSLATIONS[language];

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
          <AppIcon name="lock" size={18} color="#FFFFFF" />
          <View>
            <Text style={styles.statusTitle}>{t.screenLocked}</Text>
            <Text style={styles.statusSubtitle}>{t.placePaperHint}</Text>
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
            <View style={styles.unlockTextGroup}>
              <AppIcon name="unlock" size={14} color="#FFFFFF" />
              <Text style={styles.unlockButtonText}>{t.holdToUnlock}</Text>
            </View>
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
  unlockTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 2,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
