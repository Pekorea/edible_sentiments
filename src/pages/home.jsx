import { useState, useEffect } from "react";
import Navbar from "../components/Navsydbar";
import SentimentAnalyzer from "./sentimenttest";
import AuthProvided from "../lib/auth";
import { AiOutlineSend } from "react-icons/ai";
import Loading from "../components/loadingscn";
import { toast, Toaster } from "react-hot-toast";
import { fetchVendorPosts, getNameandUT } from "../lib/helper";
import { CiTrash } from "react-icons/ci";
import { deletePost } from "../lib/helper";

function Home() {
  const { userId } = AuthProvided();
  console.log(userId);

  const [isloading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [accomments, setAccomments] = useState('');
  const [commentsVisible, setCommentsVisible] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (!userId) {
          throw new Error('User not authenticated');
        }
        const postsData = await fetchVendorPosts(userId);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching posts: ' + error.message);
        setLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  if (isloading) return <Loading />;

  const toggleComments = (postId) => {
    setCommentsVisible((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
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
  const handlecomchange = (e)=>{
    setAccomments(e.target.value)
  }
  const handlecomsub =(e)=>{
    
  }

  return (
    <div className='homebody'>
      <Toaster />
      <Navbar />
      {posts.length === 0 ? (
        <SentimentAnalyzer />
      ) : (
        posts.map((post) => (
          <div key={post.id} className="packageDEY">
            <div className="post1">
              <div className="postheader">
                <h2 className="post1h2">NAMEOFVENDOR</h2>
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
                    {comments.length ===0?(
                      <div className="nocom">
                        <h1>No comments for this post yet</h1>
                      </div>
                   
                    ):(
                      <div className="yescom">
                         <h2 className="commentName">Commentor</h2>
                          <p className="comments">Comment 1</p>
                      </div>
                  )}
                  </div>
                  <div className="comments-containertextdiv">
                  <input maxLength={150} value={accomments} onChange={handlecomchange} type="text" placeholder="Type a comment.." required></input>
                  <AiOutlineSend className="sendicon"/>
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
