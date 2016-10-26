// inladen van de dependencies - externe dependencies inladen via het commando: 
// npm install express --save
// npm install body-parser --save

var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state. 
var dal = require("./storage.js");

//validatie inladen
var validation = require("./validate.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET op /books. 
app.get("/books", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  response.send(dal.listAllBooks());
});

// opvangen van een GET op /books/{bookId}. 
app.get("/books/:id", function (request, response) {
  var book = dal.findBook(request.params.id);
  if(book) {
    response.send(book);
  }else {
    response.status(404).send();
  }
});

// opvangen van een POST op /books, het aanmaken van een nieuw boek. 
app.post("/books", function (request, response) {
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var book = request.body;

  // Valideren dat velden bestaan
  var errors = validation.fieldsNotEmpty(book, "isbn", "title", "year");
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  // Valideren dat we niet een boek met 2 ISBN nummers hebben.
  var existingBook = dal.findBook(book.isbn);
  if(existingBook){
    response.status(409).send({msg:"ISBN is must be unique, it's already registered", link:"../books/"+existingBook.id});
    return;
  }
  // Id wordt gezet door de server, we kiezen hier voor de ISBN omdat we weten dat hij uniek is.
  book.id=book.isbn
  // het boek toevoege in onze 'dal'.
  dal.saveBook(book);
  // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiëren.
  response.status(201).location("../books/"+book.id).send();
});



// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");