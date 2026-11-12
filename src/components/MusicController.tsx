import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { weddingAudio } from '../utils/audioEngine';
import { Language } from '../types/wedding';

interface MusicControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  lang: Language;
}

export const MusicController: React.FC<MusicControllerProps> = ({ isPlaying, onTogglePlay, lang }) => {
  const [volume, setVolume] = useState(0.55);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [freqBars, setFreqBars] = useState<number[]>([12, 24, 18, 30, 16]);

  // Real-time or simulated frequency visualizer animation
  useEffect(() => {
    if (!isPlaying) {
      setFreqBars([4, 4, 4, 4, 4]);
      return;
    }

    const interval = setInterval(() => {
      const data = weddingAudio.getByteFrequencyData();
      if (data && data.length > 0) {
        const sampled = [
          Math.max(6, Math.floor((data[2] / 255) * 32)),
          Math.max(6, Math.floor((data[4] / 255) * 32)),
          Math.max(6, Math.floor((data[6] / 255) * 32)),
          Math.max(6, Math.floor((data[8] / 255) * 32)),
          Math.max(6, Math.floor((data[10] / 255) * 32)),
        ];
        setFreqBars(sampled);
      } else {
        // Fallback rhythmic bounce
        setFreqBars([
          8 + Math.floor(Math.random() * 20),
          12 + Math.floor(Math.random() * 18),
          6 + Math.floor(Math.random() * 24),
          14 + Math.floor(Math.random() * 16),
          10 + Math.floor(Math.random() * 22),
        ]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    weddingAudio.setMasterVolume(val);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Floating Player Island */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1A0307]/90 border border-[#D4AF37]/60 shadow-[0_8px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.25)] backdrop-blur-md">
        {/* Animated Soundwave Visualizer Bars */}
        <div className="flex items-center gap-[3px] h-6 px-1" title={isPlaying ? 'Music playing' : 'Music paused'}>
          {freqBars.map((height, idx) => (
            <span
              key={idx}
              className={`w-[3px] rounded-full transition-all duration-150 ${
                isPlaying
                  ? 'bg-gradient-to-t from-[#AA7C11] via-[#D4AF37] to-[#F3E5AB]'
                  : 'bg-[#554030]'
              }`}
              style={{ height: `${height}px` }}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F3E5AB] to-[#D4AF37] text-[#140306] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-[#140306]" /> : <Play className="w-3.5 h-3.5 fill-[#140306] ml-0.5" />}
        </button>

        {/* Track Label */}
        <div className="hidden sm:flex flex-col text-left pl-1 pr-2 max-w-[140px]">
          <span className="text-[10px] font-royal-title font-bold text-[#F3E5AB] truncate">
            {lang === 'en' ? 'Wedding Music' : 'मंगल संगीत'}
          </span>
          <span className="text-[9px] text-[#A89886] truncate">
            {lang === 'en' ? 'Traditional Sangeet' : 'पारंपरिक सनई-संगीत'}
          </span>
        </div>

        {/* Volume Toggle / Slider */}
        <div className="relative flex items-center">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="p-1.5 rounded-full text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
            title="Volume"
          >
            {volume === 0 || !isPlaying ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {showVolumeSlider && (
            <div className="absolute bottom-11 right-0 p-2.5 rounded-xl bg-[#1A0307] border border-[#D4AF37]/50 shadow-xl flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-[#D4AF37] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
