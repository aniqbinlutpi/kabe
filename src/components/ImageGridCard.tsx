import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TracingImage } from '@/types/TracingTypes';

interface ImageGridCardProps {
  image: TracingImage;
  onSelect: (image: TracingImage) => void;
  onDelete?: (id: string) => void;
  cardWidth?: number;
}

export const ImageGridCard: React.FC<ImageGridCardProps> = ({
  image,
  onSelect,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(image)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image.uri }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        {image.isCustom && (
          <View style={styles.customBadge}>
            <Text style={styles.customBadgeText}>Upload</Text>
          </View>
        )}

        {image.isCustom && onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e.stopPropagation();
              onDelete(image.id);
            }}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoArea}>
        <Text style={styles.title} numberOfLines={1}>
          {image.title}
        </Text>
        <Text style={styles.actionText}>Tekap & Lukis →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.1,
    backgroundColor: '#F4F4F5',
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
    backgroundColor: '#09090B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  customBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
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
  deleteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoArea: {
    padding: 10,
    gap: 2,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#09090B',
  },
  actionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
  },
});
