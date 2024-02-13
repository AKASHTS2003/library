const mongoose = require("mongoose");

// Publication Schema
const PublicationdetailSchema = new mongoose.Schema({
  articletitle: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true,
  },
  aauthorname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  pubfile: {
    type: String // Assuming the pubfile will store the filename
  }
});

// Publication Collection
const PubCollection = mongoose.model("PubCollection", PublicationdetailSchema);

// Book Schema
const BookdetailSchema = new mongoose.Schema({
  booktitle: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    minlength: 60
  },
  authorname: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true
  },
  bookid: {
    type: String,
    required: true
  },
  bookfile: {
    type: String // Assuming the bookfile will store the filename
  }
});

// Book Collection
const BookCollection = mongoose.model("BookCollection", BookdetailSchema);



// Student Schema
const StuddetailSchema = new mongoose.Schema({
  studid: {
    type: String,
    required: true
  },
  studname: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },email: {
    type: String,
    required: true,
  },
  studphno: {
    type: String,
    required: true,
  },
  studfile: {
    type: String // Assuming the bookfile will store the filename
  }
});

// Book Collection
const StudCollection = mongoose.model("StudCollection", StuddetailSchema);



// Issue Schema
const IssuedetailSchema = new mongoose.Schema({
  bbookid: {
    type: String,
    required: true
  },
  bbookname: {
    type: String,
    required: true
  },
  sstudid: {
    type: String,
    required: true
  },
  sstudname: {
    type: String,
    required: true,
  },
  issdate: {
    type: String,
    required: true
  },
  retdate: {
    type: String,
    required: true
  },
  studemail: {
    type: String,
    required: true
  },
  studphnoo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
 
});

// Issue Collection
const IssueCollection = mongoose.model("IssueCollection", IssuedetailSchema);

//Returncollection

const returnSchema = new mongoose.Schema({
  bbookid: {
    type: String,
    required: true
  },
  bbookname: {
    type: String,
    required: true
  },
  sstudid: {
    type: String,
    required: true
  },
  sstudname: {
    type: String,
    required: true
  },
  issdate: {
    type: Date,
    required: true
  },
  retdate: {
    type: String,
    required: true
  },
  studphnoo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const ReturnCollection = mongoose.model('ReturnCollection', returnSchema);

module.exports = { PubCollection, BookCollection,StudCollection,IssueCollection,ReturnCollection };

