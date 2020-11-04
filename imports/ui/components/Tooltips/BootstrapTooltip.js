import { makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
		fontSize: 13
	}
}));

export default function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={ classes } { ...props } />;
}