import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Result from './Components/Result';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Result />
      </div>
    );
  }
}

export default App;
