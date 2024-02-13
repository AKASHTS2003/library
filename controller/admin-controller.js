const path = require('path');
const { PubCollection ,BookCollection,StudCollection,IssueCollection,ReturnCollection} = require("../model/admin-model");
const Collection=require("../model/login-model")

const mongoose = require('mongoose');


const Dashboard = async (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');

  try {
    const studentCount = await StudCollection.countDocuments();
    const issueCount = await IssueCollection.countDocuments();
    const returnCount = await ReturnCollection.countDocuments();

    res.render(path.join(viewsPath, 'dash'), {
      title: 'Dashboard',
      studentCount: studentCount,
      issueCount: issueCount,
      returnCount: returnCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



const Publication = async (req, res) => {
  try {
    const pubs = await PubCollection.find();
    const viewsPath = path.join(__dirname, '..', 'views', 'admin');
    res.render(path.join(viewsPath, 'addpub'), {
      title: 'Publication',
      pubs: pubs
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const EditPublication = (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');
  res.render(path.join(viewsPath, 'addpubedit'), {
    title: 'EditPublication'
  });
};

const addPub = async (req, res) => {
  const { articletitle, subject, abstract, aauthorname, email, contact, country, pubid } = req.body;

  try {
    // Truncate the abstract to a maximum of 60 characters
    const truncatedAbstract = abstract.slice(0, 60);

    const newPub = new PubCollection({
      articletitle,
      subject,
      abstract/* : truncatedAbstract */,
      aauthorname,
      email,
      contact,
      country,
      pubid
    });

    await newPub.validate(); // Explicitly validate the newPub object

    await newPub.save();
    res.redirect('/admin/addpub');
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const renderEditpubForm = async (req, res) => {
  try {
    const pubId = req.params.id;
    const pub = await PubCollection.findById(pubId);

    if (!pub) {
      return res.status(404).send('Publication not found');
    }

    res.render('admin/editpub', { pub });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const updatepub = async (req, res) => {
  const pubId = req.params.id;
  const { articletitle, subject, abstract, aauthorname, email, contact, country } = req.body;

  try {
    const updatedpub = await PubCollection.findByIdAndUpdate(
      pubId,
      {
        articletitle,
        subject,
        abstract,
        aauthorname,
        email,
        contact,
        country
      },
      { new: true }
    );

    if (!updatedpub) {
      return res.status(404).send("Publication not found");
    }

    res.redirect("/admin/addpub");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const deletepub = async (req, res) => {
  const pubId = req.params.id;

  try {
    const deletedpub = await PubCollection.findByIdAndDelete(pubId);

    if (!deletedpub) {
      return res.status(404).send("Publication not found");
    }

    res.redirect("/admin/addpub");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
/* publication ends */


/* Book starts */

const EditBook = (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');
  res.render(path.join(viewsPath, 'addbook'), {
    title: 'EditBook'
  });
};

const renderBookTable = async (req, res) => {
  try {
    const books = await BookCollection.find();
    const viewsPath = path.join(__dirname, '..', 'views', 'admin');
    res.render(path.join(viewsPath, 'book'), {
      title: 'Book',
      books: books
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const addBook = async (req, res) => {
  const { booktitle, genre, summary, authorname, isbn, bookid } = req.body;

  try {
    // Truncate the summary to a maximum of 60 characters
    const truncatedSummary = summary.slice(0, 60);

    const newBook = new BookCollection({
      booktitle,
      genre,
      summary/* : truncatedSummary */,
      authorname,
      isbn,
      bookid
    });

    await newBook.validate();
    await newBook.save();
    renderBookTable(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const renderEditBookForm = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookCollection.findById(bookId);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render('admin/editbook', { book });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { booktitle, genre, summary, authorname, isbn, bookid } = req.body;

  try {
    const updatedBook = await BookCollection.findByIdAndUpdate(
      bookId,
      {
        booktitle,
        genre,
        summary,
        authorname,
        isbn,
        bookid
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.redirect("/admin/book");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await BookCollection.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/* Book Ends */

/* Student starts */
const Student = async (req, res) => {
  try {
    const students = await StudCollection.find();
    const viewsPath = path.join(__dirname, '..', 'views', 'admin');
    res.render(path.join(viewsPath, 'student'), {
      title: 'Student',
      students: students
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const EditStudent = (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');
  res.render(path.join(viewsPath, 'addstud'), {
    title: 'EditStudent'
  });
};

const addStudent = async (req, res) => {
  const { studid, studname, department, year,gender,dob,email,studphno} = req.body;

  try {
      const newStud = new StudCollection({
      studid,
      studname,
      department,
      year,
      gender,
      dob,
      email,
      studphno
    });

    await newStud.validate();
    await newStud.save();
    Student(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const renderEditStudForm = async (req, res) => {
  try {
    const StudId = req.params.id;
    const stud = await StudCollection.findById(StudId);

    if (!stud) {
      return res.status(404).send('Student not found');
    }

    res.render('admin/editstud', { stud });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const updateStud = async (req, res) => {
  const StudId = req.params.id;
  const {  studid, studname, department, year,gender,dob,email,studphno } = req.body;

  try {
    const updatedStud = await StudCollection.findByIdAndUpdate(
      StudId,
      {
      studid,
      studname,
      department,
      year,
      gender,
      dob,
      email,
      studphno
      },
      { new: true }
    );

    if (!updatedStud) {
      return res.status(404).send("Student not found");
    }

    res.redirect("/admin/student");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const deleteStud = async (req, res) => {
  const StudId = req.params.id;

  try {
    const deletedStud = await StudCollection.findByIdAndDelete(StudId);

    if (!deletedStud) {
      return res.status(404).send("Student not found");
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/* Student ends */

/* Issue Starts */
const Issue = async (req, res) => {
  try {
    const issuedBooks = await IssueCollection.find({ status: { $ne: "Returned" } });
    const returnedBooks = await IssueCollection.find({ status: "Returned" });
    const viewsPath = path.join(__dirname, '..', 'views', 'admin');
    res.render(path.join(viewsPath, 'issue'), {
      title: 'Issue',
      issuedBooks: issuedBooks,
      returnedBooks: returnedBooks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the issued books.' });
  }
};




const EditIssue = (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');
  res.render(path.join(viewsPath, 'addissue'), {
    title: 'EditIssue'
  });
};

const addIssue = async (req, res) => {
  const { bbookid,bbookname,sstudid,sstudname,issdate,retdate,studemail,studphnoo,status} = req.body;

  try {
      const newIss = new IssueCollection({
      bbookid,
      bbookname,
      sstudid,
      sstudname,
      issdate,
      retdate,
      studemail,
      studphnoo,
      status
    });

    await newIss.validate();
    await newIss.save();
    Issue(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const renderEditIssueForm = async (req, res) => {
  try {
    const IssId = req.params.id;
    const iss = await IssueCollection.findById(IssId);

    if (!iss) {
      return res.status(404).send('Issued Book not found');
    }

    res.render('admin/editissue', { iss });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const updateIssue = async (req, res) => {
  const IssId = req.params.id;
  const { status } = req.body;

  try {
    const updatedIss = await IssueCollection.findByIdAndUpdate(
      IssId,
      { status },
      { new: true }
    );

    if (!updatedIss) {
      return res.status(404).send("Issued Book not found");
    }

    // Check if the book status is updated to "Returned"
    if (status === "Returned") {
      // Create a new document in the "ReturnCollection" collection
      const returnedIss = new ReturnCollection({
        bbookid: updatedIss.bbookid,
        bbookname: updatedIss.bbookname,
        sstudid: updatedIss.sstudid,
        sstudname: updatedIss.sstudname,
        issdate: updatedIss.issdate,
        retdate: updatedIss.retdate,
        studphnoo: updatedIss.studphnoo,
        status: updatedIss.status,
      });

      await returnedIss.save();
      // Delete the issued book from the "IssueCollection" collection
      await IssueCollection.findByIdAndDelete(IssId);
    }

    res.redirect("/admin/issue");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};



const deleteIssue = async (req, res) => {
  const IssId = req.params.id;

  try {
    // Ensure the provided ID is a valid ObjectID
    if (!mongoose.Types.ObjectId.isValid(IssId)) {
      return res.status(400).send('Invalid Issue ID');
    }

    const deletedIss = await IssueCollection.findByIdAndDelete(IssId);

    if (!deletedIss) {
      return res.status(404).send('Issued Book not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



/* Issue Ends */


const Return = async (req, res) => {
  try {
    const returnedBooks = await ReturnCollection.find({ status: 'Returned' });
    const viewsPath = path.join(__dirname, '..', 'views', 'admin');
    res.render(path.join(viewsPath, 'return'), {
      title: 'Return',
      returnedBooks: returnedBooks
    });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


const returnIssue = async (req, res) => {
  const IssId = req.params.id;

  try {
    const issuedBook = await IssueCollection.findById(IssId);

    if (!issuedBook) {
      return res.status(404).send("Issued Book not found");
    }

    // Create a new entry in the "ReturnCollection" based on the returned issue's data
    const returnedIss = new ReturnCollection({
      bbookid: issuedBook.bbookid,
      bbookname: issuedBook.bbookname,
      sstudid: issuedBook.sstudid,
      sstudname: issuedBook.sstudname,
      issdate: issuedBook.issdate,
      retdate: issuedBook.retdate,
      studphnoo: issuedBook.studphnoo,
      status: "Returned", // Update the status to "Returned" or any other appropriate value
    });

    await returnedIss.save();

    // Delete the issued book from the "IssueCollection" collection
    await IssueCollection.findByIdAndDelete(IssId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const ReturnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await IssueCollection.findById(id);
    if (!issue) {
      res.status(404).json({ error: 'Issue not found' });
      return;
    }

    // Update the status to "Returned"
    issue.status = 'Returned';
    await issue.save();

    // Redirect to the Issue page
    res.redirect('/admin/issue');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while returning the book.' });
  }
};

const Enquiry = (req, res) => {
  const viewsPath = path.join(__dirname, '..', 'views', 'admin');
  res.render(path.join(viewsPath, 'enquiry'), {
    title: 'Enquiry'
  });
};




module.exports = {Dashboard,Publication,EditPublication,EditBook, Student,EditStudent,Issue,EditIssue,Return,renderBookTable,
  addBook,renderEditBookForm,updateBook,deleteBook,addPub,renderEditpubForm,updatepub,deletepub,addStudent,renderEditStudForm,
  updateStud,deleteStud,addIssue,renderEditIssueForm,updateIssue,deleteIssue,returnIssue,ReturnBook,Enquiry};
