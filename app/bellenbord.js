import React from 'react';
import * as api from './api'
import Bel from './bel'

export default class Bellenbord extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount() {
    api.status().then((res) => {
      this.setState({ items: res.items });
    });
  }

  render() {
    var items = this.state.items.map((item) => {
      return <Bel name={item.name} status={item.status} key={item.name} />
    });
    return <ul>{ items }</ul>;
  }
}


// reposForUser('companje').then(repos => console.log(repos));



// app.get('/', function(req, res){

//   var s = '';
//   s += '<meta http-equiv="refresh" content="5">'
//   s += '<style>body,td {font-family:Arial; font-size: 200%;} td a { color: white; text-decoration: none} .online {background-color:#2ecc71} .offline {background-color:#e74c3c} .timeout {background-color:#e67e22}</style>';
//   s += 'laatst verstuurde bericht: ' + lastMessage; // + ' (' + getRoomNameById(lastMessage) + ')';
//   s += '<table border=1 cellspacing=10 cellpadding=10 width="100%">';
//   for (var row=0; row<rooms.length; row++) {
//     s += '<tr>'
//     for (var col=0; col<rooms[row].length; col++) {
//       var roomName = rooms[row][col];
//       var className = getOnlineStatusByRoomName(roomName);
//       var title = info[roomName] || 'no info';
//       s += '<td width="25%" class="'+className+'"><a title="'+title+'" href="/api/v1/call/'+roomName+'">' + roomName + '</a></td>';
//     }
//     s += '</tr>';
//   }
//   s += '</table>';
//   s += 'groen = actief<br>oranje = langer dan 2 minuten geen contact<br>rood = geen verbinding'
//   res.send(s);
// })