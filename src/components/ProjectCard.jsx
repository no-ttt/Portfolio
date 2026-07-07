import { PSparkle } from './PSparkle';
import { PTag } from './PTag';

export function ProjectCard({ p, onOpen }) {
  return (
    <button
      type="button"
      className="pl-pressable"
      onClick={() => onOpen(p)}
      style={{
        textAlign: 'left',
        padding: 0,
        background: 'var(--white)',
        border: '3.5px solid var(--ink)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--pop-6)',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 220,
          background: p.bg,
          borderBottom: '3.5px solid var(--ink)',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.16,
            backgroundImage: 'radial-gradient(var(--ink) 1.5px, transparent 1.6px)',
            backgroundSize: '16px 16px',
          }}
        />
        <PSparkle size={36} color="var(--gold)" twinkle />
        <span style={{ position: 'absolute', top: 14, left: 14 }}>
          <PTag color="cream">{p.year}</PTag>
        </span>
      </div>

      <div style={{ padding: 22, fontFamily: 'var(--font-grotesk)', color: 'var(--ink)' }}>
        <div
          style={{
            fontFamily: 'var(--font-jp)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            color: 'var(--red)',
            textTransform: 'uppercase',
          }}
        >
          {p.jp}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.6rem',
            lineHeight: 1,
            textTransform: 'uppercase',
            margin: '6px 0 10px',
          }}
        >
          {p.title}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        </div>
      </div>
    </button>
  );
}
