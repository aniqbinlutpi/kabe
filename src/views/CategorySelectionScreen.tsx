import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/constants/PresetCategories';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface CategorySelectionScreenProps {
  onSelectCategory: (category: CategoryItem) => void;
  onOpenUploadModal: () => void;
  onOpenSettingsModal: () => void;
  customImages: TracingImage[];
  allImages: TracingImage[];
  language: Language;
  themeMode: ThemeMode;
}

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  onSelectCategory,
  onOpenUploadModal,
  onOpenSettingsModal,
  customImages,
  allImages,
  language,
  themeMode,
}) => {
  const { columns, gap, paddingHorizontal, maxContainerWidth, cardHeight, isTablet } =
    useResponsiveLayout();

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'uploads') return customImages.length;
    return allImages.filter((img) => img.categoryId === categoryId).length;
  };

  return (
    <ScrollView
      style={[styles.screenContainer, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
        {/* App Top Bar with Brand & Settings Icon */}
        <View style={styles.topBar}>
          <View style={styles.brandGroup}>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>Ketah Kabe</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.settingsIconBtn,
              { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
            ]}
            onPress={onOpenSettingsModal}
          >
            <AppIcon name="settings" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* App Hero / Header Banner */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.heroCardBackground, borderColor: colors.cardBorder },
            isTablet && styles.heroCardTablet,
          ]}
        >
          <View style={styles.heroTextGroup}>
            <View style={styles.appBadge}>
              <Text style={styles.appBadgeText}>{t.appTag}</Text>
            </View>
            <Text style={[styles.heroTitle, isTablet && styles.heroTitleTablet]}>
              {t.heroTitle}
            </Text>
            <Text style={styles.heroSub}>{t.heroSub}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadHeaderBtn}
            onPress={onOpenUploadModal}
          >
            <AppIcon name="plus" size={14} color="#09090B" />
            <Text style={styles.uploadHeaderText}>{t.uploadButton}</Text>
          </TouchableOpacity>
        </View>

        {/* Section Heading */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {t.categoryTitle}
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
            {t.categorySub}
          </Text>
        </View>

        {/* Dynamic Category Grid */}
        <View style={[styles.gridContainer, { gap }]}>
          {CATEGORIES.map((cat) => {
            const itemCount = getCategoryCount(cat.id);
            const columnWidth = `${100 / columns - (gap * (columns - 1)) / columns}%` as any;

            return (
              <View key={cat.id} style={{ width: columnWidth }}>
                <CategoryCard
                  category={cat}
                  itemCount={itemCount}
                  onPress={onSelectCategory}
                  cardHeight={cardHeight}
                  language={language}
                  themeMode={themeMode}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    gap: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  settingsIconBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  heroCard: {
    borderRadius: 16,
    padding: 24,
    gap: 16,
    borderWidth: 1,
  },
  heroCardTablet: {
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextGroup: {
    flex: 1,
    gap: 8,
  },
  appBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#27272A',
    borderWidth: 1,
    borderColor: '#3F3F46',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  appBadgeText: {
    color: '#A1A1AA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroTitleTablet: {
    fontSize: 30,
  },
  heroSub: {
    color: '#A1A1AA',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    maxWidth: 550,
  },
  uploadHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  uploadHeaderText: {
    color: '#09090B',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 12,
    fontWeight: '400',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
