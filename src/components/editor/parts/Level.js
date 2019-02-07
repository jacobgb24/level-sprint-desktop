import * as math from 'mathjs'

class Level {
  constructor() {
    this.height = 8;
    this.min_height = 8;
    this.length = 11;
    this.min_length = 11;
    this.name = "Unnamed Level...";
    this.data = math.zeros(this.height, this.length);
  }

  set(x, y, value) {
    math.subset(this.data, math.index(y, x), value);
  }

  get(x, y) {
    math.subset(this.data, math.index(y, x));
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
    math.resize(this.data, [this.height, this.length]);
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
