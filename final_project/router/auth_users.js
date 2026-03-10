const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { 
    let userwiththesamename = users.filter(user => user.username === username);
    if (userwiththesamename.length > 0) {
      return false;
    } else {
      return true;
    }
  }

const authenticatedUser = (username,password)=>{ 
    let validusers=users.filter((users)=>{return(users.username===username&&users.password===password);});
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }

}

//only registered users can login
regd_users.post("/login", (req,res) => {
const username=req.body.username;
const password = req.body.password;
if(!username || !password) {
    return res.status(404).json({message:"missing field please fill it again"});
} if(authenticatedUser(username,password)){
let acesstoken=jwt.sign({data:password},'acess',{expiresIn:60*60});
req.session.authorization={acesstoken,username}
return res.status(200).send("User successfully logged in");
}else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
}

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
const username =req.session.username;
const review = req.query.review;
const isbn =req.params.isbn;

if(!username){
return res.status(401).json({message:"user not found"});
}
if(!books[isbn]){
    return res.status(404).json({message:"book not found"});
}
if(!review){
    return res.status(400).json({message:"review not added"});
}
if(!books[isbn].reviews){
    books[isbn].reviews={};
}
books[isbn].reviews[username]=review;
return res.status(200).json({ message: "Review added successfully", reviews: books[isbn].reviews });
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.session.username;  // get logged-in username from session
  const isbn = req.params.isbn;           // get ISBN from route parameter

  if (!username) {
    return res.status(401).json({ message: "User not logged in" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review by this user not found" });
  }

  // Delete the review for this user
  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully", reviews: books[isbn].reviews });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
