import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AppIcon } from '@/components/AppIcon';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/constants/PresetCategories';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

import { KabeLogo } from '@/components/KabeLogo';

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
  const { columns, gap, paddingHorizontal, maxContainerWidth, cardHeight } =
    useResponsiveLayout();

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'uploads') return customImages.length;
    return allImages.filter((img) => img.categoryId === categoryId).length;
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      {/* Sticky Top Header Bar */}
      <Animated.View
        entering={FadeInDown.duration(350)}
        style={[
          styles.stickyHeader,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.cardBorder,
          },
        ]}
      >
        <View style={[styles.stickyHeaderContent, { maxWidth: maxContainerWidth, paddingHorizontal }]}>
          <KabeLogo textColor={colors.textPrimary} size="md" />

          <Pressable style={styles.flatSettingsIconBtn} onPress={onOpenSettingsModal}>
            <AppIcon name="settings" size={18} color={colors.textPrimary} />
          </Pressable>
        </View>
      </Animated.View>

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
          {/* Animated Flat Editorial Hero Header */}
          <Animated.View entering={FadeInDown.delay(100).duration(450)} style={styles.flatHeroSection}>
            <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
              {t.heroTitle}
            </Text>
            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
              {t.heroSub}
            </Text>

            <Pressable
              style={[styles.uploadHeaderBtn, { backgroundColor: colors.darkButtonBackground }]}
              onPress={onOpenUploadModal}
            >
              <AppIcon name="plus" size={14} color={colors.darkButtonText} />
              <Text style={[styles.uploadHeaderText, { color: colors.darkButtonText }]}>
                {t.uploadButton}
              </Text>
            </Pressable>
          </Animated.View>

          {/* Section Heading */}
          <Animated.View entering={FadeInDown.delay(180).duration(450)} style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              {t.categoryTitle}
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              {t.categorySub}
            </Text>
          </Animated.View>

          {/* Dynamic Flat Category Grid */}
          <View style={[styles.gridContainer, { gap }]}>
            {CATEGORIES.map((cat, index) => {
              const itemCount = getCategoryCount(cat.id);
              const columnWidth = `${100 / columns - (gap * (columns - 1)) / columns}%` as any;

              return (
                <Animated.View
                  key={cat.id}
                  entering={FadeInUp.delay(220 + index * 50).springify().damping(16)}
                  style={{ width: columnWidth }}
                >
                  <CategoryCard
                    category={cat}
                    itemCount={itemCount}
                    onPress={onSelectCategory}
                    cardHeight={cardHeight}
                    language={language}
                    themeMode={themeMode}
                  />
                </Animated.View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  stickyHeader: {
    height: 56,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  stickyHeaderContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  flatSettingsIconBtn: {
    padding: 6,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    gap: 24,
  },
  flatHeroSection: {
    gap: 10,
    paddingVertical: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  heroSub: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    maxWidth: 550,
  },
  uploadHeaderBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  uploadHeaderText: {
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeader: {
    gap: 2,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    paddingTop: 16,
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
