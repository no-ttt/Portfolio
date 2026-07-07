import { PSparkle } from './PSparkle';

const SERVICES = [
  { num: '01', color: 'var(--red)',     title: '品牌官網', jp: 'ブランドサイト', items: ['形象網站 / RWD', 'Figma 切版 / 畫面設計', '多語系支援', '上線部署維運'] },
  { num: '02', color: 'var(--violet)',  title: '網站 + 自助後台', jp: 'CMS', items: ['前台設計開發', '後台內容管理', 'API 串接', '多語系獨立設定'] },
  { num: '03', color: 'var(--gold)',    title: '後台管理系統', jp: 'Admin/ERP', items: ['權限分級', '會員 / 報表管理', '資料匯出', '資料視覺化'] },
  { num: '04', color: 'var(--lettuce)', title: 'LINE Bot / LIFF', jp: 'チャットボット', items: ['LIFF 嵌入式網頁', '預約流程', 'AI 串流整合', 'LINE 身份驗證'] },
  { num: '05', color: 'var(--sky)',     title: '後端 API', jp: 'バックエンド', items: ['RESTful API 開發', 'LINE 身份驗證', 'Swagger 文件', '資料庫設計'] },
  { num: '06', color: 'var(--ink)',     title: '爬蟲 / 自動化', jp: 'クローラー', items: ['動態頁面爬取', '自動化填表', '資料蒐集', '結構化資料輸出'] },
];

export function ServicesSection() {
  return (
    <section id="services" style={{
      background: 'var(--white)',
      borderTop: '3.5px solid var(--ink)',
      padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) clamp(56px,7vw,96px)',
    }}>
      <div className="pl-container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
            服務 · WHAT I DO
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 auto 14px' }}>
            Services
          </h2>
          <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-body)', margin: '0 auto', maxWidth: '42ch' }}>
            全端接案服務，從需求訪談到上線維運一手包辦。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 22 }}>
          {SERVICES.map((s) => (
            <div key={s.num} style={{ background: 'var(--white)', border: '3.5px solid var(--ink)', borderRadius: 22, boxShadow: 'var(--pop-6)', overflow: 'hidden' }}>
              <div style={{ background: s.color, borderBottom: '3.5px solid var(--ink)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--cream)', WebkitTextStroke: '1.5px var(--ink)', paintOrder: 'stroke fill' }}>{s.num}</span>
                <PSparkle size={24} color="var(--cream)" />
              </div>
              <div style={{ padding: 22, fontFamily: 'var(--font-grotesk)', color: 'var(--ink)' }}>
                <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--red)', textTransform: 'uppercase' }}>{s.jp}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', lineHeight: 1.05, margin: '6px 0 14px' }}>{s.title}</div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
                  {s.items.map(it => (
                    <li key={it} style={{ display: 'flex', gap: 8, fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-body)' }}>
                      <span style={{ color: 'var(--red)', fontWeight: 900 }}>✦</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
