type ReelProps = {
  angle: number;
  className: string;
  tone: 'left' | 'right';
};

export const Reel = ({angle, className, tone}: ReelProps) => {
  const warm = tone === 'left' ? '#ff6a2a' : '#ff3d2e';
  const copper = tone === 'left' ? '#9a4f2c' : '#82313a';

  return (
    <svg
      className={`cassette-reel ${className}`}
      viewBox="0 0 140 140"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`reel-core-${tone}`} cx="50%" cy="48%" r="56%">
          <stop offset="0%" stopColor="#f3b36f" stopOpacity="0.42" />
          <stop offset="46%" stopColor={copper} stopOpacity="0.58" />
          <stop offset="100%" stopColor="#120b0d" stopOpacity="0.96" />
        </radialGradient>
        <filter id={`reel-soft-shadow-${tone}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.36" />
        </filter>
      </defs>
      <circle
        cx="70"
        cy="70"
        r="61"
        fill={`url(#reel-core-${tone})`}
        opacity="0.72"
        filter={`url(#reel-soft-shadow-${tone})`}
      />
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: '70px 70px',
        }}
      >
        <circle cx="70" cy="70" r="50" fill="none" stroke="#ffc18a" strokeOpacity="0.18" strokeWidth="3" />
        {[0, 60, 120, 180, 240, 300].map((rotation) => (
          <rect
            key={rotation}
            x="66"
            y="22"
            width="8"
            height="34"
            rx="4"
            fill={warm}
            opacity="0.38"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '70px 70px',
            }}
          />
        ))}
        {[30, 150, 270].map((rotation) => (
          <ellipse
            key={rotation}
            cx="70"
            cy="37"
            rx="11"
            ry="17"
            fill="#fff0d0"
            opacity="0.12"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '70px 70px',
            }}
          />
        ))}
      </g>
      <circle cx="70" cy="70" r="17" fill="#0b090b" opacity="0.88" />
      <circle cx="70" cy="70" r="7" fill="#ffd0a1" opacity="0.34" />
    </svg>
  );
};
