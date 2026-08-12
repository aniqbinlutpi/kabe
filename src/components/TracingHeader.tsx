import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';

interface TracingHeaderProps {
  title: string;
  isLocked: boolean;
  onBack: () => void;
  onToggleLock: () => void;
  onReset: () => void;
  onOpenSettingsModal?: () => void;
  language?: Language;
  themeMode?: ThemeMode;
}

export const TracingHeader: React.FC<TracingHeaderProps> = ({
  title,
  isLocked,
  onBack,
  onToggleLock,
  onReset,
  onOpenSettingsModal,
  language = 'bm',
  themeMode = 'light',
}) => {
  if (isLocked) {
    return null; // Header hidden when screen is locked for paper tracing
  }

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderBottomColor: colors.cardBorder },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.iconButton,
          { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
        ]}
        onPress={onBack}
      >
        <AppIcon name="arrow-left" size={14} color={colors.textPrimary} />
        <Text style={[styles.backText, { color: colors.textPrimary }]}>{t.back}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        {onOpenSettingsModal && (
          <TouchableOpacity
            style={[
              styles.resetButton,
              { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
            ]}
            onPress={onOpenSettingsModal}
          >
            <AppIcon name="settings" size={13} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.resetButton,
            { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
          ]}
          onPress={onReset}
        >
          <AppIcon name="reset" size={12} color={colors.textPrimary} />
          <Text style={[styles.resetText, { color: colors.textPrimary }]}>{t.reset}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.lockButton, { backgroundColor: colors.darkButtonBackground }]}
          onPress={onToggleLock}
        >
          <AppIcon name="lock" size={12} color={colors.darkButtonText} />
          <Text style={[styles.lockText, { color: colors.darkButtonText }]}>{t.lockScreen}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 8,
    zIndex: 100,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  lockText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
