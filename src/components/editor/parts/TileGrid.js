import React, {Component} from 'react';
import {ScrollBox, ScrollAxes, FastTrack} from 'react-scroll-box';

import './grid.scss'

import ground_line from './icons/toolbar/ground_outlined.svg';
import ground_fill from './icons/toolbar/ground_filled.svg';

/*
  Board: A dynamically sizeable level board.
*/
const TileGrid = props => {
  let rows = [];
  for (let i = 0; i < props.level.height; i++) {
    rows.push(
      <Row
        level={props.level}
        click={props.click}
        key={i}
        row={i}
      />
    );
  }
  return (
    <div className="grid-container">
      <div className="grid-scroll-layer scroll-bar">
        <div className="editor-grid"> {rows} </div>
      </div>
    </div>
  );
}


/*
  Row: a dynamically sizeable row of tiles.
*/
const Row = props => {
  let tiles = [];
  for (let i = 0; i < props.level.length; i++) {
    console.log(props.level.get(i, props.row))
    tiles.push(
      <Tile
        x={i}
        y={props.row}
        click={props.click}
        key={i}
        value={props.level.get(i, props.row)}
      />
    );
  }

  return <div className="editor-row"> {tiles} </div>
}


/*
  Tile: A single game tile.
*/
class Tile extends Component {
  state = {
    tilepaths: [
      ground_line,
      ground_fill
    ],
  };

  click = () => {
    this.props.click(this.props.x, this.props.y)
  }

  render() {
    console.log(this.props.value)
    return (
      <img
        src={this.props.value}
        className="Tile"
        onClick={this.click}
      />
    )
  }
}

export default TileGrid;
