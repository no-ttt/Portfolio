import { PWordmark } from './PWordmark';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--cream)',
        padding: '34px clamp(16px,4vw,48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <PWordmark size={24} />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          opacity: 0.7,
        }}
      >
        © 2026 version 1.0.0 — Tina Dai
      </span>
    </footer>
  );
}
