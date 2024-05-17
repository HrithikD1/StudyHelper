import React from 'react'
import { Link } from 'react-router-dom'
import './Styles/MainMenu.css'

export default function MainMenu() {
  return (
    <>
    <header>
        <h1>StudyHelper</h1>
        <br />
    </header>
    <main>
        <p>This is a project in hopes to help every student get good grades and focus on studies when needed.</p>
        <p>It has various study techniques, timers and an ai which explains a topic for an test and generates questions on it for practice.</p>
        <section>
            <h2>Click Here to Continue ⬇️</h2>
            <Link to='/Dashboard'>Continue</Link>
        </section>
    </main>
    <footer>
        
    </footer>
</>
  )
}
