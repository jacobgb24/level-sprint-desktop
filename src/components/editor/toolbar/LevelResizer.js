import React, {Component} from 'react';
import IconButton, {IconToggle} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

import HelpDialog from '../helpDialogs/Dialog.js';
import DimHelp from '../helpDialogs/DimHelp.js'

import './Shelf.scss'
import './LevelResizer.scss'


/*
  LevelResizer: The option at the bottom of the shelf
  which allows the user to increase/decrease level dimensions.
*/
class LevelResizer extends Component {
  state = {
    showDimsHelp: false
  }

  toggleDimsDialog = () => {
    this.setState({showDimsHelp: !this.state.showDimsHelp});
  }

  render() {
    let divs = []
    if (this.state.showDimsHelp === true) {
      console.log("POPUP")
      divs.push(
        <div>
          <HelpDialog onClose={this.toggleDimsDialog}
            title="Dimensions Help" content={<DimHelp/>}/>
        </div>
      )
    }

    divs.push(
      <div className="LevelResizer">
        <div className="shelf">
          <div className="shelf-header">
            <h2 className="shelf-title">Level Dimensions</h2>
              <IconButton onClick={this.toggleDimsDialog}
                className="shelf-help">
                <MaterialIcon icon="help_outline"/>
              </IconButton>
          </div>
          <LevelDimension
            remove={this.props.removeColumn}
            add={this.props.addColumn}
            canAdd={this.props.canAddCols}
            canRemove={this.props.canRemoveCols}
            value={this.props.cols}
            name="Columns"
          />

          <LevelDimension
            remove={this.props.removeRow}
            add={this.props.addRow}
            canAdd={this.props.canAddRows}
            canRemove={this.props.canRemoveRows}
            value={this.props.rows}
            name="Rows"
          />
        </div>
      </div>
    )

    return <div className="editor-shelf"> {divs} </div>
  }

}

/*
  LevelDimension: Generic UI component for adding/removing
  rows and columns
*/
const LevelDimension = props => {
  return (
    <div>
      <h4 className="dimension-direction">{props.name}</h4>
      <div className="dimensions-selector">
        <IconButton onClick={props.remove}
          className="dimension-button"
          disabled={!props.canRemove}>
          <MaterialIcon icon="remove_circle_outline"/>
        </IconButton>
        <h2 className="dimension-value">{props.value}</h2>
        <IconButton onClick={props.add}
          className="dimension-button"
          disabled={!props.canAdd}>
          <MaterialIcon icon="add_circle_outline"/>
        </IconButton>
      </div>
    </div>
  );
}

export default LevelResizer;
