import React from 'react';

import './Dialog.scss'

const LevelHelp = props => {
  return (
    <div>
      <p>Levels can be managed here. The currently selected level is highlighted. This level can be renamed by editing the name directly. It can also be deleted.</p>
      <p>New levels can be added using the "New Level" button.</p>
      <p>At least one level must be present. If the last level is deleted, a new level will be put in its place.</p>
    </div>
  );
}

export default LevelHelp;
