import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { ImageGridCard } from '@/components/ImageGridCard';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
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
      <View
        style={[
          styles.topNav,
          { backgroundColor: colors.cardBackground, borderBottomColor: colors.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.backBtn,
            { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
          ]}
          onPress={onBack}
        >
          <AppIcon name="arrow-left" size={14} color={colors.textPrimary} />
          <Text style={[styles.backText, { color: colors.textPrimary }]}>{t.backToCategories}</Text>
        </TouchableOpacity>

        <View style={styles.categoryTitleGroup}>
          <Text style={[styles.categoryTitle, { color: colors.textPrimary }]}>
            {getCategoryTitle()}
          </Text>
          <Text style={[styles.categorySub, { color: colors.textSecondary }]}>
            {images.length} {t.imagesAvailable}
          </Text>
        </View>

        <View style={styles.rightNavActions}>
          <TouchableOpacity
            style={[
              styles.settingsBtn,
              { backgroundColor: colors.buttonBackground, borderColor: colors.buttonBorder },
            ]}
            onPress={onOpenSettingsModal}
          >
            <AppIcon name="settings" size={14} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBtn} onPress={onOpenUploadModal}>
            <AppIcon name="plus" size={14} color="#FFFFFF" />
            <Text style={styles.uploadText}>{t.uploadButton}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
          {images.length === 0 ? (
            <View style={styles.emptyContainer}>
              <AppIcon name="image" size={40} color={colors.textSecondary} />
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                {t.noImagesTitle}
              </Text>
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                {t.noImagesSub}
              </Text>
              <TouchableOpacity style={styles.emptyUploadBtn} onPress={onOpenUploadModal}>
                <AppIcon name="plus" size={14} color="#FFFFFF" />
                <Text style={styles.emptyUploadText}>{t.uploadNow}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.gridContainer, { gap }]}>
              {images.map((img) => {
                const columnWidth = `${100 / columns - (gap * (columns - 1)) / columns}%` as any;
                return (
                  <View key={img.id} style={{ width: columnWidth }}>
                    <ImageGridCard
                      image={img}
                      onSelect={onSelectImage}
                      onDelete={onDeleteImage}
                      themeMode={themeMode}
                    />
                  </View>
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
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
    gap: 6,
  },
  settingsBtn: {
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#09090B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  uploadText: {
    color: '#FFFFFF',
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
    backgroundColor: '#09090B',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyUploadText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
