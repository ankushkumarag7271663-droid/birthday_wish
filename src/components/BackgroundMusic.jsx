import { useEffect, useRef } from 'react'

const SONG_SRC = '/assets/birthday-song.mp3'

export function BackgroundMusic() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.75

    const playMusic = () => {
      if (!audio.paused) return
      audio.play().catch(() => {
        // Audible autoplay can be blocked by the browser.
        // The first user interaction below retries playback.
      })
    }

    // Start as soon as the audio element is mounted.
    playMusic()

    const retry = () => {
      playMusic()
      window.removeEventListener('pointerdown', retry)
      window.removeEventListener('keydown', retry)
      window.removeEventListener('touchstart', retry)
    }

    window.addEventListener('pointerdown', retry, { once: true })
    window.addEventListener('keydown', retry, { once: true })
    window.addEventListener('touchstart', retry, { once: true, passive: true })

    return () => {
      window.removeEventListener('pointerdown', retry)
      window.removeEventListener('keydown', retry)
      window.removeEventListener('touchstart', retry)
      audio.pause()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={SONG_SRC}
      preload="auto"
      autoPlay
      aria-hidden="true"
    />
  )
}
