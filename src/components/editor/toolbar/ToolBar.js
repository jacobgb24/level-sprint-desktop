import React, {Component} from 'react';
import IconButton, {IconToggle} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

import HelpDialog from '../helpDialogs/Dialog.js';
import ObjectHelp from '../helpDialogs/ObjectHelp.js';
import ToolHelp from '../helpDialogs/ToolHelp.js';

import * as image from 'images';

import './Shelf.scss';
import './ToolBar.scss';

class ToolBar extends Component {
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
  }

  toggleObjectsDialog = () => {
    this.setState({showObjectsHelp: !this.state.showObjectsHelp});
  }

  toggleToolsDialog = () => {
    this.setState({showToolsHelp: !this.state.showToolsHelp});
  }

  render() {
    let divs = [];
    divs.push(
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
      </div>
    );

    divs.push(
      <div className="tools-shelf">
        <ShelfSet
          name="Tools"
          helpFunc={this.toggleToolsDialog}
          items={this.state.tools}
          active={this.props.activeTool}
          changeShelfItem={this.props.changeTool}
        />
      </div>
    );

    let placeTool = 0;
    if (this.props.activeTool === placeTool) {
        divs.push(<hr/>);
        divs.push(
          <div className="level-objects-shelf">
            <ShelfSet
              name="Level Objects"
              helpFunc={this.toggleObjectsDialog}
              items={this.state.objects}
              active={this.props.activeObject}
              changeShelfItem={this.props.changeObject}
            />
          </div>
        );
    }

    return <div className="editor-shelf"> {divs} </div>
  }

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
      <div className="shelf">
        <div className="shelf-header">
          <h2 className="shelf-title">{this.props.name}</h2>
            <IconButton onClick={this.props.helpFunc}
              className="shelfset-help">
              <MaterialIcon icon="help_outline"/>
            </IconButton>
        </div>
        <div className="shelf-items">
          {items}
        </div>
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
      <div className={"shelf-item mdc-ripple-surface mdc-image-list__item " + cl} onClick={this.click}>
        <div className=''>
          <img className="shelf-item-icon" src={this.props.icon} alt={this.props.icon} />
        </div>
        <div className='shelf-item-label'>
          {this.props.name}
        </div>
      </div>
    );
  }
}

export default ToolBar;
