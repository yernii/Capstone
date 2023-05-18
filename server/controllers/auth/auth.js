const bcrypt = require("bcryptjs");
const User = require("../../models/User");
// const jwt = require("jsonwebtoken");

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Invalid email or password" });
  }

  // const token = jwt.sign({ email: user.email }, "secret");

  res.status(200).send({ message: "Login successful", id: user._id });
}

async function register(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    occupation: req.body.occupation,
    DoB: req.body.DoB,
    university: req.body.university,
    email: req.body.email,
    password: hash,
  });
  console.log(newUser)
  try {
    await newUser.save();
    console.log('ff')
    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "Error creating user", error: err });
  }
}

module.exports = {
  login,
  register,
};
