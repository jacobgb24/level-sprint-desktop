import React, {Component} from 'react';

import TileGrid from './TileGrid.js';
import Shelf from './Shelf.js';
import FileButtons from './FileButtons.js';

import '../../styles/components.scss'

class Editor extends Component {
  state = {
    rows: 8,
    cols: 11,
    min_rows: 8,
    min_cols: 11
  };

  render() {
    return (
      <div>
        <FileButtons/>

        <div>
          <TileGrid rows={this.state.rows} cols={this.state.cols} />
          <Shelf />
        </div>

        <div>
          <div>
            <Button label={"<"} onClickFunction={this.removeColumn} />
            <Button label={">"} onClickFunction={this.addColumn} />
          </div>
          <div>{this.state.cols}</div>

          <div>
            <Button label={"<"} onClickFunction={this.removeRow} />
            <Button label={">"} onClickFunction={this.addRow} />
          </div>
          <div>{this.state.rows}</div>
        </div>

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

class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction();
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.label}</button>;
  }
}

export default Editor;
