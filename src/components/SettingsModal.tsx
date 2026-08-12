import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  themeMode: ThemeMode;
  onSelectThemeMode: (theme: ThemeMode) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  language,
  onSelectLanguage,
  themeMode,
  onSelectThemeMode,
}) => {
  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          {/* Title Header */}
          <View style={styles.headerRow}>
            <View style={styles.titleGroup}>
              <AppIcon name="settings" size={20} color={colors.textPrimary} />
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                {t.settingsTitle}
              </Text>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <AppIcon name="close" size={14} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Language Selection Section */}
          <View style={styles.sectionGroup}>
            <View style={styles.sectionLabelRow}>
              <AppIcon name="globe" size={12} color={colors.textSecondary} />
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                {t.languageSection}
              </Text>
            </View>

            <View style={[styles.toggleContainer, { backgroundColor: colors.buttonBackground }]}>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  language === 'bm' && {
                    backgroundColor: colors.cardBackground,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  },
                ]}
                onPress={() => onSelectLanguage('bm')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    { color: language === 'bm' ? colors.textPrimary : colors.textSecondary },
                  ]}
                >
                  Bahasa Melayu (BM)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  language === 'en' && {
                    backgroundColor: colors.cardBackground,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  },
                ]}
                onPress={() => onSelectLanguage('en')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    { color: language === 'en' ? colors.textPrimary : colors.textSecondary },
                  ]}
                >
                  English (EN)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Theme Selection Section */}
          <View style={styles.sectionGroup}>
            <View style={styles.sectionLabelRow}>
              <AppIcon name="sun" size={12} color={colors.textSecondary} />
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                {t.themeSection}
              </Text>
            </View>

            <View style={[styles.toggleContainer, { backgroundColor: colors.buttonBackground }]}>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  themeMode === 'light' && {
                    backgroundColor: colors.cardBackground,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  },
                ]}
                onPress={() => onSelectThemeMode('light')}
              >
                <View style={styles.themeOptionRow}>
                  <AppIcon
                    name="sun"
                    size={14}
                    color={themeMode === 'light' ? colors.textPrimary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      { color: themeMode === 'light' ? colors.textPrimary : colors.textSecondary },
                    ]}
                  >
                    {t.themeLight}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  themeMode === 'dark' && {
                    backgroundColor: colors.cardBackground,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  },
                ]}
                onPress={() => onSelectThemeMode('dark')}
              >
                <View style={styles.themeOptionRow}>
                  <AppIcon
                    name="moon"
                    size={14}
                    color={themeMode === 'dark' ? colors.textPrimary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      { color: themeMode === 'dark' ? colors.textPrimary : colors.textSecondary },
                    ]}
                  >
                    {t.themeDark}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Close */}
          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.darkButtonBackground }]}
            onPress={onClose}
          >
            <Text style={[styles.doneText, { color: colors.darkButtonText }]}>{t.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    width: '100%',
    maxWidth: 440,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 6,
  },
  sectionGroup: {
    gap: 8,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  themeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  doneBtn: {
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  doneText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
