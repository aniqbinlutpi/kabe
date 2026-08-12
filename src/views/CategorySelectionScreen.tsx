import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CategoryCard } from '@/components/CategoryCard';
import { CATEGORIES } from '@/constants/PresetCategories';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface CategorySelectionScreenProps {
  onSelectCategory: (category: CategoryItem) => void;
  onOpenUploadModal: () => void;
  customImages: TracingImage[];
  allImages: TracingImage[];
}

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  onSelectCategory,
  onOpenUploadModal,
  customImages,
  allImages,
}) => {
  const { columns, gap, paddingHorizontal, maxContainerWidth, cardHeight, isTablet } =
    useResponsiveLayout();

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'uploads') return customImages.length;
    return allImages.filter((img) => img.categoryId === categoryId).length;
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.innerContainer, { maxWidth: maxContainerWidth }]}>
        {/* App Hero / Header Banner - Minimalist Black & White */}
        <View style={[styles.heroCard, isTablet && styles.heroCardTablet]}>
          <View style={styles.heroTextGroup}>
            <View style={styles.appBadge}>
              <Text style={styles.appBadgeText}>KETAH KABE TRACING</Text>
            </View>
            <Text style={[styles.heroTitle, isTablet && styles.heroTitleTablet]}>
              Welcome to Ketah Kabe
            </Text>
            <Text style={styles.heroSub}>
              Aplikasi tekap lukisan mudah. Pilih gambar, letak kertas di atas skrin telefon/iPad & mula melukis.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.uploadHeaderBtn}
            onPress={onOpenUploadModal}
          >
            <Text style={styles.uploadHeaderText}>+ Upload Gambar</Text>
          </TouchableOpacity>
        </View>

        {/* Section Heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategori Lukisan</Text>
          <Text style={styles.sectionSub}>Pilih kategori untuk melihat senarai gambar tekap</Text>
        </View>

        {/* Dynamic Category Grid (Responsive for Mobile & iPad) */}
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    gap: 24,
  },
  heroCard: {
    backgroundColor: '#09090B',
    borderRadius: 16,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: '#27272A',
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
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: '#27272A',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
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
    color: '#09090B',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '400',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
