import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Podcast from './components/Podcast'

class App extends Component {
render() {
  return (
    <div className='App'>
      <Header />
      <Podcast />
     </div>
    );
  }
}

export default App;