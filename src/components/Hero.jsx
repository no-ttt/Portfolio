import { useEffect, useRef } from 'react';
import { PButton } from './PButton';

/* ── SVG Planets ─────────────────────────────────────────────────── */
export function Planet({ type = 'ringed', size = 120, fill = 'var(--violet)', stroke = '#161210' }) {
  const s = size;
  const shapes = {
    ringed: (
      <svg width={s} height={s * 0.9} viewBox="0 0 160 140" fill="none">
        <ellipse cx="80" cy="90" rx="62" ry="18" fill="none" stroke={stroke} strokeWidth="4" />
        <circle  cx="80" cy="70" r="52"  fill={fill} stroke={stroke} strokeWidth="4" />
        <circle  cx="62" cy="56" r="14"  fill={fill} opacity=".6" />
        <circle  cx="96" cy="80" r="8"   fill={fill} opacity=".4" />
        <ellipse cx="80" cy="90" rx="38" ry="11" fill={fill} />
        <circle  cx="58" cy="50" r="10"  fill="white" opacity=".18" />
      </svg>
    ),
    dotty: (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" fill={fill}   stroke={stroke} strokeWidth="4" />
        <circle cx="44" cy="48" r="10" fill={stroke} opacity=".25" />
        <circle cx="72" cy="38" r="6"  fill={stroke} opacity=".20" />
        <circle cx="76" cy="70" r="9"  fill={stroke} opacity=".22" />
        <circle cx="44" cy="74" r="6"  fill={stroke} opacity=".18" />
        <circle cx="34" cy="30" r="4"  fill="white"  opacity=".25" />
      </svg>
    ),
    star: (
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
        <path d="M60 10 L72 44 L108 44 L80 66 L90 100 L60 80 L30 100 L40 66 L12 44 L48 44 Z"
          fill={fill} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="50" cy="52" r="5" fill="white" opacity=".35" />
      </svg>
    ),
    moon: (
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" fill={fill}   stroke={stroke} strokeWidth="4" />
        <circle cx="34" cy="40" r="8"  fill={stroke} opacity=".2" />
        <circle cx="62" cy="58" r="6"  fill={stroke} opacity=".18" />
        <circle cx="56" cy="34" r="4"  fill="white"  opacity=".3" />
        <path d="M30 62 Q50 74 70 62" stroke={stroke} strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>
    ),
    donut: (
      <svg width={s} height={s * 0.7} viewBox="0 0 140 100" fill="none">
        <ellipse cx="70" cy="50" rx="60" ry="42" fill={fill}  stroke={stroke} strokeWidth="4" />
        <ellipse cx="70" cy="50" rx="22" ry="16" fill={fill}  stroke={stroke} strokeWidth="3" />
        <ellipse cx="70" cy="50" rx="14" ry="10" fill="white" opacity=".3" stroke={stroke} strokeWidth="2" />
        <circle  cx="46" cy="38" r="5"  fill="white" opacity=".3" />
      </svg>
    ),
  };
  return (
    <span style={{ display: 'inline-block', lineHeight: 0 }}>
      {shapes[type] ?? shapes.dotty}
    </span>
  );
}

/* ── Hero banner planet layer — Portfolio_bg style, gold tones ───── */
const G_LIGHT  = '#ffc24d';
const G_DARK   = '#c47c00';
const G_SHADOW = '#a06000';
const G_HOLE   = '#7a4800';
const G_LINE   = 'rgba(22,18,16,0.75)';

