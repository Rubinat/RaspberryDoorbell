var os=require('os');
var net=require('net');
var Gpio = require("onoff").Gpio;
var networkInterfaces=os.networkInterfaces();
var port = 8080;
var sockets = [];

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

var vorige = 'eerste keer';

setInterval(function() {

	var result = readButtonMatrix();
	
	if (result!='0,0') {
		console.log(result.toString());
		
		for (var i in sockets) {
			sockets[i].write(result+'\n');
		}
	} else if (result!=vorige) {
    console.log('off');

    for (var i in sockets) {
      sockets[i].write('off\n');
    }
  }

  vorige = result;


},100);

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
			
			if (value==0) return [kolom,specifiek];
			//console.log(kolomnummertje.join(','));
		}
		//console.log("- ");
		s = s + " - ";
	}
	//console.log(s);
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
      console.log('received:\n',data.toString());
    }
  });
    	
  socket.on('end', function () {
    console.log("ended: ", remoteAddress, " : ", remotePort);
    for (var i in sockets) {
			if (sockets[i]==socket) {
				sockets.splice(i,1); //remove socket from array
			}
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
