import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { SoundService } from '@/services/SoundService';
import { CategoryItem, TracingImage } from '@/types/TracingTypes';

interface CategoryCardProps {
  category: CategoryItem;
  itemCount?: number;
  onPress: (category: CategoryItem) => void;
  onSelectImage?: (image: TracingImage) => void;
  onOpenUploadModal?: () => void;
  categoryImages?: TracingImage[];
  cardHeight?: number;
  language?: Language;
  themeMode?: ThemeMode;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  itemCount,
  onPress,
  onSelectImage,
  onOpenUploadModal,
  categoryImages = [],
  cardHeight = 210,
  language = 'bm',
  themeMode = 'light',
}) => {
  const t = TRANSLATIONS[language];
  const colors = COLOR_THEMES[themeMode];

  const isDarkCard = category.id === 'uploads';
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 350 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 350 });
  };

  const getCategoryTitle = () => {
    if (category.id === 'uploads') return t.myUploadsTitle;
    if (category.id === 'anime') return 'Anime & Chibi';
    if (category.id === 'cartoon') return language === 'en' ? 'Cartoons' : 'Kartun';
    if (category.id === 'fruit') return language === 'en' ? 'Fruits' : 'Buah-buahan';
    if (category.id === 'animal') return language === 'en' ? 'Animals' : 'Haiwan';
    return language === 'en' ? 'Others' : 'Lain-lain';
  };

  const getCategorySub = () => {
    if (category.id === 'uploads') return t.myUploadsSub;
    if (category.id === 'anime') return language === 'en' ? 'Anime & Chibi Characters' : 'Karakter Anime & Line Art';
    if (category.id === 'cartoon') return language === 'en' ? 'Animation Characters' : 'Watak Animasi & Lukisan';
    if (category.id === 'fruit') return language === 'en' ? 'Fruits & Healthy Food' : 'Buah & Objek Alam';
    if (category.id === 'animal') return language === 'en' ? 'Cute Cats, Birds & Pets' : 'Kucing, Burung & Corak Comel';
    return language === 'en' ? 'Vehicles & Physical Objects' : 'Kenderaan & Objek Fizikal';
  };

  const previewImages = categoryImages.slice(0, 5);

  return (
    <Animated.View style={[animatedStyle, styles.animatedWrapper]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          SoundService.playPop();
          onPress(category);
        }}
        style={[
          styles.cardContainer,
          {
            minHeight: cardHeight,
            backgroundColor: isDarkCard ? '#09090B' : colors.cardBackground,
            borderColor: isDarkCard ? '#27272A' : colors.cardBorder,
            shadowColor: themeMode === 'dark' ? '#000000' : '#09090B',
          },
        ]}
      >
        {/* Category Card Header */}
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleArea}>
            <Text
              style={[
                styles.titleText,
                { color: isDarkCard ? '#FFFFFF' : colors.textPrimary },
              ]}
              numberOfLines={1}
            >
              {getCategoryTitle()}
            </Text>
            <Text
              style={[
                styles.subtitleText,
                { color: isDarkCard ? '#A1A1AA' : colors.textSecondary },
              ]}
              numberOfLines={1}
            >
              {getCategorySub()}
            </Text>
          </View>

          {itemCount !== undefined && (
            <View style={styles.countTag}>
              <Text
                style={[
                  styles.countText,
                  { color: isDarkCard ? '#A1A1AA' : colors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {itemCount} →
              </Text>
            </View>
          )}
        </View>

        {/* 5 Mini Image Preview Grid (3 columns x 2 rows, 6th slot is "...") */}
        <View style={styles.previewGrid}>
          {Array.from({ length: 5 }).map((_, idx) => {
            const img = previewImages[idx];
            if (img) {
              return (
                <Pressable
                  key={img.id || idx}
                  style={({ pressed }) => [
                    styles.previewItem,
                    {
                      borderColor: isDarkCard ? '#27272A' : '#E4E4E7',
                      opacity: pressed ? 0.75 : 1,
                      transform: [{ scale: pressed ? 0.94 : 1 }],
                    },
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    SoundService.playPop();
                    onPress(category);
                  }}
                >
                  <Image
                    source={{ uri: img.uri }}
                    style={styles.previewThumbImage}
                    contentFit="cover"
                    transition={200}
                  />
                </Pressable>
              );
            }

            // Empty slot (e.g., custom upload slot)
            return (
              <Pressable
                key={`empty-${idx}`}
                style={({ pressed }) => [
                  styles.previewItem,
                  styles.emptySlotItem,
                  {
                    backgroundColor: isDarkCard ? '#18181B' : '#F4F4F5',
                    borderColor: isDarkCard ? '#27272A' : '#E4E4E7',
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  SoundService.playPop();
                  if (category.id === 'uploads' && onOpenUploadModal) {
                    onOpenUploadModal();
                  } else {
                    onPress(category);
                  }
                }}
              >
                <AppIcon name="plus" size={14} color={isDarkCard ? '#52525B' : '#A1A1AA'} />
              </Pressable>
            );
          })}

          {/* 6th Slot: The "..." Button */}
          <Pressable
            style={({ pressed }) => [
              styles.previewItem,
              styles.moreBtnItem,
              {
                backgroundColor: isDarkCard ? '#27272A' : '#F4F4F5',
                borderColor: isDarkCard ? '#3F3F46' : '#E4E4E7',
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.94 : 1 }],
              },
            ]}
            onPress={(e) => {
              e.stopPropagation();
              SoundService.playPop();
              onPress(category);
            }}
          >
            <Text style={[styles.moreBtnText, { color: isDarkCard ? '#FFFFFF' : colors.textPrimary }]}>
              •••
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: 16,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
  },
  titleArea: {
    flex: 1,
    gap: 2,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '400',
  },
  countTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  previewItem: {
    width: '31.5%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  previewThumbImage: {
    width: '100%',
    height: '100%',
  },
  emptySlotItem: {
    borderStyle: 'dashed',
  },
  moreBtnItem: {
    borderWidth: 1,
  },
  moreBtnText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
