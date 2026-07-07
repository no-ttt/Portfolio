import { PSparkle } from './PSparkle';
import { PTag } from './PTag';

const SERVICES = [
  { label: 'Branding', jp: 'ブランディング', color: 'gold' },
  { label: 'Web Design', jp: 'ウェブデザイン', color: 'violet' },
  { label: '3D & Motion', jp: '3D・モーション', color: 'red' },
  { label: 'Packaging', jp: 'パッケージング', color: 'lettuce' },
  { label: 'Campaigns', jp: 'キャンペーン', color: 'gold' },
  { label: 'Naming', jp: 'ネーミング', color: 'cream' },
];

export function StudioSection() {
  return (
    <section
      id="studio"
      style={{
        background: 'var(--cream-dim)',
        borderTop: '3.5px solid var(--ink)',
        padding: 'clamp(48px,6vw,88px) clamp(16px,4vw,48px)',
      }}
    >
      <div className="pl-container">
        <div
          className="studio-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-jp)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                color: 'var(--red)',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              スタジオについて · ABOUT THE STUDIO
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2rem,5vw,3.4rem)',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                margin: '0 0 20px',
                color: 'var(--ink)',
              }}
            >
              Cosmic creativity, no fillers
            </h2>
            <p
              style={{
                fontWeight: 500,
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--ink-soft)',
                maxWidth: '48ch',
                margin: '0 0 28px',
              }}
            >
              PLANETOÑO is a one-person creative studio blasting brands into orbit. From naming and
              strategy to 3D renders and interactive web — every project is made loud, fast and
              unmistakably yours.
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <PSparkle size={20} color="var(--violet)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Currently open · 2 slots available
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-jp)',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              サービス · Services
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {SERVICES.map((s) => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <PTag color={s.color}>{s.label}</PTag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
