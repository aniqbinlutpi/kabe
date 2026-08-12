import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CategoryItem } from '@/types/TracingTypes';

interface CategoryCardProps {
  category: CategoryItem;
  itemCount?: number;
  onPress: (category: CategoryItem) => void;
  cardHeight?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  itemCount,
  onPress,
  cardHeight = 150,
}) => {
  const isDarkCard = category.id === 'uploads';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(category)}
      style={[
        styles.cardContainer,
        { minHeight: cardHeight },
        isDarkCard ? styles.darkCard : styles.lightCard,
      ]}
    >
      <View style={styles.topSection}>
        {category.badgeText ? (
          <View style={[styles.badge, isDarkCard ? styles.darkBadge : styles.lightBadge]}>
            <Text style={isDarkCard ? styles.darkBadgeText : styles.lightBadgeText}>
              {category.badgeText}
            </Text>
          </View>
        ) : (
          <View style={styles.badgeSpacer} />
        )}

        <Text style={[styles.titleText, isDarkCard ? styles.textLight : styles.textDark]}>
          {category.title}
        </Text>
        <Text style={[styles.subtitleText, isDarkCard ? styles.subLight : styles.subDark]} numberOfLines={2}>
          {category.subtitle}
        </Text>
      </View>

      {itemCount !== undefined && (
        <View style={[styles.countTag, isDarkCard ? styles.tagDark : styles.tagLight]}>
          <Text style={[styles.countText, isDarkCard ? styles.textLight : styles.textDark]}>
            {itemCount} gambar
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    overflow: 'hidden',
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E4E7',
  },
  darkCard: {
    backgroundColor: '#09090B',
    borderColor: '#27272A',
  },
  topSection: {
    gap: 4,
  },
  badgeSpacer: {
    height: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
    borderWidth: 1,
  },
  lightBadge: {
    backgroundColor: '#F4F4F5',
    borderColor: '#E4E4E7',
  },
  darkBadge: {
    backgroundColor: '#27272A',
    borderColor: '#3F3F46',
  },
  lightBadgeText: {
    color: '#09090B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  darkBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  textDark: {
    color: '#09090B',
  },
  textLight: {
    color: '#FFFFFF',
  },
  subDark: {
    color: '#71717A',
  },
  subLight: {
    color: '#A1A1AA',
  },
  countTag: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagLight: {
    backgroundColor: '#F4F4F5',
    borderColor: '#E4E4E7',
  },
  tagDark: {
    backgroundColor: '#18181B',
    borderColor: '#27272A',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
