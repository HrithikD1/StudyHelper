import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/MainMenu.css';
import Auth from './Login';
import pb from '../pocketbase'; // Ensure this import is correct

export default function MainMenu() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    // Check if `pb` and `pb.authStore` are defined
    if (pb && pb.authStore) {
      setCurrentUser(pb.authStore.isValid);
    } else {
      console.error('PocketBase or authStore is not defined.');
    }
  }, []);

  return (
    <>
      <header>
        <h1>StudyHelper</h1>
        <br />
      </header>
      <main>
        {currentUser ? (
          <>
            <p>This is a project in hopes to help every student get good grades and focus on studies when needed.</p>
            <p>It has various study techniques, timers, and an AI that explains a topic for a test and generates questions on it for practice.</p>
            <section>
              <h2>Click Here to Continue ⬇️</h2>
              <Link to='/Dashboard'>Continue</Link>
            </section>
          </>
        ) : (
          <Auth />
        )}
      </main>
      <footer>
        {/* Footer content here */}
      </footer>
    </>
  );
}
