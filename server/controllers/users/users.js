const User = require("../../models/User");

async function viewProfile(req, res) {
  try {
    const user = await User.findOne({
      email: req.params.email,
    }).populate("contributionHistory");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  viewProfile,
};
