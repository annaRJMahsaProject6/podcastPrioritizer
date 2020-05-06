import React, { Component } from 'react';
import './App.css';
import SearchAhead from './components/SearchAhead';
import Header from './components/Header';
import Podcast from './components/Podcast'

class App extends Component {
  render() {
    return (
      <div className="App wrapper">
        <h1>TESTING</h1>
          <Header />
          <Podcast />
         <SearchAhead />
      </div>

    );
  }
}

export default App;