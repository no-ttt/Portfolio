export function PSparkle({ size = 28, color = 'var(--cream)', twinkle = false, style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        lineHeight: 0,
        animation: twinkle ? 'pl-tw 2.6s ease-in-out infinite' : 'none',
        flexShrink: 0,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <path
          d="M50 2C50 27 51 49 98 50C51 51 50 73 50 98C50 73 49 51 2 50C49 49 50 27 50 2Z"
          fill={color}
          stroke="var(--ink)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
