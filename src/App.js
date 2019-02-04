import React, { Component } from 'react';
import logo from './logo.svg';
import Button from '@material/react-button'

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Button
          raised
          className="button-save-load"
          onClick={() => console.log("clicked!")}
        >
          SAVE
        </Button>
        <Button
          raised
          className="button-save-load"
          onClick={() => console.log("clicked!")}
        >
          LOAD
        </Button>
        <Button
          raised
          className="button-new"
          onClick={() => console.log("clicked!")}
        >
          NEW
        </Button>
      </div>
    );
  }
}

export default App;
