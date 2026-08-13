import React, { useEffect } from 'react';
import { StyleSheet, View, useColorScheme, Platform, ActivityIndicator } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as SplashScreen from 'expo-splash-screen';
import { PRESET_IMAGES } from '../constants/PresetCategories';

interface AnimatedSplashScreenProps {
  onFinish: () => void;
  mode?: 'minimalist' | 'video';
}

const logoSource = require('../../assets/images/k-icon-nobg.png');
const videoSource = require('../../assets/videos/animation-k.mp4');

function VideoSplashView({ onFinish, animatedContainerStyle }: { onFinish: () => void; animatedContainerStyle: any }) {
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = false;
  });

  useEffect(() => {
    if (!player) return;
    try {
      player.play();

      const subscription = player.addListener('playToEnd', () => {
        onFinish();
      });

      const fallbackTimer = setTimeout(() => {
        onFinish();
      }, 6000);

      return () => {
        subscription.remove();
        clearTimeout(fallbackTimer);
      };
    } catch (e) {}
  }, [player]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: '#000000' }, animatedContainerStyle]}>
      <VideoView player={player} style={styles.video} nativeControls={false} contentFit="cover" />
    </Animated.View>
  );
}

export function AnimatedSplashScreen({ onFinish, mode = 'minimalist' }: AnimatedSplashScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Shared values for container & loading UI
  const containerOpacity = useSharedValue(1);
  const loadingOpacity = useSharedValue(0);

  // K Icon shared values
  const kScale = useSharedValue(0);
  const kRotate = useSharedValue(-20);

  // 'a', 'b', 'e' letter shared values
  const aY = useSharedValue(20);
  const aScale = useSharedValue(0);
  const aOpacity = useSharedValue(0);

  const bY = useSharedValue(20);
  const bScale = useSharedValue(0);
  const bOpacity = useSharedValue(0);

  const eY = useSharedValue(20);
  const eScale = useSharedValue(0);
  const eOpacity = useSharedValue(0);

  useEffect(() => {
    // Hide native splash screen immediately
    SplashScreen.hideAsync().catch(() => {});

    if (mode === 'minimalist') {
      let isMounted = true;

      // 1. K Icon animated pop & bounce entry
      kScale.value = withSpring(1, { damping: 10, stiffness: 180 });
      kRotate.value = withSpring(0, { damping: 8, stiffness: 150 });

      // 2. Letter 'a' jumping entry (at 250ms)
      aOpacity.value = withDelay(250, withTiming(1, { duration: 150 }));
      aScale.value = withDelay(250, withSpring(1, { damping: 9, stiffness: 200 }));
      aY.value = withDelay(
        250,
        withSequence(
          withTiming(-18, { duration: 180, easing: Easing.out(Easing.quad) }),
          withSpring(0, { damping: 8, stiffness: 180 })
        )
      );

      // 3. Letter 'b' jumping entry (at 400ms)
      bOpacity.value = withDelay(400, withTiming(1, { duration: 150 }));
      bScale.value = withDelay(400, withSpring(1, { damping: 9, stiffness: 200 }));
      bY.value = withDelay(
        400,
        withSequence(
          withTiming(-18, { duration: 180, easing: Easing.out(Easing.quad) }),
          withSpring(0, { damping: 8, stiffness: 180 })
        )
      );

      // 4. Letter 'e' jumping entry (at 550ms)
      eOpacity.value = withDelay(550, withTiming(1, { duration: 150 }));
      eScale.value = withDelay(550, withSpring(1, { damping: 9, stiffness: 200 }));
      eY.value = withDelay(
        550,
        withSequence(
          withTiming(-18, { duration: 180, easing: Easing.out(Easing.quad) }),
          withSpring(0, { damping: 8, stiffness: 180 })
        )
      );

      // 5. Logo animation completes & holds completely still.
      // Then fade in centered spinner at 950ms.
      loadingOpacity.value = withDelay(950, withTiming(1, { duration: 350 }));

      // 6. Preload preset images in background & take ample time before entering app
      const startPreloading = async () => {
        const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2200));
        const maxTimePromise = new Promise((resolve) => setTimeout(resolve, 6000));

        const preloadingPromises = PRESET_IMAGES.map((img) =>
          Image.prefetch(img.uri).catch(() => {})
        );

        // Wait for image preloading and minimum loading display time
        await Promise.race([
          Promise.all([Promise.allSettled(preloadingPromises), minTimePromise]),
          maxTimePromise,
        ]);

        if (isMounted) {
          // Fade out container smoothly and transition to main app
          containerOpacity.value = withTiming(
            0,
            {
              duration: 450,
              easing: Easing.inOut(Easing.quad),
            },
            (finished) => {
              if (finished) {
                runOnJS(onFinish)();
              }
            }
          );
        }
      };

      startPreloading();

      return () => {
        isMounted = false;
      };
    }
  }, [mode]);

  // Animated styles for elements
  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const animatedKStyle = useAnimatedStyle(() => ({
    transform: [{ scale: kScale.value }, { rotate: `${kRotate.value}deg` }],
  }));

  const animatedAStyle = useAnimatedStyle(() => ({
    opacity: aOpacity.value,
    transform: [{ translateY: aY.value }, { scale: aScale.value }],
  }));

  const animatedBStyle = useAnimatedStyle(() => ({
    opacity: bOpacity.value,
    transform: [{ translateY: bY.value }, { scale: bScale.value }],
  }));

  const animatedEStyle = useAnimatedStyle(() => ({
    opacity: eOpacity.value,
    transform: [{ translateY: eY.value }, { scale: eScale.value }],
  }));

  const animatedLoadingStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  const backgroundColor = isDark ? '#0A0A0A' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const accentColor = '#208AEF';

  if (mode === 'video') {
    return <VideoSplashView onFinish={onFinish} animatedContainerStyle={animatedContainerStyle} />;
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor }, animatedContainerStyle]}>
      <View style={styles.contentWrapper}>
        <View style={styles.logoRow}>
          {/* Animated 3D K Icon */}
          <Animated.View style={[styles.kIconWrapper, animatedKStyle]}>
            <Image source={logoSource} style={styles.kIconImage} contentFit="contain" />
          </Animated.View>

          {/* Playful Jumping letters: 'a', 'b', 'e' */}
          <View style={styles.textRow}>
            <Animated.Text style={[styles.letterText, { color: textColor }, animatedAStyle]}>
              a
            </Animated.Text>
            <Animated.Text style={[styles.letterText, { color: textColor }, animatedBStyle]}>
              b
            </Animated.Text>
            <Animated.Text style={[styles.letterText, { color: textColor }, animatedEStyle]}>
              e
            </Animated.Text>
          </View>
        </View>

        {/* Centered Loading Spinner Only (No text) */}
        <Animated.View style={[styles.loadingContainer, animatedLoadingStyle]}>
          <ActivityIndicator size="small" color={accentColor} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kIconWrapper: {
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -4,
  },
  kIconImage: {
    width: '100%',
    height: '100%',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 54,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Chalkboard SE',
      android: 'casual',
      web: '"Patrick Hand", "Chalkboard SE", "Comic Sans MS", cursive, sans-serif',
      default: 'cursive',
    }),
    includeFontPadding: false,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
