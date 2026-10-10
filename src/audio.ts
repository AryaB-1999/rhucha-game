let ctx: AudioContext | null = null;
let tensionOsc: OscillatorNode | null = null;
let tensionGain: GainNode | null = null;

export const initAudio = () => {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
};

const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1, slideTo?: number) => {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + duration);
  }
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

const getTensionMod = (stageIndex: number) => {
  return Math.max(0, Math.min(1, stageIndex / 9));
};

export const playHover = (stageIndex: number = 0) => {
  const t = getTensionMod(stageIndex);
  const freq = 600 - (t * 400); // gets lower and scarier
  const type: OscillatorType = t > 0.5 ? 'sawtooth' : 'sine';
  playTone(freq, type, 0.1, 0.03 + (t * 0.02));
};

export const playClick = (stageIndex: number = 0) => {
  const t = getTensionMod(stageIndex);
  const freq = 800 - (t * 500); 
  const type: OscillatorType = t > 0.6 ? 'square' : 'triangle';
  playTone(freq, type, 0.15, 0.05 + (t * 0.05), freq / 2);
};

export const playType = (stageIndex: number = 0) => {
  const t = getTensionMod(stageIndex);
  const freq = 1200 - (t * 800);
  playTone(freq, t > 0.5 ? 'sawtooth' : 'sine', 0.05, 0.02);
};

export const playWin = (stageIndex: number = 0) => {
  const t = getTensionMod(stageIndex);
  if (t < 0.6) {
    // Cheerful
    playTone(440, 'sine', 0.4, 0.1);
    setTimeout(() => playTone(554, 'sine', 0.4, 0.1), 100);
    setTimeout(() => playTone(659, 'sine', 0.6, 0.1), 200);
  } else {
    // Tense but victorious
    playTone(300, 'sawtooth', 0.6, 0.1, 400);
    setTimeout(() => playTone(350, 'square', 0.6, 0.1, 500), 150);
  }
};

export const playLose = (stageIndex: number = 0) => {
  const t = getTensionMod(stageIndex);
  if (t < 0.5) {
    // Goofy sad drop
    playTone(300, 'triangle', 0.6, 0.1, 100);
  } else {
    // Scary bass drop
    playTone(150, 'sawtooth', 1.0, 0.2, 40);
    setTimeout(() => playTone(140, 'square', 1.0, 0.2, 30), 50);
  }
};

export const updateTensionBackground = (stageIndex: number) => {
  if (!ctx) return;
  const t = getTensionMod(stageIndex);
  
  if (t < 0.4) {
    if (tensionOsc) {
      tensionOsc.stop();
      tensionOsc = null;
    }
    return;
  }

  if (!tensionOsc) {
    tensionOsc = ctx.createOscillator();
    tensionGain = ctx.createGain();
    tensionOsc.connect(tensionGain);
    tensionGain.connect(ctx.destination);
    tensionOsc.start();
  }

  tensionOsc.type = 'sawtooth';
  tensionOsc.frequency.setValueAtTime(40 + (t * 15), ctx.currentTime);
  // Volume slowly increases with stages
  tensionGain!.gain.linearRampToValueAtTime(0.005 + (t * 0.02), ctx.currentTime + 2);
};

export const stopAudio = () => {
  if (tensionOsc) {
    tensionOsc.stop();
    tensionOsc = null;
  }
};
