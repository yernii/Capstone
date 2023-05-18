import React, { useState, useContext } from "react";
import ForumTabs from "../../components/ForumTabs/ForumTabs";
import { AuthContext } from "../../context/Context";
import "./Forum.css";
import RegisterCheck from "../../components/RegisterCheck.js/RegisterCehck";

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

const Forum = () => {
  const { userType, userId } = useContext(AuthContext);
  console.log(userType, userId);
  const [forumTitle, setForumTitle] = useState("");
  const [forumCode, setForumCode] = useState("");
  // const [forumList, setForumList] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [forum, setForum] = useState();

  //modal 1
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal 2
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  //modal 3
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // Function to create a new forum
  const createForum = async () => {
    const res = await fetch(`/forum/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: forumTitle,
        userId,
      }),
    });

    if (res.ok) {
      const { forum } = await res.json();
      console.log(forum);
      setForumCode(forum.passcode);
    } else {
      console.error(`Error creating forum: ${res.status}`);
    }
  };

  // Function to join a forum based on its code
  const joinForum = async () => {
    const res = await fetch(`/forum/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        forumCode,
      }),
    });

    if (res.ok) {
      // listForums();
    } else {
      console.error(`Error joining forum: ${res.status}`);
    }
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleForumChange = (event) => {
    setForum(event.target.value);
  };
  // Function to list all forums for the current user
  // const listForums = async () => {
  //   const res = await fetch(`/users/${userId}/forums`);
  //   if (res.ok) {
  //     const forums = await res.json();
  //     setForumList(forums);
  //   } else {
  //     console.error(`Error listing forums: ${res.status}`);
  //   }
  // };

  // Call listForums when the component mounts
  // useEffect(() => {
  //   listForums();
  // }, []);
  console.log(userType.value, "gg");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author: userId, forum: forum }),
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
    <div className="forum-container">
      <div className="forum-forms">
        <div>
          {userType.value === "professor" && (
            <>
              <Button onClick={handleOpen2}>Create a Forum</Button>
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Create a Forum
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div>
                      <h3>Create a new forum</h3>
                      <label htmlFor="forum-title">Forum Title:</label>
                      <input
                        type="text"
                        id="forum-title"
                        value={forumTitle}
                        onChange={(e) => setForumTitle(e.target.value)}
                      />
                      <button className="submit_post_btn" onClick={createForum}>
                        Create
                      </button>
                      {forumCode && (
                        <p>
                          Share this code with your students to allow them to
                          join the forum:
                          <strong>{forumCode}</strong>
                        </p>
                      )}
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </>
          )}

          {userType.value === "student" && (
            <>
              <Button onClick={handleOpen1}>Join Forum</Button>
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Join Forum
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="post-form__field">
                      <h3>Join a forum</h3>
                      <label htmlFor="forum-code" className="post-form__label">
                        Forum Code:
                      </label>
                      <input
                        type="text"
                        class="post-form__input"
                        value={forumCode}
                        onChange={(e) => setForumCode(e.target.value)}
                      />
                      <button
                        className="submit_post_btn join-forum-btn"
                        onClick={joinForum}
                      >
                        Join
                      </button>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </>
          )}
        </div>
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
              <div class="post-form">
                <h3 class="post-form__title">Create a Post</h3>

                <form onSubmit={handleSubmit} class="post-form__form">
                  <div class="post-form__field">
                    <label class="post-form__label" for="post-title">
                      Title:
                    </label>
                    <input
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
                      onChange={handleContentChange}
                    />
                  </div>
                  <div class="post-form__field">
                    <label class="post-form__label" for="post-forum">
                      Forum:
                    </label>
                    <input
                      id="post-forum"
                      class="post-form__input"
                      onChange={handleForumChange}
                    />
                  </div>
                  <br />
                  <button type="submit" className="submit_post_btn">
                    Submit
                  </button>
                </form>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* <div>
        <h3>Your forums</h3>
        <ul>
          {forumList.map((forum) => (
            <li key={forum._id}>
              <strong>{forum.title}</strong> - Code: {forum.code}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="forum-tabs">
        <ForumTabs />
      </div>
    </div>
  );
};

export default Forum;
