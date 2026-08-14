import React from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AppIcon } from '@/components/AppIcon';
import { CategoryCard } from '@/components/CategoryCard';
import { KabeLogo } from '@/components/KabeLogo';
import { CATEGORIES } from '@/constants/PresetCategories';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { SoundService } from '@/services/SoundService';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface CategorySelectionScreenProps {
  onSelectCategory: (category: CategoryItem) => void;
  onSelectImage?: (image: TracingImage) => void;
  onOpenUploadModal: () => void;
  onOpenSettingsModal: () => void;
  customImages: TracingImage[];
  allImages: TracingImage[];
  language: Language;
  themeMode: ThemeMode;
}

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  onSelectCategory,
  onSelectImage,
  onOpenUploadModal,
  onOpenSettingsModal,
  customImages,
  allImages,
  language,
  themeMode,
}) => {
  const { paddingHorizontal, maxContainerWidth } = useResponsiveLayout();

  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];
  const isDark = themeMode === 'dark';

  const row1Categories = CATEGORIES.slice(0, 3);
  const row2Categories = CATEGORIES.slice(3, 6);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'uploads') return customImages.length;
    return allImages.filter((img) => img.categoryId === categoryId).length;
  };

  const getCategoryImages = (categoryId: string) => {
    if (categoryId === 'uploads') return customImages;
    return allImages.filter((img) => img.categoryId === categoryId);
  };

  const openGithub = () => {
    SoundService.playPop();
    Linking.openURL('https://github.com/aniqbinlutpi').catch((err) =>
      console.warn('Failed to open URL:', err)
    );
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      {/* Sticky Top Header Bar */}
      <View
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

          <Pressable 
            style={styles.flatSettingsIconBtn} 
            onPress={() => {
              SoundService.playPop();
              onOpenSettingsModal();
            }}
          >
            <AppIcon name="settings" size={18} color={colors.textPrimary} />
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal, minHeight: '92%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
          {/* Hero Section */}
          <View style={styles.flatHeroSection}>
            <Text
              style={[styles.heroTitle, { color: colors.textPrimary }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {t.heroTitle}
            </Text>
            <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
              {t.heroSub}
            </Text>

            <Pressable
              style={[styles.uploadHeaderBtn, { backgroundColor: colors.darkButtonBackground }]}
              onPress={() => {
                SoundService.playPop();
                onOpenUploadModal();
              }}
            >
              <AppIcon name="plus" size={14} color={colors.darkButtonText} />
              <Text style={[styles.uploadHeaderText, { color: colors.darkButtonText }]}>
                {t.uploadButton}
              </Text>
            </Pressable>
          </View>

          {/* Section Heading */}
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderTitles}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                {t.categoryTitle}
              </Text>
              <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
                {t.categorySub}
              </Text>
            </View>
          </View>

          {/* 2-Row Horizontal Scrollable Grid with Right Edge Peek (matching sketch) */}
          <View style={styles.gridContainer}>
            {/* Row 1 Horizontal Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={292}
              snapToAlignment="start"
              contentContainerStyle={styles.horizontalRowContent}
            >
              {row1Categories.map((cat) => (
                <View key={cat.id} style={styles.horizontalCardWrapper}>
                  <CategoryCard
                    category={cat}
                    itemCount={getCategoryCount(cat.id)}
                    categoryImages={getCategoryImages(cat.id)}
                    onPress={onSelectCategory}
                    onSelectImage={onSelectImage}
                    onOpenUploadModal={onOpenUploadModal}
                    cardHeight={215}
                    language={language}
                    themeMode={themeMode}
                  />
                </View>
              ))}
            </ScrollView>

            {/* Row 2 Horizontal Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={292}
              snapToAlignment="start"
              contentContainerStyle={styles.horizontalRowContent}
            >
              {row2Categories.map((cat) => (
                <View key={cat.id} style={styles.horizontalCardWrapper}>
                  <CategoryCard
                    category={cat}
                    itemCount={getCategoryCount(cat.id)}
                    categoryImages={getCategoryImages(cat.id)}
                    onPress={onSelectCategory}
                    onSelectImage={onSelectImage}
                    onOpenUploadModal={onOpenUploadModal}
                    cardHeight={215}
                    language={language}
                    themeMode={themeMode}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Normal Bottom Footer */}
        <View
          style={[styles.footerContainer, { maxWidth: maxContainerWidth }]}
        >
          <View style={[styles.footerDivider, { backgroundColor: colors.cardBorder }]} />

          <View style={styles.footerRow}>
            <Text style={[styles.footerCopyrightText, { color: colors.textSecondary }]}>
              © {new Date().getFullYear()} Kabe App. All rights reserved.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.githubIconButton,
                { opacity: pressed ? 0.6 : 1 },
              ]}
              onPress={openGithub}
              hitSlop={8}
            >
              <AppIcon name="github" size={20} color={colors.textPrimary} />
            </Pressable>
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
  flatSettingsIconBtn: {
    padding: 6,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '100%',
    gap: 16,
  },
  flatHeroSection: {
    gap: 8,
    paddingVertical: 2,
  },
  heroTitle: {
    fontFamily: Platform.select({
      ios: 'Chalkboard SE',
      android: 'casual',
      web: '"Patrick Hand", "Chalkboard SE", "Comic Sans MS", cursive, sans-serif',
      default: 'cursive',
    }),
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 30,
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
    marginTop: 2,
  },
  uploadHeaderText: {
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    paddingTop: 14,
  },
  sectionHeaderTitles: {
    gap: 2,
    flex: 1,
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
    width: '100%',
    gap: 14,
  },
  horizontalRowContent: {
    gap: 12,
    paddingRight: 16,
  },
  horizontalCardWrapper: {
    width: 280,
  },
  footerContainer: {
    width: '100%',
    marginTop: 24,
    paddingBottom: 8,
  },
  footerDivider: {
    height: 1,
    width: '100%',
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerCopyrightText: {
    fontSize: 12,
    fontWeight: '400',
  },
  githubIconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
