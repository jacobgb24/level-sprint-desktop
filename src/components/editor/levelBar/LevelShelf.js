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
  state = {
    selectedIndex: 1,
  };


  render() {
    return (
      <div className="editor-shelf">
        <div className="shelfset-header levelbar-header">
            <h2 className="shelfset-name">Levels</h2>
            <IconButton onClick={this.props.helpFunc}
              className="shelfset-help">
              <MaterialIcon icon="help_outline"/>
            </IconButton>
          </div>
          <hr></hr>
          <List
            className="level-list"
            singleSelection
            selectedIndex={this.state.selectedIndex}
            handleSelect={(selectedIndex) => this.setState({selectedIndex})}>
            <ListItem className="level-list-item">
              <TextField
                fullWidth
                onTrailingIconSelect={(e) => console.log(e)}
                trailingIcon={<MaterialIcon icon="delete_outline"/>}>
                <Input
                  value='World 1-1' />
                </TextField>
            </ListItem>
          </List>
          <Fab className="level-list-add" mini icon={<MaterialIcon icon="add"/>}/>
      </div>
    );
  }
}

export default LevelShelf;

/*   <List>
    <ListItem className="level-list-item">
      <p>World 1-1</p>
      <ListItemMeta
        className="list-delete"
        meta={<IconButton onClick={(e) => console.log(e)}>
                <MaterialIcon icon="delete_outline"/>
              </IconButton>}/>
    </ListItem>
  </List> */
