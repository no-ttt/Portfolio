import { useState } from 'react';
import { PSparkle } from './PSparkle';
import { PTag } from './PTag';
import { PButton } from './PButton';

function ImgBlock({ label = '圖片', ratio = '16/9', tone = 'var(--violet)', src, srcs, joined: blockJoined, maxWidth }) {
  if (src || (srcs && srcs.length > 0)) {
    return (
      <div style={{ maxWidth: maxWidth || '100%' }}>
        {label && <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-body)', margin: '0 0 10px' }}>{label}</p>}
        <div style={{ border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', overflow: 'hidden', background: 'var(--white)' }}>
          {src && <img src={src} alt={label} style={{ width: '100%', display: 'block' }} />}
          {srcs && srcs.map((s, i) => <img key={i} src={s} alt={`${label} ${i + 1}`} style={{ width: '100%', display: 'block' }} />)}
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', aspectRatio: ratio, background: tone, border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.14, backgroundImage: 'radial-gradient(var(--cream) 1.5px, transparent 1.6px)', backgroundSize: '16px 16px' }} />
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center', gap: 8, color: 'var(--cream)', fontFamily: 'var(--font-grotesk)' }}>
        <PSparkle size={30} color="var(--gold)" />
        <span style={{ fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9, whiteSpace: 'nowrap' }}>{label}</span>
      </div>
    </div>
  );
}

function TabGallery({ gallery, noHead }) {
  const [active, setActive] = useState(0);
  if (!gallery.tabs || gallery.tabs.length === 0) return null;
  const tab = gallery.tabs[active];

  // group tabs by their `group` field, preserving order
  const groups = [];
  gallery.tabs.forEach((t, i) => {
    const g = t.group || '';
    const last = groups[groups.length - 1];
    if (last && last.name === g) last.tabs.push({ ...t, i });
    else groups.push({ name: g, tabs: [{ ...t, i }] });
  });

  return (
    <div style={{ marginTop: noHead ? 0 : 48 }}>
      {!noHead && <CsHead>{gallery.title}</CsHead>}
      {gallery.note && <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-body)', margin: '0 0 18px' }}>{gallery.note}</p>}
      {/* tab bar — grouped */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.name && (
              <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{g.name}</div>
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {g.tabs.map(t => (
                <button
                  key={t.i}
                  onClick={() => setActive(t.i)}
                  className="pl-pressable"
                  style={{
                    fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.82rem',
                    padding: '7px 16px', borderRadius: 999,
                    border: '2.5px solid var(--ink)',
                    background: t.i === active ? 'var(--gold)' : 'var(--white)',
                    color: 'var(--ink)',
                    boxShadow: t.i === active ? 'var(--pop-3)' : 'var(--pop-2)',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* screenshot(s) */}
      {(() => {
        const srcs = Array.isArray(tab.src) ? tab.src : [tab.src];
        const isMobile = gallery.mobile;
        const frameStyle = {
          border: '3px solid var(--ink)', borderRadius: 14,
          boxShadow: 'var(--pop-4)', overflow: 'hidden', background: 'var(--white)',
          flex: srcs.length > 1 ? '1 1 0' : undefined,
          width: srcs.length === 1 ? (isMobile ? 'min(320px, 80%)' : '100%') : undefined,
          minWidth: 0,
          maxWidth: '100%',
        };
        const titleBar = (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px', background: '#1a1a1a', borderBottom: '2px solid var(--ink)', flex: 'none' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', border: '1.5px solid #e0443e', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', border: '1.5px solid #dea123', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', border: '1.5px solid #1aab29', display: 'inline-block' }} />
          </div>
        );
        return (
          <div style={{ display: 'flex', gap: 12, justifyContent: srcs.length === 1 && isMobile ? 'center' : 'stretch', alignItems: 'flex-start' }}>
            {srcs.map((src, si) => (
              <div key={si} style={frameStyle}>
                {titleBar}
                <img src={src} alt={`${tab.label} ${si + 1}`} style={{ width: '100%', display: 'block' }} />
                {si === srcs.length - 1 && tab.tabnote && (
                  <div style={{ padding: '12px 16px', background: 'var(--gold)', borderTop: '2px solid var(--ink)', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>
                    ↗ {tab.tabnote}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

function StepRow({ n, title, desc, isLast }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
      {/* Left: line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: 44 }}>
        <span style={{
          display: 'grid', placeItems: 'center',
          width: 36, height: 36, flex: 'none',
          background: 'var(--gold)', border: '3px solid var(--ink)',
          borderRadius: '50%', boxShadow: 'var(--pop-3)',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--ink)',
          zIndex: 1,
        }}>{n}</span>
        {!isLast && (
          <div style={{ flex: 1, width: 3, background: 'var(--ink)', marginTop: 2, marginBottom: 0, minHeight: 18 }} />
        )}
      </div>

      {/* Right: content card */}
      <div style={{ flex: 1, paddingLeft: 14, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{
          background: 'var(--white)', border: '3px solid var(--ink)',
          borderRadius: 18, boxShadow: 'var(--pop-3)',
          padding: '12px 20px',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', display: 'block', marginBottom: desc ? 4 : 0 }}>{title}</span>
          {desc && <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 500, fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-body)', display: 'block' }}>{desc}</span>}
        </div>
      </div>
    </div>
  );
}

function TermCard({ title, lines }) {
  return (
    <div style={{ background: 'var(--ink)', border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 16px', background: 'var(--cream)', borderBottom: '3px solid var(--ink)' }}>
        <span style={{ width: 11, height: 11, borderRadius: 999, border: '2px solid var(--ink)', background: 'var(--red)', display: 'inline-block' }} />
        <span style={{ width: 11, height: 11, borderRadius: 999, border: '2px solid var(--ink)', background: 'var(--gold)', display: 'inline-block' }} />
        <span style={{ width: 11, height: 11, borderRadius: 999, border: '2px solid var(--ink)', background: 'var(--lettuce)', display: 'inline-block' }} />
        <span style={{ marginLeft: 6, fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.78rem', color: 'var(--ink)' }}>{title}</span>
      </div>
      <div style={{ padding: '18px 20px', display: 'grid', gap: 8 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', color: l.startsWith('✓') ? 'var(--lettuce)' : l.startsWith('→') ? 'var(--gold)' : 'var(--cream)' }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

function CsHead({ children }) {
  return (
    <h2 style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.4rem,2.6vw,1.9rem)', letterSpacing: '-0.01em', color: 'var(--ink)', margin: '0 0 20px' }}>
      <PSparkle size={20} color="var(--red)" />{children}
    </h2>
  );
}

export function CaseStudyPage({ p, onBack }) {
  const cs = p.cs;
  return (
    <section style={{ padding: 'clamp(32px,4vw,56px) clamp(16px,4vw,48px) clamp(56px,7vw,96px)', background: 'var(--cream-dim)', borderTop: '3.5px solid var(--ink)' }}>
      <div className="pl-container" style={{ maxWidth: 880 }}>

        <button onClick={onBack} className="pl-pressable" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', padding: '9px 18px', background: 'var(--cream)', color: 'var(--ink)', border: '3px solid var(--ink)', borderRadius: 999, boxShadow: 'var(--pop-3)', cursor: 'pointer', marginBottom: 30 }}>
          ← 返回作品集
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{cs.icon}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(2rem,4.4vw,3.2rem)', letterSpacing: '-0.02em', margin: 0, color: 'var(--ink)' }}>{p.title}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', margin: '14px 0 0' }}>
          {p.tags.map(t => <PTag key={t} color="violet">{t}</PTag>)}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{cs.date}</span>
        </div>

        {cs.status && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--lettuce)', border: '3px solid var(--ink)', borderRadius: 16, boxShadow: 'var(--pop-4)', padding: '14px 18px', margin: '24px 0 0', fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>
            <span style={{ flex: 'none', display: 'grid', placeItems: 'center', width: 30, height: 30, background: 'var(--cream)', border: '2.5px solid var(--ink)', borderRadius: 999, fontWeight: 900, fontSize: 14 }}>✓</span>
            {cs.status}
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          <CsHead>產品介紹</CsHead>
          <div style={{ display: 'grid', gridTemplateColumns: cs.intro.length > 1 ? 'repeat(auto-fit,minmax(280px,1fr))' : '1fr', gap: 20 }}>
            {cs.intro.map((t, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 500, fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--text-body)', margin: 0, background: 'var(--white)', border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', padding: '22px 24px' }}>{t}</p>
            ))}
          </div>
        </div>

        {cs.stack && cs.stack.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>技術組合</span>
              {cs.stack.map(s => (
                <span key={s} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--ink)', background: 'var(--white)', border: '2.5px solid var(--ink)', borderRadius: 10, padding: '4px 12px', boxShadow: 'var(--pop-2)' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {cs.links && cs.links.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>連結</span>
              {cs.links.map(l => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--ink)', background: 'var(--gold)', border: '2.5px solid var(--ink)', borderRadius: 10, padding: '4px 12px', boxShadow: 'var(--pop-2)', textDecoration: 'none', wordBreak: 'break-all' }}>{l.label} ↗</a>
              ))}
            </div>
          </div>
        )}

        {cs.videos && cs.videos.length > 0 && (
          <div style={{ marginTop: 28, display: 'grid', gap: 20 }}>
            {cs.videos.map((v, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-body)', margin: '0 0 10px' }}>{v.title}</p>
                <div style={{ border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', overflow: 'hidden', background: '#000', aspectRatio: '16/9' }}>
                  <iframe src={v.src} style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} allow="autoplay" allowFullScreen />
                </div>
              </div>
            ))}
          </div>
        )}

        {cs.steps && cs.steps.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <CsHead>產品結構</CsHead>
            <div style={{ display: 'grid', gap: 14 }}>
              {cs.steps.map(([title, desc], i) => <StepRow key={i} n={String(i + 1)} title={title} desc={desc} isLast={i === cs.steps.length - 1} />)}
            </div>
          </div>
        )}

        {cs.features && cs.features.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <CsHead>{cs.featuresTitle || '功能重點'}</CsHead>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16 }}>
              {cs.features.map(([t, d], i) => (
                <div key={i} style={{ background: 'var(--white)', border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-3)', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                    <PSparkle size={15} color="var(--gold)" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.02rem', color: 'var(--ink)' }}>{t}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--text-body)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cs.features2 && cs.features2.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <CsHead>{cs.features2Title || '功能重點'}</CsHead>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16 }}>
              {cs.features2.map(([t, d], i) => (
                <div key={i} style={{ background: 'var(--white)', border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-3)', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                    <PSparkle size={15} color="var(--gold)" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.02rem', color: 'var(--ink)' }}>{t}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--text-body)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cs.comparison && (
          <div style={{ marginTop: 48 }}>
            <CsHead>{cs.comparison.title}</CsHead>
            <div style={{ border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-grotesk)', fontSize: '0.88rem' }}>
                  <thead>
                    <tr>
                      {cs.comparison.headers.map((h, i) => (
                        <th key={i} style={{ background: 'var(--ink)', color: 'var(--cream)', fontWeight: 800, padding: '12px 16px', textAlign: 'left', whiteSpace: 'nowrap', borderRight: i < cs.comparison.headers.length - 1 ? '2px solid var(--cream-dim)' : 'none' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cs.comparison.rows.map((row, ri) => (
                      <tr key={ri} style={{ background: ri % 2 === 0 ? 'var(--white)' : 'var(--cream-dim)' }}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ padding: '12px 16px', fontWeight: ci === 0 ? 800 : 600, color: 'var(--ink)', verticalAlign: 'top', lineHeight: 1.6, borderRight: ci < row.length - 1 ? '2px solid var(--ink)' : 'none', borderTop: '2px solid var(--ink)' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {cs.terminal && (
          <div style={{ marginTop: 48 }}>
            <CsHead>運作示意</CsHead>
            <TermCard title={cs.terminal.title} lines={cs.terminal.lines} />
          </div>
        )}

        {cs.galleryGroup && (
          <div style={{ marginTop: 48 }}>
            <CsHead>{cs.galleryGroup.title}</CsHead>
            {cs.galleryGroup.galleries.map((g, gi) => (
              <div key={gi} style={{ marginTop: gi === 0 ? 0 : 36 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.05rem,2vw,1.3rem)', color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.01em' }}>{g.title}</h3>
                <TabGallery gallery={g} noHead />
              </div>
            ))}
          </div>
        )}

        {(cs.galleries || []).map((g, gi) =>
          g.tabs ? (
            <TabGallery key={gi} gallery={g} />
          ) : (
            <div key={gi} style={{ marginTop: 48 }}>
              <CsHead>{g.title}</CsHead>
              {g.note && <p style={{ fontFamily: 'var(--font-grotesk)', fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-body)', margin: '0 0 18px' }}>{g.note}</p>}
              {g.joined ? (
                <div style={{ border: '3px solid var(--ink)', borderRadius: 18, boxShadow: 'var(--pop-4)', overflow: 'hidden', background: 'var(--white)' }}>
                  {g.blocks.map((b, bi) => (
                    <img key={bi} src={b.src} alt={b.label} style={{ width: '100%', display: 'block' }} />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: g.cols === 1 ? '1fr' : 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 18 }}>
                  {g.blocks.map((b, bi) => <ImgBlock key={bi} label={b.label} ratio={b.ratio || '16/9'} tone={b.tone || 'var(--violet)'} src={b.src} srcs={b.srcs} maxWidth={b.maxWidth} />)}
                </div>
              )}
            </div>
          )
        )}

        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <PButton bg="var(--gold)" onClick={onBack}>← 返回作品集</PButton>
        </div>
      </div>
    </section>
  );
}
