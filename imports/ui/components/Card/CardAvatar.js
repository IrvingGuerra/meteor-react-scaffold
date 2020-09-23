import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardAvatarStyle.js';

const useStyles = makeStyles(styles);

export default function CardAvatar(props) {
	const classes = useStyles();
	const { children, className, plain, profile, ...rest } = props;
	const cardAvatarClasses = classNames({
		[classes.cardAvatar]: true,
		[classes.cardAvatarProfile]: profile,
		[classes.cardAvatarPlain]: plain,
		[className]: className !== undefined
	});
	return (
		<div className={ cardAvatarClasses } { ...rest }>
			{ children }
		</div>
	);
}