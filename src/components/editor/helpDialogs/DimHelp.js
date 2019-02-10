import React, {Component} from 'react';

import './Dialog.scss'

class ObjectHelp extends Component {
  render() {
    return (
      <div>
        <p>The size of the level grid can be adjusted using the plus and minus buttons.</p>
        <p>If a button is grayed-out, that dimension can't be changed in that manor. Note that the minimum level size is 16x10 and the maximum level size must be under 1024 tiles.</p>
        <p>Common sizes under 1024 tiles include: 32x32, 16x64, and 12x85.</p>


      </div>
    );
  }
}

export default ObjectHelp;
