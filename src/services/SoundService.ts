import { createAudioPlayer, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import { Platform } from 'react-native';

const popSoundAsset = require('../../assets/sounds/pop.wav');

let Haptics: any = null;
try {
  Haptics = require('expo-haptics');
} catch (e) {}

class SoundEffectsService {
  private soundEnabled: boolean = true;
  private player: any = null;

  constructor() {
    this.initAudio();
  }

  private async initAudio() {
    if (Platform.OS === 'web') return;

    try {
      await setIsAudioActiveAsync(true);
      await setAudioModeAsync({
        playsInSilentMode: true,
      });

      this.player = createAudioPlayer(popSoundAsset);
      if (this.player) {
        this.player.volume = 1.0;
      }
    } catch (e) {
      // Ignore background initialization errors
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public async playPop() {
    if (!this.soundEnabled) return;

    // 1. Ensure audio session is active on native mobile
    if (Platform.OS !== 'web') {
      try {
        await setIsAudioActiveAsync(true).catch(() => {});
      } catch (e) {}
    }

    // 2. Tactile Haptic Vibration Feedback for real physical devices
    if (Platform.OS !== 'web' && Haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      } catch (e) {}
    }

    // 3. Native expo-audio playback on iOS & Android
    if (Platform.OS !== 'web') {
      if (this.player) {
        try {
          this.player.volume = 1.0;
          if (typeof this.player.seekTo === 'function') {
            await this.player.seekTo(0);
          }
          this.player.play();
          return;
        } catch (e) {
          // Fallback if player reference needed refresh
        }
      }

      try {
        const p = createAudioPlayer(popSoundAsset);
        p.volume = 1.0;
        p.play();
        return;
      } catch (err) {
        // Ignore fallback errors
      }
    }

    // 4. Web Audio API for Web Browsers
    if (typeof window !== 'undefined') {
      try {
        const AudioCtxClass =
          (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          const ctx = new AudioCtxClass();
          if (ctx.state === 'suspended') {
            await ctx.resume().catch(() => {});
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
    this.playPop();
  }

  public playClick() {
    if (!this.soundEnabled) return;
    this.playPop();
  }
}

export const SoundService = new SoundEffectsService();
