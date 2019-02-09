import React, {Component} from 'react'
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import "@material/image-list/mdc-image-list.scss";


import './shelf.scss'

// Icon Imports
import * as image from 'images';


/*
  Shelf: The set of objects, tools and options on the right-hand
  side of the screen
*/
class Shelf extends Component {
  state = {
    objects:[
      ['Ground', image.ground_line, image.ground_fill],
      ['Hill', image.slope_line, image.slope_fill],
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
  }

  render() {
    return (
      <div className="Shelf">
        <div className="LevelObjects">
          <ShelfSet
            name="Level Objects"
            items={this.state.objects}
            active={this.props.activeObject}
          />
        </div>
        <hr></hr>
        <div className="Tools">
          <ShelfSet
            name="Tools"
            items={this.state.tools}
            active={this.props.activeTool}
          />
        </div>
        <hr></hr>
        <div className="LevelResizer">
          <LevelResizer
            name="Level Dimensions"
            addColumn={this.props.addColumn}
            removeColumn={this.props.removeColumn}
            addRow={this.props.addRow}
            removeRow={this.props.removeRow}
            cols={this.props.cols}
            rows={this.props.rows}
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
    <div>
      <h2 className="shelfset-name">{props.name}</h2>
      <LevelDimension
        remove={props.removeColumn}
        add={props.addColumn}
        value={props.cols}
        name="columns"
      />

      <LevelDimension
        remove={props.removeRow}
        add={props.addRow}
        value={props.rows}
        name="rows"
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
        <IconButton onClick={props.remove} className="dimension-button">
          <MaterialIcon icon="remove_circle_outline"/>
        </IconButton>
        <h2 className="dimension-value">{props.value}</h2>
        <IconButton onClick={props.add} className="dimension-button">
          <MaterialIcon icon="add_circle_outline"/>
        </IconButton>
      </div>
    </div>
  );
}

/*

*/
class Button extends Component {
  handleClick = () => {
    this.props.onClickFunction();
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.label}</button>;
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
      items.push(
        <ShelfItem
          name={this.props.items[i][0]}
          icon={icon}
          active={(i === this.props.active)}
          key={i}
        />
      );
    }

    return (
      <div>
        <h2 className="shelfset-name">{this.props.name}</h2>
        <ul className="mdc-image-list shelfset">
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
const ShelfItem = props => {
  if (props.active) {
    return (
      <li className="mdc-image-list__item activeShelfItem">
        <div className='mdc-image-list__image-aspect-container'>
          <img className='mdc-image-list__image' src={props.icon} />
        </div>
        <div className='mdc-image-list__supporting'>
          <span className="mdc-image-list__label shelf-item-label">{props.name}</span>
        </div>
      </li>
    );
  } else {
    return (
      <li className="mdc-image-list__item inactiveShelfItem">
        <div className="mdc-image-list__image-aspect-container">
          <img className="mdc-image-list__image" src={props.icon} alt={props.icon} />
        </div>
        <div className="mdc-image-list__supporting">
          <span className="mdc-image-list__label shelf-item-label">{props.name}</span>
        </div>
      </li>
    );
  }

}

export default Shelf;
