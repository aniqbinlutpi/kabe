export type Language = 'bm' | 'en';
export type ThemeMode = 'light' | 'dark';

export interface TranslationSchema {
  // Hero / Welcome
  appTag: string;
  heroTitle: string;
  heroSub: string;
  uploadButton: string;

  // Categories
  categoryTitle: string;
  categorySub: string;
  myUploadsTitle: string;
  myUploadsSub: string;
  myUploadsBadge: string;
  imageCountUnit: string;

  // Gallery
  backToCategories: string;
  imagesAvailable: string;
  noImagesTitle: string;
  noImagesSub: string;
  uploadNow: string;

  // Tracing Studio
  back: string;
  reset: string;
  lockScreen: string;
  screenLocked: string;
  placePaperHint: string;
  holdToUnlock: string;
  sizeZoom: string;
  rotateAndFlip: string;
  screenBrightness: string;
  tracingMode: string;
  filterOriginal: string;
  filterLineArt: string;
  filterInvert: string;
  rotateStep: string;
  flip: string;

  // Upload Modal
  uploadModalTitle: string;
  uploadModalSub: string;
  drawingTitleLabel: string;
  drawingTitlePlaceholder: string;
  deviceGalleryTab: string;
  imageUrlTab: string;
  openGalleryBtn: string;
  enterUrlLabel: string;
  imageSelectedTag: string;
  changeImageBtn: string;
  cancel: string;
  saveAndTrace: string;
  alertSelectImage: string;

