import React, {Component} from 'react'
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
    console.log("SET CALLED", index)
    this.setState({showDeleteConf: index});
  }

  deleteConfirmCallback(action) {
    console.log("CALLBACK CALLED", action, this.state.showDeleteConf)
    if (action == "delete") {
      this.props.removeLevel(this.state.showDeleteConf);
    }
    this.setState({showDeleteConf: -1});
  }

  toggleLevelsDialog = () => {
    this.setState({showLevelsHelp: !this.state.showLevelsHelp});
  }

  render() {
    // console.log("SELECTED: ", this.props.selected)
    let listItems = [];
    for (let i = 0; i < this.props.levels.length; i++) {
      listItems.push(
        <ListItem
          className="level-list-item"
          key={i}>
          <TextField
            className="level-list-field"
            fullWidth
            filled
            onTrailingIconSelect={(e) => this.setDeleteConf(i)}
            trailingIcon={<MaterialIcon icon="delete_outline"/>}>
            <Input className="level-list-input"
              value={this.props.levels[i].name}
              disabled={i != this.props.selected}
              onChange={(e) => this.props.updateName(i, e.target.value)}/>
            </TextField>
        </ListItem>
      );
    }
    // console.log(this.state.showDeleteConf)
    return (
      <div className="editor-shelf">
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
            selectedIndex={this.props.selected}
            handleSelect={(selectedIndex) => this.props.changeLevel(selectedIndex)}>
            {listItems}
          </List>
          <Fab className="level-list-add"
            mini
            // icon={<MaterialIcon icon="add"/>}
            textLabel="New Level"
            onClick={this.props.addLevel}/>
      </div>
    );
  }
}



export default LevelShelf;
