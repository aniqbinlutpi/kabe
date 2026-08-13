import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Image } from 'expo-image';

interface KabeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  textColor?: string;
  animated?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const logoSource = require('@/assets/images/k-icon-nobg.png');

export const KabeLogo: React.FC<KabeLogoProps> = ({
  size = 'md',
  textColor = '#000000',
  animated = true,
  onPress,
  style,
}) => {
  // Animation values
  const iconScale = useSharedValue(animated ? 0.3 : 1);
  const iconRotate = useSharedValue(animated ? -15 : 0);
  const iconY = useSharedValue(0);
  const textTranslateX = useSharedValue(animated ? -16 : 0);
  const textOpacity = useSharedValue(animated ? 0 : 1);
  const textScale = useSharedValue(1);

  useEffect(() => {
    if (animated) {
      // Icon entry spring
      iconScale.value = withSpring(1, { damping: 12, stiffness: 180 });
      iconRotate.value = withSpring(0, { damping: 10, stiffness: 150 });

      // Text slide & fade in with small delay
      textTranslateX.value = withDelay(
        120,
        withSpring(0, { damping: 14, stiffness: 140 })
      );
      textOpacity.value = withDelay(100, withTiming(1, { duration: 300 }));

      // Subtle periodic floating breathing animation on the icon
      iconY.value = withDelay(
        800,
        withRepeat(
          withSequence(
            withTiming(-3, { duration: 1200 }),
            withTiming(0, { duration: 1200 })
          ),
          -1,
          true
        )
      );
    }
  }, [animated]);

  const handlePress = () => {
    if (animated) {
      // Playful bounce & rotation on tap
      iconScale.value = withSequence(
        withSpring(1.2, { damping: 6, stiffness: 250 }),
        withSpring(1, { damping: 10, stiffness: 180 })
      );
      iconRotate.value = withSequence(
        withTiming(-12, { duration: 80 }),
        withTiming(12, { duration: 120 }),
        withSpring(0, { damping: 8, stiffness: 200 })
      );
      textScale.value = withSequence(
        withSpring(1.15, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 160 })
      );
    }

    if (onPress) {
      onPress();
    }
  };

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${iconRotate.value}deg` },
      { translateY: iconY.value },
    ],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      { translateX: textTranslateX.value },
      { scale: textScale.value },
    ],
  }));

  // Dimensions based on size prop
  const iconDimensions = {
    sm: { width: 34, height: 34 },
    md: { width: 44, height: 44 },
    lg: { width: 58, height: 58 },
  }[size];

  const fontSizes = {
    sm: { fontSize: 20, marginLeft: -3 },
    md: { fontSize: 26, marginLeft: -5 },
    lg: { fontSize: 34, marginLeft: -7 },
  }[size];

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, style]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Kabe Logo"
    >
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Image
          source={logoSource}
          style={[
            styles.iconImage,
            {
              width: iconDimensions.width,
              height: iconDimensions.height,
            },
          ]}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.textWrapper,
          animatedTextStyle,
          { marginLeft: fontSizes.marginLeft },
        ]}
      >
        <Text style={[styles.textAbe, { color: textColor, fontSize: fontSizes.fontSize }]}>
          abe
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  iconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  iconImage: {
    backgroundColor: 'transparent',
  },
  textWrapper: {
    justifyContent: 'center',
  },
  textAbe: {
    fontFamily: Platform.select({
      ios: 'Chalkboard SE',
      android: 'casual',
      web: '"Patrick Hand", "Chalkboard SE", "Comic Sans MS", cursive, sans-serif',
      default: 'cursive',
    }),
    fontWeight: '600',
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
});
