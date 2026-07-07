import { PSparkle } from './PSparkle';

export function Marquee({ items, bg = 'var(--ink)', fg = 'var(--gold)' }) {
  const row = [...items, ...items];
  return (
    <div
      style={{
        background: bg,
        borderBlock: '3.5px solid var(--ink)',
        overflow: 'hidden',
        padding: '14px 0',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: 40,
          whiteSpace: 'nowrap',
          animation: 'pl-marq 22s linear infinite',
        }}
      >
        {row.map((t, k) => (
          <span
            key={k}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 40,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.5rem',
              textTransform: 'uppercase',
              color: fg,
            }}
          >
            {t}
            <PSparkle size={18} color={fg} />
          </span>
        ))}
      </div>
    </div>
  );
}
