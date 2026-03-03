const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringfy(books,null,4))
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn =res.params.isbn
  const book =books[isbn];
  if(books){
    return res.status(200).json(book);

  }
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author =req.params.author;
  bookKeys=object.keys(books);
  const booksbyauthor=[];
  bookKeys.forEach((key) => {
    if(books[key].author==author){
        booksbyauthor.push({isbn:key,
     title:books[key].title,reviews:books[key].reviews});
      } 
      if (booksbyAuthor.length > 0) {
        return res.status(200).json(booksbyAuthor);
      } else {
        return res.status(404).json({ message: "No books found for this author" });
      }
  });

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title=req.params.title;
  bookKeys=object.key(books);
  const booksBytitle=[];
  bookKeys.forEach((key) => {
    if(books[key].title==title){
        booksBytitle.push({isbn:key,
author:books[key].title, reviews:books[key].reviews});
    }
    if (booksbyAuthor.length > 0) {
        return res.status(200).json(booksbyAuthor);
      } else {
        return res.status(404).json({ message: "No books found with this title" });
      } 
      return res.status(300).json({message: "Yet to be implemented"});
  });
  

  });
 

//  Get book review
public_users.get('/review/:isbn',function (req, res) { 
    const isbn = req.params.isbn; // Get ISBN from the URL
  const book = books[isbn];    // Access the specific book directly using the key

  if (book) {
    // Return only the reviews part of the book object
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
