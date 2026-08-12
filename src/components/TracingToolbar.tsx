import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { FilterMode, TracingStudioConfig } from '@/types/TracingTypes';

interface TracingToolbarProps {
  config: TracingStudioConfig;
  onChangeConfig: (newConfig: Partial<TracingStudioConfig>) => void;
  isLocked: boolean;
  language?: Language;
  themeMode?: ThemeMode;
}

export const TracingToolbar: React.FC<TracingToolbarProps> = ({
  config,
  onChangeConfig,
  isLocked,
  language = 'bm',
  themeMode = 'light',
}) => {
  if (isLocked) {
    return null; // Toolbar hidden when screen is locked for tracing
  }

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const filters: { id: FilterMode; label: string }[] = [
    { id: 'normal', label: t.filterOriginal },
    { id: 'lineArt', label: t.filterLineArt },
    { id: 'invert', label: t.filterInvert },
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderTopColor: colors.cardBorder },
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Zoom Controls */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>{t.sizeZoom}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={() => onChangeConfig({ scale: Math.max(0.2, config.scale - 0.2) })}
            >
              <Text style={[styles.toolBtnText, { color: colors.textPrimary }]}>−</Text>
            </TouchableOpacity>

            <Text style={[styles.valueText, { color: colors.textPrimary }]}>
              {Math.round(config.scale * 100)}%
            </Text>

            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={() => onChangeConfig({ scale: Math.min(6.0, config.scale + 0.2) })}
            >
              <Text style={[styles.toolBtnText, { color: colors.textPrimary }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rotate & Flip */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>{t.rotateAndFlip}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={() => onChangeConfig({ rotation: (config.rotation + 90) % 360 })}
            >
              <AppIcon name="reset" size={12} color={colors.textPrimary} />
              <Text style={[styles.toolBtnText, { color: colors.textPrimary }]}>{t.rotateStep}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
                config.flipHorizontal && {
                  backgroundColor: colors.darkButtonBackground,
                  borderColor: colors.darkButtonBackground,
                },
              ]}
              onPress={() => onChangeConfig({ flipHorizontal: !config.flipHorizontal })}
            >
              <AppIcon
                name="flip"
                size={12}
                color={config.flipHorizontal ? colors.darkButtonText : colors.textPrimary}
              />
              <Text
                style={[
                  styles.toolBtnText,
                  { color: config.flipHorizontal ? colors.darkButtonText : colors.textPrimary },
                ]}
              >
                {t.flip}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brightness Controls */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>{t.screenBrightness}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={() => onChangeConfig({ brightness: Math.max(0.3, config.brightness - 0.2) })}
            >
              <AppIcon name="moon" size={13} color={colors.textPrimary} />
            </TouchableOpacity>

            <Text style={[styles.valueText, { color: colors.textPrimary }]}>
              {Math.round(config.brightness * 100)}%
            </Text>

            <TouchableOpacity
              style={[
                styles.toolBtn,
                { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
              ]}
              onPress={() => onChangeConfig({ brightness: Math.min(2.0, config.brightness + 0.2) })}
            >
              <AppIcon name="sun" size={13} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Modes */}
        <View style={styles.sectionGroup}>
          <Text style={[styles.groupLabel, { color: colors.textSecondary }]}>{t.tracingMode}</Text>
          <View style={styles.buttonRow}>
            {filters.map((f) => {
              const isActive = config.filterMode === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.chipBtn,
                    { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
                    isActive && {
                      backgroundColor: colors.darkButtonBackground,
                      borderColor: colors.darkButtonBackground,
                    },
                  ]}
                  onPress={() => onChangeConfig({ filterMode: f.id })}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: isActive ? colors.darkButtonText : colors.textPrimary },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: 10,
    zIndex: 100,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 18,
    alignItems: 'center',
  },
  sectionGroup: {
    alignItems: 'center',
    gap: 4,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    minWidth: 38,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  valueText: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'center',
  },
  chipBtn: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
