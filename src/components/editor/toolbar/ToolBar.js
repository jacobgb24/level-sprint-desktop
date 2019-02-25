import React, {Component} from 'react';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import update from 'immutability-helper';
import {GlobalHotKeys} from 'react-hotkeys';

import HelpDialog from '../helpDialogs/Dialog.js';
import ObjectHelp from '../helpDialogs/ObjectHelp.js';
import ToolHelp from '../helpDialogs/ToolHelp.js';

import * as image from 'images';

import './ToolBar.scss';
import './Shelf.scss';


class ToolBar extends Component {
  state = {
    objects:[
      {name:'Ground', inactive: image.ground_line, active:image.ground_fill, rotates: false, flips: false},
      {name:'Hill', inactive:image.hill_line, active:image.hill_fill, rotates:true, flips:false, rotation:270},
      {name:'Hazard', inactive:image.hazard_line, active:image.hazard_fill, rotates:true, flips:false, rotation:0},
      {name:'Spawn', inactive:image.spawn_line, active:image.spawn_fill, rotates:false, flips:true, flipped:1},
      {name:'Goal', inactive:image.goal_line, active:image.goal_fill, rotates:false, flips:true, flipped:1},
      {name:'Enemy', inactive:image.npc_line, active:image.npc_fill, rotates:false, flips:false}
    ],
    // handle these at this layer since it knows rotation
    // keyMap {name: keys,...}. keyHandlers {name: function,...}
    keyMap: {
      'ground': '1',
      'hill': '2',
      'hazard': '3',
      'spawn': '4',
      'goal': '5',
      'npc': '6',
      'rotate': 'r',
      'rotateCCW': 'shift+r',
      'flip': 'f',
    },
    keyHandlers: {
       'ground': (event) => this.keyObjChangeHandler(0),
       'hill': (event) => this.keyObjChangeHandler(1),
       'hazard': (event) => this.keyObjChangeHandler(2),
       'spawn': (event) => this.keyObjChangeHandler(3),
       'goal': (event) => this.keyObjChangeHandler(4),
       'npc': (event) => this.keyObjChangeHandler(5),
       'rotate': (event) => this.keyRotateHandler(),
       'rotateCCW': (event) => this.keyRotateHandler(true),
       'flip': (event) => this.keyFlipHandler(),
   },
  }

  keyObjChangeHandler(index) {
    // if already selected flip/rotate it to mimic a click. Both flip and rotate
    // methods will check if that action is supported so nothing bad happens
    if (index == this.props.activeObject && this.props.activeTool == 0) {
        this.keyRotateHandler();
        this.keyFlipHandler();

    }
    // otherwise just call changeObject after getting any rotation or flip vars
    else {
      var change = {index: index}
      if (this.state.objects[index].rotates) {
        change.rotation = this.state.objects[index].rotation;
      }
      if (this.state.objects[index].flips) {
        change.flip = this.state.objects[index].flipped;
      }
      this.props.changeObject(change)
    }
  }

  keyRotateHandler(reverse=false) {
    this.rotateObject(this.props.activeObject, this.props.changeObject, reverse)
  }

  keyFlipHandler() {
    this.flipObject(this.props.activeObject, this.props.changeObject)
  }

  // For these two we pass `changeShelfItem` because it needs to be called after the rotation
  // is applied. Otherwise the actual state lags behind visually
  rotateObject = (index, changeShelfItem, reverse=false) => {
    if (this.state.objects[index].rotates) {
      this.setState({
        objects: update(this.state.objects, {[index]: {rotation: {$apply: function(r) {return (!reverse ? r+90 : r-90)%360}}}})
      }, () => {changeShelfItem({index: index, rotation: this.state.objects[index].rotation})});
    }
  }

  flipObject = (index, changeShelfItem) => {
    if (this.state.objects[index].flips) {
      this.setState({
        objects: update(this.state.objects, {[index]: {flipped: {$apply: function(f) {return -f}}}})
      }, () => {changeShelfItem({index: index, flip: this.state.objects[index].flipped})});
    }
  }

  render() {
    let divs = [];
    divs.push(
      <div className="tools-shelf" key={1}>
        <ToolShelf
          active={this.props.activeTool}
          changeShelfItem={this.props.changeTool}
        />
      </div>
    );

    let placeTool = 0;
    if (this.props.activeTool === placeTool) {
        divs.push(<hr key={2}/>);
        divs.push(
          <div className="level-objects-shelf" key={3}>
            <ObjectShelf
              objects={this.state.objects}
              active={this.props.activeObject}
              flip={this.flipObject}
              rotate={this.rotateObject}
              changeShelfItem={this.props.changeObject}
            />
          </div>
        );
    }

    return(
      <div className="editor-shelf">
        <GlobalHotKeys keyMap={this.state.keyMap} handlers={this.state.keyHandlers}/>
        {divs}
      </div>
    )
  }

}

class ToolShelf extends Component {
  state = {
    tools: [
      {name:'Place', inactive:image.place_line, active:image.place_fill},
      // {name:'Move', inactive:image.move_line, active:image.move_fill},
      {name:'Delete', inactive:image.delete_line, active:image.delete_fill}
    ],
    showToolsHelp: false,
  }

