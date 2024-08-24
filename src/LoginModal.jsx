import React, { useState, useContext } from 'react';
import { UserContext } from '../UseContext';
import axios from 'axios';

export default function LoginModal({ closeModal, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();   

    try {
      const { data } = await axios.post(
        'https://airbnb-backend-tm1o.onrender.com/api/auth/login',
        { email, password },
        {
          withCredentials: true
        }    
      );
      localStorage.setItem('isAuthenticated', 'true');
      setUser(data);
      onSuccess(); // Trigger success callback
    } catch (error) {
      console.error('Login failed', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-700 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border dark:border-gray-700 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
