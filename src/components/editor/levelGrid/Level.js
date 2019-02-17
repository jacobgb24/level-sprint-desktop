import * as math from 'mathjs'

import {blank, ground, spawn} from 'images';

class Level {
  constructor() {
    this.height = 10;
    this.minHeight = 10;
    this.length = 16;
    this.minLength = 16;
    this.name = "Unnamed Level";
    this.maxTiles = 1024
    this.data = math.matrix();
    this.resize()

    this.canAddCol = true
    this.canAddRow = true
    this.canRemoveCol = false
    this.canRemoveRow = false
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
    if (!((this.height + 1) * this.length > this.maxTiles)) {
      this.height += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeRow() {
    if (this.height > this.minHeight) {
      this.height -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  addColumn() {
    if (!((this.length + 1) * this.height > this.maxTiles)) {
      this.length += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeColumn() {
    if (this.length > this.minLength) {
      this.length -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  checkAddRemove() {
    this.canAddRow = !((this.height + 1) * this.length > this.maxTiles);
    this.canRemoveRow = this.height > this.minHeight;
    this.canAddCol = !((this.length + 1) * this.height > this.maxTiles);
    this.canRemoveCol = this.length > this.minLength;
    // console.log(this.canAddRow, this.canAddCol, this.canRemoveRow, this.canRemoveCol)
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
    this.data.resize([this.height, this.length], blank);
  }

  rename(name) {
    this.name = name;
  }
}

class DefaultLevel extends Level {
  constructor() {
    super();
    this.build_default();
    this.name = "Default";
  }

  build_default() {
    for (let y=0; y<3; y++) {
      for (let x=0; x<7; x++) {
        this.set(x, y, ground);
      }

      for (let x=9; x<16; x++) {
        this.set(x, y, ground);
      }
    }

    this.set(1, 3, spawn);
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
