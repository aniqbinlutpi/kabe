import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

export type IconName =
  | 'lock'
  | 'unlock'
  | 'arrow-left'
  | 'reset'
  | 'plus'
  | 'sun'
  | 'moon'
  | 'image'
  | 'trash'
  | 'close'
  | 'flip'
  | 'link'
  | 'folder'
  | 'check'
  | 'settings'
  | 'globe'
  | 'github';

interface AppIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 18,
  color = '#09090B',
}) => {
  switch (name) {
    case 'github': {
      const svgDataUri = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <Image
            source={{ uri: svgDataUri }}
            style={{ width: size, height: size }}
            contentFit="contain"
          />
        </View>
      );
    }
    case 'settings':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.7,
              height: size * 0.7,
              borderRadius: (size * 0.7) / 2,
              borderWidth: 2,
              borderColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: size * 0.25,
                height: size * 0.25,
                borderRadius: (size * 0.25) / 2,
                backgroundColor: color,
              }}
            />
          </View>
        </View>
      );

    case 'globe':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: (size * 0.8) / 2,
              borderWidth: 1.8,
              borderColor: color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: size * 0.35,
                height: size * 0.78,
                borderRadius: (size * 0.35) / 2,
                borderWidth: 1.4,
                borderColor: color,
              }}
            />
            <View
              style={{
                width: size * 0.78,
                height: 1.4,
                backgroundColor: color,
                position: 'absolute',
              }}
            />
          </View>
        </View>
      );

    case 'lock':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.7,
              height: size * 0.5,
              backgroundColor: color,
              borderRadius: 3,
              position: 'absolute',
              bottom: 0,
            }}
          />
          <View
            style={{
              width: size * 0.44,
              height: size * 0.45,
              borderColor: color,
              borderWidth: 2,
              borderBottomWidth: 0,
              borderTopLeftRadius: size * 0.22,
              borderTopRightRadius: size * 0.22,
              position: 'absolute',
              top: 0,
            }}
          />
        </View>
      );

    case 'unlock':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.7,
              height: size * 0.5,
              backgroundColor: color,
              borderRadius: 3,
              position: 'absolute',
              bottom: 0,
            }}
          />
          <View
            style={{
              width: size * 0.44,
              height: size * 0.45,
              borderColor: color,
              borderWidth: 2,
              borderBottomWidth: 0,
              borderTopLeftRadius: size * 0.22,
              borderTopRightRadius: size * 0.22,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </View>
      );

    case 'arrow-left':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.6,
              height: 2,
              backgroundColor: color,
            }}
          />
          <View
            style={{
              width: size * 0.35,
              height: size * 0.35,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              borderColor: color,
              position: 'absolute',
              left: 2,
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      );

    case 'plus':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.75,
              height: 2,
              backgroundColor: color,
              position: 'absolute',
            }}
          />
          <View
            style={{
              width: 2,
              height: size * 0.75,
              backgroundColor: color,
              position: 'absolute',
            }}
          />
        </View>
      );

    case 'reset':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.75,
              height: size * 0.75,
              borderRadius: (size * 0.75) / 2,
              borderWidth: 2,
              borderColor: color,
              borderTopColor: 'transparent',
            }}
          />
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 4,
              borderRightWidth: 4,
              borderBottomWidth: 6,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
              position: 'absolute',
              top: 1,
              right: 1,
              transform: [{ rotate: '45deg' }],
            }}
          />
        </View>
      );

    case 'sun':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.45,
              height: size * 0.45,
              borderRadius: (size * 0.45) / 2,
              backgroundColor: color,
            }}
          />
        </View>
      );

    case 'moon':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.65,
              height: size * 0.65,
              borderRadius: (size * 0.65) / 2,
              backgroundColor: color,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: size * 0.5,
                height: size * 0.5,
                borderRadius: (size * 0.5) / 2,
                backgroundColor: color === '#FFFFFF' ? '#09090B' : '#FFFFFF',
                position: 'absolute',
                top: -2,
                right: -2,
              }}
            />
          </View>
        </View>
      );

    case 'image':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.85,
              height: size * 0.7,
              borderWidth: 1.8,
              borderColor: color,
              borderRadius: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: size * 0.22,
                height: size * 0.22,
                borderRadius: (size * 0.22) / 2,
                backgroundColor: color,
                position: 'absolute',
                top: 2,
                left: 3,
              }}
            />
          </View>
        </View>
      );

    case 'trash':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.6,
              height: size * 0.6,
              borderWidth: 1.8,
              borderColor: color,
              borderTopWidth: 0,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
              position: 'absolute',
              bottom: 1,
            }}
          />
          <View
            style={{
              width: size * 0.75,
              height: 2,
              backgroundColor: color,
              position: 'absolute',
              top: 3,
            }}
          />
        </View>
      );

    case 'close':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.75,
              height: 2,
              backgroundColor: color,
              position: 'absolute',
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              width: size * 0.75,
              height: 2,
              backgroundColor: color,
              position: 'absolute',
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'flip':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: size * 0.3,
              borderBottomWidth: size * 0.45,
              borderLeftColor: 'transparent',
              borderBottomColor: color,
              position: 'absolute',
              left: 2,
            }}
          />
          <View
            style={{
              width: 0,
              height: 0,
              borderRightWidth: size * 0.3,
              borderBottomWidth: size * 0.45,
              borderRightColor: 'transparent',
              borderBottomColor: color,
              opacity: 0.4,
              position: 'absolute',
              right: 2,
            }}
          />
        </View>
      );

    case 'folder':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.8,
              height: size * 0.6,
              borderWidth: 1.8,
              borderColor: color,
              borderRadius: 3,
              position: 'absolute',
              bottom: 1,
            }}
          />
          <View
            style={{
              width: size * 0.4,
              height: size * 0.2,
              backgroundColor: color,
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              position: 'absolute',
              top: 2,
              left: 2,
            }}
          />
        </View>
      );

    case 'link':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.5,
              height: size * 0.35,
              borderRadius: 4,
              borderWidth: 1.8,
              borderColor: color,
              position: 'absolute',
              top: 2,
              left: 2,
            }}
          />
          <View
            style={{
              width: size * 0.5,
              height: size * 0.35,
              borderRadius: 4,
              borderWidth: 1.8,
              borderColor: color,
              position: 'absolute',
              bottom: 2,
              right: 2,
            }}
          />
        </View>
      );

    case 'check':
      return (
        <View style={[styles.box, { width: size, height: size }]}>
          <View
            style={{
              width: size * 0.3,
              height: size * 0.55,
              borderRightWidth: 2.2,
              borderBottomWidth: 2.2,
              borderColor: color,
              transform: [{ rotate: '45deg' }],
              marginTop: -2,
            }}
          />
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
