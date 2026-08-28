import { useEffect, useRef, useState } from 'react'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [error, setError] = useState(false)
  const autoplayTriedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    audio.volume = volume
    audio.autoplay = true
    const onLoaded = () => { setDuration(audio.duration); setError(false) }
    const onTime = () => setProgress(audio.currentTime)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    const onError = () => { setPlaying(false); setError(true) }
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    // Try autoplay when the experience opens. Browsers may block audible autoplay;
    // if that happens, we silently retry after the first user interaction.
    const tryAutoplay = async () => {
      if (autoplayTriedRef.current || !audio.paused) return
      autoplayTriedRef.current = true
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Browser autoplay policy blocked sound. Don't show an error just for that.
      }
    }
    const retryAfterInteraction = () => {
      if (!audio.paused) return
      audio.play().then(() => setPlaying(true)).catch(() => {})
      window.removeEventListener('pointerdown', retryAfterInteraction)
      window.removeEventListener('keydown', retryAfterInteraction)
    }
    void tryAutoplay()
    window.addEventListener('pointerdown', retryAfterInteraction, { once: true })
    window.addEventListener('keydown', retryAfterInteraction, { once: true })

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      window.removeEventListener('pointerdown', retryAfterInteraction)
      window.removeEventListener('keydown', retryAfterInteraction)
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
    if (audioRef.current) audioRef.current.volume = next
  }

  return (
    <div className="music-player glass-panel">
      <audio ref={audioRef} preload="auto" autoPlay src="/assets/birthday-song.mp3" />
      <div className="music-topline">
        <div className="album-orb" aria-hidden="true"><span>♫</span></div>
        <div>
          <span className="music-label">Birthday soundtrack</span>
          <strong>{error ? 'Add your song to start' : 'A song you chose'}</strong>
        </div>
        <button className="play-button" onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
          {playing ? 'Ⅱ' : '▶'}
        </button>
      </div>
      <div className="progress-wrap">
        <input aria-label="Music progress" type="range" min="0" max={duration || 0} step="0.1" value={Math.min(progress, duration || 0)} onChange={seek} disabled={!duration} />
        <div className="time-row"><span>{formatTime(progress)}</span><span>{formatTime(duration)}</span></div>
      </div>
      <div className="volume-row">
        <span aria-hidden="true">⌁</span>
        <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={changeVolume} />
        <span aria-hidden="true">🔊</span>
      </div>
      <p className="player-hint">Your birthday soundtrack is ready in the background.</p>
    </div>
  )
}
