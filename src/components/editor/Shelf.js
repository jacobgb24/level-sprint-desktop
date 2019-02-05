import React, {Component} from 'react'

import '../../styles/shelf.scss'

/*
  Shelf: The set of objects, tools and options on the right-hand
  side of the screen
*/
class Shelf extends Component {
  state = {
    objects:[
      ['Ground', 'img_path'],
      ['Hill', 'img_path'],
      ['Hazard', 'img_path'],
      ['Spawn', 'img_path'],
      ['Goal', 'img_path'],
      ['NPC', 'img_path']
    ],
    tools: [
      ['Place', 'img_path'],
      ['Move', 'img_path'],
      ['Delete', 'img_path']
    ],
  }

  render() {
    return (
      <div className="Shelf">
        SHELF
        <div className="LevelObjects">
          <ShelfSet
            name="Level Objects"
            items={this.state.objects}
            active={this.props.active_object}
          />
        </div>

        <div className="Tools">
          <ShelfSet
            name="Tools"
            items={this.state.tools}
            active={this.props.active_tool}
          />
        </div>

        <div className="LevelResizer">
          <LevelResizer
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
      {props.name}
      <div>
        <Button label={"<"} onClickFunction={props.remove} />
        {props.value}
        <Button label={">"} onClickFunction={props.add} />
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
      items.push(
        <ShelfItem
          name={this.props.items[i][0]}
          icon={this.props.items[i][1]}
          active={(i == this.props.active)}
        />
      );
    }

    return (
      <div>
        <div>{this.props.name}</div>
        <div>{items}</div>
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
      <div className="activeShelfItem">
        <div>{props.icon}</div>
        <div>{props.name}</div>
      </div>
    );
  } else {
    return (
      <div className="inactiveShelfItem">
        <div>{props.icon}</div>
        <div>{props.name}</div>
      </div>
    );
  }

}

export default Shelf;
