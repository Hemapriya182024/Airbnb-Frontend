import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    setLoading(true); // Set loading state to true
  
    try {
      const userDoc = await axios.post('https://airbnb-backend-tm1o.onrender.com/api/auth/register', {
        name,
        email,
        password
      }, {
        withCredentials: true
      });
      setSuccess('User registered successfully!');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      console.error('There was an error!', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className='flex justify-center m-8 grow flex items-center justify-around'>
      <div className='max-w-md w-full p-6 border rounded-md shadow-md'>
        <div className='text-center mb-4'>
          <h3 className='text-4xl mb-4'>Register</h3>
          <h5 className='text-3xl'>Welcome to Airbnb</h5>
        </div>
        <form className='w-full' onSubmit={registerUser}>
          <input
            type="text"
            placeholder='Enter your full name'
            className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder='user@gmail.com'
            className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='***'
            className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='w-full bg-primary text-white p-2 rounded-md'>
            {loading ? 'Registering...' : 'Register'} {/* Loading indicator */}
          </button>
          {success && <p className='text-green-500 text-center mt-4'>{success}</p>}
          {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
          <div className='text-center py-2 text-gray-400'>
            Already a member? <Link className="underline text" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
