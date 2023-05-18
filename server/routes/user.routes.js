const express = require("express");
const router = express.Router();
const { viewProfile } = require("../controllers/users/users");

router.get("/profile/:email", viewProfile);

module.exports = router;
