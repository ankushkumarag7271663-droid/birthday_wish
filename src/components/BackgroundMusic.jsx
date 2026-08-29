import { useEffect, useRef } from 'react'

const SONG_SRC = `${import.meta.env.BASE_URL}assets/birthday-song.mp3`

export function BackgroundMusic() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = 0.75
    audio.loop = true

    const playMusic = () => {
      if (!audio.paused) return

      audio.play().catch(() => {
        // Browser autoplay may be blocked.
      })
    }

    // Try autoplay when website opens
    playMusic()

    // Start music from birthday buttons/menu
    const startFromAction = () => {
      playMusic()
    }

    window.addEventListener(
      'birthday-start-music',
      startFromAction,
    )

    return () => {
      window.removeEventListener(
        'birthday-start-music',
        startFromAction,
      )

      audio.pause()
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={SONG_SRC}
      preload="auto"
      autoPlay
      loop
      aria-hidden="true"
    />
  )
}