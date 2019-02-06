import React, {Component} from 'react';

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
    rows: 8,
    cols: 11,
    min_rows: 8,
    min_cols: 11,
    active_tool: 0,
    active_object: -1
  };

  render() {
    return (
      <div className="editor-bg">
        <div className="editor-left">
          <FileButtons className="editor-buttons"/>
          <TileGrid className="editor-grid" rows={this.state.rows} cols={this.state.cols} />
        </div>
        <Shelf
            className="editor-shelf"
            active_object={this.state.active_object}
            active_tool={this.state.active_tool}
            addColumn={this.addColumn}
            removeColumn={this.removeColumn}
            addRow={this.addRow}
            removeRow={this.removeRow}
            cols={this.state.cols}
            rows={this.state.rows}
          />
      </div>
    );
  }

  addColumn = () => {
    this.setState(prev => ({ cols: prev.cols + 1 }));
  };

  removeColumn = () => {
    let next = this.state.cols - 1;
    if (next < this.state.min_cols) {
      next = this.state.min_cols;
    }

    this.setState(prev => ({ cols: next }));
  };

  addRow = () => {
    this.setState(prev => ({
      rows: prev.rows + 1
    }));
  };

  removeRow = () => {
    let next = this.state.rows - 1;
    if (next < this.state.min_rows) {
      next = this.state.min_rows;
    }
    this.setState(prev => ({
      rows: next
    }));
  };
}


export default Editor;
