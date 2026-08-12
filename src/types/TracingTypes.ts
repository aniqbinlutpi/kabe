export type CategoryId = 'anime' | 'cartoon' | 'fruit' | 'animal' | 'others' | 'uploads';

export interface CategoryItem {
  id: CategoryId;
  title: string;
  subtitle: string;
  iconName: string;
  gradientColors: [string, string];
  badgeText?: string;
  customIcon?: string;
}

export interface TracingImage {
  id: string;
  title: string;
  categoryId: CategoryId;
  uri: string;
  isCustom?: boolean;
  aspectRatio?: number;
  addedAt?: number;
}

export type FilterMode = 'normal' | 'lineArt' | 'invert' | 'sepia';

export interface TracingStudioConfig {
  scale: number;
  rotation: number; // in degrees: 0, 90, 180, 270
  position: { x: number; y: number };
  brightness: number; // 0.2 to 1.8
  contrast: number; // 0.5 to 2.5
  opacity: number; // 0.2 to 1.0
  filterMode: FilterMode;
  flipHorizontal: boolean;
  flipVertical: boolean;
  isLocked: boolean;
}
