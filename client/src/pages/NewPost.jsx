import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const NewPost = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
  });

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  console.log(user);

  const { title, description, body } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      authorRef: user.uid,
      created: serverTimestamp(),
      title,
      description,
      body,
    };

    try {
      const data = await addDoc(collection(db, 'posts'), newPost);
      navigate('/profile');
      toast.success('Post has been successfully created');
    } catch (error) {
      toast.error(error.message);
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Post</h3>
      <button onClick={() => navigate('/profile')}>back</button>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={title}
        onChange={handleChange}
      />
      <input
        type='text'
        name='description'
        placeholder='description'
        value={description}
        onChange={handleChange}
      />
      <textarea
        name='body'
        placeholder='Enter post....'
        value={body}
        onChange={handleChange}
      ></textarea>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default NewPost;
