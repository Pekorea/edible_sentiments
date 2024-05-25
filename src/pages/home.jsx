import { useState, useEffect } from "react";
import Navbar from "../components/Navsydbar";
import SentimentAnalyzer from "./sentimenttest";
import AuthProvided from "../lib/auth";
import { AiOutlineSend } from "react-icons/ai";
import Loading from "../components/loadingscn";
import { toast, Toaster } from "react-hot-toast";
import { fetchVendorPosts,deleteComment, deletePost, CommenT, fetchComments } from "../lib/helper"; // Adjust imports
import { CiTrash } from "react-icons/ci";

const SENTIMENT_ANALYSIS_URL = 'http://127.0.0.1:5000/analyze_sentiment';


function Home() {
  const { userId } = AuthProvided();
  console.log(userId);

  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentsInput, setCommentsInput] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (!userId) {
          throw new Error('User not authenticated');
        }
        const postsData = await fetchVendorPosts(userId);
        setPosts(postsData);
        console.log(posts)
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching posts: ' + error.message);
        setLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const allComments = await Promise.all(posts.map(post => fetchComments(post.id)));
        const commentsMap = posts.reduce((acc, post, index) => {
          acc[post.id] = allComments[index];
          return acc;
        }, {});
        setComments(commentsMap);
      } catch (error) {
        toast.error('Error fetching comments: ' + error.message);
      }
    };

    if (posts.length > 0) {
      fetchAllComments();
    }
  }, [posts]);

  const toggleComments = async (postId) => {
    const isVisible = commentsVisible[postId];
    setCommentsVisible((prevState) => ({
      ...prevState,
      [postId]: !isVisible,
    }));

    if (!isVisible && !comments[postId]) {
      try {
        const fetchedComments = await fetchComments(postId);
        setComments((prevState) => ({
          ...prevState,
          [postId]: fetchedComments,
        }));
      } catch (error) {
        toast.error('Error fetching comments: ' + error.message);
      }
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
      setComments(prevState => ({
        ...prevState,
        [postId]: prevState[postId].filter(comment => comment.id !== commentId)
      }));
      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error('Error deleting comment: ' + error.message);
    }
  };
  const handleDelete = async (postId, imageUrl) => {
    try {
      await deletePost(postId, imageUrl);
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Error deleting post: ' + error.message);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  const handlecomchange = (e, postId) => {
    setCommentsInput((prevState) => ({
      ...prevState,
      [postId]: e.target.value,
    }));
  };

  const analyzeSentiment = async (comment) => {
    try {
      const response = await fetch(SENTIMENT_ANALYSIS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return null;
    }
  };

  const handlecomsub = async (VendorId, PostId, comment) => {
    try {
      const sentimentData = await analyzeSentiment(comment);
      if (sentimentData) {
        await CommenT(VendorId, PostId, comment, sentimentData.label, sentimentData.score);
        toast.success('Comment added successfully!');

        // Clear the comment input
        setCommentsInput((prevState) => ({
          ...prevState,
          [PostId]: '',
        }));

        // Re-fetch comments after adding a new one
        const updatedComments = await fetchComments(PostId);
        setComments((prevState) => ({
          ...prevState,
          [PostId]: updatedComments,
        }));
      } else {
        toast.error('Failed to analyze sentiment. Please try again.');
      }
    } catch (e) {
      console.error('error', e);
      toast.error('Error adding comment: ' + e.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className='homebody'>
      <Toaster />
      <Navbar />
      {posts.length === 0 ? (
        <div className="sentAZ">
          <SentimentAnalyzer />
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="packageDEY">
            <div className="post1">
              <div className="postheader">
                <h2 className="post1h2">{post.name}</h2>
                <CiTrash onClick={() => handleDelete(post.id, post.pictureurl)} className="deleteicon"/>
              </div>
              <div className="postcaption">{post.caption}</div>
              <img 
                src={post.pictureurl}
                className="foodpic"
                alt={post.caption}
              />
              <div className="commentsbtndiv">
                <button type="button" onClick={() => toggleComments(post.id)}>
                  {commentsVisible[post.id]
                    ? `Hide Comments (${post.numcomments})`
                    : `View Comments (${post.numcomments})`}
                </button> 
                <p>{formatDate(post.created_at.toDate())}</p>
              </div>
              {commentsVisible[post.id] && (
                <div className={`comments-container ${commentsVisible[post.id] ? 'show' : ''}`}>
                  <div className="comments-content">
                    <div>
                      <p className='commentsh3'>Comments {` (${post.numcomments})`}</p>
                      <button type="button" className="close-btn" onClick={() => toggleComments(post.id)}>X</button>
                    </div>
                    {comments[post.id]?.length === 0 ? (
                      <div className="nocom">
                        <h1>No comments for this post yet</h1>
                      </div>
                    ) : (
                      <div className="yescom">
                        {comments[post.id] && comments[post.id].map((comment)=> (
                          <div className="commentsCont" key={comment.id}>
                              <CiTrash className="deleteicons" onClick={() => handleDeleteComment(post.id, comment.id)}/>
                              <h2 className="commentName">{comment.Name}</h2>
                              <p className="comments">{comment.text}</p>
                              <p>Sentiment: {comment.sentiment}</p>
                              <p>Confidence Score: {comment.score}</p>
                            
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="comments-containertextdiv">
                    <input
                      maxLength={150}
                      value={commentsInput[post.id] || ''}
                      onChange={(e) => handlecomchange(e, post.id)}
                      type="text"
                      placeholder="Type a comment.."
                      required
                    />
                    <div onClick={() => handlecomsub(userId, post.id, commentsInput[post.id])} className="sendiconDiv">
                      <AiOutlineSend className="sendicon" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
