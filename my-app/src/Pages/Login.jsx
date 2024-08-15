// src/Pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase'; // Adjust the import path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Add state for name
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate the user
      await pb.collection('users').authWithPassword(email, password);

      // Fetch the user's profile
      const userId = pb.authStore.model.id;
      const user = await pb.collection('users').getOne(userId);

      // Store user information (e.g., in local storage or context)
      localStorage.setItem('userName', user.name);

      // Redirect to dashboard
      navigate('/Dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
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
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
