/**
 * Indian Wedding Background Music Engine
 * Plays the user's selected wedding audio track: Shubh_Vivah_457e76f0.m4a
 * Provides seamless play/pause, volume control, and an audio frequency analyser
 * for the visualizer across modern desktop and mobile browsers.
 */

const AUDIO_SRC = '/assets/aistudio/Shubh_Vivah_457e76f0.m4a';

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private volume = 0.65;
  private isAudioPlaying = false;
  private isInitialized = false;

  constructor() {
    // Lazy initialization on first user interaction to comply with mobile autoplay policies
  }

  private init() {
    if (this.isInitialized && this.audio) return;

    try {
      this.audio = new Audio(AUDIO_SRC);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = this.volume;

      // Event listeners to sync state accurately
      this.audio.addEventListener('play', () => {
        this.isAudioPlaying = true;
      });

      this.audio.addEventListener('pause', () => {
        this.isAudioPlaying = false;
      });

      this.audio.addEventListener('ended', () => {
        this.isAudioPlaying = false;
      });

      // Initialize Web Audio API Analyser for visualizer
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        try {
          // Connect HTML5 Audio to Analyser Node
          this.sourceNode = this.audioCtx.createMediaElementSource(this.audio);
          this.sourceNode.connect(this.analyser);
          this.analyser.connect(this.audioCtx.destination);
        } catch {
          // If media element source cannot be routed through AudioContext on strict platforms,
          // the native audio element still plays directly via speakers without disruption.
        }
      }

      this.isInitialized = true;
    } catch (e) {
      console.warn('Audio initialization notice:', e);
    }
  }

  public async play(): Promise<boolean> {
    this.init();

    if (!this.audio) return false;

    try {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      await this.audio.play();
      this.isAudioPlaying = true;
      return true;
    } catch {
      // Autoplay might require another user touch/click gesture
      this.isAudioPlaying = false;
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isAudioPlaying = false;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying()) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setMasterVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isPlaying(): boolean {
    if (!this.audio) return false;
    return !this.audio.paused && !this.audio.ended && this.audio.currentTime > 0;
  }

  public getByteFrequencyData(): Uint8Array | null {
    if (!this.analyser || !this.isPlaying()) return null;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  // Soft celebratory chime for interactive triggers (scratch card & guest wishes)
  public playTempleChime() {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = this.audioCtx || new AudioCtxClass();
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const chimeFreqs = [1174.66, 1760.0, 2349.32]; // D6, A6, D7

      chimeFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.035 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.9);
      });
    } catch {
      // ignore
    }
  }

  public playSacredConch() {
    // Main audio provides the complete celebratory Indian wedding music experience
  }
}

export const weddingAudio = new WeddingAudioPlayer();
