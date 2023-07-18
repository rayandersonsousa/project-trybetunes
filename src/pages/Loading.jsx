import React from 'react';
import '../styles/Loading.css';

export default class Loading extends React.Component {
  render() {
    return (
      <div>
        <h1 className="carregando">Carregando...</h1>
      </div>
    );
  }
}
