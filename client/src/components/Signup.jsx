import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

// Firebase Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

// Firestore
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      const firestoreUser = {
        name: formData.name,
        email: formData.email,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), firestoreUser);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with signing up');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <input
        type='text'
        value={name}
        placeholder='Name'
        name='name'
        onChange={handleChange}
      />
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

export default Signup;
