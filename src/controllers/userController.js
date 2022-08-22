import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (!userEmail || !userPassword) {
    return res.status(500).json({
      errcode: 1,
      message: "Missing inputs parameter!",
    });
  }
  const userData = await userService.handleUserLogin(userEmail, userPassword);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const getAllUsers = async (req, res) => {
  const users = await userService.handleGetAllUsers(req.query.id);
  if (!users) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
      users: [],
    });
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleCreateNewUser = async (req, res) => {
  const data = req.body;
  const message = await userService.createNewUser(data);
  console.log(message);
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  const data = req.body;
  if (!data.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing inputs parameter!",
    });
  }
  const message = await userService.updateUser(data);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  const userId = req.body.id;
  if (!userId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing inputs parameter!",
    });
  }
  const message = await userService.deleteUser(userId);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  getAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
