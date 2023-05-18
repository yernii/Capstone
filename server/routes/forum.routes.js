const express = require("express");
const router = express.Router();
const {
  postPost,
  getPost,
  getPosts,
  addComment,
  addReply,
  createForum,
  listForums,
  joinForum,
  listForumPosts,
  getComments,
} = require("../controllers/forum/forum");

router.post("/posts", postPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPost);
router.get("/posts/:id/comments", getComments);
router.post("/posts/:id/comments", addComment);
router.post("/posts/:id/comments/:commentId/replies", addReply);
router.post("/create", createForum);
router.get("/list/:userId", listForums);
router.get("/:forumId/posts", listForumPosts);
router.post("/join", joinForum);

module.exports = router;
