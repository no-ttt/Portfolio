import { useEffect, useRef } from 'react';

/* ── Ghost planet SVGs — transparent fill, shadow only ──────────────
   Fill is "transparent" so they blend into any section background.
   Only the shadow swath / craters give shape and depth.
─────────────────────────────────────────────────────────────────── */

const LINE   = 'rgba(22,18,16,0.18)';   /* thin outline          */
const SHADOW = 'rgba(22,18,16,0.10)';   /* shadow/dark side      */
const HOLE   = 'rgba(22,18,16,0.14)';   /* crater holes          */
const SPARK  = 'rgba(22,18,16,0.20)';   /* sparkle stroke        */

function GhostMoon({ size = 260, flip = false, id = 'gm' }) {
  const sil = 'M100 10L126 14L150 26L168 46L179 72L181 100L175 128L161 150L140 166L114 174L86 173L60 163L40 145L27 121L23 94L28 67L42 44L64 25Z';
  const rim = (cx, cy, rx, ry, rot) => (
    <g key={'r'+cx+cy} transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={LINE} strokeWidth="1.6" />
      <ellipse cx={cx} cy={cy+ry*0.3} rx={rx*0.72} ry={ry*0.55} fill="none" stroke={LINE} strokeWidth="1.1" opacity=".7" />
    </g>
  );
  const hole = (cx, cy, rx, ry, rot) => (
    <g key={'h'+cx+cy} transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={HOLE} />
      <ellipse cx={cx} cy={cy-ry*0.25} rx={rx*0.9} ry={ry*0.7} fill="none" stroke={LINE} strokeWidth="1" opacity=".7" />
    </g>
  );
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}
      style={{ display: 'block', transform: flip ? 'scaleX(-1)' : 'none' }}>
      <defs><clipPath id={id}><path d={sil}/></clipPath></defs>
      {/* body outline */}
      <path d={sil} fill="transparent" stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      {/* shadow half */}
      <g clipPath={`url(#${id})`}>
        <path d="M118 4L108 32L126 54L106 82L124 108L104 134L120 158L110 182L210 205L210 -5Z" fill={SHADOW} />
      </g>
      {/* lit-side rim craters */}
      {rim(66,52,14,10,-12)} {rim(102,36,10,7,8)}
      {rim(52,104,16,12,-6)} {rim(88,84,12,8,4)} {rim(70,144,11,8,10)}
      {/* dark-side hole craters */}
      <g clipPath={`url(#${id})`}>
        {hole(146,64,11,8,14)} {hole(160,110,13,9,-8)}
        {hole(132,148,12,8,6)} {hole(138,102,8,6,0)} {hole(172,150,9,7,-4)}
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
  const mid = (a, b) => [(a[0]+b[0])/2, (a[1]+b[1])/2];
  let d = '';
  for (let i = 0; i < 10; i++) {
    const v = pts[i], m = mid(v, pts[(i+1)%10]);
    d += (i===0 ? `M${mid(pts[9],v)[0]} ${mid(pts[9],v)[1]} ` : '') + `Q${v[0]} ${v[1]} ${m[0]} ${m[1]} `;
  }
  return d + 'Z';
}

function GhostStar({ size = 140, rotate = 0, id = 'gs' }) {
  const d = roundedStarPath(100, 100, 92, 44);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}
      style={{ display: 'block', transform: `rotate(${rotate}deg)` }}>
      <defs><clipPath id={id}><path d={d}/></clipPath></defs>
      <path d={d} fill="transparent" stroke={LINE} strokeWidth="1.5" />
      <g clipPath={`url(#${id})`}>
        <path d={roundedStarPath(122,124,92,44)} fill={SHADOW} />
      </g>
    </svg>
  );
}

