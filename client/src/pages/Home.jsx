import React, { useState, useEffect } from 'react';

// Firestore
import { getDocs, collection, orderBy, query, limit } from 'firebase/firestore';

// Firebase Config
import { db } from '../config/firebase';

import { getAuth } from 'firebase/auth';

// Components
import Spinner from '../components/Spinner/Spinner';
import Post from '../components/Post/Post';

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const getPosts = async () => {
      // Post Query, sort by timestamp and get first 5
      const q = await query(
        collection(db, 'posts'),
        orderBy('created'),
        limit(5)
      );

      const rawPosts = await getDocs(q);

      const postList = await rawPosts.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));

      setPosts(postList);
    };
    getPosts();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h3>Home</h3>

      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          posts?.map((post) => (
            <Post key={post.id} post={post} auth={auth.currentUser} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
