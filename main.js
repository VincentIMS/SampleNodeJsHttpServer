var express = require('express');
var app = express();


app.get("/book", function(request, response){
  response.send({name:"Beginning Node JS", rating:4});
});

app.listen(4567);
console.log("woow, dees werkt! Maar het doet echt niks..");