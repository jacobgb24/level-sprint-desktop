import React, {Component} from 'react';
import update from 'immutability-helper';
import {GlobalHotKeys} from 'react-hotkeys';

import Button from '@material/react-button';

import {Level, DefaultLevel} from './levelGrid/Level.js'
import LevelShelf from './levelBar/LevelShelf.js'
import Grid from './levelGrid/Grid.js';
//import Shelf from './toolbar/Shelf.js';
import ToolBar from './toolbar/ToolBar.js';
import LevelResizer from './toolbar/LevelResizer.js';
import './Editor.scss'
import HotKeysHelp from './helpDialogs/HotKeysHelp.js'
import HelpDialog from './helpDialogs/Dialog.js'

import {ground, hill, hazard, spawn, goal, npc, blank} from 'images';

/*
  Editor: The State manager for the level editor
  (Game board, shelf, and file buttons).
*/
class Editor extends Component {
  state = {
    activeTool: 0,
    activeObject: 0,
    activeObjectRotation: 0,
    activeObjectFlip: 0,
    objects: [ground, hill, hazard, spawn, goal, npc, blank],
    curLevel: new DefaultLevel(),
    levels: [],
    showHotKeysDialog: false,
    // handle keys for tool layer up here since no lower dependencies
    // keyMap {name: keys,...}. keyHandlers {name: function,...}
    keyMap: {
        'place': 'q',
        'move': 'w',
        'delete': 'e',
        'next-level': '>',
        'prev-level': '<',
        'new-level': 'n',
    },
    keyHandlers: {
       'place': (event) => this.changeTool({index: 0}),
       'move': (event) => this.changeTool({index: 1}),
       'delete': (event) => this.changeTool({index: 2}),
       'next-level': (event) => this.changeLevel((this.getCurrentLevelInd() + 1) % this.state.levels.length),
       'prev-level': (event) => this.changeLevel(this.getCurrentLevelInd() != 0 ? (this.getCurrentLevelInd() - 1) : this.state.levels.length - 1),
       'new-level': (event) => this.addLevel(null),
   },
  };

  // Called before render. Adjust the state to include the default level
  componentWillMount() {
    this.setState({
      levels: update(this.state.levels, {$push: [this.state.curLevel]})
    })
  }

  toggleHotKeysDialog = () => {
    this.setState({showHotKeysDialog: !this.state.showHotKeysDialog});
  }

  render() {
    // console.log(this.state.keyMap)
    return (
      <div className="editor-container">
          {this.state.showHotKeysDialog ?
            <HelpDialog onClose={this.toggleHotKeysDialog}
              title="Keyboard Shortcuts" content={<HotKeysHelp/>}/>
            : null
          }
          <GlobalHotKeys keyMap={this.state.keyMap} handlers={this.state.keyHandlers}/>
          <div className="tall sidebar left">
            <LevelShelf
              levels={this.state.levels}
              addLevel={this.addLevel.bind(this)}
              removeLevel={this.removeLevel.bind(this)}
              selected={this.getCurrentLevelInd()}
              changeLevel={this.changeLevel.bind(this)}
              updateNam
              e={this.updateLevelName.bind(this)}
              />
          </div>
          <Grid
            className="editor-grid"
            level={this.state.curLevel}
            click={this.placeObject}
          />

          <div>
          <div className='sidebar'>
            <ToolBar
              activeTool={this.state.activeTool}
              changeTool={this.changeTool}
              activeObject={this.state.activeObject}
              changeObject={this.changeObject}
            />
            <div style={{height: `8px`}}/>
            <LevelResizer
              cols={this.state.curLevel.length}
              addColumn={this.addColumn}
              removeColumn={this.removeColumn}
              canAddCols={this.state.curLevel.canAddCol}
              canRemoveCols={this.state.curLevel.canRemoveCol}

              rows={this.state.curLevel.height}
              addRow={this.addRow}
              removeRow={this.removeRow}
              canAddRows={this.state.curLevel.canAddRow}
              canRemoveRows={this.state.curLevel.canRemoveRow}
            />
          </div>
          <div style={{height: `8px`}}/>

            <Button
              outlined
              className="hotkey-button"
              onClick={this.toggleHotKeysDialog}>
              Keyboard Shortcuts
            </Button>
          </div>
      </div>
    );
  }

  addLevel(e, level = new Level()) {
    this.setState({
      levels: update(this.state.levels, {$push: [level]}),
    }, () => {this.changeLevel(this.state.levels.length - 1)})

  }

  removeLevel(index) {
    // console.log("DEL", index)
    if (this.state.levels.length > 1) {
      this.setState({
        levels: update(this.state.levels, {$splice: [[index, 1]]})
      }, () => { this.changeLevel(Math.max(0, index - 1))})
    }
    else {
      this.setState({
        levels: update(this.state.levels, {[0]: {$set: new Level()}})
      }, () => { this.changeLevel(0)})
    }
  }

  updateLevelName(index, newName) {
    // console.log("NEW NAME", index, newName);
    this.setState({
      levels: update(this.state.levels, {[index]: {name: {$set: newName}}})
    })
  }

  changeLevel(index) {
    // console.log("CHANGING LEVEL TO ", index)
    this.setState({curLevel: this.state.levels[index]});
  }

  getCurrentLevelInd() {
    return this.state.levels.map(function(level) { return level.id}).indexOf(this.state.curLevel.id)
  }

  placeObject = (x, y) => {
    let deleteTool = 2;
    let value = null;
    if (this.state.activeTool === deleteTool) {
      value = {obj:blank, rotation: 0, flip: 1};
    } else {
      value = {obj: this.state.objects[this.state.activeObject],
                rotation: this.state.activeObjectRotation,
                flip: this.state.activeObjectFlip}
    }
    this.state.curLevel.set(x, y, value);
    this.setState(prev => ({curLevel: prev.curLevel}));
  }

  changeObject = ({index, rotation=0, flip=1} = {}) => {
    // console.log(index, rotation, flip)
    this.setState({activeObject: index, activeObjectRotation: rotation, activeObjectFlip: flip})
    this.changeTool({index: 0});
  }

  changeTool = (index) => {
    // for some reason the index is wrapped in an object
    // console.log("Changed tool:", index)
    this.setState({activeTool: index.index});
  }

  addColumn = () => {
    this.state.curLevel.addColumn();
    this.setState(prev => ({curLevel: prev.curLevel}));
  };

  removeColumn = () => {
    this.state.curLevel.removeColumn();
    this.setState(prev => ({curLevel: prev.curLevel}));
  };

  addRow = () => {
    this.state.curLevel.addRow();
    this.setState(prev => ({curLevel: prev.curLevel}));
  };

  removeRow = () => {
    this.state.curLevel.removeRow();
    this.setState(prev => ({curLevel: prev.curLevel}));
  };

}




export default Editor;
