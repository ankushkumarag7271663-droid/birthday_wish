export function WishCard({ icon, title, text }) {
  return (
    <article className="wish-card">
      <div className="wish-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
