import * as math from 'mathjs'

import {ground_line, ground_fill, spawn_fill} from 'images';

class Level {
  constructor() {
    this.height = 10;
    this.min_height = 10;
    this.length = 16;
    this.min_length = 16;
    this.name = "Unnamed Level";
    this.max_tiles = 1024
    this.data = math.matrix();
    this.resize()

    this.can_add_col = true
    this.can_add_row = true
    this.can_remove_col = false
    this.can_remove_row = false
  }

  set(x, y, value) {
    this.data.subset(math.index(y, x), value);
  }

  get(x, y) {
    // console.log(x,y)
    // console.log(math.subset(this.data, math.index(y, x)))
    return math.subset(this.data, math.index(y, x));

  }

  addRow() {
    if (!((this.height + 1) * this.length > this.max_tiles)) {
      this.height += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeRow() {
    if (this.height > this.min_height) {
      this.height -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  addColumn() {
    if (!((this.length + 1) * this.height > this.max_tiles)) {
      this.length += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeColumn() {
    if (this.length > this.min_length) {
      this.length -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  checkAddRemove() {
    this.can_add_row = !((this.height + 1) * this.length > this.max_tiles);
    this.can_remove_row = this.height > this.min_height;
    this.can_add_col = !((this.length + 1) * this.height > this.max_tiles);
    this.can_remove_col = this.length > this.min_length;
    // console.log(this.can_add_row, this.can_add_col, this.can_remove_row, this.can_remove_col)
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
