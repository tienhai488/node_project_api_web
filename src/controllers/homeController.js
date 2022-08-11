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
  return res.send("Go to CRUD!!");
};

const displayGetCRUD = async (req, res) => {
  const users = await CRUDservice.getAllUser();
  return res.render("displayCRUD.ejs", { dataUsers: users });
};

const editCRUD = async (req, res) => {
  const idUser = req.query.id;
  if (idUser) {
    const user = await CRUDservice.getUserById(idUser);
    return res.render("editCRUD.ejs", { dataUser: user });
  } else {
    return res.send("Not found user");
  }
};

const updateCRUD = async (req, res) => {
  const mess = await CRUDservice.updateUser(req.body);
  console.log(mess);
  return res.redirect("/get-crud");
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const mess = await CRUDservice.deleteUserById(userId);
    console.log(mess);
    return res.redirect("/get-crud");
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  editCRUD,
  updateCRUD,
  deleteCRUD,
};
