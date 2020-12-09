import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

export const LoaderPage = forwardRef((props, ref) => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	useImperativeHandle(ref, () => ({
		setLoader(status) {
			setOpen(status);
		}
	}));

	return (
		<Backdrop className={ classes.backdrop } open={ open }>
			<CircularProgress/>
		</Backdrop>
	);
});


export const FullLoader = () => {
	const classes = useStyles();

	return (
		<Backdrop className={ classes.backdrop } open={ true }>
			<CircularProgress/>
		</Backdrop>
	);
}
