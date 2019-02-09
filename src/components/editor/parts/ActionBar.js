import React, {Component} from 'react'
import Button from '@material/react-button'
import TextField, {HelperText, Input} from '@material/react-text-field';
import './ActionBar.scss'

/*
  ActionBar: The set of buttons to save/load/create levels and the level name field
*/
class ActionBar extends Component {
  state = {level_name: ''}
  render() {
    return (
      <div className="Buttons">
        <TextField className="level-name"
          outlined
          dense
          ><Input
              className="level-name-input"
              placeholder="Unnamed Level..."
              value={this.state.value}
              onChange={(e) => this.setState({value: e.target.value})}/>
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
}

export default ActionBar;
