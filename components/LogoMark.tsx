interface Props { size?: number; }

export default function LogoMark({ size = 38 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18.5" fill="#081e2c" stroke="#e06830" strokeWidth="1.2" />
      {/* Scan lines */}
      <line x1="3" y1="15" x2="37" y2="15" stroke="#e06830" strokeWidth="0.5" strokeOpacity="0.22" />
      <line x1="3" y1="20" x2="37" y2="20" stroke="#e06830" strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="3" y1="25" x2="37" y2="25" stroke="#e06830" strokeWidth="0.5" strokeOpacity="0.22" />
      {/* Bone ends */}
      <rect x="11" y="10" width="18" height="7.5" rx="3.75" fill="#e06830" />
      <rect x="11" y="22.5" width="18" height="7.5" rx="3.75" fill="white" fillOpacity="0.88" />
      {/* Crosshairs */}
      <line x1="20" y1="1.5" x2="20" y2="5.5" stroke="#e06830" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="34.5" x2="20" y2="38.5" stroke="#e06830" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="20" x2="5.5" y2="20" stroke="#e06830" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34.5" y1="20" x2="38.5" y2="20" stroke="#e06830" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
