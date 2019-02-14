import React, {Component} from 'react';
import update from 'immutability-helper';

import {Level, DefaultLevel} from './levelGrid/Level.js'
import LevelShelf from './levelBar/LevelShelf.js'
import Grid from './levelGrid/Grid.js';
import Shelf from './toolbar/Shelf.js';
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

          <Shelf
              className="editor-shelf"
              activeObject={this.state.activeObject}
              activeTool={this.state.activeTool}
              addColumn={this.addColumn}
              removeColumn={this.removeColumn}
              addRow={this.addRow}
              removeRow={this.removeRow}
              cols={this.state.curLevel.length}
              rows={this.state.curLevel.height}
              canAddCols={this.state.curLevel.canAddCol}
              canAddRows={this.state.curLevel.canAddRow}
              canRemoveCols={this.state.curLevel.canRemoveCol}
              canRemoveRows={this.state.curLevel.canRemoveRow}
              changeTool={this.changeTool}
              changeObject={this.changeObject}
            />
      </div>
    );
  }

  addLevel(e, level = new Level()) {
    var newLevels = [...this.state.levels];
    newLevels.push(level);
    // console.log(level);
    this.setState({levels: newLevels});
    // console.log("ADDING LEVEL. STATE IS", this.state.levels);
    // this.changeLevel(this.state.levels - 1);
  }

  removeLevel(index) {
    console.log("REMOVING", index);
    this.setState({
      levels: update(this.state.levels, {$splice: [[index, 1]]})
    })
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
