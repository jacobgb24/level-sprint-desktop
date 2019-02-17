import React, {Component} from 'react';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from '@material/react-dialog';
 import '../helpDialogs/Dialog.scss'
class DeleteConfirm extends Component {
  state = {isOpen: true, action: ''};

  render() {
    return (
      <Dialog
        onClose={(action) => this.props.delete(action, this.props.levelName)}
        open={this.state.isOpen}>
        <DialogTitle>Delete {this.props.levelName}?</DialogTitle>
        <DialogContent>This action can't be undone.</DialogContent>
        <DialogFooter>
          <DialogButton action='cancel'>Cancel</DialogButton>
          <DialogButton action='delete' isDefault>Delete</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}
export default DeleteConfirm;