  render() {
    console.log("ACTIVE: ", this.props.active)
    let items = []
    for (let i = 0; i < this.state.tools.length; i++) {
      let tool = this.state.tools[i];
      let icon = i === this.props.active ? tool.active : tool.inactive;

      items.push(<ShelfItem className="toolshelf-item"
          item={tool}
          active={(i === this.props.active)}
          key={i}
          index={i}
          changeShelfItem={this.props.changeShelfItem}
        />
      );
    }

    return (
      <div className="shelf">
        <div>
          {this.state.showToolsHelp ?
            <HelpDialog onClose={this.toggleToolsDialog}
              title="Tools Help" content={<ToolHelp/>}/>
            : null
          }
        </div>

        <div className="shelf-header">
          <h2 className="shelf-title">{"Tools"}</h2>
            <IconButton onClick={this.toggleToolsDialog}
              className="shelf-help">
              <MaterialIcon icon="help_outline"/>
            </IconButton>
        </div>

        <div className="tool shelf-items">
          {items}
        </div>
      </div>
    );
  }

  toggleToolsDialog = () => {
    this.setState({showToolsHelp: !this.state.showToolsHelp});
  }
}

class ObjectShelf extends Component {
  state = {
    showObjectsHelp: false,
  }

  render() {
    let items = []
    for (let i = 0; i < this.props.objects.length; i++) {
      var object = this.props.objects[i];
      var icon = i === this.props.active ? object.active : object.inactive;

      if (object.rotates) {
        items.push(
          <RotatableShelfItem
            item={object}
            active={(i === this.props.active)}
            key={i}
            index={i}
            rotate={this.props.rotate}
            changeShelfItem={this.props.changeShelfItem}
          />
        );
      } else if (object.flips) {
        items.push(
          <FlippableShelfItem
            item={object}
            active={(i === this.props.active)}
            key={i}
            index={i}
            flip={this.props.flip}
            changeShelfItem={this.props.changeShelfItem}
          />
        );
      } else {
        items.push(<ShelfItem
            item={object}
            active={(i === this.props.active)}
            key={i}
            index={i}
            changeShelfItem={this.props.changeShelfItem}
          />
        );
      }
    }

    return (
      <div className="shelf">
        <div>
          {this.state.showObjectsHelp ?
            <HelpDialog onClose={this.toggleObjectsDialog}
              title="Objects Help" content={<ObjectHelp/>}/>
            : null
          }
        </div>

        <div className="shelf-header">
          <h2 className="shelf-title">{"Level Objects"}</h2>
            <IconButton onClick={this.toggleObjectsDialog}
              className="shelf-help">
              <MaterialIcon icon="help_outline"/>
            </IconButton>
        </div>

        <div className="shelf-items">
          {items}
        </div>
      </div>
    );
  }

  toggleObjectsDialog = () => {
    this.setState({showObjectsHelp: !this.state.showObjectsHelp});
  }
}



/*
  Shelf Item: A single item on the shelf,
  such as a level object or tool.
*/
class ShelfItem extends Component {

  click = () => {
    this.props.changeShelfItem({index: this.props.index});
  }

  render() {
    var item = this.props.item;
    var icon = this.props.active ? item.active : item.inactive;

    let cl = this.props.active ? 'active-shelf-item' : 'inactive-shelf-item';
    return (
      <div className={"shelf-item mdc-ripple-surface mdc-image-list__item " + cl} onClick={this.click}>
        <div className=''>
          <img className="shelf-item-icon" src={icon} alt={icon} />
        </div>
        <div className='shelf-item-label'>
          {item.name}
        </div>
      </div>
    );
  }
}


class RotatableShelfItem extends Component {

    click = () => {
      if (this.props.active) {
        this.props.rotate(this.props.index, this.props.changeShelfItem)
      } else {
        this.props.changeShelfItem({index: this.props.index, rotation: this.props.item.rotation});
      }
    }

    render() {
      var icon = this.props.active ? this.props.item.active : this.props.item.inactive;
      var cl = this.props.active ? 'active-shelf-item' : 'inactive-shelf-item';

      return (
        <div className={"shelf-item mdc-ripple-surface mdc-image-list__item " + cl} onClick={this.click}>
          <img
            className="shelf-item-icon"
            src={icon}
            alt={icon}
            style={{transform: `rotate(${this.props.item.rotation}deg)`}}
          />
          <div className='hover-icon-container'>
            <MaterialIcon className="hover-icon" icon="autorenew"/>
          </div>
          <div className='shelf-item-label'> {this.props.item.name} </div>
        </div>
      );
    }
}

class FlippableShelfItem extends Component {

    click = () => {
      if (this.props.active) {
        this.props.flip(this.props.index, this.props.changeShelfItem)
      } else {
        this.props.changeShelfItem({index: this.props.index, flip: this.props.item.flipped});
      }
    }

    render() {
      var item = this.props.item;
      var icon = this.props.active ? item.active : item.inactive;

      let cl = this.props.active ? 'active-shelf-item' : 'inactive-shelf-item';
      return (
        <div className={"shelf-item mdc-ripple-surface mdc-image-list__item " + cl} onClick={this.click}>
          <div className=''>
            <img
              className="shelf-item-icon"
              src={icon}
              alt={icon}
              style={{transform: `scaleX(${item.flipped})`}}
            />
          </div>
          <div className='hover-icon-container'>
            <MaterialIcon className="hover-icon" icon="swap_horiz"/>
          </div>
          <div className='shelf-item-label'>
            {item.name}
          </div>
        </div>
      );
    }
}

export default ToolBar;
