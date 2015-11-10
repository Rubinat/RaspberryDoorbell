import React from 'react';
// import { reposForUser } from './api';
import Bellenbord from './bellenbord'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>VechtclubXL Bellenbord</h1>
        <Bellenbord />
      </div>
    )
  }
}

React.render(<App />, document.body);