  // Settings
  settingsTitle: string;
  languageSection: string;
  themeSection: string;
  themeLight: string;
  themeDark: string;
  close: string;
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  bm: {
    appTag: 'KETAH KABE TRACING',
    heroTitle: 'Welcome to Ketah Kabe',
    heroSub: 'Aplikasi tekap lukisan mudah. Pilih gambar, letak kertas di atas skrin telefon/iPad & mula melukis.',
    uploadButton: 'Upload',

    categoryTitle: 'Kategori Lukisan',
    categorySub: 'Pilih kategori untuk melihat senarai gambar tekap',
    myUploadsTitle: 'Muat Naik Saya',
    myUploadsSub: 'Koleksi Gambar Sendiri',
    myUploadsBadge: 'Gambar Sendiri',
    imageCountUnit: 'gambar',

    backToCategories: 'Kategori',
    imagesAvailable: 'gambar tersedia',
    noImagesTitle: 'Tiada Gambar Dalam Kategori Ini',
    noImagesSub: 'Muat naik gambar pertama anda untuk mula menekap & melukis.',
    uploadNow: 'Muat Naik Gambar Sekarang',

    back: 'Kembali',
    reset: 'Reset',
    lockScreen: 'Kunci Skrin',
    screenLocked: 'Skrin Dikunci',
    placePaperHint: 'Letak kertas & mula tekap lukisan!',
    holdToUnlock: 'Tekan Lama Untuk Buka',
    sizeZoom: 'Saiz (Zoom)',
    rotateAndFlip: 'Putar & Flip',
    screenBrightness: 'Kecerahan Skrin',
    tracingMode: 'Mode Tekap (Filter)',
    filterOriginal: 'Asal',
    filterLineArt: 'Garisan (Line Art)',
    filterInvert: 'Invert B/W',
    rotateStep: '90°',
    flip: 'Flip',

    uploadModalTitle: 'Muat Naik Gambar Baru',
    uploadModalSub: 'Pilih gambar dari galeri peranti untuk dijadikan corak tekap lukisan.',
    drawingTitleLabel: 'TAJUK LUKISAN',
    drawingTitlePlaceholder: 'Contoh: Lukisan Kucing Saya',
    deviceGalleryTab: 'Galeri Peranti',
    imageUrlTab: 'URL Gambar',
    openGalleryBtn: 'Buka Galeri Gambar',
    enterUrlLabel: 'URL GAMBAR DIRECT (HTTPS://...)',
    imageSelectedTag: 'Gambar Dipilih Dari Galeri',
    changeImageBtn: 'Tukar Gambar',
    cancel: 'Batal',
    saveAndTrace: 'Simpan',
    alertSelectImage: 'Sila pilih gambar dari galeri peranti!',

    settingsTitle: 'Tetapan Aplikasi',
    languageSection: 'PILIHAN BAHASA (LANGUAGE)',
    themeSection: 'TEMA PAPARAN (THEME)',
    themeLight: 'Cerah (Light)',
    themeDark: 'Gelap (Dark)',
    close: 'Tutup',
  },
  en: {
    appTag: 'KETAH KABE TRACING',
    heroTitle: 'Welcome to Ketah Kabe',
    heroSub: 'Easy drawing & paper tracing app. Pick an image, place physical paper over your phone/iPad screen & trace away.',
    uploadButton: 'Upload',

    categoryTitle: 'Drawing Categories',
    categorySub: 'Select a category to explore artwork for tracing',
    myUploadsTitle: 'My Uploads',
    myUploadsSub: 'Personal Image Collection',
    myUploadsBadge: 'Custom Uploads',
    imageCountUnit: 'images',

    backToCategories: 'Categories',
    imagesAvailable: 'images available',
    noImagesTitle: 'No Images in This Category',
    noImagesSub: 'Upload your first image to start paper tracing and drawing.',
    uploadNow: 'Upload Image Now',

    back: 'Back',
    reset: 'Reset',
    lockScreen: 'Lock Screen',
    screenLocked: 'Screen Locked',
    placePaperHint: 'Place paper on screen & start tracing!',
    holdToUnlock: 'Hold to Unlock',
    sizeZoom: 'Size (Zoom)',
    rotateAndFlip: 'Rotate & Flip',
    screenBrightness: 'Screen Brightness',
    tracingMode: 'Tracing Mode (Filter)',
    filterOriginal: 'Original',
    filterLineArt: 'Line Art',
    filterInvert: 'Invert B/W',
    rotateStep: '90°',
    flip: 'Flip',

    uploadModalTitle: 'Upload New Image',
    uploadModalSub: 'Pick an image from your device gallery to use as a tracing template.',
    drawingTitleLabel: 'DRAWING TITLE',
    drawingTitlePlaceholder: 'E.g., My Cute Cat Drawing',
    deviceGalleryTab: 'Device Gallery',
    imageUrlTab: 'Image URL',
    openGalleryBtn: 'Open Image Gallery',
    enterUrlLabel: 'DIRECT IMAGE URL (HTTPS://...)',
    imageSelectedTag: 'Image Selected from Gallery',
    changeImageBtn: 'Change Image',
    cancel: 'Cancel',
    saveAndTrace: 'Save',
    alertSelectImage: 'Please pick an image from device gallery!',

    settingsTitle: 'App Settings',
    languageSection: 'SELECT LANGUAGE',
    themeSection: 'COLOR THEME',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    close: 'Close',
  },
};

export const COLOR_THEMES = {
  light: {
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardBorder: '#E4E4E7',
    textPrimary: '#09090B',
    textSecondary: '#71717A',
    buttonBackground: '#F4F4F5',
    buttonBorder: '#E4E4E7',
    buttonText: '#09090B',
    darkButtonBackground: '#09090B',
    darkButtonText: '#FFFFFF',
    heroCardBackground: '#09090B',
    heroCardText: '#FFFFFF',
  },
  dark: {
    background: '#09090B',
    cardBackground: '#18181B',
    cardBorder: '#27272A',
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    buttonBackground: '#27272A',
    buttonBorder: '#3F3F46',
    buttonText: '#FFFFFF',
    darkButtonBackground: '#FFFFFF',
    darkButtonText: '#09090B',
    heroCardBackground: '#18181B',
    heroCardText: '#FFFFFF',
  },
};
