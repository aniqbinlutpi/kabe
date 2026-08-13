import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { SoundService } from '@/services/SoundService';

interface TracingHeaderProps {
  title: string;
  isLocked: boolean;
  onBack: () => void;
  onToggleLock: () => void;
  onReset: () => void;
  onOpenSettingsModal?: () => void;
  onOpenWizard?: () => void;
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
  onOpenWizard,
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
      <TouchableOpacity
        style={styles.flatIconButton}
        onPress={() => {
          SoundService.playClick();
          onBack();
        }}
      >
        <AppIcon name="arrow-left" size={18} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        {onOpenWizard && (
          <TouchableOpacity
            style={styles.flatIconBtnOnly}
            onPress={() => {
              SoundService.playPop();
              onOpenWizard();
            }}
          >
            <AppIcon name="help" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        {onOpenSettingsModal && (
          <TouchableOpacity
            style={styles.flatIconBtnOnly}
            onPress={() => {
              SoundService.playPop();
              onOpenSettingsModal();
            }}
          >
            <AppIcon name="settings" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.flatIconBtnOnly}
          onPress={() => {
            SoundService.playClick();
            onReset();
          }}
        >
          <AppIcon name="reset" size={18} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.lockIconButton, { backgroundColor: colors.darkButtonBackground }]}
          onPress={() => {
            SoundService.playPop();
            onToggleLock();
          }}
        >
          <AppIcon name="lock" size={16} color={colors.darkButtonText} />
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
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
