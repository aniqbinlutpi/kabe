import { useWindowDimensions } from 'react-native';

export interface ResponsiveLayoutConfig {
  width: number;
  height: number;
  isTablet: boolean;
  isLandscape: boolean;
  columns: number;
  gap: number;
  paddingHorizontal: number;
  maxContainerWidth: number;
  cardHeight: number;
}

export function useResponsiveLayout(): ResponsiveLayoutConfig {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= 768 || (isLandscape && width >= 900);

  let columns = 2;
  if (width >= 1200) {
    columns = 4;
  } else if (width >= 768) {
    columns = 3;
  } else if (isLandscape) {
    columns = 3;
  } else {
    columns = 2;
  }

  const gap = isTablet ? 20 : 12;
  const paddingHorizontal = isTablet ? 28 : 16;
  const maxContainerWidth = 1100;
  const cardHeight = isTablet ? 190 : 170;

  return {
    width,
    height,
    isTablet,
    isLandscape,
    columns,
    gap,
    paddingHorizontal,
    maxContainerWidth,
    cardHeight,
  };
}
