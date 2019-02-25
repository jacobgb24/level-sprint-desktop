import * as math from 'mathjs'
import {blank, ground, spawn} from 'images';

var globalLevelID = 0;

class Level {
  constructor() {
    this.height = 10;
    this.minHeight = 10;
    this.length = 16;
    this.minLength = 16;
    this.maxTiles = 1024
    this.data = math.matrix();
    this.resize()
    this.id = globalLevelID++;
    this.canAddCol = true
    this.canAddRow = true
    this.canRemoveCol = false
    this.canRemoveRow = false
    this.name = "Unnamed Level (" + this.id + ")";

  }

  // value should be an object literal:
  // {obj: imageStr, rotation: degrees, flip: bool}
  // or just a string for compatibilty
  set = (x, y, value) => {
    //handle old way of passing just string
    if (typeof value == "string") {
      value = {obj: value, rotation: 0, flip: 1}
    }
    this.data.subset(math.index(y, x), value);
  }

  get = (x, y) => {
    // console.log(x,y)
    // console.log(math.subset(this.data, math.index(y, x)))
    return math.subset(this.data, math.index(y, x));

  }

  addRow = () => {
    if (!((this.height + 1) * this.length > this.maxTiles)) {
      this.height += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeRow = () => {
    if (this.height > this.minHeight) {
      this.height -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  changeRowDimension = (size) => {
    console.log("ROW: "+size);
    if (size >= this.minHeight) {
      this.height = parseInt(size);
      this.resize();
    }
    this.checkAddRemove();
  }



  addColumn = () => {
    if (!((this.length + 1) * this.height > this.maxTiles)) {
      this.length += 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  removeColumn = () => {
    if (this.length > this.minLength) {
      this.length -= 1;
      this.resize();
    }
    this.checkAddRemove();
  }

  changeColumnDimension = (size) => {
    if (size >= this.minLength) {
      this.length = parseInt(size);
      this.resize();
    }
    this.checkAddRemove();
  }

  checkAddRemove = () => {
    this.canAddRow = !((this.height + 1) * this.length > this.maxTiles);
    this.canRemoveRow = this.height > this.minHeight;
    this.canAddCol = !((this.length + 1) * this.height > this.maxTiles);
    this.canRemoveCol = this.length > this.minLength;
    // console.log(this.canAddRow, this.canAddCol, this.canRemoveRow, this.canRemoveCol)
  }

  canChangeRowDimension = (size) => {
    size = parseInt(size);
    if (size > this.height) {
      return !((size)*this.length > this.maxTiles);
    } else {
      return size >= this.minHeight;
    }
  }

  canChangeColumnDimension = (size) => {
    size = parseInt(size);
    if (size > this.length) {
      return !((size)*this.height > this.maxTiles);
    } else {
      return size >= this.minLength;
    }
  }

  setLength = (length) => {
    this.length = length;
    this.resize();
  }

  setHeight = (height) => {
    this.height = height;
    this.resize();
  }

  resize = () => {
    this.data.resize([this.height, this.length], {obj: blank, rotation: 0, flip: 1});
  }

  rename = (name) => {
    this.name = name;
  }

  // toJson() {
  //   const jsonfile = require('jsonfile')
  //   let write_data = {name: this.name,
  //           height: this.height,
  //           length: this.length,
  //           matrix: this.data}
  //   console.log(JSON.stringify(this.data))
  // }
  //
  // fromJson() {
  //   var data = require('./test.json');
  //   console.log("DATA", data)
  //   const matrix = JSON.parse(data, math.json.reviver)
  //   // var in_data = JSON.parse(testLevel, math.json.reviver)
  //   console.log("M", matrix)
  //   // console.log(testLevel)
  //   // let in_data = testLevel
  //   this.data = matrix
  //
  //   // this.checkAddRemove()
  // }
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
