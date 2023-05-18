import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../../context/Context";
import CalendarHeatmap from "react-calendar-heatmap";
import RegisterCheck from "../../components/RegisterCheck.js/RegisterCehck";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProfilePage() {
  const { email, userId, userType } = useContext(AuthContext);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [articles, setArticles] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [contributionHistory, setContributionHistory] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function formatContributionHistory(contributionHistory) {
    const formattedHistory = contributionHistory.map((contribution) => {
      const { date, count } = contribution;
      const formattedDate = new Date(date).toISOString().slice(0, 10);
      return { date: formattedDate, count };
    });
    // Return the formatted contribution history
    return formattedHistory;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = 0;
        response = await fetch(`/users/profile/${email}`);
        const data = await response.json();
        setProfileData(data);
        setContributionHistory(
          formatContributionHistory(data.contributionHistory)
        );
      } catch (error) {
        console.error(error);
      }
    };
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/content/articles/${userId}`);
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    fetchArticles();
  }, [email, userId, contributionHistory]);
  const handlePostChange = (event) => {
    setPost(event.target.value);
  };
  const handleTagChange = (event) => {
    setTag(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  // const handlePostSubmit = (event) => {
  //   event.preventDefault();
  //   setPostsHistory([...postsHistory, post]);
  //   setPost("");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/content/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: post, tag: tag, author: userId, title }),
      });

      if (response.ok) {
        console.log("Success");
      } else {
        // Handle error notification
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!userId) {
    return <RegisterCheck />;
  }
  return (
    <>
      <div className="profile-card">
        <div className="profile__image">
          <PersonIcon style={{ fontSize: 300 }} />
        </div>
        <div className="profile__desc">
          <h2>Welcome, {profileData?.email}</h2>
          <p>Name: {profileData?.name}</p>
          <p>Email: {profileData?.email}</p>
          <p>Occupation: {profileData?.occupation}</p>
          <p>
            Date of Birth:{" "}
            {profileData && new Date(profileData.DoB).toLocaleDateString()}
          </p>
          <p>University: {profileData?.university}</p>
        </div>
      </div>
      <div class="post-form-profile">
        <Button onClick={handleOpen}>Create a post</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a post
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} class="post-form__form">
                <div class="post-form__field">
                  <label class="post-form__label" for="post-title">
                    Title:
                  </label>
                  <input
                    id="post-title"
                    class="post-form__input"
                    onChange={handleTitleChange}
                  />
                </div>
                <div class="post-form__field">
                  <label class="post-form__label" for="post-content">
                    Content:
                  </label>
                  <textarea
                    id="post-content"
                    class="post-form__textarea"
                    value={post}
                    onChange={handlePostChange}
                  />
                </div>
                <div class="post-form__field">
                  <label class="post-form__label" for="post-forum">
                    Tag:
                  </label>
                  <input
                    id="post-forum"
                    class="post-form__input"
                    onChange={handleTagChange}
                  />
                </div>
                <br />
                <button type="submit" class="submit_post_btn">
                  Submit
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="posts-history-div">
        <h2>Posts History</h2>
        {articles ? (
          articles?.map((post) => (
            <Link to={`/articles/${post._id}`}>
              <div className="forum-list-item" key={post._id}>
                <p>{post.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
      {userType.value !== "professor" && (
        <div className="contribution_map">
          {" "}
          <h2>Contribution History</h2>
          <CalendarHeatmap
            startDate={new Date("2023-01-01")}
            endDate={new Date("2023-12-01")}
            values={contributionHistory}
          />
        </div>
      )}
    </>
  );
}

export default ProfilePage;
