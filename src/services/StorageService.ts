import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import { Language, ThemeMode } from '@/constants/Translations';
import { TracingImage } from '@/types/TracingTypes';

const UPLOADED_IMAGES_KEY = 'ketah_kabe_custom_images_v4';
const LANGUAGE_KEY = 'ketah_kabe_language_v4';
const THEME_KEY = 'ketah_kabe_theme_v4';
const HAS_SEEN_WIZARD_KEY = 'ketah_kabe_wizard_seen_v1';

const memoryStorage: Record<string, string> = {};

async function getItemSafe(key: string): Promise<string | null> {
  // 1. Try reading from permanent disk FileSystem on native mobile
  if (Platform.OS !== 'web' && File && Paths) {
    try {
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      const file = new File(Paths.document, `${sanitizedKey}.json`);
      if (file.exists) {
        return await file.text();
      }
    } catch (e) {}
  }

  // 2. Web localStorage fallback
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (err) {}

  return memoryStorage[key] || null;
}

async function setItemSafe(key: string, value: string): Promise<void> {
  // 1. Try writing to permanent disk FileSystem on native mobile
  if (Platform.OS !== 'web' && File && Paths) {
    try {
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      const file = new File(Paths.document, `${sanitizedKey}.json`);
      await file.write(value);
      return;
    } catch (e) {}
  }

  // 2. Web localStorage fallback
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch (err) {}

  memoryStorage[key] = value;
}

export const StorageService = {
  async getCustomImages(): Promise<TracingImage[]> {
    try {
      const jsonValue = await getItemSafe(UPLOADED_IMAGES_KEY);
      if (jsonValue != null) {
        const parsed: TracingImage[] = JSON.parse(jsonValue);
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load custom images:', e);
    }
    return [];
  },

  async saveCustomImage(image: Omit<TracingImage, 'id' | 'addedAt' | 'categoryId' | 'isCustom'>): Promise<TracingImage> {
    const newImage: TracingImage = {
      ...image,
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      categoryId: 'uploads',
      isCustom: true,
      addedAt: Date.now(),
    };

    try {
      const existing = await this.getCustomImages();
      const updated = [newImage, ...existing];
      await setItemSafe(UPLOADED_IMAGES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save custom image:', e);
    }

    return newImage;
  },

  async deleteCustomImage(id: string): Promise<boolean> {
    try {
      const existing = await this.getCustomImages();
      const updated = existing.filter((item) => item.id !== id);
      await setItemSafe(UPLOADED_IMAGES_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.warn('Failed to delete custom image:', e);
      return false;
    }
  },

  async getLanguage(): Promise<Language> {
    try {
      const val = await getItemSafe(LANGUAGE_KEY);
      return val === 'en' ? 'en' : 'bm';
    } catch (e) {
      return 'bm';
    }
  },

  async saveLanguage(lang: Language): Promise<void> {
    try {
      await setItemSafe(LANGUAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language:', e);
    }
  },

  async getThemeMode(): Promise<ThemeMode> {
    try {
      const val = await getItemSafe(THEME_KEY);
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },

  async saveThemeMode(theme: ThemeMode): Promise<void> {
    try {
      await setItemSafe(THEME_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme mode:', e);
    }
  },

  async getHasSeenWizard(): Promise<boolean> {
    try {
      const val = await getItemSafe(HAS_SEEN_WIZARD_KEY);
      return val === 'true';
    } catch (e) {
      return false;
    }
  },

  async saveHasSeenWizard(seen: boolean): Promise<void> {
    try {
      await setItemSafe(HAS_SEEN_WIZARD_KEY, seen ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save wizard seen state:', e);
    }
  },
};
