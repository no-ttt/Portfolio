import { PSparkle } from './PSparkle';
import { PTag } from './PTag';
import { MosaicBand } from './MosaicBand';

const FACTS = [['3+', '年業界經驗'], ['10+', '完成專案'], ['15+', '技術工具']];

const FOCUS = [
  ['🖥️', '前端開發', 'HTML / CSS / JavaScript · React · Vue · Tailwind · Bootstrap'],
  ['🔧', '後端開發', 'Node.js / Express · Python · ASP .Net Core · RESTful API'],
  ['🗄️', '資料庫與工具', 'MSSQL · Git · Figma · GTM · GA'],
  ['🗺️', '地圖與爬蟲', 'Google Map · Mapbox · Leaflet · Selenium · BeautifulSoup'],
];

const Stars = ({ n }) => (
  <span style={{ display: 'inline-flex', gap: 3 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i<=n ? 'var(--gold)' : 'rgba(22,18,16,0.15)', fontSize: '0.95rem', lineHeight: 1 }}>✦</span>
    ))}
  </span>
);

const TREE = [
  ['🖥️', '前端開發',      [['HTML / CSS', 5], ['JavaScript', 5], ['React & NextJS', 4], ['Vue', 4], ['Tailwind / Bootstrap', 4]]],
  ['🔧', '後端開發',      [['Node.js / Express', 5], ['Python', 4], ['ASP .Net Core', 3], ['RESTful API', 5]]],
  ['🗄️', '資料庫與工具', [['MSSQL', 5], ['MYSQL', 4],, ['POSTGREL', 4], ['GTM / GA', 4]]],
  ['🗺️', '地圖與爬蟲',   [['Google Map / Mapbox', 4], ['Leaflet', 4], ['Selenium', 4], ['BeautifulSoup', 4]]],
];

export function AboutSection() {
  return (
    <>
      <section id="about" style={{
        background: 'var(--cream-dim)',
        borderTop: '3.5px solid var(--ink)',
        padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)',
      }}>
        <div className="pl-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(24px,5vw,64px)',
          alignItems: 'center',
        }}>
          {/* Photo */}
          <div className="about-photo" style={{ position: 'relative' }}>
            <div style={{
              position: 'relative', aspectRatio: '1',
              border: '3.5px solid var(--ink)',
              borderRadius: 28, boxShadow: 'var(--pop-8)',
              overflow: 'hidden',
            }}>
              <img src={`${import.meta.env.BASE_URL}about.png`} alt="Tina" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <span style={{ position: 'absolute', top: -16, left: -14 }}>
              <PTag color="gold">Freelance · 自由接案</PTag>
            </span>
          </div>

          {/* Text */}
          <div>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
              關於我 · ABOUT
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2.2rem,4.6vw,3.6rem)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--ink)' }}>
              Hi, I'm Tina
            </h1>
            <p style={{ fontWeight: 500, fontSize: '1.08rem', lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 16px', maxWidth: '60ch' }}>
              以自由接案為目標，期許能靠一台電腦養活自己！
            </p>
            <p style={{ fontWeight: 500, fontSize: '1.08rem', lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 16px', maxWidth: '60ch' }}>
              學生時期累積豐富的爬蟲開發、前後端整合與系統設計經驗。前端精通 HTML、CSS、JavaScript，熟練使用 React 與 Vue；後端具備 Node.js、Python、.Net Core, MSSQL 等實戰開發經驗。
            </p>
            <p style={{ fontWeight: 500, fontSize: '1.08rem', lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 26px', maxWidth: '60ch' }}>
              喜歡好看的東西，在前端設計上格外挑剔 — 美麗的介面不只是視覺享受，更是對細節的追求與對用戶體驗的關懷。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {FACTS.map(([n, l]) => (
                <div key={l} style={{ background: 'var(--white)', border: '3px solid var(--ink)', borderRadius: 16, boxShadow: 'var(--pop-3)', padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.1rem', lineHeight: 1, color: 'var(--ink)' }}>{n}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.02em', color: 'var(--text-muted)', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 技能樹 */}
      <section style={{ padding: 'clamp(44px,5.5vw,80px) clamp(16px,4vw,48px)', background: 'var(--cream-dim)', borderBottom: '3.5px solid var(--ink)' }}>
        <div className="pl-container">
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 10 }}>
              技能樹 · SKILL TREE
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.8rem,4.2vw,2.8rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0, color: 'var(--ink)' }}>
              技能樹
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 18 }}>
            {TREE.map(([icon, branch, skills]) => (
              <div key={branch} style={{ background: 'var(--white)', border: '3.5px solid var(--ink)', borderRadius: 22, boxShadow: 'var(--pop-4)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'var(--violet)', borderBottom: '3.5px solid var(--ink)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.98rem', color: 'var(--cream)' }}>{branch}</span>
                </div>
                <div style={{ padding: '16px 18px', display: 'grid', gap: 12 }}>
                  {skills.map(([s, lv]) => (
                    <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{s}</span>
                      <Stars n={lv} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
