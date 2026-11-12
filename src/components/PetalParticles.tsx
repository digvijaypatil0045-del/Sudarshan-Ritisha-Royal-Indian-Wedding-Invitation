import React, { useMemo } from 'react';

interface PetalParticlesProps {
  enabled: boolean;
}

export const PetalParticles: React.FC<PetalParticlesProps> = ({ enabled }) => {
  const petals = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.25 + (i % 3) * 2.5) % 96}%`,
      animationDuration: `${9 + (i % 7) * 2}s`,
      animationDelay: `${(i * 0.7) % 8}s`,
      size: `${14 + (i % 5) * 4}px`,
      opacity: 0.25 + (i % 4) * 0.15,
      rotateStart: `${(i * 35) % 360}deg`,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: petal.left,
            top: '-5%',
            width: petal.size,
            height: petal.size,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            opacity: petal.opacity,
          }}
        >
          {/* Stylized Crimson & Gold Rose Petal SVG */}
          <svg viewBox="0 0 30 30" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <path
              d="M15 2C10 7 2 12 2 19C2 24.5 7.5 28 15 28C22.5 28 28 24.5 28 19C28 12 20 7 15 2Z"
              fill={petal.id % 2 === 0 ? '#9E1B32' : '#D4AF37'}
            />
            <path
              d="M15 5C12 9 6 14 6 19C6 22.5 10 25 15 25"
              stroke="#FFF"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
