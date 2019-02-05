import React, { Component } from 'react';
import Header from './components/Header.js';
import Editor from './components/editor/Editor.js'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="Header"/>
        <Editor className="Editor"/>
      </div>
    );
  }
}

export default App;
