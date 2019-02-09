import * as math from 'mathjs'

import {ground_line, ground_fill, spawn_fill} from 'images';

class Level {
  constructor() {
    this.height = 10;
    this.min_height = 10;
    this.length = 16;
    this.min_length = 16;
    this.name = "Unnamed Level...";
    this.data = math.matrix();
    this.resize()
  }

  set(x, y, value) {
    this.data.subset(math.index(y, x), value);
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

class DefaultLevel extends Level {
  constructor() {
    super();
    this.build_default();
  }

  build_default() {
    for (let y=0; y<3; y++) {
      for (let x=0; x<7; x++) {
        this.set(x, y, ground_fill);
      }

      for (let x=9; x<16; x++) {
        this.set(x, y, ground_fill);
      }
    }

    this.set(1, 3, spawn_fill);
  }
}

export default Level;
export {Level, DefaultLevel};

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
