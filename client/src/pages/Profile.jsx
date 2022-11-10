import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';

import {
  doc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../config/firebase';
import { toast } from 'react-toastify';

import Post from '../components/Post/Post';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const auth = getAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();

    navigate('/login');
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, 'posts', id);

    try {
      const post = await getDoc(docRef);

      if (!post.exists()) {
        toast.error('Delete item failed');
        return;
      }
      deleteDoc(docRef);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);

      toast.success('Post has been successfully deleted');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setUser(auth.currentUser);

    const getPosts = async () => {
      const q = await query(
        collection(db, 'posts'),
        where('authorRef', '==', auth.currentUser.uid)
      );

      const rawPosts = await getDocs(q);

      const postList = await rawPosts.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));

      setPosts(postList);
    };
    getPosts();
  }, []);

  return user ? (
    <>
      <h3>
        {user.displayName} <button onClick={handleLogout}>Log Out</button>
      </h3>
      <button onClick={() => navigate('/newpost')}>Create Post</button>

      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} auth={auth.currentUser} />
        ))
      ) : (
        <div>No Posts to display</div>
      )}
    </>
  ) : (
    'Not logged in'
  );
};

export default Profile;
