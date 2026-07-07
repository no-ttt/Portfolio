import { useEffect } from 'react';
import { PSparkle } from './PSparkle';
import { PTag } from './PTag';

export function CaseOverlay({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 800,
        background: 'rgba(22,18,16,0.6)',
        backdropFilter: 'blur(3px)',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(720px, 94vw)',
          background: 'var(--cream)',
          border: '3.5px solid var(--ink)',
          borderRadius: 26,
          overflow: 'hidden',
          boxShadow: 'var(--pop-8)',
          animation: 'pl-ov .3s var(--ease-pop)',
        }}
      >
        <div
          style={{
            position: 'relative',
            height: 260,
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
              backgroundImage: 'radial-gradient(var(--ink) 1.6px, transparent 1.7px)',
              backgroundSize: '18px 18px',
            }}
          />
          <PSparkle size={48} color="var(--gold)" twinkle />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'var(--cream)',
              border: '3px solid var(--ink)',
              boxShadow: 'var(--pop-3)',
              cursor: 'pointer',
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 30, fontFamily: 'var(--font-grotesk)', color: 'var(--ink)' }}>
          <div
            style={{
              fontFamily: 'var(--font-jp)',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              color: 'var(--red)',
              textTransform: 'uppercase',
            }}
          >
            {p.jp} · {p.year}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2.6rem',
              lineHeight: 1,
              textTransform: 'uppercase',
              margin: '6px 0 14px',
            }}
          >
            {p.title}
          </h2>
          <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '52ch', margin: '0 0 20px' }}>
            {p.blurb}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {p.tags.map((t) => (
              <PTag key={t} color="violet">{t}</PTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
