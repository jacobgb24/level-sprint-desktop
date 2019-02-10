import React, {Component} from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';

import './Dialog.scss'

class HelpDialog extends Component {
  state = {isOpen: true};

  render() {
    return (
      <Dialog open={this.state.isOpen} className="Dialog">
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          {this.props.content}
        </DialogContent>
        <DialogFooter>
          <DialogButton action='accept' isDefault>GOT IT</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}

export default HelpDialog;
