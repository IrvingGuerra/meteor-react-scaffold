import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Fade, Slide, Grow } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function SlideTransition(props) {
	return <Slide { ...props } direction="up"/>;
}

function GrowTransition(props) {
	return <Grow { ...props } />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	}
}));

export const AlertMessage = forwardRef((props, ref) => {
	const classes = useStyles();

	const [state, setState] = useState({
		title: 'Bienvenido',
		message: 'Meteor React Scaffold!',
		severity: 'success',
		transition: 'Slide',
		transitionComponent: SlideTransition,
		open: false
	});

	useImperativeHandle(ref, () => ({
		setAlert(title, message, severity = 'success', transition = 'Slide') {
			switch (transition) {
				case 'Fade':
					setState({
						title,
						message,
						severity,
						transition,
						transitionComponent: Fade,
						open: true
					});
					break;
				case 'Slide':
					setState({
						title,
						message,
						severity,
						transition,
						transitionComponent: SlideTransition,
						open: true
					});
					break;
				case 'Grow':
					setState({
						title,
						message,
						severity,
						transition,
						transitionComponent: GrowTransition,
						open: true
					});
					break;
			}
		}
	}));

	const handleClose = (event, reason) => {
		setState({ ...state, open: false });
	};

	return (
		<div className={ classes.root }>
			<Snackbar
				open={ state.open }
				autoHideDuration={ 2000 }
				onClose={ handleClose }
				TransitionComponent={ state.transitionComponent }
			>
				<Alert variant="filled" onClose={ handleClose } severity={ state.severity }>
					<strong>{ state.title }</strong> - { state.message }
				</Alert>
			</Snackbar>
		</div>
	);
});