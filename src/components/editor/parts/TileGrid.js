import React from 'react';

import './grid.scss'

/*
  Board: A dynamically sizeable level board.
*/
const TileGrid = props => {
  let rows = [];
  for (let i = 0; i < props.rows; i++) {
    rows.push(<Row length={props.cols} key={i} />);
  }
  return <div> {rows} </div>
}


/*
  Row: One dynamically sizeable row of tiles.
*/
const Row = props => {
  let Tiles = [];
  for (let i = 0; i < props.length; i++) {
    Tiles.push(<Tile key={i} />);
  }

  return <div> {Tiles} </div>
}


/*
  Tile: A single game tile.
*/
const Tile = () => {
  return <button className="Tile"/>
}

export default TileGrid;
