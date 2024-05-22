// PostComponent.js
import React, { useState } from 'react';

const PostComponent = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post-container">
      <div className={`post-content ${showComments ? 'blurred' : ''}`}>
        <h2>Post Title</h2>
        <p>Post content goes here...</p>
        <button onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'View Comments'}
        </button>
      </div>
      <div className={`comments-container ${showComments ? 'show' : ''}`}>
        <div className="comments-content">
          <h3>Comments</h3>
          <p>Comment 1</p>
          <p>Comment 2</p>
          <p>Comment 3</p>
          <button onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'View Comments'}
        </button>
        </div>
      </div>
    </div>
  );
};
export default PostComponent;
