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
    objects: [ground, hill, hazard, spawn, goal, npc, blank],
    curLevel: new DefaultLevel(),
    curLevelInd: 0,
    levels: [],
  };

  componentDidMount() {
    this.addLevel(null, this.state.curLevel);
    //TODO: put focus on this one. For some reason that doesn't happen
  }



  render() {
    return (
      <div className="editor-container">
          <LevelShelf className="editor-shelf"
            levels={this.state.levels}
            addLevel={this.addLevel.bind(this)}
            removeLevel={this.removeLevel.bind(this)}
            selected={this.state.curLevelInd}
            changeLevel={this.changeLevel.bind(this)}
            updateName={this.updateLevelName.bind(this)}
            />
          <Grid
            className="editor-grid"
            level={this.state.curLevel}
            click={this.placeObject}
          />

          <div>
            <ToolBar
              activeTool={this.state.activeTool}
              changeTool={this.changeTool}
              activeObject={this.state.activeObject}
              changeObject={this.changeObject}
            />
            <LevelResizer
              cols={this.state.curLevel.length}
              addColumn={this.addColumn}
              removeColumn={this.removeColumn}
              canAddCols={this.state.curLevel.canAddCol}
              canRemoveCols={this.state.curLevel.canRemoveCol}

              rows={this.state.curLevel.height}
              addRow={this.addRow}
              removeColumn={this.removeColumn}
              canAddRows={this.state.curLevel.canAddRow}
              canRemoveCols={this.state.curLevel.canRemoveRow}
            />
          </div>
      </div>
    );
  }

  addLevel(e, level = new Level()) {
    this.setState({
      levels: update(this.state.levels, {$push: [level]})
    })
    // this.changeLevel(this.state.levels.length - 1);
    //TODO: change focus to newest level. Above line crashes
  }

  removeLevel(index) {
    console.log("REMOVING", index);
    this.setState({
      levels: update(this.state.levels, {$splice: [[index, 1]]})
    })
    //TODO: change focus on removal
  }

  updateLevelName(index, newName) {
    console.log(index, newName);
    this.setState({
      levels: update(this.state.levels, {[index]: {name: {$set: newName}}})
    })
  }

  changeLevel(index) {
    console.log("CHANGING LEVEL TO ", index)
    this.setState({curLevelInd: index});
    this.setState({curLevel: this.state.levels[index]});
  }

  placeObject = (x, y) => {
    let obj = this.state.objects[this.state.activeObject]
    this.state.curLevel.set(x, y, obj);
    this.setState(prev => ({curLevel: prev.curLevel}));
  }

  changeObject = (index) => {
    this.setState(prev => ({activeObject: index}))
    this.changeTool(0);
  }

  changeTool = (index) => {
    this.setState(prev => ({activeTool: index}))
    if (index != 0) {
      this.setState(prev => ({activeObject: 6}))
    }
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
