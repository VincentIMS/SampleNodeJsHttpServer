// inladen van de dependencies - externe dependencies inladen via het commando: 
 // npm install express --save
  // npm install body-parser --save

var express = require('express'); // eenvoudige webserver in node js
var busteVerwerker = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(busteVerwerker.json());

// onze lokale 'datastore'. deze variable bewaart onze state. We zetten er ook wat data in
var books = [];
books.push({id:1, name:"Beginning Node JS", rating:4});
books.push({id:2, name:"Knoeien met data-distributie", rating:3});

// opvangen van een GET op /books. 
app.get("/books", function(request, response){
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  response.send(books);
});

// opvangen van een POST op /books. 
app.post("/books", function(request, response){
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var book= request.body;
  // een id geven aan ons nieuw boek.
  book.id= books.length+1;
  // het boek toevoege in onze 'datastore'.
  books.push(book);
  // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiëren.
  response.status(204).send();
});

// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");