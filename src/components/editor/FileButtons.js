import React, {Component} from 'react'
import Button from '@material/react-button'

const FileButtons = props => {
  return (
    <div className="Buttons">
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

export default FileButtons;
