import { Platform } from 'react-native';

// Safe dynamic import for expo-haptics
let Haptics: any = null;
try {
  Haptics = require('expo-haptics');
} catch (e) {
  // Safe fallback
}

class SoundEffectsService {
  private soundEnabled: boolean = true;

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Playful tactile haptic feedback + pop sound for button taps 🎈
   */
  public playPop() {
    if (!this.soundEnabled) return;

    // 1. Tactile Haptic Vibration Feedback for iOS & Android peranti
    if (Platform.OS !== 'web' && Haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch (e) {}
    }

    // 2. Web Audio API for Web browser
    if (typeof window !== 'undefined') {
      try {
        const AudioCtxClass =
          (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          const ctx = new AudioCtxClass();
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.08);
        }
      } catch (e) {}
    }
  }

  public playSelect() {
    if (!this.soundEnabled) return;
    if (Platform.OS !== 'web' && Haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      } catch (e) {}
    }
    this.playPop();
  }

  public playClick() {
    if (!this.soundEnabled) return;
    this.playPop();
  }
}

export const SoundService = new SoundEffectsService();
