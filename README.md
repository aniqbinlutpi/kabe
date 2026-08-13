# Ketah Kabe ✏️ - Tracing & Coloring App for Kids (Mobile & iPad)

**Ketah Kabe** is a responsive React Native (Expo) application for children to learn drawing and tracing. Kids can place a physical sheet of paper over their smartphone or iPad/Tablet screen and easily trace drawing patterns with interactive audio-visual feedback!

---

## 🚀 Key Features

- 📱 **Phone & iPad/Tablet Responsive**: Grid layout automatically adjusts based on screen orientation & device size.
- 🔒 **Touch Lock Overlay**: Locks screen interaction so physical paper can be placed on top without shifting the canvas or triggering unwanted taps.
- 🔊 **Sound & Audio Effects**: Fun sound feedback for button interactions and touch lock toggles (powered by `expo-audio`).
- 🎨 **Preset Drawing Categories**: Curated drawing collections including *Anime*, *Cartoons*, *Fruits*, *Animals*, and *Others*.
- 🖼️ **Custom Image Upload**: Import custom tracing templates from device gallery or direct image URL.
- ☀️ **Lightbox Mode & Line-Art Filters**: Brightness control, zoom, rotation, and high-contrast line-art modes to clearly project drawings through paper.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Package manager: **Bun** (recommended), **npm**, **pnpm**, or **Yarn**
- [Expo Go](https://expo.dev/go) app installed on your physical mobile device (for local development testing)
- [EAS CLI](https://docs.expo.dev/eas/) for creating production/preview builds (`npm install -g eas-cli`)

---

## 🛠️ Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/kabe.git
cd kabe

# Install dependencies (Choose your package manager)
bun install
# or
npm install
```

### 2. Run Development Server

```bash
# Start Expo development server
bun start
# or npm start / npx expo start

# Run directly on specific platform:
bun run android   # Open on Android Emulator / Connected device
bun run ios       # Open on iOS Simulator (macOS only)
bun run web       # Open in Web Browser
```

Scan the QR code printed in the terminal using the **Expo Go** app (Android) or **Camera** app (iOS).

---

## 📦 Building the App (Production & APK/IPA)

This project is configured with Expo Application Services (EAS Build) via [`eas.json`](file:///Users/mechanize/Documents/Project/kabe/eas.json).

### 1. Log in to Expo / EAS
```bash
npx eas login
```

### 2. Configure EAS Project (First time only)
```bash
npx eas project:init
```

---

### 🤖 Android Builds

#### A. Build APK for Android Testing / Direct Installation
To generate a standalone `.apk` file that can be directly installed on Android devices:

```bash
# Cloud build via EAS
npx eas build -p android --profile preview

# Or local build (requires Android Studio & Android SDK setup)
npx eas build -p android --profile preview --local
```

#### B. Build Android App Bundle (AAB for Google Play Store)
```bash
npx eas build -p android --profile production
```

---

### 🍎 iOS Builds

#### A. Build iOS Simulator App
```bash
npx eas build -p ios --profile preview
```

#### B. Build IPA for TestFlight / App Store
```bash
npx eas build -p ios --profile production
```

---

### 🌐 Web Build (Static Export)

To export the web version as static files:

```bash
npx expo export -p web
```
The generated web assets will be located in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## ⚡ Useful NPM / Bun Scripts

| Command | Description |
| :--- | :--- |
| `bun start` | Starts the Expo Metro bundler |
| `bun run android` | Launches app on Android device / emulator |
| `bun run ios` | Launches app on iOS simulator |
| `bun run web` | Launches app in browser |
| `bun run typecheck` | Runs TypeScript type checking without emitting files |
| `bun run lint` | Runs Expo linting checks |

---

## 📁 Project Architecture

```text
src/
├── app/                  # Expo Router entry points (_layout.tsx, index.tsx)
├── components/           # UI components
│   ├── CategoryCard.tsx
│   ├── ImageGridCard.tsx
│   ├── TracingHeader.tsx
│   ├── TracingToolbar.tsx
│   ├── TouchLockOverlay.tsx
│   └── UploadImageModal.tsx
├── views/                # Screen views
│   ├── CategorySelectionScreen.tsx
│   ├── ImageGalleryScreen.tsx
│   └── TracingStudioScreen.tsx
├── hooks/
│   └── useResponsiveLayout.ts
├── services/
│   ├── StorageService.ts  # Async Storage helper
│   └── SoundService.ts    # Audio feedback service (expo-audio)
├── constants/
│   └── PresetCategories.ts
└── types/
    └── TracingTypes.ts
```

---

## 📄 License

This project is licensed under the [MIT License](file:///Users/mechanize/Documents/Project/kabe/LICENSE).
