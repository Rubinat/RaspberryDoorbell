import React from 'react';
import * as api from './api'

export default class Bel extends React.Component {
 
  handleClick = () => {
    api.ring(this.props.name).then((res) => {
      console.log('ring...ring...response',res);
    });
  }

  render() {
    const {name, status} = this.props;
    return (
      <li onClick={this.handleClick} className={status} key={name}>{name}</li>
    )
  }
}