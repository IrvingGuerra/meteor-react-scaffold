import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ModalDialog = (props) => {
	const { modal, _handleAccept } = props;

	const handleClose = () => {
		modal.toggle();
	};

	return (
		<Dialog
			open={ modal.state.show }
			onClose={ handleClose }
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={ true }
			maxWidth='sm'
		>
			<DialogTitle id="alert-dialog-title">{ modal.state.title }</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{ modal.state.description }
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="secondary" variant="contained" onClick={ handleClose }>
					Cancelar
				</Button>
				<Button color="primary" variant="contained" autoFocus onClick={ _handleAccept }>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
};