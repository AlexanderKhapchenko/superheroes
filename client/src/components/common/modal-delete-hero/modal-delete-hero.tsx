import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ModalDeletePostProps {
  isOpen: boolean;
  handleCloseDialog: () => void;
  handleDeleteHero: () => Promise<void>;
}

const ModalDeleteHero: React.FC<ModalDeletePostProps> = ({
  isOpen,
  handleDeleteHero,
  handleCloseDialog,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to delete that hero?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The hero cannot be restored after deletion
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseDialog} autoFocus>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleDeleteHero}>
          Delete Hero
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModalDeleteHero };
