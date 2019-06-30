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
