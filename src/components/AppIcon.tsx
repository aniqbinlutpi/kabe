import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  | 'check';

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
  // Render clean vector icon paths using React Native shapes & SVG compatible path structures
  switch (name) {
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
                backgroundColor: '#FFFFFF',
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
