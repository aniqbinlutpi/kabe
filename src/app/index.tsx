import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadImageModal } from '@/components/UploadImageModal';
import { PRESET_IMAGES } from '@/constants/PresetCategories';
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

  // Load custom images from local storage on launch
  useEffect(() => {
    async function loadSavedImages() {
      const saved = await StorageService.getCustomImages();
      setCustomImages(saved);
    }
    loadSavedImages();
  }, []);

  const allImages = [...customImages, ...PRESET_IMAGES];

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

    // Automatically enter studio mode with new uploaded image!
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {activeView === 'categories' && (
          <CategorySelectionScreen
            onSelectCategory={handleSelectCategory}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            customImages={customImages}
            allImages={allImages}
          />
        )}

        {activeView === 'gallery' && selectedCategory && (
          <ImageGalleryScreen
            category={selectedCategory}
            images={getGalleryImages()}
            onSelectImage={handleSelectImage}
            onBack={() => setActiveView('categories')}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onDeleteImage={handleDeleteCustomImage}
          />
        )}

        {activeView === 'studio' && selectedImage && (
          <TracingStudioScreen
            image={selectedImage}
            onBack={() => setActiveView(selectedCategory ? 'gallery' : 'categories')}
          />
        )}

        {/* Global Upload Image Modal */}
        <UploadImageModal
          visible={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onImageUploaded={handleCustomImageUploaded}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
