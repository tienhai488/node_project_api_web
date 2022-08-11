import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  if (!userEmail || !userPassword) {
    return res.status(500).json({
      errcode: 1,
      errMess: "Error api",
    });
  }
  const userData = await userService.handleUserLogin(userEmail, userPassword);
  return res.status(200).json({
    errCode: userData.errCode,
    errMess: userData.errMess,
    userData: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin,
};
