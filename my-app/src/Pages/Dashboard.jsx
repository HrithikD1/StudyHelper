import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for navigation
import Timetable from './Timetable';
import pb from '../pocketbase';
import './Styles/Dashboard.css';

function Clock() {
    const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm a'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format('MMMM Do YYYY, h:mm a'));
        }, 1000); // Update every second
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return <h1>{currentTime}</h1>;
}

export default function Dashboard() {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = async () => {
        try {
            // Log out from PocketBase
            await pb.authStore.clear(); // Clear the authentication store
    
            // Redirect to home page
            navigate('/'); // Redirecting to the home page
        } catch (err) {
            console.error('Logout failed:', err);
            alert('Logout failed. Please try again.');
        }
    };
    

    return (
        <>
            <nav className="sidebar">
                <ul className="sidebar-nav">
                    <li><Link to="/Techniques">Study Techniques</Link></li>
                    <li><Link to="/ai">AI Study Assistant</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li> {/* Corrected this line */}
                </ul>
            </nav>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <header>
                        <h1>Welcome to StudyHelper Dashboard</h1>
                    </header>
                    <main className="main-content">
                        <p>This is your StudyHelper dashboard. Navigate through the links on the left to access different features.</p>
                        <Clock />
                    </main>
                    <section className="recents">
                        <ul>
                            <li></li>
                        </ul>
                    </section>
                    <footer>
                        <hr />
                        <p>© 2024 StudyHelper. All rights reserved.</p>
                    </footer>
                </div>
                <section className="timetable-section">
                    <Timetable />
                </section>
            </div>
        </>
    );
}
