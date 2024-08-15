import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Notes() {
    return (
        <>
            <nav className="sidebar">
                <ul className="sidebar-nav">
                    <li><Link to="/Techniques">Study Techniques</Link></li>
                    <li><Link to="/ai">AI Study Assistant</Link></li>
                </ul>
            </nav>
            <header>
                Notes
            </header>
            <main>
            </main>
        </>
    );
}

export default Notes;