function HeroCraterMoon({ size, flip, id }) {
  const sil = 'M100 10L126 14L150 26L168 46L179 72L181 100L175 128L161 150L140 166L114 174L86 173L60 163L40 145L27 121L23 94L28 67L42 44L64 25Z';
  const rim = (cx, cy, rx, ry, rot) => (
    <g key={'r'+cx+cy} transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={G_LINE} strokeWidth="1.8" />
      <ellipse cx={cx} cy={cy+ry*0.3} rx={rx*0.72} ry={ry*0.55} fill="none" stroke={G_LINE} strokeWidth="1.3" opacity=".7" />
    </g>
  );
  const hole = (cx, cy, rx, ry, rot) => (
    <g key={'h'+cx+cy} transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={G_HOLE} />
      <ellipse cx={cx} cy={cy-ry*0.25} rx={rx*0.9} ry={ry*0.7} fill="none" stroke={G_LINE} strokeWidth="1.2" opacity=".8" />
    </g>
  );
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ display:'block', transform: flip?'scaleX(-1)':'none' }}>
      <defs><clipPath id={id}><path d={sil}/></clipPath></defs>
      <path d={sil} fill={G_LIGHT} stroke={G_LINE} strokeWidth="2" strokeLinejoin="round" />
      <g clipPath={`url(#${id})`}>
        <path d="M118 4L108 32L126 54L106 82L124 108L104 134L120 158L110 182L210 205L210 -5Z" fill={G_SHADOW} />
      </g>
      {rim(66,52,14,10,-12)}{rim(102,36,10,7,8)}{rim(52,104,16,12,-6)}{rim(88,84,12,8,4)}{rim(70,144,11,8,10)}
      <g clipPath={`url(#${id})`}>
        {hole(146,64,11,8,14)}{hole(160,110,13,9,-8)}{hole(132,148,12,8,6)}{hole(138,102,8,6,0)}{hole(172,150,9,7,-4)}
      </g>
    </svg>
  );
}

function roundedStarPath(cx, cy, outer, inner) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (-90 + i * 36) * Math.PI / 180;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const mid = (a, b) => [(a[0]+b[0])/2,(a[1]+b[1])/2];
  let d = '';
  for (let i = 0; i < 10; i++) {
    const v = pts[i], m = mid(v, pts[(i+1)%10]);
    d += (i===0?`M${mid(pts[9],v)[0]} ${mid(pts[9],v)[1]} `:'')+`Q${v[0]} ${v[1]} ${m[0]} ${m[1]} `;
  }
  return d+'Z';
}

function HeroPuffyStar({ size, rotate, id }) {
  const d = roundedStarPath(100,100,92,44);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ display:'block', transform:`rotate(${rotate}deg)` }}>
      <defs><clipPath id={id}><path d={d}/></clipPath></defs>
      <path d={d} fill={G_LIGHT} />
      <g clipPath={`url(#${id})`}>
        <path d={roundedStarPath(122,124,92,44)} fill={G_DARK} opacity=".85" />
        <path d={roundedStarPath(108,110,92,44)} fill={G_LIGHT} />
      </g>
    </svg>
  );
}

function HeroSaturn({ size }) {
  const h = size * 0.66;
  return (
    <svg viewBox="0 0 260 172" width={size} height={h} style={{ display:'block' }}>
      <g transform="rotate(-9 130 92)">
        <path d="M5 92 A125 36 0 0 1 255 92" fill="none" stroke={G_DARK}   strokeWidth="15" />
        <circle cx="130" cy="86" r="68" fill={G_LIGHT} />
        <path d="M186 48A68 68 0 0 1 70 134 A88 88 0 0 0 186 48Z" fill={G_DARK} opacity=".75" />
        <path d="M5 92 A125 36 0 0 0 255 92" fill="none" stroke={G_DARK}   strokeWidth="15" />
        <path d="M5 92 A125 36 0 0 0 255 92" fill="none" stroke={G_SHADOW} strokeWidth="5"  opacity=".5" />
      </g>
    </svg>
  );
}

function StarSpark({ size = 30, rotate = 0 }) {
  const d = 'M50 2C50 27 51 49 98 50C51 51 50 73 50 98C50 73 49 51 2 50C49 49 50 27 50 2Z';
  return (
    <svg viewBox="-10 -10 120 120" width={size} height={size} style={{ transform:`rotate(${rotate}deg)`, overflow:'visible' }}>
      <path d={d} transform="translate(7 9)" fill="var(--ink)" />
      <path d={d} fill="var(--white)" stroke="var(--ink)" strokeWidth="7" strokeLinejoin="round" />
    </svg>
  );
}

