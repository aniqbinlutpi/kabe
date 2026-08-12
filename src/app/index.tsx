import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsModal } from '@/components/SettingsModal';
import { UploadImageModal } from '@/components/UploadImageModal';
import { PRESET_IMAGES } from '@/constants/PresetCategories';
import { COLOR_THEMES, Language, ThemeMode } from '@/constants/Translations';
import { StorageService } from '@/services/StorageService';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';
import { CategorySelectionScreen } from '@/views/CategorySelectionScreen';
import { ImageGalleryScreen } from '@/views/ImageGalleryScreen';
import { TracingStudioScreen } from '@/views/TracingStudioScreen';

type ActiveView = 'categories' | 'gallery' | 'studio';

export default function RootApp() {
  const [activeView, setActiveView] = useState<ActiveView>('categories');
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<TracingImage | null>(null);
  const [customImages, setCustomImages] = useState<TracingImage[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [language, setLanguage] = useState<Language>('bm');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Load custom images, language, and theme mode from local storage
  useEffect(() => {
    async function loadState() {
      const savedImages = await StorageService.getCustomImages();
      const savedLang = await StorageService.getLanguage();
      const savedTheme = await StorageService.getThemeMode();

      setCustomImages(savedImages);
      setLanguage(savedLang);
      setThemeMode(savedTheme);
    }
    loadState();
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    StorageService.saveLanguage(lang);
  };

  const handleSelectThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    StorageService.saveThemeMode(mode);
  };

  const allImages = [...customImages, ...PRESET_IMAGES];
  const colors = COLOR_THEMES[themeMode];

  const handleSelectCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
    setActiveView('gallery');
  };

  const handleSelectImage = (image: TracingImage) => {
    setSelectedImage(image);
    setActiveView('studio');
  };

  const handleCustomImageUploaded = async (title: string, uri: string) => {
    const newImage = await StorageService.saveCustomImage({
      title,
      uri,
    });
    setCustomImages((prev) => [newImage, ...prev]);

    // Automatically enter studio mode with new uploaded image
    setSelectedImage(newImage);
    setActiveView('studio');
  };

  const handleDeleteCustomImage = async (id: string) => {
    const success = await StorageService.deleteCustomImage(id);
    if (success) {
      setCustomImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  const getGalleryImages = () => {
    if (!selectedCategory) return [];
    if (selectedCategory.id === 'uploads') return customImages;
    return allImages.filter((img) => img.categoryId === selectedCategory.id);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeMode === 'dark' ? '#09090B' : '#09090B' }]}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {activeView === 'categories' && (
          <CategorySelectionScreen
            onSelectCategory={handleSelectCategory}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            customImages={customImages}
            allImages={allImages}
            language={language}
            themeMode={themeMode}
          />
        )}

        {activeView === 'gallery' && selectedCategory && (
          <ImageGalleryScreen
            category={selectedCategory}
            images={getGalleryImages()}
            onSelectImage={handleSelectImage}
            onBack={() => setActiveView('categories')}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            onDeleteImage={handleDeleteCustomImage}
            language={language}
            themeMode={themeMode}
          />
        )}

        {activeView === 'studio' && selectedImage && (
          <TracingStudioScreen
            image={selectedImage}
            onBack={() => setActiveView(selectedCategory ? 'gallery' : 'categories')}
            onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
            language={language}
            themeMode={themeMode}
          />
        )}

        {/* Global Upload Image Modal */}
        <UploadImageModal
          visible={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onImageUploaded={handleCustomImageUploaded}
          language={language}
          themeMode={themeMode}
        />

        {/* Global Settings Modal (BM/EN Language & Light/Dark Theme) */}
        <SettingsModal
          visible={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          language={language}
          onSelectLanguage={handleSelectLanguage}
          themeMode={themeMode}
          onSelectThemeMode={handleSelectThemeMode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
