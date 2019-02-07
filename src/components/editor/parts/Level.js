import * as math from 'mathjs'
import ground_line from './icons/toolbar/ground_outlined.svg';

class Level {
  constructor() {
    this.height = 8;
    this.min_height = 8;
    this.length = 11;
    this.min_length = 11;
    this.name = "Unnamed Level...";
    this.data = math.matrix();
    this.resize()
  }

  set(x, y, value) {
    this.data.subset(math.index(y, x), value);
    // console.log(this.data)
  }

  get(x, y) {
    console.log(x,y)
    console.log(math.subset(this.data, math.index(y, x)))

    return math.subset(this.data, math.index(y, x));

  }

  addRow() {
    this.height += 1;
    this.resize();
  }

  removeRow() {
    if (this.height > this.min_height) {
      this.height -= 1;
      this.resize();
    }
  }

  addColumn() {
    this.length += 1;
    this.resize();
  }

  removeColumn() {
    if (this.length > this.min_length) {
      this.length -= 1;
      this.resize();
    }
  }

  setLength(length) {
    this.length = length;
    this.resize();
  }

  setHeight(height) {
    this.height = height;
    this.resize();
  }

  resize() {
    this.data.resize([this.height, this.length], ground_line);
  }

  rename(name) {
    this.name = name;
  }
}

export default Level;

/*
  LEVEL OBJECT IDs:
  0 - None
  1 - Ground
  2 - Slope Up
  3 - Slope Down
  4 - Hazard
  5 - Spawn
  6 - Goal
  7 - NPC
*/
