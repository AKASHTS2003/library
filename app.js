const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");



const loginRouter= require("./routes/login-routes");
const Collection = require("./model/login-model");

const adminRouter=require("./routes/admin-routes");

const viewsPath = path.join(__dirname, "views");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", viewsPath);

/* database connection */
mongoose.connect('mongodb+srv://akashtshaju:mongodb2003@cluster0.8ai9uhp.mongodb.net/?retryWrites=true&w=majority', {
  /* mongodb+srv://akashtshaju:mongodb2003@cluster0.xlqxjhq.mongodb.net/?retryWrites=true&w=majority */
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use("/", loginRouter);
app.use("/admin",adminRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
