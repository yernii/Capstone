import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import "./ForumTabs.css";
function ForumTabs() {
  const { userId } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [forums, setForums] = useState([]);
  const [posts, setPosts] = useState([]);
  console.log(userId)
  useEffect(() => {
    const fetchForums = async () => {
      const response = await fetch(`/forum/list/${userId}`);
      const forums = await response.json();
      setForums(forums);
    };
    fetchForums();
  }, [userId]);

  const loadPosts = async (forumId) => {
    const response = await fetch(`/forum/${forumId}/posts`);
    const { posts } = await response.json();
    setPosts(posts);
    console.log(posts, "ff");
  };

  useEffect(() => {
    if (forums.length > 0) {
      const forumId = forums[value]._id;
      loadPosts(forumId);
    }
  }, [forums, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const forumId = forums[newValue]._id;
    setPosts([]);
    loadPosts(forumId);
  };

  return (
    <div>
      <h3>Forums List</h3>
      {forums.length>0 ? (
        <Tabs value={value} onChange={handleChange}>
          {forums.map((forum) => (
            <Tab label={forum.title} key={forum._id} />
          ))}
        </Tabs>
      ) : (
        <p>No forums Found</p>
      )}

      {Array.isArray(posts) &&
        posts?.map((post) => (
          <Link to={`/forum/${post._id}`}>
            <div className="forum-list-item" key={post._id}>
              <p>{post.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ForumTabs;
