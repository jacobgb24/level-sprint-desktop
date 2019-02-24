import React from 'react';

import './Dialog.scss'

const HotKeysHelp = props => {
  return (
    <div>
      <h4>Tool Shortcuts</h4>
      Change to the corresponding tool.
      <div className="row">
        <div className="column">
          {kbdWrapper('q', "Place")}
        </div>
        <div className="column">
          {kbdWrapper('w', 'Move')}
        </div>
        <div className="column">
          {kbdWrapper('e', 'Delete')}
        </div>
      </div>
      <h4>Object Shortcuts</h4>
      Select the corresponding object. Pressing the key again will rotate/flip the object.
      <div className="row">
        <div className="column">
          {kbdWrapper('1', 'Ground')}
          {kbdWrapper('5', 'Goal')}
        </div>
        <div className="column">
          {kbdWrapper('2', 'Hill')}
          {kbdWrapper('4', 'Spawn')}
        </div>
        <div className="column">
          {kbdWrapper('3', 'Hazard')}
          {kbdWrapper('6', 'NPC')}
        </div>
      </div>
      <h4>Level Shortcuts</h4>
      Modify the level sidebar.
      {kbdWrapper('>', "Go to the next level")}
      {kbdWrapper('<', "Go to the previous level")}
      {kbdWrapper('n', "Create new level")}
      <h4>Dimension Shortcuts</h4>
      Change the dimensions of the current level.
      <div className="row">
        <div className="column">
          {kbdWrapper('🠄', "Remove column")}
          {kbdWrapper('🠇', "Remove row")}

        </div>
        <div className="column">
          {kbdWrapper('🠆', "Add column")}
          {kbdWrapper('🠅', "Add row")}

        </div>
      </div>
      <h4>Other Shortcuts</h4>
      {kbdWrapper('f', "Flip  selected object if supported")}
      {kbdWrapper('r', "Rotate CW  selected object if supported")}
      {kbdWrapper('r', "Rotate CCW  selected object if supported", true)}

    </div>
  );
}

const kbdWrapper = (keys, desc, shift=false) => {
  return ( <p className="shortcut-line">
            {shift ? <b><kbd>Shift</kbd>+</b> : null}
            <kbd><b>{keys}</b></kbd>- {desc}</p>)
}

export default HotKeysHelp;


// const DimHelp = props => {
//   return (
//     <div>
//       <p>The size of the level grid can be adjusted using the plus and minus buttons.</p>
//       <p>If a button is grayed-out, that dimension can't be changed in that manor. Note that the minimum level size is 16x10 and the maximum level size must be under 1024 tiles.</p>
//       <p>Common sizes under 1024 tiles include: 32x32, 16x64, and 12x85.</p>
//     </div>
//   );
// }
//
// export default DimHelp;
