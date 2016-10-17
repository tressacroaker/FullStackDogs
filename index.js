var express = require ('express');
var bodyParser = require ('body-parser');
var cors = require ('cors');
var app = express();
var beerList = require('./beerList.js');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + './public'));


app.get('/beer', function(req, res){
  res.send(beerList);
});




app.listen(8000, function(){
  console.log('listening to 8000');
});
