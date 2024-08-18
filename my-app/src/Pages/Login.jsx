import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase';
import './Styles/Auth.css'; // Import the CSS file

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignup) {
        // Sign up process
        await pb.collection('users').create({ email, password });
        await pb.collection('users').authWithPassword(email, password); // Auto-login after signup
      } else {
        // Login process
        await pb.collection('users').authWithPassword(email, password);
      }

      // Store user information in local storage
      const userId = pb.authStore.model.id;
      const user = await pb.collection('users').getOne(userId);
      localStorage.setItem('userName', user.name || ''); // Store user name if available

      // Redirect to the dashboard
      navigate('/Dashboard');
    } catch (err) {
      console.error('Authentication error:', err); // Log error for debugging
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="form-container">
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {isSignup ? (loading ? 'Signing Up...' : 'Sign Up') : (loading ? 'Signing In...' : 'Sign In')}
        </button>
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
