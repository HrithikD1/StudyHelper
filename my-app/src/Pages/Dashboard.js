// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Timetable from './Timetable';
import './Styles/Dashboard.css';

function Clock() {
    const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm a'));
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(moment().format('MMMM Do YYYY, h:mm a'));
      }, 1000); // Update every second
      let n = 0
      console.log("time update", n)
      n++;
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);
  
    return <h1>{currentTime}</h1>;
  }

export default function Dashboard() {
    return (
        <>
            <nav className="sidebar">
                <ul className="sidebar-nav">
                    <li><Link to="/Techniques">Study Techniques</Link></li>
                    <li><Link to="/timers">Timers</Link></li>
                    <li><Link to="/ai">AI Study Assistant</Link></li>
                </ul>
            </nav>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <header>
                        <h1>Welcome to StudyHelper Dashboard</h1>
                    </header>
                    <main>
                        <p>This is your StudyHelper dashboard. Navigate through the links on the left to access different features.</p>
                        <Clock />
                        {/* Add additional dashboard content here */}
                    </main>
                    <section>
                        <Timetable />
                    </section>
                    <footer>
                        <p>© 2024 StudyHelper. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
