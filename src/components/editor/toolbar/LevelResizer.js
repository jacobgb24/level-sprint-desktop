import React, {Component} from 'react';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import {GlobalHotKeys} from 'react-hotkeys';

import HelpDialog from '../helpDialogs/Dialog.js';
import DimHelp from '../helpDialogs/DimHelp.js'

import {IgnoreKeys} from 'react-hotkeys';
import TextField, {HelperText, Input} from '@material/react-text-field';


import './Shelf.scss'
import './LevelResizer.scss'


/*
  LevelResizer: The option at the bottom of the shelf
  which allows the user to increase/decrease level dimensions.
*/
class LevelResizer extends Component {
  state = {
    showDimsHelp: false,
    keyMap: {
        'add-row': 'up',
        'remove-row': 'down',
        'add-col': 'right',
        'remove-col': 'left',
    },
    keyHandlers: {
       'add-row': (event) => this.props.canAddRows ? this.props.addRow() : null,
       'remove-row': (event) => this.props.canRemoveRows ? this.props.removeRow() : null,
       'add-col': (event) => this.props.canAddCols ? this.props.addColumn() : null,
       'remove-col': (event) => this.props.canRemoveCols ? this.props.removeColumn() : null,
   },
  }

  toggleDimsDialog = () => {
    this.setState({showDimsHelp: !this.state.showDimsHelp});
  }

  render() {
    let divs = []
    if (this.state.showDimsHelp === true) {
      console.log("POPUP")
      divs.push(
        <div key={1}>
          <HelpDialog onClose={this.toggleDimsDialog}
            title="Dimensions Help" content={<DimHelp/>}/>
        </div>
      )
    }

    divs.push(
      <div className="LevelResizer" key={2}>
        <div className="shelf">
          <div className="shelf-header">
            <h2 className="shelf-title">Level Dimensions</h2>
              <IconButton onClick={this.toggleDimsDialog}
                className="shelf-help">
                <MaterialIcon icon="help_outline"/>
              </IconButton>
          </div>
          <LevelDimension
            remove={this.props.removeColumn}
            add={this.props.addColumn}
            canAdd={this.props.canAddCols}
            canRemove={this.props.canRemoveCols}
            value={this.props.cols}
            changeDimension={this.props.changeColumnDimension}
            canChangeDimension={this.props.canChangeColumnDimension}
            name="Columns"
          />

          <LevelDimension
            remove={this.props.removeRow}
            add={this.props.addRow}
            canAdd={this.props.canAddRows}
            canRemove={this.props.canRemoveRows}
            value={this.props.rows}
            changeDimension={this.props.changeRowDimension}
            canChangeDimension={this.props.canChangeRowDimension}
            name="Rows"
          />
        </div>
      </div>
    )

    return(
      <div className="editor-shelf">
        <GlobalHotKeys keyMap={this.state.keyMap} handlers={this.state.keyHandlers}/>
        {divs}
      </div>
    )
  }

}

/*
  LevelDimension: Generic UI component for adding/removing
  rows and columns
*/

class LevelDimension extends Component {
  state = {
    value: this.props.value,
    old_value: this.props.value
  }

  changeText = (e) => {
    var val = parseInt(e.target.value);
    if (!isNaN(val)) {
      this.setState({value: val});
    } else if (e.target.value === "") {
      this.setState({value: ""});
    }
  }

  keyPress = (e) => {
    if (e.key === 'Enter') {
      this.commitChange(e);
    }
  }

  commitChange = (e) => {
    if (this.props.canChangeDimension(this.state.value)) {
      // console.log("taco");
      this.props.changeDimension(this.state.value);
      this.setState({old_value: this.state.value});
    } else {
      this.setState({value: this.state.old_value});
    }
  }

  // add = (e) => {
  //   this.props.add();
  //   this.setState(prev => ({value: prev.value+1, old_value: prev.value+1}));
  // }
  //
  // remove = (e) => {
  //   this.props.remove();
  //   this.setState(prev => ({value: prev.value-1, old_value: prev.value-1}));
  // }

  // check if the value was changed through some other means (hotkey or click)
  // then update the textfield if it was
  componentDidUpdate = (prevProps) => {
    if (prevProps.value != this.props.value) {
      this.setState({value: this.props.value, old_value: this.props.value})
    }
  }

  render() {
    console.log("NAME: " + this.props.name);
    return (
      <div>
        <h4 className="dimension-direction">{this.props.name}</h4>
        <div className="dimensions-selector">
          <IconButton onClick={this.props.remove}
            className="dimension-button"
            disabled={!this.props.canRemove}>
            <MaterialIcon icon="remove_circle_outline"/>
          </IconButton>
          <IgnoreKeys className='ignore-keys'>
            <TextField className="dimensions-field">
              <Input className="dimensions-input"
                value={this.state.value}
                onChange={this.changeText}
                onBlur={this.commitChange}
                onKeyPress={this.keyPress}
              />
            </TextField>
          </IgnoreKeys>

          <IconButton onClick={this.props.add}
            className="dimension-button"
            disabled={!this.props.canAdd}>
            <MaterialIcon icon="add_circle_outline"/>
          </IconButton>
        </div>
      </div>
    );
    // <h2 className="dimension-value">{props.value}</h2>
  }
}

export default LevelResizer;
