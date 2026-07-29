// Ambient Audio Synthesizer Engine with Frequency Visualizer Data
class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: any = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 32;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft romantic chords progression: Fmaj7 -> Cmaj7 -> Am7 -> G
  private chords = [
    [349.23, 440.00, 523.25, 659.25], // Fmaj7
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [196.00, 246.94, 293.66, 392.00]  // G
  ];

  private currentChordIndex = 0;

  private playChord() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    chord.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm low pass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start(now);
      osc.stop(now + 4.0);
    });
  }

  public toggle(): boolean {
    this.initCtx();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initCtx();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playChord();
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        this.playChord();
      }
    }, 3800);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getVisualizerData(): number[] {
    if (!this.isPlaying || !this.analyser || !this.dataArray) {
      return [10, 15, 8, 20, 12, 6];
    }
    this.analyser.getByteFrequencyData(this.dataArray);
    const result: number[] = [];
    const step = Math.floor(this.dataArray.length / 6);
    for (let i = 0; i < 6; i++) {
      const val = this.dataArray[i * step] || 20;
      result.push(Math.max(15, Math.min(100, Math.floor((val / 255) * 100))));
    }
    return result;
  }

  public getActiveState(): boolean {
    return this.isPlaying;
  }
}

export const ambientEngine = new AmbientAudioEngine();
