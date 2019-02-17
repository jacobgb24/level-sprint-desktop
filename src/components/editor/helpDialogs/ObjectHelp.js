import React from 'react';

import './Dialog.scss'

const ObjectHelp = props => {
  return (
    <div>
      <p>Objects are the building blocks of a level. They can be placed in the grid to create a variety of layouts.</p>
      <p>To rotate or flip an object, click it again after it has been selected. Only certain objects can be changed.</p>
      <p>Spawn and goal represent where you would like the player to start and end the level.</p>
    </div>
  );
}

export default ObjectHelp;
