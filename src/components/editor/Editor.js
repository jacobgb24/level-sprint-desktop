import React, {Component} from 'react';
import update from 'immutability-helper';

import {Level, DefaultLevel} from './levelGrid/Level.js'
import LevelShelf from './levelBar/LevelShelf.js'
import Grid from './levelGrid/Grid.js';
//import Shelf from './toolbar/Shelf.js';
import ToolBar from './toolbar/ToolBar.js';
import LevelResizer from './toolbar/LevelResizer.js';
import './Editor.scss'

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
  };

  // Called before render. Adjust the state to include the default level
  componentWillMount() {
    this.setState({
      levels: update(this.state.levels, {$push: [this.state.curLevel]})
    })
  }

  render() {
    return (
      <div className="editor-container">
          <LevelShelf className="editor-shelf"
            levels={this.state.levels}
            addLevel={this.addLevel.bind(this)}
            removeLevel={this.removeLevel.bind(this)}
            /*We only compare the level data because otherwise changing the name
              loses focus*/
            selected={this.state.levels.map(function(level) { return level.data})
                      .indexOf(this.state.curLevel.data)}
            changeLevel={this.changeLevel.bind(this)}
            updateName={this.updateLevelName.bind(this)}
            />
          <Grid
            className="editor-grid"
            level={this.state.curLevel}
            click={this.placeObject}
          />

          <div className='right-hand-sidebar'>
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
      </div>
    );
  }

  addLevel(e, level = new Level()) {
    this.setState({
      levels: update(this.state.levels, {$push: [level]}),
    }, () => {this.changeLevel(this.state.levels.length - 1)})

  }

  removeLevel(index) {
    if (this.state.levels.length > 1) {
      this.setState({
        levels: update(this.state.levels, {$splice: [[index, 1]]})
      }, () => { this.changeLevel(Math.max(0, index - 1))})
    }
    else {
      this.setState({
        levels: update(this.state.levels, {[0]: {$set: new DefaultLevel()}})
      }, () => { this.changeLevel(0)})
    }
    //TODO: Alert Dialog to confirm before deleting
  }

  updateLevelName(index, newName) {
    console.log(index, newName);
    this.setState({
      levels: update(this.state.levels, {[index]: {name: {$set: newName}}})
    })
  }

  changeLevel(index) {
    // console.log("CHANGING LEVEL TO ", index)
    this.setState({curLevel: this.state.levels[index]});
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
    console.log(index, rotation, flip)
    this.setState({activeObject: index, activeObjectRotation: rotation, activeObjectFlip: flip})
    // this.changeTool(0);
  }

  changeTool = (index) => {
    // for some reason the index is wrapped in an object
    console.log("Changed tool:", index)
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
