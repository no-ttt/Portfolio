export function PButton({ children, bg = 'var(--gold)', fg = 'var(--ink)', size = 'md', onClick, href }) {
  const sizes = {
    md: { height: 'var(--control-h-md)', padding: '0 24px', fontSize: '1rem' },
    lg: { height: 'var(--control-h-lg)', padding: '0 34px', fontSize: '1.125rem' },
  }[size];

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    height: sizes.height,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    color: fg,
    background: bg,
    border: '3.5px solid var(--ink)',
    borderRadius: 'var(--radius-pill)',
    boxShadow: 'var(--pop-4)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  };

  if (href) {
    return <a href={href} className="pl-pressable" style={style}>{children}</a>;
  }
  return (
    <button type="button" className="pl-pressable" onClick={onClick} style={style}>
      {children}
    </button>
  );
}
