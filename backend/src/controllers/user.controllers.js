const UserControls = {};
const User = require("../models/User");

UserControls.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
};

UserControls.createUser = async (req, res, next) => {
  const { username } = req.body;
  const newUser = new User({ username });
  await newUser.save();
  res.json("Create User routes");
};

UserControls.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("Delete User routes");
};

module.exports = UserControls;
