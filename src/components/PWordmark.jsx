import { PSparkle } from './PSparkle';

export function PWordmark({ size = 30, fill = 'var(--white)' }) {
  const strokeW = Math.max(2, size * 0.06);
  const shadow  = Math.max(2, size * 0.09);
  return (
    <span style={{ display: 'inline-grid', justifyItems: 'center', lineHeight: 1 }}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: size,
          color: fill,
          WebkitTextStroke: `${strokeW}px var(--ink)`,
          paintOrder: 'stroke fill',
          textShadow: `0 ${shadow}px 0 var(--ink)`,
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          position: 'relative',
        }}
      >
        I 'm Tina!
        <span style={{ position: 'absolute', top: '-0.3em', right: '-0.3em' }}>
          <PSparkle size={size * 0.28} color="var(--gold)" />
        </span>
      </span>
    </span>
  );
}
