const express = require("express");
const loginRouter = express.Router();
const {
  renderLogin,
  renderSignup,
  addUserSignup,
  userLogin,
  Userabout,
  Usercontact
} = require("../controller/login-controller");

loginRouter.get("/login", renderLogin);
loginRouter.get("/signup", renderSignup);
loginRouter.post("/signup", addUserSignup);
loginRouter.post("/login", userLogin);
loginRouter.get("/about", Userabout);
loginRouter.get("/contact", Usercontact);

module.exports = loginRouter;
