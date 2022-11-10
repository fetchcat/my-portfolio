import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const EditPost = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
  });

  const { postID } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);

    const existingPost = async () => {
      const post = await getDoc(doc(db, 'posts', postID));

      if (!post.exists()) {
        return navigate('/');
      }

      const postData = await post.data();

      setFormData({
        title: postData.title,
        description: postData.description,
        body: postData.body,
      });
    };

    existingPost();
  }, []);

  console.log(user);

  const { title, description, body } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedPost = {
      title,
      description,
      body,
    };

    try {
      await updateDoc(doc(db, 'posts', postID), editedPost);
      navigate('/profile');
      toast.success('Post has been updated successfully');
    } catch (error) {
      toast.error(error.message);
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Post</h3>
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

export default EditPost;
