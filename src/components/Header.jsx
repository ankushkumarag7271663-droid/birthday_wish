export function Header({ menuOpen, onMenuToggle, onNavigate, items }) {
  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header-inner">
        <button className="brand" onClick={() => onNavigate('top')} aria-label="Back to beginning">
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>Tulip Note</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {items.map(([label, id]) => <button key={id} onClick={() => onNavigate(id)}>{label}</button>)}
        </nav>
        <button className="menu-button" onClick={onMenuToggle} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          <span /><span /><span />
        </button>
      </div>
      <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
        {items.map(([label, id]) => <button key={id} onClick={() => onNavigate(id)}>{label}</button>)}
      </nav>
    </header>
  )
}
