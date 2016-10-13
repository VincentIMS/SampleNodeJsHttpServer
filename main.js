// inladen van de dependencies - externe dependencies inladen via het commando: 
 // npm install express --save
  // npm install body-parser --save

var express = require('express'); // eenvoudige webserver in node js
var busteVerwerker = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// aanmaken van de webserver variabele
var app = express();

app.use(busteVerwerker.json());

var books = [];
books.push({id:1, name:"Beginning Node JS", rating:4});
books.push({id:2, name:"Knoeien met data-distributie", rating:3});

app.get("/books", function(request, response){
  response.send(books);
});

app.post("/books", function(request, response){
  var book= request.body;
  book.id= books.length+1;
  books.push(book);
  response.status(204).send();
});

app.listen(4567);
console.log("woow, dees werkt! Maar het doet echt niks..");