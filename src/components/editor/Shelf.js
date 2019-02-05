import React, {Component} from 'react'

import '../../styles/components.scss'

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
        <LevelResizer />
      </div>
    );
  }
}

/*
  LevelResizer: Option to increase/decrease level size.
*/
const LevelResizer = props => {
  return (
    <div></div>
  );
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
