import React, {Component} from 'react'

import '../../styles/shelf.scss'

/*
  Shelf: The set of objects, tools and options on the right-hand
  side of the screen
*/
class Shelf extends Component {
  render() {
    return (
      <div className="Shelf">
        SHELF
        <ShelfSet />
        <ShelfSet />
        <LevelResizer
          addColumn={this.props.addColumn}
          removeColumn={this.props.removeColumn}
          addRow={this.props.addRow}
          removeRow={this.props.removeRow}
          cols={this.props.cols}
          rows={this.props.rows}
        />
      </div>
    );
  }
}

/*
  LevelResizer: Option to increase/decrease level size.
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

/**/
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
    return (
      <div>
      </div>
    );
  }
}


/*
  Shelf Item: A single item on the shelf,
  such as a level object or tool.
*/
const ShelfItem = props => {
  return (
    <div></div>
  );
}

export default Shelf;
