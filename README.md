# Ketah Kabe ✏️ - Tracing & Coloring App for Kids (Mobile & iPad)

**Ketah Kabe** is a responsive application for children to learn drawing and tracing. Kids can place a physical sheet of paper over their smartphone or iPad/Tablet screen and easily trace drawing patterns!

---

## 🚀 Key Features

- 📱 **Phone & iPad/Tablet Responsive**: Grid layout automatically adjusts based on device screen size (2 columns for phones, 3-4 columns for iPads).
- 🔒 **Touch Lock Overlay**: Touch controls are locked so the screen doesn't shift or exit while physical paper is placed on top of the screen and kids are drawing.
- 🎨 **Various Drawing Categories**: Preset categories such as *Anime*, *Cartoons*, *Fruits*, *Animals*, and *Others*.
- 🖼️ **Upload Custom Images**: Support for uploading images from the device gallery or via direct URL.
- ☀️ **Lightbox Mode & Line-Art Filters**: Brightness control, zoom, rotation, and high-contrast line-art modes to trace drawings through paper clearly.

---

## 🛠️ Installation & Setup

This project supports various package managers: **Bun**, **npm**, **pnpm**, or **Yarn**.

### 1. Install Dependencies

You can use your preferred package manager:

```bash
# Using Bun
bun install

# Using npm
npm install

# Using pnpm
pnpm install

# Using Yarn
yarn install
```

### 2. Start Project (Expo Dev Server)

```bash
# Using Bun
bun start
# or bun run web / bun run ios / bun run android

# Using npm
npm start
# or npx expo start

# Using pnpm
pnpm start

# Using Yarn
yarn start
```

---

## 📁 File Architecture

Project files are logically organized without using `index` filenames for components/services:

```text
src/
├── app/                  # Expo Router entry points (_layout.tsx, index.tsx)
├── components/           # Specific UI components
│   ├── CategoryCard.tsx
│   ├── ImageGridCard.tsx
│   ├── TracingHeader.tsx
│   ├── TracingToolbar.tsx
│   ├── TouchLockOverlay.tsx
│   └── UploadImageModal.tsx
├── views/                # Main screen views
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