const HERO_BODIES = [
  { style: { right: '-50px', top: '-20px'  }, speed: 1.0,  mobileHide: false, node: <HeroCraterMoon size={320} id="hmA" /> },
  { style: { left:'50%', marginLeft:'-100px', top:'35%' }, speed: 0.7,  mobileHide: true,  node: <HeroSaturn size={420} /> },
  { style: { left:'3%',   top:'44%'       }, speed: 0.9,  mobileHide: true,  node: <HeroPuffyStar size={140} rotate={-14} id="hpA"/> },
  { style: { right:'3%',  top:'74%'       }, speed: 0.55, mobileHide: true,  node: <HeroPuffyStar size={80}  rotate={18}  id="hpB"/> },
  { style: { left:'-70px',  top:'4%'      }, speed: 0.5,  mobileHide: true,  node: <HeroCraterMoon size={200} flip id="hmB" /> },
  { style: { left:'9%',     top:'12%'     }, speed: 1.25, mobileHide: false, node: <StarSpark size={30} rotate={8}   /> },
  { style: { right:'8%',    top:'42%'     }, speed: 1.5,  mobileHide: true,  node: <StarSpark size={24} rotate={-12} /> },
  { style: { left:'22%',    top:'68%'     }, speed: 1.1,  mobileHide: true,  node: <StarSpark size={20} rotate={20}  /> },
];

function HeroPlanetLayer() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const els = itemRefs.current;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        els.forEach(({ el, speed }) => {
          el.style.transform = `translateY(${-y * speed * 0.25}px)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }}>
      {HERO_BODIES.map((b, i) => (
        <div key={i}
          ref={el => { if (el) itemRefs.current[i] = { el, speed: b.speed }; }}
          className={b.mobileHide ? 'hero-planet-hide' : ''}
          style={{ position: 'absolute', ...b.style, willChange: 'transform' }}
        >
          {b.node}
        </div>
      ))}
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <>
      <style>{`
        @keyframes hero-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-14px) rotate(2deg); }
        }
        @media (max-width: 680px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
      `}</style>

      <header style={{
        position: 'relative',
        background: 'var(--gold)',
        borderBottom: '3.5px solid var(--ink)',
        overflow: 'hidden',
        minHeight: 560,
      }}>
        <HeroPlanetLayer />

        {/* dot-grid texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(var(--ink) 1.2px, transparent 1.3px)',
          backgroundSize: '20px 20px', opacity: 0.06,
        }} />

        <div className="hero-grid" style={{
          position: 'relative', zIndex: 2,
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'center', minHeight: 560,
          padding: 'clamp(0px,2vw,0px)',
        }}>
          {/* Left: text */}
          <div className="hero-text" style={{ padding: 'clamp(48px,7vw,96px) clamp(24px,4vw,64px)' }}>
            <div style={{
              fontFamily: 'var(--font-jp)', fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.2em',
              color: 'var(--red)', textTransform: 'uppercase', marginBottom: 18,
            }}>
              フロントエンド・エンジニア · FRONTEND ENGINEER
            </div>
            <h1 className="pl-sticker-text" style={{
              fontSize: 'clamp(2rem,3vw,3.4rem)',
              margin: '0 0 24px', maxWidth: '24ch', lineHeight: 1.15,
            }}>
              Building interfaces<br />where precision meets great UX
            </h1>
            <p style={{
              fontWeight: 600, fontSize: '1.05rem',
              color: 'var(--ink)', margin: '0 0 36px',
              maxWidth: '52ch', lineHeight: 1.75,
            }}>
              Delivering the best web experience for every user.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <PButton bg="var(--red)" fg="var(--cream)" size="lg" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>查看作品</PButton>
            </div>
          </div>

          {/* Right: intentionally empty — planets are in the parallax layer */}
          <div className="hero-visual" />
        </div>
      </header>
    </>
  );
}
