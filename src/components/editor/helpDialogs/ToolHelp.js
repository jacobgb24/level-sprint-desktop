import React from 'react';

import './Dialog.scss'

import * as image from 'images'

const ToolHelp = props => {
  return (
    <div>
      <div className="row">
        <img src={image.place_fill} style={{width:`128px`}}/>
        <p style={{margin: `auto`}}><b>Place:</b> The place tool can be used to place objects in the level. When selected, the current highlighted object will be placed in the level when a tile is clicked.</p>
      </div>
      <div className="row">
        <img src={image.delete_fill} style={{width:`128px`}}/>
        <p style={{margin: `auto`}}><b>Delete:</b> The delete tool removes objects from the level. Click a tile on the level grid to erase any object there.</p>
      </div>
    </div>
  );
}

export default ToolHelp;
