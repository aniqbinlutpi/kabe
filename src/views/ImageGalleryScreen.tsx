import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';
import { ImageGridCard } from '@/components/ImageGridCard';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface ImageGalleryScreenProps {
  category: CategoryItem;
  images: TracingImage[];
  onSelectImage: (image: TracingImage) => void;
  onBack: () => void;
  onOpenUploadModal: () => void;
  onDeleteImage?: (id: string) => void;
}

export const ImageGalleryScreen: React.FC<ImageGalleryScreenProps> = ({
  category,
  images,
  onSelectImage,
  onBack,
  onOpenUploadModal,
  onDeleteImage,
}) => {
  const { columns, gap, paddingHorizontal, maxContainerWidth } = useResponsiveLayout();

  return (
    <View style={styles.screenContainer}>
      {/* Top Navbar */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <AppIcon name="arrow-left" size={14} color="#09090B" />
          <Text style={styles.backText}>Kategori</Text>
        </TouchableOpacity>

        <View style={styles.categoryTitleGroup}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categorySub}>{images.length} gambar tersedia</Text>
        </View>

        <TouchableOpacity style={styles.uploadBtn} onPress={onOpenUploadModal}>
          <AppIcon name="plus" size={14} color="#FFFFFF" />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
          {images.length === 0 ? (
            <View style={styles.emptyContainer}>
              <AppIcon name="image" size={40} color="#A1A1AA" />
              <Text style={styles.emptyTitle}>Tiada Gambar Dalam Kategori Ini</Text>
              <Text style={styles.emptySub}>
                Muat naik gambar pertama anda untuk mula menekap & melukis.
              </Text>
              <TouchableOpacity style={styles.emptyUploadBtn} onPress={onOpenUploadModal}>
                <AppIcon name="plus" size={14} color="#FFFFFF" />
                <Text style={styles.emptyUploadText}>Muat Naik Gambar Sekarang</Text>
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
    backgroundColor: '#FFFFFF',
  },
  topNav: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
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
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#09090B',
  },
  categoryTitleGroup: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#09090B',
  },
  categorySub: {
    fontSize: 11,
    color: '#71717A',
    fontWeight: '400',
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
    color: '#09090B',
  },
  emptySub: {
    fontSize: 12,
    color: '#71717A',
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
