import React from 'react';
import Bellenbord from './bellenbord'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>VechtclubXL Bellenbord</h1>
        <p>groen = actief, oranje = langer dan 2 minuten geen contact, rood = geen verbinding</p>
        <Bellenbord />
      </div>
    )
  }
}

React.render(<App />, document.body);
