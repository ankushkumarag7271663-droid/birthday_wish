import { Tulip } from './Tulip.jsx'

export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Preparing the birthday experience">
      <div className="loading-flower"><Tulip color="coral" size="small" /></div>
      <p>Growing a little birthday garden…</p>
    </div>
  )
}
