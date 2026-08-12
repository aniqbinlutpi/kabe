import { CategoryItem, TracingImage } from '@/types/TracingTypes';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'anime',
    title: 'Anime & Chibi',
    subtitle: 'Karakter Anime & Line Art',
    iconName: 'sparkles',
    gradientColors: ['#18181B', '#27272A'],
  },
  {
    id: 'cartoon',
    title: 'Kartun',
    subtitle: 'Watak Animasi & Lukisan',
    iconName: 'happy-outline',
    gradientColors: ['#000000', '#18181B'],
  },
  {
    id: 'fruit',
    title: 'Buah-buahan',
    subtitle: 'Buah & Objek Alam',
    iconName: 'nutrition-outline',
    gradientColors: ['#27272A', '#3F3F46'],
  },
  {
    id: 'animal',
    title: 'Haiwan',
    subtitle: 'Kucing, Burung & Corak Comel',
    iconName: 'paw-outline',
    gradientColors: ['#18181B', '#27272A'],
  },
  {
    id: 'others',
    title: 'Lain-lain',
    subtitle: 'Kenderaan & Objek Fizikal',
    iconName: 'grid-outline',
    gradientColors: ['#3F3F46', '#52525B'],
  },
  {
    id: 'uploads',
    title: 'Muat Naik Saya',
    subtitle: 'Koleksi Gambar Sendiri',
    iconName: 'cloud-upload-outline',
    gradientColors: ['#09090B', '#18181B'],
    badgeText: 'Gambar Sendiri',
  },
];

export const PRESET_IMAGES: TracingImage[] = [
  // Anime & Chibi
  {
    id: 'anime-1',
    title: 'Gadis Anime Membaca',
    categoryId: 'anime',
    uri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'anime-2',
    title: 'Kucing Chibi Magic',
    categoryId: 'anime',
    uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'anime-3',
    title: 'Karakter Wira Chibi',
    categoryId: 'anime',
    uri: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },

  // Cartoon
  {
    id: 'cartoon-1',
    title: 'Beruang Comel',
    categoryId: 'cartoon',
    uri: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'cartoon-2',
    title: 'Dinosaur Kartun',
    categoryId: 'cartoon',
    uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'cartoon-3',
    title: 'Kelinci Comel',
    categoryId: 'cartoon',
    uri: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },

  // Buah-buahan
  {
    id: 'fruit-1',
    title: 'Epal Segar',
    categoryId: 'fruit',
    uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'fruit-2',
    title: 'Pisang & Oren',
    categoryId: 'fruit',
    uri: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'fruit-3',
    title: 'Stroberi Comel',
    categoryId: 'fruit',
    uri: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },

  // Haiwan
  {
    id: 'animal-1',
    title: 'Anak Kucing',
    categoryId: 'animal',
    uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'animal-2',
    title: 'Panda Comel',
    categoryId: 'animal',
    uri: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'animal-3',
    title: 'Burung Hantu',
    categoryId: 'animal',
    uri: 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },

  // Lain-lain
  {
    id: 'others-1',
    title: 'Kereta Mainan',
    categoryId: 'others',
    uri: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'others-2',
    title: 'Bunga Matahari',
    categoryId: 'others',
    uri: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
  {
    id: 'others-3',
    title: 'Kapal Angkasa',
    categoryId: 'others',
    uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    aspectRatio: 1.0,
  },
];
