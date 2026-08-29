import { useEffect, useMemo, useRef, useState } from 'react'
import { Header } from './components/Header.jsx'
import { BackgroundMusic } from './components/BackgroundMusic.jsx'
import { Tulip } from './components/Tulip.jsx'
import { WishCard } from './components/WishCard.jsx'
import { Reveal } from './components/Reveal.jsx'
import { LoadingScreen } from './components/LoadingScreen.jsx'

const FRIEND_NAME = '[Name]'

const wishes = [
  { icon: '☁', title: 'More peaceful days', text: 'May you have more days where everything simply feels okay.' },
  { icon: '✦', title: 'More reasons to smile', text: 'May little things keep giving you unexpected reasons to smile.' },
  { icon: '⌁', title: 'Room to grow', text: 'May you keep growing into the person you want to become, at your own pace.' },
  { icon: '◌', title: 'Good people', text: 'May you always have kind people around you who genuinely value you.' },
  { icon: '▧', title: 'Beautiful memories', text: 'May this year give you moments worth remembering long after they happen.' },
  { icon: '↗', title: 'New beginnings', text: 'May every new chapter bring something good your way.' },
]

const navItems = [
  ['Wish', 'wish'],
  ['Garden', 'garden'],
  ['Wishes', 'wishes'],
  ['Connection', 'connection'],
]

