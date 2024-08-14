import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UseContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://airbnb-backend-tm1o.onrender.com/login', { email, password }, {
        withCredentials: true
      });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.error('There was an error!', error);
      setError('Login failed. Please try again.');
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div className="flex justify-center m-8 grow items-center justify-around">
      <div className="max-w-md w-full p-6 border rounded-md shadow-md">
        <div className="text-center mb-4">
          <h3 className="text-4xl mb-4">Login or Sign up</h3>
          <h5 className="text-3xl">Welcome to Airbnb</h5>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="w-full" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="user@gmail.com"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="***"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-primary text-white p-2 rounded-md">Login</button>
          <div className="text-center py-2 text-gray-400">
            Don't have an Account? <Link className="underline text" to={'/register'}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