function GhostSaturn({ size = 320, id = 'gsat' }) {
  const h = size * 0.66;
  return (
    <svg viewBox="0 0 260 172" width={size} height={h} style={{ display: 'block' }}>
      <defs><clipPath id={id}><circle cx="130" cy="86" r="68"/></clipPath></defs>
      <g transform="rotate(-9 130 92)">
        {/* back ring */}
        <path d="M5 92 A125 36 0 0 1 255 92" fill="none" stroke={LINE} strokeWidth="14" />
        {/* ball */}
        <circle cx="130" cy="86" r="68" fill="transparent" stroke={LINE} strokeWidth="2" />
        {/* shadow crescent */}
        <g clipPath={`url(#${id})`}>
          <path d="M186 48A68 68 0 0 1 70 134 A88 88 0 0 0 186 48Z" fill={SHADOW} />
        </g>
        {/* front ring */}
        <path d="M5 92 A125 36 0 0 0 255 92" fill="none" stroke={LINE} strokeWidth="14" />
        <path d="M5 92 A125 36 0 0 0 255 92" fill="none" stroke={SHADOW} strokeWidth="4" opacity=".6" />
      </g>
    </svg>
  );
}

/* ── Parallax group component ────────────────────────────────────── */
function PlanetGroup({ group, bodyRefs }) {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', top: `${group.topVh}vh`,
      left: 0, width: '100%', height: '50vh',
      pointerEvents: 'none',
    }}>
      {group.bodies.map((b, i) => (
        <div key={i} ref={el => { if (el) bodyRefs.push({ el, speed: b.speed }); }}
          style={{ position: 'absolute', ...b.style, willChange: 'transform' }}>
          {b.node}
        </div>
      ))}
    </div>
  );
}

const GROUPS = [
  { topVh: 108, bodies: [
    { node: <GhostMoon  size={260} id="g1"  />,              style: { right: '-80px', top: '-10px' }, speed: 0.6  },
    { node: <GhostStar  size={100} rotate={-10} id="g2" />,  style: { left: '-20px',  top: '40%'  }, speed: 0.45 },
  ]},
  { topVh: 215, bodies: [
    { node: <GhostSaturn size={320} id="g3" />,              style: { right: '-60px', top: '15%'  }, speed: 0.5  },
    { node: <GhostMoon  size={180} flip id="g4" />,          style: { left: '-60px',  top: '55%'  }, speed: 0.65 },
  ]},
  { topVh: 350, bodies: [
    { node: <GhostStar  size={120} rotate={12}  id="g5" />,  style: { left: '2%',     top: '5%'   }, speed: 0.7  },
    { node: <GhostMoon  size={160} id="g6" />,               style: { right: '-40px', top: '10%'  }, speed: 0.5  },
  ]},
  { topVh: 430, bodies: [
    { node: <GhostMoon  size={300} id="g7" />,               style: { right: '-70px', top: '-10px'}, speed: 0.8  },
    { node: <GhostSaturn size={280} id="g8" />,              style: { left: '-40px',  top: '50%'  }, speed: 0.55 },
    { node: <GhostStar  size={90}  rotate={20} id="g9" />,   style: { right: '3%',    top: '72%'  }, speed: 0.4  },
  ]},
  { topVh: 560, bodies: [
    { node: <GhostStar  size={130} rotate={-8} id="g10" />,  style: { right: '-20px', top: '10%'  }, speed: 0.6  },
    { node: <GhostMoon  size={200} flip id="g11" />,         style: { left: '-60px',  top: '45%'  }, speed: 0.5  },
  ]},
  { topVh: 670, bodies: [
    { node: <GhostSaturn size={360} id="g12" />,             style: { left: '50%', marginLeft: '-180px', top: '5%' }, speed: 0.7 },
    { node: <GhostMoon  size={220} id="g13" />,              style: { left: '-60px',  top: '25%'  }, speed: 0.5  },
    { node: <GhostStar  size={80}  rotate={15} id="g14" />,  style: { right: '2%',    top: '60%'  }, speed: 0.45 },
  ]},
];

export function PageDecorations() {
  const bodyRefs = useRef([]);

  useEffect(() => {
    const refs = bodyRefs.current;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        for (const { el, speed } of refs) {
          el.style.transform = `translateY(${-y * speed * 0.18}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const collected = [];
  const groups = GROUPS.map((g, i) => <PlanetGroup key={i} group={g} bodyRefs={collected} />);
  bodyRefs.current = collected;

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none', zIndex: 0,
    }}>
      {groups}
    </div>
  );
}
