import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import PersonIcon from "@mui/icons-material/Person";
import "./ForumPost.css";

function ForumPost() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  let { postId } = useParams();
  const { userId } = useContext(AuthContext);

  // Fetch post data and comments when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          fetch(`/forum/posts/${postId}`),
          fetch(`/forum/posts/${postId}/comments`),
        ]);
        const [postJson, commentsJson] = await Promise.all([
          postResponse.json(),
          commentsResponse.json(),
        ]);
        setPost(postJson.post);
        setComments(commentsJson.comments);
      } catch (error) {
        setError("Server error.");
      }
    }
    fetchData();
  }, [postId]);

  // Add a new comment
  async function handleSubmitComment(event) {
    event.preventDefault();
    const text = event.target.elements.text.value;
    if (!userId || !text) {
      setError("Please provide a user and a comment text.");
      return;
    }

    try {
      const response = await fetch(`/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text }),
      });
      const json = await response.json();
      setComment(json.comment);
      setComments([...comments, json.comment]);
      setError(null);
    } catch (error) {
      setError("Server error.");
    }
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div>
      <div className="single_forum_body">
        <h1>{post.title}</h1>
        <div className="author-forum">by {post.author.name}</div>
        <p>{post.content}</p>
      </div>
      <h3>Comments:</h3>
      {comments?.map((comment) => (
        <div key={comment._id}>
          <div className="single_comment">
            <PersonIcon style={{ fontSize: 20 }} />
            <strong>{comment.user.name}</strong>: {comment.text}
          </div>
        </div>
      ))}
      <div className="forum-add-ccomment">
        <h3>Add Comment</h3>
        <form onSubmit={handleSubmitComment}>
          <input type="text" name="text" placeholder="Your comment" />
          <br />
          <button type="submit" className="submit_post_btn single-forum-btn">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForumPost;
