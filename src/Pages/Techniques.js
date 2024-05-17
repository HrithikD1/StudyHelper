import React from 'react'
import { Link } from 'react-router-dom'

export default function Techniques() {
  return (
    <>
      <nav className="sidebar">
        <ul className="sidebar-nav">
          <li><Link to="/Techniques">Study Techniques</Link></li>
          <li><Link to="/timers">Timers</Link></li>
          <li><Link to="/ai">AI Study Assistant</Link></li>
        </ul>
      </nav>
      <header>
        <h1>Study Techniques</h1>
        <hr />
        <p>These are the study techniques below, which are used mostly.</p>
      </header>
      <main>
        <section>
          <h1>Pomodoro.</h1>
          <p><em>The <mark>Pomodoro Technque</mark> is used oftenly <mark>when studying for a test.</mark><br /> It is implemented by working, usually 25 mins with full focus and then taking a five min break to ease the stress. It helps you to focus on the topic and still not be exhausted by it.</em></p>
          <h2>Click here to continue to the timer.</h2>
        </section>
        <hr />
        <section>
          <h1>Blurting.</h1>
          <p><em>The <mark>Blurting Technique</mark> is used to remember the given study material easily and be able to rembember the points which important on a topic for a subjective test where you are required to elaborate the answer to a question.</em></p>
          <h2>Click here to continue to the steps.</h2>
        </section>
      </main>
    </>
  )
}
