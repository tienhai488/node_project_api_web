import db from "../models/index";
import CRUDservice from "../services/CRUDservice";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {}
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  const mess = await CRUDservice.createNewUser(req.body);
  console.log(mess);
  return res.send("Go to CRUD!!");
};

const displayGetCRUD = async (req, res) => {
  const users = await CRUDservice.getAllUser();
  console.log(users);
  return res.render("displayCRUD.ejs", { dataUsers: users });
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
};
