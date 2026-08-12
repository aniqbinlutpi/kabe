import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FilterMode, TracingStudioConfig } from '@/types/TracingTypes';

interface TracingToolbarProps {
  config: TracingStudioConfig;
  onChangeConfig: (newConfig: Partial<TracingStudioConfig>) => void;
  isLocked: boolean;
}

export const TracingToolbar: React.FC<TracingToolbarProps> = ({
  config,
  onChangeConfig,
  isLocked,
}) => {
  if (isLocked) {
    return null; // Toolbar hidden when screen is locked for tracing
  }

  const filters: { id: FilterMode; label: string }[] = [
    { id: 'normal', label: 'Asal' },
    { id: 'lineArt', label: 'Garisan (Line Art)' },
    { id: 'invert', label: 'Invert B/W' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Zoom Controls */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Saiz (Zoom)</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => onChangeConfig({ scale: Math.max(0.3, config.scale - 0.2) })}
            >
              <Text style={styles.toolBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.valueText}>{Math.round(config.scale * 100)}%</Text>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => onChangeConfig({ scale: Math.min(5, config.scale + 0.2) })}
            >
              <Text style={styles.toolBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rotate & Flip */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Putar & Flip</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => onChangeConfig({ rotation: (config.rotation + 90) % 360 })}
            >
              <Text style={styles.toolBtnText}>↻ 90°</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toolBtn, config.flipHorizontal && styles.activeBtn]}
              onPress={() => onChangeConfig({ flipHorizontal: !config.flipHorizontal })}
            >
              <Text style={[styles.toolBtnText, config.flipHorizontal && styles.activeBtnText]}>↔ Flip</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brightness Controls */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Kecerahan Skrin</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => onChangeConfig({ brightness: Math.max(0.3, config.brightness - 0.2) })}
            >
              <Text style={styles.toolBtnText}>🌙</Text>
            </TouchableOpacity>
            <Text style={styles.valueText}>{Math.round(config.brightness * 100)}%</Text>
            <TouchableOpacity
              style={styles.toolBtn}
              onPress={() => onChangeConfig({ brightness: Math.min(2.0, config.brightness + 0.2) })}
            >
              <Text style={styles.toolBtnText}>☀️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Modes */}
        <View style={styles.sectionGroup}>
          <Text style={styles.groupLabel}>Mode Tekap (Filter)</Text>
          <View style={styles.buttonRow}>
            {filters.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[styles.chipBtn, config.filterMode === f.id && styles.activeChip]}
                onPress={() => onChangeConfig({ filterMode: f.id })}
              >
                <Text style={[styles.chipText, config.filterMode === f.id && styles.activeChipText]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    paddingVertical: 10,
    zIndex: 100,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 18,
    alignItems: 'center',
  },
  sectionGroup: {
    alignItems: 'center',
    gap: 4,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolBtn: {
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    minWidth: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#09090B',
  },
  activeBtn: {
    backgroundColor: '#09090B',
    borderColor: '#09090B',
  },
  activeBtnText: {
    color: '#FFFFFF',
  },
  valueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#09090B',
    minWidth: 40,
    textAlign: 'center',
  },
  chipBtn: {
    backgroundColor: '#F4F4F5',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525B',
  },
  activeChip: {
    backgroundColor: '#09090B',
    borderColor: '#09090B',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
