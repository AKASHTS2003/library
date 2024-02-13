const express = require("express");
const adminRouter = express.Router();
const adminController = require('../controller/admin-controller');

adminRouter.get("/dash", adminController.Dashboard);

// Routes for publications
adminRouter.get("/addpub", adminController.Publication);
adminRouter.get("/addpubedit", adminController.EditPublication);
adminRouter.post("/addpubedit", adminController.addPub);
adminRouter.get("/updatepub/:id", adminController.renderEditpubForm);
adminRouter.post('/updatepub/:id', adminController.updatepub);
adminRouter.delete('/addpub/:id', adminController.deletepub);

// Routes for books
adminRouter.get('/book', adminController.renderBookTable);
adminRouter.get("/addbook", adminController.EditBook);
adminRouter.post('/addbook', adminController.addBook);
adminRouter.get("/updatebook/:id", adminController.renderEditBookForm);
adminRouter.post('/updatebook/:id', adminController.updateBook);
adminRouter.delete('/book/:id', adminController.deleteBook);

//Routes for Student
adminRouter.get("/student", adminController.Student);
adminRouter.get("/addstud", adminController.EditStudent);
adminRouter.post('/addstud', adminController.addStudent);
adminRouter.get("/updatestud/:id", adminController.renderEditStudForm);
adminRouter.post('/updatestud/:id', adminController.updateStud);
adminRouter.delete('/student/:id', adminController.deleteStud);

//Routes for Issue
adminRouter.get("/issue", adminController.Issue);
adminRouter.get("/addissue", adminController.EditIssue);
adminRouter.post("/addissue", adminController.addIssue);
adminRouter.get("/updateissue/:id", adminController.renderEditIssueForm);
adminRouter.post('/updateissue/:id', adminController.updateIssue);
adminRouter.delete('/issue/:id', adminController.deleteIssue);


adminRouter.get("/return", adminController.Return);
// Routes for returning an issue and adding it to the ReturnTable
adminRouter.post('/return/:id', adminController.returnIssue);
adminRouter.get('/return/:id', adminController.ReturnBook);

adminRouter.get("/enquiry", adminController.Enquiry);

module.exports = adminRouter;
