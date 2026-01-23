import { useState } from 'react'
import './App.css'
import CountUp from './components/Countup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">Nice Counter</h1>
        <p className="subtitle">Simple, responsive counter with animated numbers</p>
      </header>

      <main className="card" role="main" aria-labelledby="counter-title">
        <h2 id="counter-title" className="sr-only">Counter</h2>

        <div className="controls" role="group" aria-label="Counter controls">
          <button
            aria-label="decrement"
            className="btn btn-decrement"
            onClick={() => setCount(c => Math.max(0, c - 1))}
            disabled={count <= 0}
          >
            <span className="icon">−</span>
          </button>

          <div className="value" aria-live="polite">
            <CountUp to={count} duration={0.6} className="countup" />
          </div>

          <button
            aria-label="increment"
            className="btn btn-increment"
            onClick={() => setCount(c => c + 1)}
          >
            <span className="icon">+</span>
          </button>
        </div>

        <div className="meta">
          <button className="small" onClick={() => setCount(0)}>Reset</button>
         
        </div>
      </main>

      
    </div>
  )
}

export default App