function App() {
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [gardenVisible, setGardenVisible] = useState(false)
  const gardenRef = useRef(null)
  const heroRef = useRef(null)

  const petals = useMemo(
    () => Array.from({ length: 18 }, (_, index) => ({
      id: index,
      left: `${(index * 17 + 7) % 100}%`,
      delay: `${(index % 7) * 0.9}s`,
      duration: `${8 + (index % 5) * 2}s`,
      size: `${6 + (index % 4) * 2}px`,
    })),
    [],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!gardenRef.current) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setGardenVisible(entry.isIntersecting),
      { threshold: 0.16 },
    )
    observer.observe(gardenRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
  const wishSection = document.getElementById('wish')

  if (!wishSection) return undefined

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        window.dispatchEvent(new Event('birthday-start-music'))
      }
    },
    { threshold: 0.25 },
  )

  observer.observe(wishSection)

  return () => observer.disconnect()
}, [])

  useEffect(() => {
  const wishSection = document.getElementById('wish')

  if (!wishSection) return undefined

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        window.dispatchEvent(new Event('birthday-start-music'))
      }
    },
    {
      threshold: 0.25,
    },
  )

  observer.observe(wishSection)

  return () => observer.disconnect()
}, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

 const scrollTo = (id) => {
  // Start the birthday music when the user opens
  // the birthday wish or navigates to the Wishes section.
  if (id === 'wish' || id === 'wishes') {
    window.dispatchEvent(new Event('birthday-start-music'))
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

  setMenuOpen(false)
}

  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <BackgroundMusic />
      {loading ? <LoadingScreen /> : (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="petal-field" aria-hidden="true">
        {petals.map((petal) => <span key={petal.id} className="floating-petal" style={petal} />)}
      </div>

      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={scrollTo}
        items={navItems}
      />

      <main>
        <section className="hero section" ref={heroRef} id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <Reveal className="hero-copy">
              <p className="eyebrow">A little birthday note, wrapped in tulips</p>
              <h1 id="hero-title">Happy Birthday, <em>LAXMI</em> <span aria-hidden="true">🌷</span></h1>
              <p className="hero-subtitle">Some people quietly make ordinary moments feel a little more special.</p>
              <button className="button button-primary" onClick={() => scrollTo('wish')}>
                Open Your Birthday Wish <span aria-hidden="true">🌷</span>
              </button>
              <p className="micro-note">Made to be kept as a small, happy memory.</p>
            </Reveal>

            <Reveal className="hero-art" delay="120ms">
              <div className="sun-orb" aria-hidden="true" />
              <div className="hero-tulip-wrap" aria-hidden="true">
                <Tulip color="coral" size="large" />
              </div>
              <div className="hero-leaf leaf-a" aria-hidden="true" />
              <div className="hero-leaf leaf-b" aria-hidden="true" />
              <div className="hero-glass-card">
                <span>22 · 10 · 2007</span>
                <strong>Another chapter begins.</strong>
              </div>
            </Reveal>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo('wish')} aria-label="Scroll to birthday wish">
            <span />
          </button>
        </section>

        <section className="section message-section" id="wish" aria-labelledby="wish-title">
          <div className="container narrow">
            <Reveal>
              <p className="section-kicker">For your birthday</p>
              <h2 id="wish-title">A wish, without needing a reason.</h2>
              <div className="message-card glass-panel">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>Happy Birthday! 🌷</p>
                <p>I hope this year gives you more reasons to smile, more peaceful days, and plenty of little moments that become good memories without you even planning them.</p>
                <p>You have a genuinely kind way of being, and that is something worth holding on to. I’m really glad our paths crossed and that we have a connection that feels easy, genuine, and simply nice to have.</p>
                <p>I hope life is gentle with you this year, that you keep finding things that make you curious, and that you have people around you who make you feel appreciated for who you are.</p>
                <p>Keep being the kind person you are. Have a beautiful birthday, and an even better year ahead.</p>
                <div className="signature">— with a little tulip-shaped good luck</div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section garden-section" id="garden" ref={gardenRef} aria-labelledby="garden-title">
          <div className="container">
            <Reveal className="section-heading center">
              <p className="section-kicker">A small garden for you</p>
              <h2 id="garden-title">Let the flowers do the talking.</h2>
              <p>Some flowers are beautiful because of how they look. Some people are beautiful because of how they make others feel.</p>
            </Reveal>

            <div className={`garden-scene ${gardenVisible ? 'is-visible' : ''}`}>
              <div className="garden-sky" aria-hidden="true">
                <span className="sun-disc" />
                <span className="cloud cloud-a" />
                <span className="cloud cloud-b" />
              </div>
              <div className="garden-ground" aria-hidden="true" />
              <div className="tulip-row" aria-label="Animated tulip garden">
                {['coral', 'yellow', 'lavender', 'peach', 'red', 'cream', 'coral', 'lavender'].map((color, index) => (
                  <div className="garden-flower" key={`${color}-${index}`} style={{ '--delay': `${index * 90}ms`, '--lean': `${(index % 3 - 1) * 2.5}deg` }}>
                    <Tulip color={color} size={index % 2 ? 'small' : 'medium'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section wishes-section" id="wishes" aria-labelledby="wishes-title">
          <div className="container">
            <Reveal className="section-heading">
              <p className="section-kicker">A few things I wish for you</p>
              <h2 id="wishes-title">The good stuff, in no particular order.</h2>
            </Reveal>
            <div className="wish-grid">
              {wishes.map((wish, index) => (
                <Reveal key={wish.title} delay={`${index * 60}ms`}>
                  <WishCard {...wish} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section connection-section" id="connection" aria-labelledby="connection-title">
          <div className="container connection-grid">
            <Reveal className="connection-art" aria-hidden="true">
              <div className="ring ring-one" />
              <div className="ring ring-two" />
              <Tulip color="lavender" size="medium" />
            </Reveal>
            <Reveal className="connection-copy" delay="100ms">
              <p className="section-kicker">Something worth appreciating</p>
              <h2 id="connection-title">Some Connections Are Simply Special</h2>
              <p>Not every meaningful connection needs a label. Sometimes, it’s simply about meeting someone kind, understanding each other, sharing a few moments, and being glad that your paths crossed.</p>
              <p>There’s something nice about the people who make life feel a little lighter just by being themselves. This is simply a small way of saying: I’m glad you’re one of those people.</p>
            </Reveal>
          </div>
        </section>

        <section className="section date-section" aria-labelledby="date-title">
          <div className="container date-layout">
            <Reveal className="date-card glass-panel">
              <p className="section-kicker">A date worth remembering</p>
              <h2 id="date-title">22 October 2007</h2>
              <div className="date-divider" />
              <p>Another chapter begins.</p>
            </Reveal>
            <Reveal className="date-note" delay="120ms">
              <span className="mini-tulip" aria-hidden="true">🌷</span>
              <p>Here’s to the pages ahead — the ordinary ones, the surprising ones, and the ones that turn into stories you’re glad you lived.</p>
            </Reveal>
          </div>
        </section>

        <section className="section final-section" aria-labelledby="final-title">
          <div className="container final-content">
            <Reveal>
              <p className="section-kicker">One Last Wish 🌷</p>
              <h2 id="final-title">May the year ahead feel like it has room for you.</h2>
              <p>I hope when you look back at this year, you find more smiles than worries, more memories than regrets, and more moments that make you genuinely happy.</p>
              <p>Happy Birthday once again. Stay kind, stay curious, keep smiling, and keep being you.</p>
              <p>Wishing you a beautiful year ahead. 🌷</p>
              <div className="final-name">Happy Birthday, LAXMI. <span aria-hidden="true">🌷</span></div>
              <button className="button button-secondary" onClick={replay}>Replay the Wish <span aria-hidden="true">↻</span></button>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Made with tulips, good wishes, and a little patience.</span>
        <button onClick={replay}>Back to top ↑</button>
      </footer>
    </div>
      )}
    </>
  )
}

export default App
