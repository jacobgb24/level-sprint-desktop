import React, {Component} from 'react';

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
    levels: []
  };

  render() {
    return (
      <div className="editor-container">
          <LevelShelf className="editor-shelf" />
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
