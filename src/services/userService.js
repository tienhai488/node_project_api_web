import db from "../models/index";
import bcrypt from "bcryptjs";
import e from "express";

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await getUserByEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          attributes: ["email", "password", "roleId"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          const check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMess = "Ok";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMess = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMess = "User not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMess = "No email in system";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: userEmail },
      });
      user ? resolve(true) : resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
};
