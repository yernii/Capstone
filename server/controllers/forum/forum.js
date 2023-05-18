const Post = require("../../models/Post");
const Forum = require("../../models/Forum");
const User = require("../../models/User");
const { Types } = require("mongoose");

async function updateContributionHistory(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const contribution = user.contributionHistory.find(
      (c) => c.date.toDateString() === currentDate.toDateString()
    );
    if (!contribution) {
      // create new contribution if not found
      user.contributionHistory.push({ date: formattedDate, count: 1 });
      await user.save();
    } else {
      // update existing contribution
      contribution.count += 1;
      await user.save();
    }
  } catch (err) {
    console.error(err);
  }
}

async function postPost(req, res) {
  try {
    // Find the forum by title
    const forum = await Forum.findOne({ title: req.body.forum });
    if (!forum) {
      return res.status(404).json({ error: "Forum not found." });
    }

    // Create the post with the required details
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      forum: forum._id,
    });
    forum.posts.push(post._id);
    await forum.save();
    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
}

// Get all posts
async function getPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
}

// Get a specific post by ID
async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
}

async function getComments(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate(
      "author comments.user comments.replies.user"
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
// Add a comment to a post
async function addComment(req, res) {
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res
      .status(400)
      .json({ error: "Please provide a user and a comment text." });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const objectId = new Types.ObjectId(userId);

    const comment = { user: objectId, text };
    post.comments.push(comment);
    await post.save();
    await updateContributionHistory(userId);
    res.json({ comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
}

async function createForum(req, res) {
  const { title, userId } = req.body;
  const accessCode = Math.random().toString(36).substr(2, 8);
  const newForum = new Forum({
    title,
    creator: userId, // for proffesor only
    passcode: accessCode,
  });
  newForum.members.push(userId);

  try {
    const forum = await newForum.save();
    const user = await User.findById(userId);
    user.forums.push(forum._id);
    await user.save();
    res.status(201).json({ forum: newForum });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listForums(req, res) {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("forums");
    if (!user) {
      return res.status(404).send("User not found");
    }
    const forums = user.forums;
    return res.status(200).json(forums);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

async function listForumPosts(req, res) {
  try {
    const forum = await Forum.findById(req.params.forumId).populate("posts");
    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }
    const posts = forum.posts;
    return res.json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function joinForum(req, res) {
  const { userId, forumCode } = req.body;

  try {
    // Find the forum based on the provided code
    const forum = await Forum.findOne({ passcode: forumCode });

    // If the forum doesn't exist, return an error response
    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    // If the user is already a member of the forum, return a success response
    if (forum.members.includes(userId)) {
      return res
        .status(200)
        .json({ message: "User already a member of the forum" });
    }

    // Add the user to the forum's list of members
    forum.members.push(userId);
    await forum.save();
    const user = await User.findById(userId);
    user.forums.push(forum._id);
    await user.save();
    // Return a success response
    res.status(200).json({ message: "User joined the forum" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Add a reply to a comment
async function addReply(req, res) {
  const { user, text } = req.body;

  if (!user || !text) {
    return res
      .status(400)
      .json({ error: "Please provide a user and a reply text." });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    const reply = { user, text };
    comment.replies.push(reply);
    await post.save();

    res.json({ reply });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error." });
  }
}

module.exports = {
  addReply,
  addComment,
  postPost,
  getPosts,
  getPost,
  createForum,
  listForums,
  joinForum,
  listForumPosts,
  getComments,
};
