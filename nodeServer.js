var os=require('os');
var net=require('net');
var Gpio = require("onoff").Gpio;
var networkInterfaces=os.networkInterfaces();
var port = 8080;
var sockets = [];
var express = require('express');
var app = express();
var http = require('http').Server(app);
var lastMessage = "";

var cols = [
	new Gpio(23, 'in', 'both'),
	new Gpio(18, 'in', 'both'),
	new Gpio(15, 'in', 'both'),
	new Gpio(14, 'in', 'both')
];

var rows = [
	new Gpio(24, 'out'),
	new Gpio(25, 'out'),
  new Gpio(8, 'out'),
  new Gpio(7, 'out'),
  new Gpio(11, 'out'),
  new Gpio(9, 'out'),
  new Gpio(10, 'out'),
  new Gpio(22, 'out'),
  new Gpio(21, 'out'),
  new Gpio(17, 'out'),
  new Gpio(4, 'out')
];

var rooms = [
  ['VCXL','D1.2','E1.5','F1.18'],
  ['C1.2','D1.3','E2.1','F1.19'],
  ['C1.3','D1.4','E2.2','G1.11'],
  ['C1.4','D2.1','E2.3','G1.11a'],
  ['C1.5','D2.2','E2.4','G1.14'],
  ['C1.6','D2.3','E2.5','G1.15'],
  ['C2.1','D2.4','F1.4','G1.16'],
  ['C2.2','E1.1','F1.5','G1.18'],
  ['C2.3','E1.2','F1.10','G2.4'],
  ['C2.4','E1.3','F1.11','G2.5'],
  ['C2.5','E1.4','F1.17']
];

var status = [];

var vorige = 'eerste keer';

setInterval(function() {

	var result = readButtonMatrix();
	
	if (result) {
		console.log(result);
    sendToAllClients(result);
	} else if (result!=vorige) {
    console.log('off');
    sendToAllClients('off');
  } else {
    //no result from readButtonMatrix
  }

  vorige = result;


},100);

function sendToAllClients(msg) {
  lastMessage = msg;
  for (var i in sockets) {
    sockets[i].write(msg+'\n');
  }
}

function readButtonMatrix() {
	var s = '';
	for (var kolom=0; kolom<cols.length; kolom++) {
		for (var specifiek=0; specifiek<rows.length; specifiek++) {
			for (var i=0; i<rows.length; i++) {
				rows[i].writeSync(1);
			}
			rows[specifiek].writeSync(0);
			//console.log(cols[kolom].readSync() + " ");
			var value = cols[kolom].readSync();
			s = s + value;
			
			if (value==0) {
        // console.log(s);
        return [kolom,specifiek];
      }
			//console.log(kolomnummertje.join(','));
		}
		//console.log("- ");
		s = s + " - ";
	}
	// console.log(s);
	return null;
}

function callback_server_connection(socket){
  var remoteAddress = socket.remoteAddress;
  var remotePort = socket.remotePort;
        
  socket.setNoDelay(true);
  console.log("connected: ", remoteAddress, " : ", remotePort);
  sockets.push(socket);
    
  socket.on('data', function (data) {
    //op deze plek ontvangt de server van 1 client een berichtje
    //hier het berichtje doorsturen naar alle andere clients
    /*for (var i in sockets) {
			console.log('fwd to:',i,data.toString());
			sockets[i].write(data.toString());
		}*/
    if (data.toString().indexOf("BELL: ")==0) {
      var id = data.toString().replace(/\n/g,' ');
      socket["bellID"] = id;
      //activeBells[id] = id + " - connected - " + new Date();
      console.log('received: ',id);
    }
  });
    	
  socket.on('end', function () {
    var id = socket["bellID"];

    console.log("ended: ", remoteAddress, " : ", remotePort, "[", id, "]");
    
    //find & remove socket from array
    for (var i in sockets) {
      if (sockets[i]==socket) {
        sockets.splice(i,1); 
      }
    }  

    if (id) {
      var roomName = getRoomNameById(id);
      console.log('roomName',roomName);
      status[roomName] = Math.floor(Date.now() / 1000);
    }
      
  });

  socket.on('error', function(err) {
    console.log("connection error ");
    for (var i in sockets) {
      if (sockets[i]==socket) {
        console.log("test connectie");
        sockets.splice(i,1); //remove socket from array
      }
    }
  });
    
}

console.log("node.js net server is waiting:");
for (var interface in networkInterfaces) {
  networkInterfaces[interface].forEach(function(details){
    if ((details.family=='IPv4') && !details.internal) {
      console.log(interface, details.address);  
    }
 });
}
console.log("port:", port);

var netServer = net.createServer(callback_server_connection);
netServer.listen(port);

app.get('/', function(req, res){

  var s = '';
  s += '<meta http-equiv="refresh" content="5">'
  s += '<style>body,td {font-family:Arial; font-size: 200%;} td a { color: white; text-decoration: none} .online {background-color:#2ecc71} .offline {background-color:#e74c3c} .timeout {background-color:#e67e22}</style>';
  s += 'laatst verstuurde bericht: ' + lastMessage; // + ' (' + getRoomNameById(lastMessage) + ')';
  s += '<table border=1 cellspacing=10 cellpadding=10 width="100%">';
  for (var row=0; row<rooms.length; row++) {
    s += '<tr>'
    for (var col=0; col<rooms[row].length; col++) {
      var roomName = rooms[row][col];
      var timediff = status[roomName]!=undefined ? Math.floor(Date.now() / 1000) - status[roomName] : 0;
      var className = (status[roomName]==undefined) ? 'offline' : timediff>120 ? 'timeout' : 'online';
      s += '<td width="25%" class="'+className+'"><a href="/ring/'+roomName+'">' + roomName + '</a></td>';
    }
    s += '</tr>';
  }
  s += '</table>';
  s += 'groen = actief<br>oranje = langer dan 2 minuten geen contact<br>rood = geen verbinding'
  res.send(s);
})

app.get('/log', function(req, res){
  res.sendFile("/tmp/bell.log");
})

app.get('/robots.txt', function(req, res) {
  res.sendFile(__dirname + '/robots.txt');
});

app.get('/ring/:roomName', function(req, res) {
  console.log('ring..ring..',req.params.roomName);

  var rowcol = getRowColByRoomName(req.params.roomName);
  var colrow_arr = [ rowcol[1],rowcol[0] ];
  console.log(colrow_arr);

  sendToAllClients(colrow_arr);
  setTimeout(function() {
    sendToAllClients("off");
  },1000);

  res.redirect('/');
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});

function getRowColByRoomName(roomName) {
  for (var row=0; row<rooms.length; row++) {
    for (var col=0; col<rooms[row].length; col++) {
      if (rooms[row][col]==roomName) return [row,col];
    }
  }
  return "?";
}

function getRoomNameById(id) {
  if (id==undefined || id=="" || id=="off") return "?";
  console.log("id=",id);
  var rowcol = id.trim().substr(id.trim().lastIndexOf(' ')+1);
  var row = rowcol.split(',')[1]; //let op row,col omgedraaid
  var col = rowcol.split(',')[0];
  return rooms[row][col];
}


