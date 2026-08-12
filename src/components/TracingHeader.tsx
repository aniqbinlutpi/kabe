import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '@/components/AppIcon';

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
        <AppIcon name="arrow-left" size={14} color="#09090B" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <AppIcon name="reset" size={12} color="#09090B" />
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lockButton} onPress={onToggleLock}>
          <AppIcon name="lock" size={12} color="#FFFFFF" />
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
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
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
    gap: 6,
    backgroundColor: '#09090B',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  lockText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
