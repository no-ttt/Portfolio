import { PButton } from './PButton';
import { PTag } from './PTag';

const PLANS = [
  {
    name: '網站全端架設', jp: 'フルスタック', price: '$15,000', unit: '/ 系統起', tone: 'cream', popular: false,
    blurb: '前台 + 後台一手包辦，含API 串接與上線部署。',
    feats: ['前台 / 後台管理 設計開發', 'API 串接', '會員 / 報表 / 資料管理', '上線部署維運'],
  },
  {
    name: '品牌官網', jp: 'ブランドサイト', price: '$12,000', unit: '/ 系統起', tone: 'gold', popular: true,
    blurb: '形象官網設計開發，RWD 全版型，適合品牌形象與產品展示。',
    feats: ['視覺設計 / 前端開發', 'RWD', 'Figma 切版', '多語系支援', '上線部署'],
  },
  {
    name: 'LINE Bot', jp: 'チャットボット', price: '$10,000', unit: '/ 系統起', tone: 'violet', popular: false,
    blurb: 'LIFF 嵌入式網頁，整合預約、會員綁定、AI 串流等功能。',
    feats: ['LIFF 網頁開發', '預約流程', 'LINE 帳號綁定', 'AI 串流整合', 'API 協作'],
  },
  {
    name: '爬蟲 / 自動化', jp: 'クローラー', price: '$3,000', unit: '/ 專案起', tone: 'red', popular: false,
    blurb: '動態頁面爬取、自動化填表操作，結構化輸出為 Excel / CSV。',
    feats: ['Selenium 動態爬取', '自動化表單操作', '批量資料蒐集', '結構化資料輸出'],
  },
];

const TONE_FILL = {
  cream:  ['var(--cream)',  'var(--ink)'],
  gold:   ['var(--gold)',   'var(--ink)'],
  violet: ['var(--violet)', 'var(--cream)'],
  ink:    ['var(--ink)',    'var(--cream)'],
  grape:  ['var(--grape)', 'var(--cream)'],
  red:    ['var(--red)',   'var(--cream)'],
};

export function PricingSection() {
  return (
    <section id="pricing" style={{
      background: 'var(--gold)',
      borderTop: '3.5px solid var(--ink)',
      padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) clamp(56px,7vw,96px)',
    }}>
      <div className="pl-container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
            價目 · PRICING
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 auto 14px' }}>
            Pick your altitude
          </h2>
          <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-body)', margin: '0 auto', maxWidth: '44ch' }}>
            透明的起步價格，專案都會在溝通後提供客製報價。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 22, alignItems: 'start' }}>
          {PLANS.map(t => {
            const [bg, fg] = TONE_FILL[t.tone];
            return (
              <div key={t.name} className={t.popular ? 'pricing-popular' : ''} style={{ position: 'relative', background: bg, color: fg, border: '3.5px solid var(--ink)', borderRadius: 24, boxShadow: t.popular ? 'var(--pop-8)' : 'var(--pop-4)', padding: 28, transform: t.popular ? 'translateY(-8px)' : 'none' }}>
                {t.popular && (
                  <span style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)' }}>
                    <PTag color="red">最受歡迎</PTag>
                  </span>
                )}
                <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.8 }}>{t.jp}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.9rem', lineHeight: 1, margin: '4px 0 10px', textTransform: 'uppercase' }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.6rem', lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', opacity: 0.7 }}>{t.unit}</span>
                </div>
                <p style={{ fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 18px', opacity: 0.92 }}>{t.blurb}</p>
                <ul style={{ listStyle: 'none', margin: '0 0 22px', padding: 0, display: 'grid', gap: 9 }}>
                  {t.feats.map(f => (
                    <li key={f} style={{ display: 'flex', gap: 9, fontWeight: 600, fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 900 }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
                <PButton
                  bg={t.popular ? 'var(--red)' : 'var(--ink)'}
                  fg="var(--cream)"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Start a project
                </PButton>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-soft)', marginTop: 32 }}>
          * 以上為參考起步價，實際依專案複雜度與時程另行報價。
        </p>
      </div>
    </section>
  );
}
