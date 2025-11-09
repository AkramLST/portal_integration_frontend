'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        `https://portal-integration-project-lst.vercel.app/login?name=${username}&password=${password}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      // const data = {};
      // data.success = true;
      // data.token= '73bjdhjdjdhj536476'

      if (data.success && data.token) {
        // Store the token securely (you can use cookies if needed)
        // localStorage.setItem('authToken', data.token);
        document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict;`;
        router.push('/export'); // Navigate to export page
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
