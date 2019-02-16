import React, {Component} from 'react'
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import List, {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@material/react-list';
import TextField, {HelperText, Input} from '@material/react-text-field';
import Fab from '@material/react-fab';
import './LevelShelf.scss'

/*
https://github.com/material-components/material-components-web-react/tree/master/packages/list
https://github.com/material-components/material-components-web-react/tree/master/packages/text-field
*/

class LevelShelf extends Component {
  render() {
    console.log("SELECTED: ", this.props.selected)
    let listItems = [];
    for (let i = 0; i < this.props.levels.length; i++) {
      listItems.push(
        <ListItem className="level-list-item">
          <TextField
            className="level-list-field"
            key={i}
            fullWidth
            filled
            onTrailingIconSelect={(e) => this.props.removeLevel(i)}
            trailingIcon={<MaterialIcon icon="delete_outline"/>}>
            <Input className="level-list-input"
              value={this.props.levels[i].name}
              disabled={i != this.props.selected}
              onChange={(e) => this.props.updateName(i, e.target.value)}/>
            </TextField>
        </ListItem>
      );
    }
    return (
      <div className="editor-shelf">
        <div className="shelf-header levelbar-header">
            <h2 className="shelf-title">Levels</h2>
            <IconButton onClick={this.props.helpFunc}
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

/*
<ListItem className="level-list-item">
  <TextField
    fullWidth
    onTrailingIconSelect={(e) => console.log(e)}
    trailingIcon={<MaterialIcon icon="delete_outline"/>}>
    <Input
      value='World 1-1' />
    </TextField>
</ListItem>
*/


export default LevelShelf;
