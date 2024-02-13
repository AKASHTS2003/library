const Collection = require('../model/login-model');
const path = require('path');

const renderLogin = (req, res) => {
  res.render("login");
};

const Userabout = (req, res) => {
  res.render("about");
};

const Usercontact = (req, res) => {
  res.render("contact");
};

const renderSignup = (req, res) => {
  res.render("signup");
};

const addUserSignup = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    const newUser = new Collection({
      name,
      email,
      password,
      confirmPassword,
      role
    });

    await newUser.validate(); // Perform schema validation

    // Save the validated document
    await newUser.save();

    res.render("home");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await Collection.findOne({ name });

    if (user && user.password === password) {
      // Redirect to the dashboard page
      res.redirect("/admin/dash");
    } else {
      res.send("Wrong password");
    }
  } catch {
    res.send("Wrong Details");
  }
};


module.exports = {
  renderLogin,
  renderSignup,
  addUserSignup,
  userLogin,
  Userabout,
  Usercontact
};
