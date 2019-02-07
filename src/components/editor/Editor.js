import React, {Component} from 'react';

import Level from './parts/Level.js'
import TileGrid from './parts/TileGrid.js';
import Shelf from './parts/Shelf.js';
import FileButtons from './parts/ActionBar.js';
import './Editor.scss'


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
      <div className="editor-bg">
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
            active_object={this.state.active_object}
            active_tool={this.state.active_tool}
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
    this.state.cur_level.set(x, y, 1);
    console.log("CLICKED!!")
    this.setState(prev => ({cur_level: prev.cur_level}));
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
