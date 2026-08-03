// Web Audio API Ambient Sound Synthesizer for Emotional Regulation
// 100% Client-side synthetic sound generation - Zero external dependencies or network assets

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentNodes: Array<AudioNode | { stop: () => void }> = [];
  private isPlaying = false;
  private currentMode: 'none' | 'binaural' | 'rain' | 'ocean' | 'bowl' = 'none';
  private volume = 0.4;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public stop() {
    if (this.ctx && this.masterGain) {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.2);
      setTimeout(() => {
        this.clearNodes();
        this.isPlaying = false;
        this.currentMode = 'none';
      }, 250);
    } else {
      this.clearNodes();
      this.isPlaying = false;
      this.currentMode = 'none';
    }
  }

  private clearNodes() {
    this.currentNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          node.disconnect();
        }
      } catch {
        // node already stopped
      }
    });
    this.currentNodes = [];
  }

  public playMode(mode: 'binaural' | 'rain' | 'ocean' | 'bowl') {
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying && this.currentMode === mode) {
      this.stop();
      return;
    }

    this.stop();
    setTimeout(() => {
      if (!this.ctx || !this.masterGain) return;
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.currentMode = mode;
      this.isPlaying = true;

      switch (mode) {
        case 'binaural':
          this.startBinaural();
          break;
        case 'rain':
          this.startRain();
          break;
        case 'ocean':
          this.startOcean();
          break;
        case 'bowl':
          this.startSingingBowl();
          break;
      }
    }, 300);
  }

  private startBinaural() {
    if (!this.ctx || !this.masterGain) return;
    // 210Hz left, 216Hz right => 6Hz Theta frequency (deep calm / meditation)
    const baseFreq = 200;
    const beatFreq = 6;

    const oscL = this.ctx.createOscillator();
    const oscR = this.ctx.createOscillator();

    oscL.type = 'sine';
    oscR.type = 'sine';
    oscL.frequency.value = baseFreq;
    oscR.frequency.value = baseFreq + beatFreq;

    const merger = this.ctx.createChannelMerger(2);
    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0.3;

    oscL.connect(merger, 0, 0); // Left channel
    oscR.connect(merger, 0, 1); // Right channel

    merger.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscL.start();
    oscR.start();

    this.currentNodes.push(oscL, oscR, gainNode, merger);
  }

  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    // Generate pink noise for soft rainfall
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft raindrops hitting leaves
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const rainGain = this.ctx.createGain();
    rainGain.gain.value = 0.35;

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.currentNodes.push(whiteNoise, filter, rainGain);
  }

  private startOcean() {
    if (!this.ctx || !this.masterGain) return;
    // Modulated pink noise to simulate sea waves breathing
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    // LFO for wave swelling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.1; // 1 wave every 10 seconds
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 300;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const oceanGain = this.ctx.createGain();
    oceanGain.gain.value = 0.4;

    noise.connect(filter);
    filter.connect(oceanGain);
    oceanGain.connect(this.masterGain);

    noise.start();
    lfo.start();
    this.currentNodes.push(noise, lfo, filter, lfoGain, oceanGain);
  }

  private startSingingBowl() {
    if (!this.ctx || !this.masterGain) return;
    // Harmonic resonant sine waves creating a soothing singing bowl vibration
    const freqs = [216, 432, 648];
    const gains = [0.3, 0.15, 0.05];

    const masterBowlGain = this.ctx.createGain();
    masterBowlGain.gain.value = 0.4;

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const g = this.ctx.createGain();
      g.gain.value = gains[idx];

      // Subtle warm vibrato LFO
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.2 + idx * 0.05;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(g);
      g.connect(masterBowlGain);
      osc.start();

      this.currentNodes.push(osc, lfo, g, lfoGain);
    });

    masterBowlGain.connect(this.masterGain);
    this.currentNodes.push(masterBowlGain);
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentMode: this.currentMode,
      volume: this.volume
    };
  }
}

export const soundEngine = new SoundEngine();
