
var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/www'));

app.post('/api/v1/call/:roomName', function(req, res) {
  res.send("Hoi: " + req.params.roomName);
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});
