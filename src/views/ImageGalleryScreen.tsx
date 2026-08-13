import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AppIcon } from '@/components/AppIcon';
import { ImageGridCard } from '@/components/ImageGridCard';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { SoundService } from '@/services/SoundService';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface ImageGalleryScreenProps {
  category: CategoryItem;
  images: TracingImage[];
  onSelectImage: (image: TracingImage) => void;
  onBack: () => void;
  onOpenUploadModal: () => void;
  onOpenSettingsModal: () => void;
  onDeleteImage?: (id: string) => void;
  language?: Language;
  themeMode?: ThemeMode;
}

export const ImageGalleryScreen: React.FC<ImageGalleryScreenProps> = ({
  category,
  images,
  onSelectImage,
  onBack,
  onOpenUploadModal,
  onOpenSettingsModal,
  onDeleteImage,
  language = 'bm',
  themeMode = 'light',
}) => {
  const { columns, gap, paddingHorizontal, maxContainerWidth } = useResponsiveLayout();
  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const getCategoryTitle = () => {
    if (category.id === 'uploads') return t.myUploadsTitle;
    if (category.id === 'anime') return 'Anime & Chibi';
    if (category.id === 'cartoon') return language === 'en' ? 'Cartoons' : 'Kartun';
    if (category.id === 'fruit') return language === 'en' ? 'Fruits' : 'Buah-buahan';
    if (category.id === 'animal') return language === 'en' ? 'Animals' : 'Haiwan';
    return language === 'en' ? 'Others' : 'Lain-lain';
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      {/* Top Navbar */}
      <Animated.View
        entering={FadeInDown.duration(350)}
        style={[
          styles.topNav,
          { backgroundColor: colors.background, borderBottomColor: colors.cardBorder },
        ]}
      >
        {/* Flat Back Icon Button Only (No Text Wording) */}
        <Pressable
          style={styles.flatBackBtn}
          onPress={() => {
            SoundService.playClick();
            onBack();
          }}
        >
          <AppIcon name="arrow-left" size={18} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.categoryTitleGroup}>
          <Text style={[styles.categoryTitle, { color: colors.textPrimary }]}>
            {getCategoryTitle()}
          </Text>
          <Text style={[styles.categorySub, { color: colors.textSecondary }]}>
            {images.length} {t.imagesAvailable}
          </Text>
        </View>

        <View style={styles.rightNavActions}>
          <Pressable
            style={styles.flatSettingsBtn}
            onPress={() => {
              SoundService.playPop();
              onOpenSettingsModal();
            }}
          >
            <AppIcon name="settings" size={18} color={colors.textPrimary} />
          </Pressable>

          <Pressable
            style={[styles.uploadBtn, { backgroundColor: colors.darkButtonBackground }]}
            onPress={() => {
              SoundService.playPop();
              onOpenUploadModal();
            }}
          >
            <AppIcon name="plus" size={14} color={colors.darkButtonText} />
            <Text style={[styles.uploadText, { color: colors.darkButtonText }]}>
              {t.uploadButton}
            </Text>
          </Pressable>
        </View>
      </Animated.View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
          {images.length === 0 ? (
            <Animated.View entering={FadeInUp.duration(400)} style={styles.emptyContainer}>
              <AppIcon name="image" size={40} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                {t.noImagesTitle}
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                {t.noImagesSub}
              </Text>
              <Pressable
                style={[styles.emptyUploadBtn, { backgroundColor: colors.darkButtonBackground }]}
                onPress={() => {
                  SoundService.playPop();
                  onOpenUploadModal();
                }}
              >
                <AppIcon name="plus" size={14} color={colors.darkButtonText} />
                <Text style={[styles.emptyUploadText, { color: colors.darkButtonText }]}>
                  {t.uploadNow}
                </Text>
              </Pressable>
            </Animated.View>
          ) : (
            <View style={[styles.gridContainer, { gap }]}>
              {images.map((img, index) => {
                const columnWidth = `${100 / columns - (gap * (columns - 1)) / columns}%` as any;
                return (
                  <Animated.View
                    key={img.id}
                    entering={FadeInUp.delay(100 + index * 50).springify().damping(15)}
                    style={{ width: columnWidth }}
                  >
                    <ImageGridCard
                      image={img}
                      onSelect={(selected) => {
                        SoundService.playSelect();
                        onSelectImage(selected);
                      }}
                      onDelete={(id) => {
                        SoundService.playClick();
                        if (onDeleteImage) onDeleteImage(id);
                      }}
                      themeMode={themeMode}
                    />
                  </Animated.View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  topNav: {
    height: 60,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  flatBackBtn: {
    padding: 8,
    paddingLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitleGroup: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  categorySub: {
    fontSize: 11,
    fontWeight: '400',
  },
  rightNavActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flatSettingsBtn: {
    padding: 6,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 12,
    fontWeight: '800',
  },
  scrollContent: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 320,
  },
  emptyUploadBtn: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyUploadText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
