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
        { backgroundColor: colors.background, borderBottomColor: colors.cardBorder },
      ]}
    >
      {/* Flat Back Arrow Icon Only (No Text Wording) */}
      <TouchableOpacity style={styles.flatIconButton} onPress={onBack}>
        <AppIcon name="arrow-left" size={18} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        {onOpenSettingsModal && (
          <TouchableOpacity style={styles.flatIconBtnOnly} onPress={onOpenSettingsModal}>
            <AppIcon name="settings" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.flatTextBtn} onPress={onReset}>
          <AppIcon name="reset" size={14} color={colors.textPrimary} />
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
    paddingHorizontal: 16,
    gap: 8,
    zIndex: 100,
  },
  flatIconButton: {
    padding: 8,
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 12,
  },
  flatIconBtnOnly: {
    padding: 6,
  },
  flatTextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  resetText: {
    fontSize: 13,
    fontWeight: '700',
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  lockText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
