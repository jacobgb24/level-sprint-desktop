import React, {Component} from 'react';

import Level from './parts/Level.js'
import TileGrid from './parts/TileGrid.js';
import Shelf from './parts/Shelf.js';
import FileButtons from './parts/ActionBar.js';
import './Editor.scss'

import ground_fill from './parts/icons/toolbar/ground_filled.svg';

/*
  Editor: The State manager for the level editor
  (Game board, shelf, and file buttons).
*/
class Editor extends Component {
  state = {
    active_tool: 0,
    active_object: -1,
    cur_level: new Level()
  };

  render() {
    return (
      <div className="editor-container">
        <div className="editor-left">
          <FileButtons className="editor-buttons"/>
          <TileGrid
            className="editor-grid"
            level={this.state.cur_level}
            click={this.click}
          />
        </div>
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
          />
      </div>
    );
  }

  click = (x, y) => {
    this.state.cur_level.set(x, y, ground_fill);
    console.log("CLICKED!!")
    this.setState(prev => ({cur_level: prev.cur_level}));
    console.log(this.state.cur_level)
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
