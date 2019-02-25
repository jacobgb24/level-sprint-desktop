import React from 'react';

import './Dialog.scss'

const LevelHelp = props => {
  return (
    <div>
      <p>Levels can be managed here. The currently selected level is highlighted. The name of the level can be edited directly.</p>
      <p>New levels can be added using the "New Level" button. Levels can be deleted with the trash can.</p>
      <p>At least one level must be present. If the last level is deleted, a new level will be put in its place.</p>
    </div>
  );
}

export default LevelHelp;
