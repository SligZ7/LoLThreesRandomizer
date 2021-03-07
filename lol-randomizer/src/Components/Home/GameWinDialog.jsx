import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function GameWinDialog({ open, setOpen, isAram, handleGameWin, winner }) {

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        handleGameWin(winner);
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Mark game as ${winner} win?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Game will be tracked as {isAram ? 'Howling Abyss' : 'Summoner\'s Rift'} game
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree} color="primary" autoFocus>
                        Agree
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}