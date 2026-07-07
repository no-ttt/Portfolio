import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PWordmark } from './PWordmark';

const NAV_ITEMS = [
  { id: 'about',    zh: '關於',    en: 'About'    },
  { id: 'services', zh: '服務',    en: 'Services' },
  { id: 'pricing',  zh: '價目',    en: 'Pricing'  },
  { id: 'work',     zh: '作品集',  en: 'Work'     },
  { id: 'contact',  zh: '聯絡我們', en: 'Contact' },
];

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollActive, setScrollActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  const isProjectPage = location.pathname.startsWith('/project/');
  const active = isProjectPage ? 'work' : scrollActive;

  useEffect(() => {
    if (isProjectPage) return;

    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setScrollActive(id); },
        { rootMargin: '-10% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isProjectPage, location.pathname]);

  const handleNav = (id) => {
    setMenuOpen(false);
    if (isProjectPage) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBtn = (id, zh, en) => {
    const on = active === id;
    return (
      <button key={id} onClick={() => handleNav(id)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
        background: on ? 'var(--gold)' : 'transparent',
        border: on ? '2.5px solid var(--ink)' : '2.5px solid transparent',
        boxShadow: on ? 'var(--pop-3)' : 'none',
        color: on ? 'var(--ink)' : 'var(--cream)',
        fontFamily: 'var(--font-grotesk)',
        whiteSpace: 'nowrap',
        transition: 'background 150ms, color 150ms, box-shadow 150ms',
      }}>
        <span style={{ fontWeight: 900, fontSize: '1rem' }}>{zh}</span>
        <span style={{ fontWeight: 600, fontSize: '0.72rem', opacity: on ? 0.65 : 0.55 }}>{en}</span>
      </button>
    );
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px clamp(16px,4vw,48px)',
        background: 'var(--violet)',
        borderBottom: 'var(--bw-bold) solid var(--ink)',
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <PWordmark size={28} />
        </button>

        {/* Desktop nav */}
        <div className="nav-right" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {NAV_ITEMS.map(({ id, zh, en }) => navBtn(id, zh, en))}
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none', flexDirection: 'column', justifyContent: 'center', gap: 5,
            background: 'none', border: 'none', cursor: 'pointer', padding: 6,
          }}
          aria-label="選單"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2.5, borderRadius: 2,
              background: 'var(--cream)',
              transform: menuOpen
                ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                : i === 2 ? 'translateY(-7.5px) rotate(-45deg)'
                : 'scaleX(0)'
                : 'none',
              transition: 'transform 200ms, opacity 200ms',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`nav-right${menuOpen ? ' open' : ''}`} style={{ display: 'none' }}>
        {NAV_ITEMS.map(({ id, zh, en }) => navBtn(id, zh, en))}
      </div>
    </>
  );
}
