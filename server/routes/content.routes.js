const express = require("express");
// const jwtVerify = require("../middleware/jwtVerify");
const {
  summarize,
  getArticles,
  postArticle,
  updateArticle,
  getOwnArticles,
  getArticle,
  generateQ,
} = require("../controllers/content/content");
const router = express.Router();
router.get("/articles", getArticles);
router.get("/articles/:id", getOwnArticles);
router.get("/article/:id", getArticle);
router.post("/articles", postArticle);
router.put("/articles/:id", updateArticle);
router.post("/summarize", summarize);
router.post("/generate-questions", generateQ);

module.exports = router;
