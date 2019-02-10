import React, {Component} from 'react';

import './Dialog.scss'

class ToolHelp extends Component {
  render() {
    return (
      <div>
        <p><b>Place:</b> The place tool can be used to place objects in the level. When selected, the current highlighted object will be placed in the level when a tile is clicked.</p>
        <p><b>Move:</b> The move tool can be used to move already placed objects. Click and drag an object in the level to a new location.</p>
        <p><b>Delete:</b> The delete tool removes objects from the level. Click a tile on the level grid to erase any object there.</p>

      </div>
    );
  }
}

export default ToolHelp;
