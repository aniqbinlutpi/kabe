import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLOR_THEMES, Language, ThemeMode, TRANSLATIONS } from '@/constants/Translations';
import { CategoryItem } from '@/types/TracingTypes';

interface CategoryCardProps {
  category: CategoryItem;
  itemCount?: number;
  onPress: (category: CategoryItem) => void;
  cardHeight?: number;
  language?: Language;
  themeMode?: ThemeMode;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  itemCount,
  onPress,
  cardHeight = 155,
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
    scale.value = withSpring(0.96, { damping: 15, stiffness: 350 });
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

  const badgeText = category.badgeText;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(category)}
        style={[
          styles.cardContainer,
          {
            height: cardHeight,
            backgroundColor: isDarkCard ? '#09090B' : colors.cardBackground,
            borderColor: isDarkCard ? '#27272A' : colors.cardBorder,
            shadowColor: themeMode === 'dark' ? '#000000' : '#09090B',
          },
        ]}
      >
        <View style={styles.topSection}>
          {badgeText ? (
            <View style={styles.badgeWrapper}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isDarkCard ? '#27272A' : colors.buttonBackground,
                    borderColor: isDarkCard ? '#3F3F46' : colors.buttonBorder,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isDarkCard ? '#FFFFFF' : colors.textPrimary },
                  ]}
                >
                  {badgeText}
                </Text>
              </View>
            </View>
          ) : null}

          <Text
            style={[
              styles.titleText,
              { color: isDarkCard ? '#FFFFFF' : colors.textPrimary },
            ]}
          >
            {getCategoryTitle()}
          </Text>
          <Text
            style={[
              styles.subtitleText,
              { color: isDarkCard ? '#A1A1AA' : colors.textSecondary },
            ]}
            numberOfLines={2}
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
            >
              {itemCount} {t.imageCountUnit} →
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    justifyContent: 'space-between',
    borderWidth: 1,
    overflow: 'hidden',
    // Premium soft drop shadow for interactive depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  topSection: {
    gap: 4,
  },
  badgeWrapper: {
    height: 24,
    justifyContent: 'center',
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
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
  countTag: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
