import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PSparkle } from './PSparkle';
import { PTag } from './PTag';
import { FREELANCE, FULLTIME, SIDE_PROJECTS, COMPANIES } from '../data/projects';

const CATS = [
  { id: 'brand',    icon: '🌐', name: '品牌官網',       en: 'Brand site' },
  { id: 'admin',    icon: '📊', name: '後台管理',       en: 'Admin system' },
  { id: 'linebot',  icon: '💬', name: 'LINE Bot',      en: 'Chatbot' },
  { id: 'api',      icon: '🔧', name: '後端 API',      en: 'Backend' },
  { id: 'crawler',  icon: '🕷️', name: '爬蟲',          en: 'Crawler' },
];

function ProjectCard({ p }) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex={0}
      className="pl-pressable"
      onClick={() => navigate(`/project/${encodeURIComponent(p.title)}`)}
      onKeyDown={e => e.key === 'Enter' && navigate(`/project/${encodeURIComponent(p.title)}`)}
      style={{ textAlign: 'left', border: '3.5px solid var(--ink)', borderRadius: 22, boxShadow: 'var(--pop-6)', cursor: 'pointer', display: 'grid', gridTemplateRows: '180px 3.5px 1fr', width: '100%', overflow: 'hidden', background: 'var(--ink)' }}
    >
      <div style={{ position: 'relative', background: p.bg, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        {p.cover
          ? <img src={p.cover} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.coverPosition || 'top', transform: p.coverScale ? `scale(${p.coverScale})` : undefined }} />
          : <>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.16, backgroundImage: 'radial-gradient(var(--ink) 1.5px, rgba(0,0,0,0) 1.6px)', backgroundSize: '16px 16px' }} />
              <PSparkle size={36} color="var(--gold)" />
            </>
        }
        <span style={{ position: 'absolute', top: 14, left: 14, zIndex: 1 }}><PTag color="cream">{p.year}</PTag></span>
      </div>
      <div />
      <div style={{ padding: 20, fontFamily: 'var(--font-grotesk)', color: 'var(--ink)', background: 'var(--white)' }}>
        <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', color: 'var(--red)', textTransform: 'uppercase' }}>{p.jp}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.1, textTransform: 'uppercase', margin: '6px 0 10px' }}>{p.title}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        </div>
      </div>
    </div>
  );
}

function CatBlock({ cat, count, active, onClick }) {
  return (
    <button onClick={onClick} className="pl-pressable" style={{ display: 'grid', justifyItems: 'center', gap: 8, padding: '16px 10px 12px', background: active ? 'var(--gold)' : 'var(--white)', border: '3px solid var(--ink)', borderRadius: 18, boxShadow: active ? 'var(--pop-4)' : 'var(--pop-3)', cursor: 'pointer' }}>
      <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
      <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{cat.name}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{cat.en} · {count}</span>
    </button>
  );
}

export function ProjectsSection() {
  const [cat, setCat] = useState(null);
  const shown = cat ? FREELANCE.filter(p => p.cat === cat) : FREELANCE;

  return (
    <>
      <section id="work" style={{ padding: 'clamp(40px,5vw,72px) clamp(16px,4vw,48px) clamp(48px,6vw,80px)', background: 'var(--cream)' }}>
        <div className="pl-container">
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 10 }}>
              個人接案
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 10px', color: 'var(--ink)' }}>
              接案作品
            </h2>
            <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-body)', margin: 0 }}>
              從品牌官網到爬蟲自動化 — 點選類別篩選，或點開專案看完整介紹。
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(118px,1fr))', gap: 14, marginBottom: 24 }}>
            {CATS.map(c => (
              <CatBlock key={c.id} cat={c} count={FREELANCE.filter(p => p.cat === c.id).length}
                active={cat === c.id} onClick={() => setCat(cat === c.id ? null : c.id)} />
            ))}
          </div>
          {cat && (
            <button onClick={() => setCat(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--red)', marginBottom: 16 }}>
              ✕ 清除篩選，顯示全部
            </button>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap: 24 }}>
            {shown.map(p => <ProjectCard key={p.title} p={p} style={{ maxWidth: 420 }} />)}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--violet)', borderBlock: '3.5px solid var(--ink)', padding: 'clamp(48px,6vw,88px) clamp(16px,4vw,48px)' }}>
        <div className="pl-container">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 12 }}>
              正職經歷 · IN-HOUSE
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0, color: 'var(--cream)' }}>
              正職接觸過的專案
            </h2>
            <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--cream)', opacity: 0.9, margin: '14px 0 0', maxWidth: '52ch' }}>
              任職期間參與的產品開發 — 由需求、流程到上線維運。
            </p>
          </div>

          {COMPANIES.map((co, ci) => {
            const projects = FULLTIME.filter(p => p.company === co.key);
            return (
              <div key={co.key}>
                {/* company header */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.1rem,2.2vw,1.4rem)', color: 'var(--cream)' }}>{co.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--gold)', opacity: 0.9 }}>{co.period}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 500, fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--cream)', opacity: 0.75, margin: 0, maxWidth: '64ch' }}>{co.desc}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 24 }}>
                  {projects.map(p => <ProjectCard key={p.title} p={p} />)}
                </div>

                {/* divider between companies */}
                {ci < COMPANIES.length - 1 && (
                  <div style={{ margin: '52px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1, height: 2, background: 'rgba(255,245,230,0.2)' }} />
                    <PSparkle size={18} color="var(--gold)" />
                    <div style={{ flex: 1, height: 2, background: 'rgba(255,245,230,0.2)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: 'var(--cream)', borderBottom: '3.5px solid var(--ink)', padding: 'clamp(48px,6vw,88px) clamp(16px,4vw,48px)' }}>
        <div className="pl-container">
          <div style={{ marginBottom: 34 }}>
            <div style={{ fontFamily: 'var(--font-jp)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: 12 }}>
              個人專案 · SIDE PROJECTS
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0, color: 'var(--ink)' }}>
              Side Projects
            </h2>
            <p style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-body)', margin: '14px 0 0', maxWidth: '52ch' }}>
              學生時期開發 — 從想法到落地，完整從 0 到 1。
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 24 }}>
            {SIDE_PROJECTS.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
