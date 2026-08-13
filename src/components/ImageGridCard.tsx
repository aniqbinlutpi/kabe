import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AppIcon } from '@/components/AppIcon';
import { COLOR_THEMES, ThemeMode } from '@/constants/Translations';
import { TracingImage } from '@/types/TracingTypes';

interface ImageGridCardProps {
  image: TracingImage;
  onSelect: (image: TracingImage) => void;
  onDelete?: (id: string) => void;
  cardWidth?: number;
  themeMode?: ThemeMode;
}

export const ImageGridCard: React.FC<ImageGridCardProps> = ({
  image,
  onSelect,
  onDelete,
  themeMode = 'light',
}) => {
  const colors = COLOR_THEMES[themeMode];
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 350 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 350 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onSelect(image)}
        style={[
          styles.cardContainer,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.cardBorder,
            shadowColor: themeMode === 'dark' ? '#000000' : '#09090B',
          },
        ]}
      >
        <View style={[styles.imageContainer, { backgroundColor: themeMode === 'dark' ? '#18181B' : '#F4F4F5' }]}>
          <Image
            source={{ uri: image.uri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          {image.isCustom && (
            <View style={[styles.customBadge, { backgroundColor: '#09090B' }]}>
              <Text style={styles.customBadgeText}>Upload</Text>
            </View>
          )}

          {image.isCustom && onDelete && (
            <Pressable
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation();
                onDelete(image.id);
              }}
            >
              <AppIcon name="trash" size={12} color="#EF4444" />
            </Pressable>
          )}
        </View>

        <View style={styles.infoArea}>
          <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
            {image.title}
          </Text>
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>Tekap & Lukis →</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.1,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  customBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  customBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#09090B',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  infoArea: {
    padding: 10,
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
