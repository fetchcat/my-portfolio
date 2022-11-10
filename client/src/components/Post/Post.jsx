import React from 'react';

import './Post.scss';

const Post = ({ post, auth }) => {
  const formatDate = (date) => {
    return new Date(date * 1000).toLocaleDateString();
  };
  return (
    <div className='post'>
      <div>{post.title}</div>
      <div>{formatDate(post.created.seconds)}</div>
      <div>{post.description}</div>
      <div>{post.body}</div>
      {auth && (
        <div>
          <button onClick={() => navigate(`/editpost/${post.id}`)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Post;
