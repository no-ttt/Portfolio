import { PTag } from './PTag';
import { MosaicBand } from './MosaicBand';


const INFO = [
  ['Email', 'dear890329@gmail.com'],
  ['Based in', 'Taipei · Taiwan'],
  ['Response', 'Within 1–2 days'],
];

export function ContactSection() {
  return (
    <>
      <MosaicBand
        cols={14} rows={5}
        headline="Let's make something loud"
        kicker="お仕事募集中 · OPEN FOR WORK"
      />

      <section id="contact" style={{
        padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) clamp(56px,7vw,96px)',
        background: 'var(--cream-dim)',
        borderTop: '3.5px solid var(--ink)',
      }}>
        <div className="pl-container">
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
              聯絡我 · CONTACT
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 14px' }}>
              Start a project
            </h2>
            <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-body)', margin: 0, maxWidth: '52ch' }}>
              Tell me a little about what you're building — I'll get back within a couple of days.
            </p>
          </div>

          <div style={{ background: 'var(--white)', border: '3.5px solid var(--ink)', borderRadius: 22, boxShadow: 'var(--pop-6)', padding: 26, maxWidth: 400 }}>
            <div style={{ display: 'grid', gap: 18 }}>
              {INFO.map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)' }}>{k}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--ink)', marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, paddingTop: 20, borderTop: '2.5px solid var(--ink)', flexWrap: 'wrap' }}>
              <PTag color="violet">Instagram: no329_</PTag>
              <a href="https://www.linkedin.com/in/%E8%8B%A5%E5%BA%AD-%E6%88%B4-12965524a/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <PTag color="violet" clickable>LinkedIn ↗</PTag>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
