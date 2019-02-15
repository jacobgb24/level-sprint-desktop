import React, {Component} from 'react'
import IconButton, {IconToggle} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import {withRipple} from '@material/react-ripple';
import LevelResizer from './LevelResizer.js';
import ToolBar from './ToolBar.js'
import './Shelf.scss'

// Icon Imports
import * as image from 'images';
import ObjectHelp from '../helpDialogs/ObjectHelp.js'
import HelpDialog from '../helpDialogs/Dialog.js'
import ToolHelp from '../helpDialogs/ToolHelp.js'
import DimHelp from '../helpDialogs/DimHelp.js'


/*
  Shelf: The set of objects, tools and options on the right-hand
  side of the screen
*/
class Shelf extends Component {
  render() {
    return (
      <div>
        <ToolBar
          activeTool={this.props.activeTool}
          changeTool={this.props.changeTool}
          activeObject={this.props.activeObject}
          changeObject={this.props.changeObject}
        />
        <LevelResizer

        />
      </div>
    )
  }
}


export default Shelf;
