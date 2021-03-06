import React, { Component } from 'react';
import './App.scss';
import Header from './components/header/Header.js';
import Editor from './components/editor/Editor.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="Header"/>
        <div className="background">
          <Editor className="Editor"/>
        </div>
      </div>
    );
  }
}

export default App;
