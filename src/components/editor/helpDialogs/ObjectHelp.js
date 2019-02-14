import React from 'react';

import './Dialog.scss'

const ObjectHelp = props => {
  return (
    <div>
      <p>Objects are the building blocks of a level. They can be placed in the grid to create a variety of layouts.</p>
      <p>To add objects, first select the "Place" tool. Next choose a block. The object that is filled in on the sidebar is the currently selected object.</p>
      <p>Spawn and goal represent where you would like the player to start and end the level.</p>
    </div>
  );
}

export default ObjectHelp;
