import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return user ? (
    <h3>
      {user.displayName} <button onClick={handleLogout}>Log Out</button>
    </h3>
  ) : (
    'Not logged in'
  );
};

export default Profile;
