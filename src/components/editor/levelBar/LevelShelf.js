import React, {Component} from 'react'
import {IgnoreKeys} from 'react-hotkeys';

import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import List, {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@material/react-list';
import TextField, {HelperText, Input} from '@material/react-text-field';
import Fab from '@material/react-fab';

import './LevelShelf.scss'
import DeleteConfirm from './DeleteConfirm.js'
import LevelHelp from '../helpDialogs/LevelHelp.js'
import HelpDialog from '../helpDialogs/Dialog.js'
/*
https://github.com/material-components/material-components-web-react/tree/master/packages/list
https://github.com/material-components/material-components-web-react/tree/master/packages/text-field
*/

class LevelShelf extends Component {
  state = {
    showDeleteConf: -1,
    showLevelsHelp: false,

  }

  setDeleteConf = (index) => {
    // console.log("SET CALLED", index)
    this.setState({showDeleteConf: index});
  }

  deleteConfirmCallback(action) {
    // save index to delete then change it first to prevent the confirmation
    // from showing again
    let index = this.state.showDeleteConf
    this.setState({showDeleteConf: -1}, () => action == "delete" ? this.props.removeLevel(index) : null);
  }

  toggleLevelsDialog = () => {
    this.setState({showLevelsHelp: !this.state.showLevelsHelp});
  }

  render() {
    console.log("SELECTED: ", this.props.selected)
    let listItems = [];
    for (let i = 0; i < this.props.levels.length; i++) {
      listItems.push(
          <ListItem
            className="level-list-item"
            key={i}>
              <IgnoreKeys className="ignore-keys">
                <TextField className="level-list-field">
                    <Input className="level-list-input"
                      value={this.props.levels[i].name}
                      disabled={i != this.props.selected}
                      onChange={(e) => this.props.updateName(i, e.target.value)}/>
                </TextField>
              </IgnoreKeys>

              <IconButton
                onClick={(e) => this.setDeleteConf(i)}
                className="level-list-delete">
                <MaterialIcon icon="delete_outline"/>
              </IconButton>
          </ListItem>
      );
    }
    // console.log(this.state.showDeleteConf)
    return (
      <div className="editor-shelf fitted">
        {this.state.showDeleteConf >= 0 ?
          <DeleteConfirm delete={this.deleteConfirmCallback.bind(this)}
            levelName={this.props.levels[this.state.showDeleteConf].name}/>
          : null
        }
        {this.state.showLevelsHelp ?
          <HelpDialog onClose={this.toggleLevelsDialog}
            title="Level Help" content={<LevelHelp/>}/>
          : null
        }
        <div className="shelf-header levelbar-header">
          <h2 className="shelf-title">Levels</h2>
          <IconButton
            onClick={this.toggleLevelsDialog}
            className="shelf-help">
            <MaterialIcon icon="help_outline"/>
          </IconButton>
        </div>
        <hr></hr>
        <List
          className="level-list"
          singleSelection
          selectedIndex={Math.max(0, this.props.selected)}
          handleSelect={(selectedIndex) => this.props.changeLevel(selectedIndex)}>
          {listItems}
        </List>
        <div style={{height:`60px`}}/>
        <Fab className="level-list-add"
          mini
          textLabel="New Level"
          onClick={this.props.addLevel}/>
      </div>
    );
  }
}



export default LevelShelf;
