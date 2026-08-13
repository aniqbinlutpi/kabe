import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, ThemeMode } from '@/constants/Translations';
import { TracingImage } from '@/types/TracingTypes';

const UPLOADED_IMAGES_KEY = '@ketah_kabe_custom_images_v1';
const LANGUAGE_KEY = '@ketah_kabe_language_v1';
const THEME_KEY = '@ketah_kabe_theme_v1';

// In-memory fallback if AsyncStorage native module is null or fails
const memoryStorage: Record<string, string> = {};

async function getItemSafe(key: string): Promise<string | null> {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val !== null) return val;
  } catch (e) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (err) {}
  }
  return memoryStorage[key] || null;
}

async function setItemSafe(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
    return;
  } catch (e) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (err) {}
  }
  memoryStorage[key] = value;
}

export async function convertUriToBase64(uri: string): Promise<string> {
  if (!uri) return uri;
  if (uri.startsWith('data:')) return uri;

  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(uri);
        }
      };
      reader.onerror = () => resolve(uri);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Failed to convert URI to Base64:', e);
    return uri;
  }
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
    const persistentUri = await convertUriToBase64(image.uri);
    const newImage: TracingImage = {
      ...image,
      uri: persistentUri,
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
};
