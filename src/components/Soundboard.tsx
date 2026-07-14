import { useState, useRef } from 'react';
import { Volume2, Sparkles, Music, Activity, Play } from 'lucide-react';

interface SoundPreset {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  type: 'meow' | 'purr' | 'laser' | 'mumble';
}

const SOUNDS: SoundPreset[] = [
  {
    id: 'satisfied-purr',
    name: 'Bussin Purr',
    description: 'Deep, satisfying rumbling vibration of a happy cat eating fish.',
    emoji: '🐟',
    color: 'from-orange-500 to-amber-500',
    type: 'purr'
  },
  {
    id: 'ecstatic-meow',
    name: 'Ecstatic Meow',
    description: 'A cheerful, high-pitched double-tone chirp of pure joy.',
    emoji: '😸',
    color: 'from-pink-500 to-rose-500',
    type: 'meow'
  },
  {
    id: 'drip-laser',
    name: 'Drip Zap',
    description: 'A futuristic laser sweep representing peak swag and drip.',
    emoji: '😎',
    color: 'from-violet-600 to-indigo-600',
    type: 'laser'
  },
  {
    id: 'satisfied-hum',
    name: 'Yum Hum',
    description: 'A resonant, mouth-opening vocal-like sound signifying tasty vibes.',
    emoji: '🤤',
    color: 'from-emerald-500 to-teal-500',
    type: 'mumble'
  }
];

export default function Soundboard() {
  const [pitch, setPitch] = useState<number>(1.0);
  const [duration, setDuration] = useState<number>(0.6);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume context if suspended (browser security policy)
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (sound: SoundPreset) => {
    try {
      const ctx = getAudioContext();
      setIsPlaying(sound.id);

      const now = ctx.currentTime;
      const finalDur = duration * (sound.type === 'purr' ? 2 : 1);

      // Main Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + finalDur);
      masterGain.connect(ctx.destination);

      // Dynamic Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(8, now);
      filter.connect(masterGain);

      if (sound.type === 'meow') {
        // Meow sound: two oscillators with frequency modulation
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        const baseFreq = 220 * pitch;

        // "Me-ow" rising pitch sweep
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + finalDur * 0.4);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + finalDur);

        osc2.frequency.setValueAtTime(baseFreq * 1.01, now);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.22, now + finalDur * 0.4);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.51, now + finalDur);

        // Filter sweep to mimic mouth opening
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(1800, now + finalDur * 0.35);
        filter.frequency.exponentialRampToValueAtTime(300, now + finalDur);

        osc1.connect(filter);
        osc2.connect(filter);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + finalDur);
        osc2.stop(now + finalDur);

      } else if (sound.type === 'purr') {
        // Purr sound: Low frequency oscillator with rapid amplitude modulation
        const osc = ctx.createOscillator();
        const amOsc = ctx.createOscillator();
        const amGain = ctx.createGain();

        osc.type = 'triangle';
        amOsc.type = 'sine';

        const baseFreq = 65 * pitch;
        osc.frequency.setValueAtTime(baseFreq, now);
        // Slightly vibrate frequency
        osc.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + finalDur * 0.5);
        osc.frequency.linearRampToValueAtTime(baseFreq * 0.95, now + finalDur);

        // Amplitude modulator running at 25Hz (purr vibration rate)
        amOsc.frequency.setValueAtTime(25, now);
        amGain.gain.setValueAtTime(0.5, now);

        filter.frequency.setValueAtTime(150, now);

        amOsc.connect(amGain.gain);
        osc.connect(amGain);
        amGain.connect(filter);

        osc.start(now);
        amOsc.start(now);
        osc.stop(now + finalDur);
        amOsc.stop(now + finalDur);

      } else if (sound.type === 'laser') {
        // Laser sound: High frequency fast sweeping downwards
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';

        const startFreq = 2000 * pitch;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + finalDur);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + finalDur);

        osc.connect(filter);
        osc.start(now);
        osc.stop(now + finalDur);

      } else if (sound.type === 'mumble') {
        // Vocal-like satisfied hum: formant sweep
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';

        const baseFreq = 120 * pitch;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + finalDur * 0.5);
        osc.frequency.linearRampToValueAtTime(baseFreq * 0.95, now + finalDur);

        // Formant filter sweep
        filter.type = 'peaking';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + finalDur * 0.3);
        filter.frequency.exponentialRampToValueAtTime(450, now + finalDur);

        osc.connect(filter);
        osc.start(now);
        osc.stop(now + finalDur);
      }

      setTimeout(() => {
        setIsPlaying(null);
      }, finalDur * 1000);

    } catch (e) {
      console.error('Failed to play sound:', e);
      setIsPlaying(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100 shadow-md transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
              <Volume2 className="w-5 h-5" />
            </span>
            <h3 className="font-display font-bold text-xl text-zinc-900">Meme Soundboard</h3>
          </div>
          <p className="text-sm text-zinc-500 font-sans">
            Synthesize authentic meows and satisfied purrs using your browser's audio engine!
          </p>
        </div>

        {/* Synthesizer Controls */}
        <div className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
          {/* Pitch Slider */}
          <div className="flex flex-col gap-1 w-24">
            <label className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-wider flex justify-between">
              <span>Pitch</span>
              <span className="text-zinc-600 font-bold">{pitch.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-1 bg-zinc-200 rounded-lg"
            />
          </div>

          {/* Duration Slider */}
          <div className="flex flex-col gap-1 w-24">
            <label className="text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-wider flex justify-between">
              <span>Length</span>
              <span className="text-zinc-600 font-bold">{duration.toFixed(1)}s</span>
            </label>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-1 bg-zinc-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Grid of Sound Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {SOUNDS.map((sound) => {
          const isCurrentPlaying = isPlaying === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => playSound(sound)}
              className={`relative overflow-hidden group text-left p-4 rounded-2xl border transition-all duration-300 ${
                isCurrentPlaying
                  ? 'bg-orange-500 border-orange-500 text-white shadow-md scale-95 ring-4 ring-orange-100'
                  : 'bg-zinc-50 hover:bg-white border-zinc-100 hover:border-orange-200 text-zinc-800 shadow-sm hover:shadow hover:-translate-y-0.5'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-2xl filter drop-shadow-sm">{sound.emoji}</span>
                <span
                  className={`p-1.5 rounded-full transition-colors ${
                    isCurrentPlaying
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-zinc-400 group-hover:text-orange-500 shadow-sm border border-zinc-100'
                  }`}
                >
                  <Play className={`w-3 h-3 fill-current ${isCurrentPlaying ? 'animate-ping' : ''}`} />
                </span>
              </div>
              <h4 className={`font-display font-bold text-sm ${isCurrentPlaying ? 'text-white' : 'text-zinc-800'}`}>
                {sound.name}
              </h4>
              <p className={`text-[11px] leading-tight mt-1 font-sans ${isCurrentPlaying ? 'text-orange-100' : 'text-zinc-500'}`}>
                {sound.description}
              </p>

              {/* Decorative wave bar animation when playing */}
              {isCurrentPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 flex gap-0.5 px-3">
                  <span className="w-full bg-white h-full animate-pulse delay-75"></span>
                  <span className="w-full bg-white h-full animate-pulse delay-150"></span>
                  <span className="w-full bg-white h-full animate-pulse delay-300"></span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
