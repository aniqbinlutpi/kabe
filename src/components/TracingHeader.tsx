import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TracingHeaderProps {
  title: string;
  isLocked: boolean;
  onBack: () => void;
  onToggleLock: () => void;
  onReset: () => void;
}

export const TracingHeader: React.FC<TracingHeaderProps> = ({
  title,
  isLocked,
  onBack,
  onToggleLock,
  onReset,
}) => {
  if (isLocked) {
    return null; // Header hidden when screen is locked for paper tracing
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onBack}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetText}>↻ Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lockButton} onPress={onToggleLock}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.lockText}>Kunci Skrin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 8,
    zIndex: 100,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  backArrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#09090B',
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#09090B',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#09090B',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resetButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  resetText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#09090B',
  },
  lockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#09090B',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  lockIcon: {
    fontSize: 12,
  },
  lockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
