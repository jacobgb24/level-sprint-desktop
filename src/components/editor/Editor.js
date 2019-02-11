import React, {Component} from 'react';

import {Level, DefaultLevel} from './levelGrid/Level.js'
import TileGrid from './levelGrid/TileGrid.js';
import Shelf from './toolbar/Shelf.js';
import './Editor.scss'

import {ground_fill} from 'images';
/*
  Editor: The State manager for the level editor
  (Game board, shelf, and file buttons).
*/
class Editor extends Component {
  state = {
    active_tool: 0,
    active_object: -1,
    cur_level: new DefaultLevel()
  };

  render() {
    return (
      <div className="editor-container">
          <TileGrid
            className="editor-grid"
            level={this.state.cur_level}
            click={this.click}
          />
        <Shelf
            className="editor-shelf"
            activeObject={this.state.active_object}
            activeTool={this.state.active_tool}

            addColumn={this.addColumn}
            removeColumn={this.removeColumn}
            addRow={this.addRow}
            removeRow={this.removeRow}
            cols={this.state.cur_level.length}
            rows={this.state.cur_level.height}
            canAddCols={this.state.cur_level.can_add_col}
            canAddRows={this.state.cur_level.can_add_row}
            canRemoveCols={this.state.cur_level.can_remove_col}
            canRemoveRows={this.state.cur_level.can_remove_row}

          />
      </div>
    );
  }

  click = (x, y) => {
    this.state.cur_level.set(x, y, ground_fill);
    // console.log("CLICKED!!")
    this.setState(prev => ({cur_level: prev.cur_level}));
    // console.log(this.state.cur_level)
  }

  addColumn = () => {
    this.state.cur_level.addColumn();
    this.setState(prev => ({cur_level: prev.cur_level}));
  };

  removeColumn = () => {
    this.state.cur_level.removeColumn();
    this.setState(prev => ({cur_level: prev.cur_level}));
  };

  addRow = () => {
    this.state.cur_level.addRow();
    this.setState(prev => ({cur_level: prev.cur_level}));
  };

  removeRow = () => {
    this.state.cur_level.removeRow();
    this.setState(prev => ({cur_level: prev.cur_level}));
  };
}


export default Editor;
