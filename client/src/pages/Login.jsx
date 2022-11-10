import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

// Firebase Auth
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Bad User Credentials');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type='email'
        value={email}
        placeholder='Email'
        name='email'
        onChange={handleChange}
      />
      <input
        type='password'
        value={password}
        placeholder='Password'
        name='password'
        onChange={handleChange}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Login;
