import React, { Component } from 'react';
import './App.scss';
import Map from './components/Map'
import SearchAhead from './components/SearchAhead';
import Header from './components/Header';
import Podcast from './components/Podcast'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Podcast />
          <SearchAhead />
          <Map></Map>
      </div>

    );
  }
}

export default App;