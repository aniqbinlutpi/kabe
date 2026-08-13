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

  // Tracing Wizard
  wizardGuideBtn: string;
  wizardTitle: string;
  wizardStepCount: string;
  wizardStep1Title: string;
  wizardStep1Desc: string;
  wizardStep1BtnMax: string;
  wizardStep2Title: string;
  wizardStep2Desc: string;
  wizardStep3Title: string;
  wizardStep3Desc: string;
  wizardStep4Title: string;
  wizardStep4Desc: string;
  wizardLockAndStart: string;
  wizardNext: string;
  wizardPrev: string;
  wizardSkip: string;
  wizardDontShowAgain: string;
  wizardPencilTip: string;
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

    wizardGuideBtn: 'Panduan',
    wizardTitle: 'Panduan Tekap Lukisan',
    wizardStepCount: 'LANGKAH',
    wizardStep1Title: '1. Terangkan Kecerahan Skrin',
    wizardStep1Desc: 'Tingkatkan kecerahan skrin peranti anda ke tahap maksimum (100%) supaya garisan lukisan jelas menembusi kertas.',
    wizardStep1BtnMax: 'Set 100% Kecerahan',
    wizardStep2Title: '2. Selaraskan Lukisan Anda',
    wizardStep2Desc: 'Gunakan 2 jari untuk zoom, rotate 360°, atau seret gambar mengikut saiz kertas lukisan anda.',
    wizardStep3Title: '3. Letak Kertas Atas Skrin',
    wizardStep3Desc: 'Letakkan kertas lukisan / A4 nipis di atas skrin peranti. Gunakan pensel lembut (HB / 2B) supaya skrin tidak tercalar.',
    wizardStep4Title: '4. Kunci Skrin & Mula Tekap',
    wizardStep4Desc: 'Kunci skrin supaya sentuhan kertas tidak menggerakkan gambar. Tekan & tahan 2 saat pada butang kunci untuk buka semula.',
    wizardLockAndStart: 'Kunci Skrin & Mula Tekap',
    wizardNext: 'Seterusnya',
    wizardPrev: 'Kembali',
    wizardSkip: 'Lompat',
    wizardDontShowAgain: 'Jangan tunjuk panduan ini lagi',
    wizardPencilTip: '✏️ Pensel Lembut 2B / HB',
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

    wizardGuideBtn: 'Guide',
    wizardTitle: 'Paper Tracing Setup Guide',
    wizardStepCount: 'STEP',
    wizardStep1Title: '1. Maximize Screen Brightness',
    wizardStep1Desc: 'Set screen brightness to 100% so the lines shine clearly through paper.',
    wizardStep1BtnMax: 'Set 100% Brightness',
    wizardStep2Title: '2. Adjust & Position Artwork',
    wizardStep2Desc: 'Pinch with 2 fingers to zoom, rotate 360°, or drag the artwork to align with your paper.',
    wizardStep3Title: '3. Place Paper On Screen',
    wizardStep3Desc: 'Place tracing paper or thin A4 paper over the screen. Use a soft pencil (HB / 2B) to protect the display.',
    wizardStep4Title: '4. Lock Screen & Start Tracing',
    wizardStep4Desc: 'Lock touch controls so physical paper touches won’t move the image. Press & hold for 2s to unlock anytime.',
    wizardLockAndStart: 'Lock Screen & Start Tracing',
    wizardNext: 'Next',
    wizardPrev: 'Back',
    wizardSkip: 'Skip',
    wizardDontShowAgain: "Don't auto-show this guide again",
    wizardPencilTip: '✏️ Soft Pencil 2B / HB',
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
