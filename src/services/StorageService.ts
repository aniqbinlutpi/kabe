import { Language, ThemeMode } from '@/constants/Translations';
import { TracingImage } from '@/types/TracingTypes';

const UPLOADED_IMAGES_KEY = '@ketah_kabe_custom_images_v1';
const LANGUAGE_KEY = '@ketah_kabe_language_v1';
const THEME_KEY = '@ketah_kabe_theme_v1';

// In-memory fallback if localStorage is unavailable
let memoryStorage: Record<string, string> = {};

function getItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    // fallback
  }
  return memoryStorage[key] || null;
}

function setItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch (e) {
    // fallback
  }
  memoryStorage[key] = value;
}

export const StorageService = {
  async getCustomImages(): Promise<TracingImage[]> {
    try {
      const jsonValue = getItem(UPLOADED_IMAGES_KEY);
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
      setItem(UPLOADED_IMAGES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save custom image:', e);
    }

    return newImage;
  },

  async deleteCustomImage(id: string): Promise<boolean> {
    try {
      const existing = await this.getCustomImages();
      const updated = existing.filter((item) => item.id !== id);
      setItem(UPLOADED_IMAGES_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.warn('Failed to delete custom image:', e);
      return false;
    }
  },

  async getLanguage(): Promise<Language> {
    const val = getItem(LANGUAGE_KEY);
    return val === 'en' ? 'en' : 'bm';
  },

  async saveLanguage(lang: Language): Promise<void> {
    setItem(LANGUAGE_KEY, lang);
  },

  async getThemeMode(): Promise<ThemeMode> {
    const val = getItem(THEME_KEY);
    return val === 'dark' ? 'dark' : 'light';
  },

  async saveThemeMode(theme: ThemeMode): Promise<void> {
    setItem(THEME_KEY, theme);
  },
};
