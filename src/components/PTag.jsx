const PALETTE = {
  gold:    ['var(--gold)',    'var(--ink)'],
  red:     ['var(--red)',     'var(--cream)'],
  violet:  ['var(--violet)',  'var(--cream)'],
  lettuce: ['var(--lettuce)', 'var(--ink)'],
  cream:   ['var(--cream)',   'var(--ink)'],
};

export function PTag({ children, color = 'gold', clickable = false }) {
  const [bg, fg] = PALETTE[color] ?? PALETTE.gold;
  return (
    <span
      className={clickable ? 'pl-pressable' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 13px',
        fontFamily: 'var(--font-grotesk)',
        fontWeight: 800,
        fontSize: '0.74rem',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: fg,
        background: bg,
        border: '2.5px solid var(--ink)',
        borderRadius: 'var(--radius-pill)',
        cursor: clickable ? 'pointer' : undefined,
      }}
    >
      {children}
    </span>
  );
}
