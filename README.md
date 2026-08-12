# Ketah Kabe ✏️ - Aplikasi Tekap & Mewarna Budak (Mobile & iPad)

**Ketah Kabe** adalah aplikasi responsif untuk kanak-kanak belajar melukis & menekap lukisan. Kanak-kanak boleh meletakkan kertas fizikal di atas skrin telefon pintar atau iPad/Tablet dan tekap corak lukisan dengan mudah!

---

## 🚀 Ciri-Ciri Utama (Key Features)

- 📱 **Responsif Telefon & iPad/Tablet**: Susunan grid melaras secara automatik mengikut saiz skrin peranti (2 kolum telefon, 3-4 kolum iPad).
- 🔒 **Kunci Skrin Tekap (Touch Lock Screen Overlay)**: Kawalan sentuhan dikunci supaya skrin tidak bergerak atau terkeluar semasa kertas fizikal diletakkan di atas skrin dan anak-anak melukis.
- 🎨 **Pelbagai Kategori Lukisan**: Kategori sedia ada seperti *Anime*, *Kartun*, *Buah-buahan*, *Haiwan*, dan *Lain-lain*.
- 🖼️ **Muat Naik Gambar Sendiri**: Sokongan upload gambar dari galeri peranti atau pautan URL.
- ☀️ **Mode Lightbox & Penapis Line-Art**: Kawalan kecerahan, zoom, putaran, dan mod garisan kontras tinggi untuk tekap lukisan menerusi kertas dengan lebih jelas.

---

## 🛠️ Pemasangan & Arahan (Run with any Package Manager)

Projek ini menyokong pelbagai pengurus pakej (Package Manager): **Bun**, **npm**, **pnpm**, atau **Yarn**.

### 1. Install Dependencies

Boleh guna pengurus pakej pilihan anda:

```bash
# Menggunakan Bun
bun install

# Menggunakan npm
npm install

# Menggunakan pnpm
pnpm install

# Menggunakan Yarn
yarn install
```

### 2. Start Project (Expo Dev Server)

```bash
# Menggunakan Bun
bun start
# atau bun run web / bun run ios / bun run android

# Menggunakan npm
npm start
# atau npx expo start

# Menggunakan pnpm
pnpm start

# Menggunakan Yarn
yarn start
```

---

## 📁 Struktur Fail (File Architecture)

Fail projek diatur secara berstruktur tanpa menggunakan nama fail `index` pada komponen/servis:

```text
src/
├── app/                  # Route entry point Expo Router (_layout.tsx, index.tsx)
├── components/           # Komponen UI spesifik
│   ├── CategoryCard.tsx
│   ├── ImageGridCard.tsx
│   ├── TracingHeader.tsx
│   ├── TracingToolbar.tsx
│   ├── TouchLockOverlay.tsx
│   └── UploadImageModal.tsx
├── views/                # Paparan skrin utama
│   ├── CategorySelectionScreen.tsx
│   ├── ImageGalleryScreen.tsx
│   └── TracingStudioScreen.tsx
├── hooks/
│   └── useResponsiveLayout.ts
├── services/
│   └── StorageService.ts
├── constants/
│   └── PresetCategories.ts
└── types/
    └── TracingTypes.ts
```
