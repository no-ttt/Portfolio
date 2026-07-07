import { useRef, useState, useEffect } from 'react';

export function MosaicBand({
  cols = 14,
  rows = 5,
  headline = 'Available for freelance',
  kicker = 'お仕事募集中',
  color = 'var(--gold)',
  bg = 'var(--ink)',
}) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = raf || requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const prog = (vh - r.top) / (vh + r.height);
        setP(Math.max(0, Math.min(1, prog)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const diag = (c + r) / (cols + rows - 2);
      const local = Math.max(0, Math.min(1, (p - diag * 0.55) / 0.32));
      tiles.push(
        <div key={`${r}-${c}`} style={{ perspective: 320 }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRight: '1.5px solid rgba(255,245,230,0.12)',
              borderBottom: '1.5px solid rgba(255,245,230,0.12)',
              background: color,
              transform: `rotateY(${(1 - local) * 88}deg) scale(${0.72 + local * 0.28})`,
              transformOrigin: 'left center',
              opacity: 0.5 + local * 0.5,
              transition: 'transform 90ms linear, opacity 90ms linear',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      );
    }
  }

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: bg,
        borderBlock: 'var(--bw-bold) solid var(--ink)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          padding: 24,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-jp)',
              fontWeight: 800,
              fontSize: 'clamp(.8rem,1.6vw,1rem)',
              letterSpacing: '0.24em',
              color: 'var(--gold)',
              marginBottom: 14,
            }}
          >
            {kicker}
          </div>
          <h2
            className="pl-sticker-text"
            style={{ margin: 0, fontSize: 'clamp(2rem,6vw,5rem)', maxWidth: '14ch' }}
          >
            {headline}
          </h2>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          pointerEvents: 'none',
        }}
      >
        {tiles}
      </div>
    </section>
  );
}
