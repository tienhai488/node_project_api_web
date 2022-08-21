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
  const users = await userService.handleGetAllUsers(req.body.id);
  if (!users) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing require parameter!",
      users: [],
    });
  }
  console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

module.exports = {
  handleLogin,
  getAllUsers,
};
