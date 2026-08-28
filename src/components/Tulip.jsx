const palettes = {
  coral: ['#e87970', '#d95d66', '#c94c5a'],
  yellow: ['#e7bf55', '#d9a940', '#c79230'],
  lavender: ['#aa8bbd', '#9671ad', '#7e5d99'],
  peach: ['#e99b7d', '#d98269', '#c76c58'],
  red: ['#c65b5d', '#ae444e', '#963845'],
  cream: ['#e7d8b7', '#d7c59d', '#bda981'],
}

export function Tulip({ color = 'coral', size = 'medium' }) {
  const [a, b, c] = palettes[color] || palettes.coral
  return (
    <div className={`tulip tulip-${size}`} style={{ '--petal-a': a, '--petal-b': b, '--petal-c': c }}>
      <div className="tulip-head" aria-hidden="true">
        <span className="petal petal-left" />
        <span className="petal petal-center" />
        <span className="petal petal-right" />
      </div>
      <div className="tulip-stem" aria-hidden="true">
        <span className="leaf leaf-left" />
        <span className="leaf leaf-right" />
      </div>
    </div>
  )
}
