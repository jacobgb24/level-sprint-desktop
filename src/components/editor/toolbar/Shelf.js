import React, {Component} from 'react'
import IconButton, {IconToggle} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRipple} from '@material/react-ripple';

import './Shelf.scss'

// Icon Imports
import * as image from 'images';
import ObjectHelp from '../helpDialogs/ObjectHelp.js'
import HelpDialog from '../helpDialogs/Dialog.js'
import ToolHelp from '../helpDialogs/ToolHelp.js'
import DimHelp from '../helpDialogs/DimHelp.js'


/*
  Shelf: The set of objects, tools and options on the right-hand
  side of the screen
*/
class Shelf extends Component {
  state = {
    objects:[
      ['Ground', image.ground_line, image.ground_fill],
      ['Hill', image.hill_line, image.hill_fill],
      ['Hazard', image.hazard_line, image.hazard_fill],
      ['Spawn', image.spawn_line, image.spawn_fill],
      ['Goal', image.goal_line, image.goal_fill],
      ['NPC', image.npc_line, image.npc_fill]
    ],
    tools: [
      ['Place', image.place_line, image.place_fill],
      ['Move', image.move_line, image.move_fill],
      ['Delete', image.delete_line, image.delete_fill]
    ],
    showObjectsHelp: false,
    showToolsHelp: false,
    showDimsHelp: false,
  }

  toggleObjectsDialog = () => {
    this.setState({showObjectsHelp: !this.state.showObjectsHelp});
  }

  toggleToolsDialog = () => {
    this.setState({showToolsHelp: !this.state.showToolsHelp});
  }

  toggleDimsDialog = () => {
    this.setState({showDimsHelp: !this.state.showDimsHelp});
  }

  render() {
    return (
      <div className="editor-shelf">
        <div> {/* Just a wrapper for showing all the help dialogs*/}
          {this.state.showObjectsHelp ?
            <HelpDialog onClose={this.toggleObjectsDialog}
              title="Objects Help" content={<ObjectHelp/>}/>
            : null
          }
          {this.state.showToolsHelp ?
            <HelpDialog onClose={this.toggleToolsDialog}
              title="Tools Help" content={<ToolHelp/>}/>
            : null
          }
          {this.state.showDimsHelp ?
            <HelpDialog onClose={this.toggleDimsDialog}
              title="Dimensions Help" content={<DimHelp/>}/>
            : null
          }
        </div>
        <div className="LevelObjects">
          <ShelfSet
            name="Level Objects"
            helpFunc={this.toggleObjectsDialog}
            items={this.state.objects}
            active={this.props.activeObject}
            changeShelfItem={this.props.changeObject}
          />
        </div>
        <hr></hr>
        <div className="Tools">
          <ShelfSet
            name="Tools"
            helpFunc={this.toggleToolsDialog}
            items={this.state.tools}
            active={this.props.activeTool}
            changeShelfItem={this.props.changeTool}
          />
        </div>
        <hr></hr>
        <div className="LevelResizer">
          <LevelResizer
            name="Level Dimensions"
            helpFunc={this.toggleDimsDialog}
            addColumn={this.props.addColumn}
            removeColumn={this.props.removeColumn}
            addRow={this.props.addRow}
            removeRow={this.props.removeRow}
            cols={this.props.cols}
            rows={this.props.rows}
            canAddCols={this.props.canAddCols}
            canAddRows={this.props.canAddRows}
            canRemoveCols={this.props.canRemoveCols}
            canRemoveRows={this.props.canRemoveRows}
          />
        </div>
      </div>
    );
  }
}

/*
  LevelResizer: The option at the bottom of the shelf
  which allows the user to increase/decrease level dimensions.
*/
const LevelResizer = props => {
  return (
    <div className="shelfset">
      <div className="shelfset-header">
        <h2 className="shelfset-name">{props.name}</h2>
          <IconButton onClick={props.helpFunc}
            className="shelfset-help">
            <MaterialIcon icon="help_outline"/>
          </IconButton>
      </div>
      <LevelDimension
        remove={props.removeColumn}
        add={props.addColumn}
        canAdd={props.canAddCols}
        canRemove={props.canRemoveCols}
        value={props.cols}
        name="Columns"
      />

      <LevelDimension
        remove={props.removeRow}
        add={props.addRow}
        canAdd={props.canAddRows}
        canRemove={props.canRemoveRows}
        value={props.rows}
        name="Rows"
      />
    </div>
  );
}

/*
  LevelDimension: Generic UI component for adding/removing
  rows and columns
*/
const LevelDimension = props => {
  return (
    <div>
      <h4 className="dimension-direction">{props.name}</h4>
      <div className="dimensions-selector">
        <IconButton onClick={props.remove}
          className="dimension-button"
          disabled={!props.canRemove}>
          <MaterialIcon icon="remove_circle_outline"/>
        </IconButton>
        <h2 className="dimension-value">{props.value}</h2>
        <IconButton onClick={props.add}
          className="dimension-button"
          disabled={!props.canAdd}>
          <MaterialIcon icon="add_circle_outline"/>
        </IconButton>
      </div>
    </div>
  );
}

/*
  ShelfSet: A container for a set of shelf items,
  such as level objects or tools.
*/
class ShelfSet extends Component {

  render() {
    let items = []
    for (let i = 0; i < this.props.items.length; i++) {
      let icon = this.props.items[i][i === this.props.active ? 2 : 1];
      items.push(<ShelfItem
          name={this.props.items[i][0]}
          icon={icon}
          active={(i === this.props.active)}
          key={i}
          index={i}
          changeShelfItem={this.props.changeShelfItem}
        />
      );
    }

    return (
      <div className="shelfset">
        <div className="shelfset-header">
          <h2 className="shelfset-name">{this.props.name}</h2>
            <IconButton onClick={this.props.helpFunc}
              className="shelfset-help">
              <MaterialIcon icon="help_outline"/>
            </IconButton>
        </div>
        <ul className="mdc-image-list shelfset-list">
          {items}
        </ul>
      </div>
    );
  }
}


/*
  Shelf Item: A single item on the shelf,
  such as a level object or tool.
*/
class ShelfItem extends Component {

  click = () => {
    this.props.changeShelfItem(this.props.index);
  }

  render() {
    let cl = this.props.active ? 'active-shelf-item' : 'inactive-shelf-item';
    return (
      <li className={"shelf-item mdc-ripple-surface mdc-image-list__item " + cl} onClick={this.click}>
        <div className='mdc-image-list__image-aspect-container'>
          <img className="mdc-image-list__image" src={this.props.icon} alt={this.props.icon} />
        </div>
        <div className='mdc-image-list__supporting name'>
          <span className="mdc-image-list__label shelf-item-label">{this.props.name}</span>
        </div>
      </li>
    );
  }
}

export default Shelf;
