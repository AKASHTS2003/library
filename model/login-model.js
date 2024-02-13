const mongoose = require("mongoose");

// Schema
const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters long']
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (confirmPassword) {
        return confirmPassword === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  role: {
    type: String,
    required: true
  },
});

// Collection
const Collection = mongoose.model("Collection", LogInSchema);

module.exports = Collection;
