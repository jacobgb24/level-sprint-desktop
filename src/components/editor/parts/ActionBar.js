import React, {Component} from 'react'
import Button from '@material/react-button'
import TextField, {HelperText, Input} from '@material/react-text-field';
import './ActionBar.scss'

/*
  FileButtons: The set of buttons to save/load/create levels
*/


const ActionBar = props => {
  return (
    <div className="Buttons">
      <TextField className="level-name"
        // label="Level Name"
        outlined
        dense
        ><Input
            placeholder="Unnamed Level..."
            value=""
            onChange={(e) => "h"/*this.setState({value: e.target.value})*/}/>
      </TextField>
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

export default ActionBar;
