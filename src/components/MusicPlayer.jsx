import { useEffect, useRef, useState } from 'react'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')

  return `${mins}:${secs}`
}

export function MusicPlayer() {
  const audioRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return undefined

    audio.volume = volume
    audio.loop = true

    const onLoaded = () => {
      setDuration(audio.duration)
      setError(false)
    }

    const onTime = () => {
      setProgress(audio.currentTime)
    }

    const onPlay = () => {
      setPlaying(true)
      setError(false)
    }

    const onPause = () => {
      setPlaying(false)
    }

    const onError = () => {
      setPlaying(false)
      setError(true)
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    // Start music after one of the birthday actions.
    const startMusic = () => {
      if (!audio.paused) return

      audio
        .play()
        .then(() => {
          setPlaying(true)
          setError(false)
        })
        .catch(() => {
          // Browser may still block playback in some situations.
        })
    }

    window.addEventListener('birthday-start-music', startMusic)

    // Try normal autoplay when the website opens.
    audio.play().catch(() => {
      // Expected when browser blocks autoplay.
    })

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)

      window.removeEventListener('birthday-start-music', startMusic)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggle = async () => {
    const audio = audioRef.current

    if (!audio) return

    setError(false)

    if (audio.paused) {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
        setError(true)
      }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const seek = (event) => {
    const audio = audioRef.current

    if (!audio || !duration) return

    const next = Number(event.target.value)

    audio.currentTime = next
    setProgress(next)
  }

  const changeVolume = (event) => {
    const next = Number(event.target.value)

    setVolume(next)

    if (audioRef.current) {
      audioRef.current.volume = next
    }
  }

  return (
    <div className="music-player glass-panel">
      <audio
        ref={audioRef}
        preload="auto"
        autoPlay
        loop
        src={`${import.meta.env.BASE_URL}assets/birthday-song.mp3`}
      />

      <div className="music-topline">
        <div className="album-orb" aria-hidden="true">
          <span>♫</span>
        </div>

        <div>
          <span className="music-label">Birthday soundtrack</span>
          <strong>
            {error ? 'Add your song to start' : 'A song you chose'}
          </strong>
        </div>

        <button
          className="play-button"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
      </div>

      <div className="progress-wrap">
        <input
          aria-label="Music progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(progress, duration || 0)}
          onChange={seek}
          disabled={!duration}
        />

        <div className="time-row">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="volume-row">
        <span aria-hidden="true">⌁</span>

        <input
          aria-label="Volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
        />

        <span aria-hidden="true">🔊</span>
      </div>

      <p className="player-hint">
        Your birthday soundtrack is ready in the background.
      </p>
    </div>
  )
}