import React, { useEffect, useState } from 'react';
import { Grid, Tooltip, makeStyles, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import {
	changeAlign,
	changeItalic,
	changeSize,
	changeStyle,
	changeUnderline,
	changeWeight
} from '../../js/fontFunctions';
import './TabFont.css';
import { STRINGS } from '../../constants/strings';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Divider from '@material-ui/core/Divider';

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
		fontSize: 13
	}
}));

const useStyles = makeStyles((theme) => ({
	section: {
		width: 'fit-content',
		border: `1px solid ${ theme.palette.divider }`,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
		marginRight: 5,
		'& svg': {
			margin: theme.spacing(1.5)
		},
		'& hr': {
			margin: theme.spacing(0, 0.5)
		}
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));

export function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={ classes } { ...props } />;
}

export default function TabFont(props) {
	const classes = useStyles();
	const { document } = props;
	const [actualObjectFont, setActualObjectFont] = useState('');

	useEffect(() => {
		if (document.lastElementSelected === undefined || document.lastElementSelected === null) return;
		setActualObjectFont(document.lastElementSelected.get('fontFamily'));
		changeAlign(document, document.lastElementSelected.get('textAlign'))
	}, [document.lastElementSelected]);

	useEffect(() => {
		if (document.lastElementSelected === undefined || document.lastElementSelected === null) return;
		document.canvas.getActiveObject().set('fontFamily', actualObjectFont);
		document.canvas.renderAll();
	}, [actualObjectFont]);

	return (
		<Grid container alignItems="center" justify="center">
			<Grid container alignItems="center" className={ classes.section }>
				<FormControl variant="outlined" className={ classes.formControl }>
					<InputLabel id="demo-simple-select-outlined-label">Fuente</InputLabel>
					<Select
						style={ { minWidth: 200 } }
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={ actualObjectFont }
						onChange={ (value) => setActualObjectFont(value.target.value) }
						label="Fuente"
					>
						<MenuItem value='Arial'>Arial</MenuItem>
						<MenuItem value='Times New Roman'>Times New Roman</MenuItem>
					</Select>
				</FormControl>
				<BootstrapTooltip title={ STRINGS.font.plus }>
					<button type="button" className="noButton" onClick={ () => changeSize(document, 'plus') }>
						<i className="fa fa-font icoFont">
							<i className="up"/>
						</i>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.less }>
					<button type="button" className="noButton" onClick={ () => changeSize(document, 'less') }>
						<i className="fa fa-font icoFont">
							<i className="down"/>
						</i>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(document, 'left') }>
						<i id='left' className="fa fa-align-left ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(document, 'center') }>
						<i id='center' className="fa fa-align-center ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(document, 'right') }>
						<i id='right' className="fa fa-align-right ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(document, 'justify') }>
						<i id='justify' className="fa fa-align-justify ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.font.bold }>
					<button type="button" className="noButton" onClick={ () => changeStyle(document, 'bold') }>
						<i id='bold' className="fa fa-bold ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.italic }>
					<button type="button" className="noButton" onClick={ () => changeStyle(document, 'italic') }>
						<i id='italic' className="fa fa-italic ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.underline }>
					<button type="button" className="noButton" onClick={ () => changeStyle(document, 'underline') }>
						<i id='underline' className="fa fa-underline ico"/>
					</button>
				</BootstrapTooltip>
			</Grid>

			<Divider orientation="vertical" flexItem/>

		</Grid>
	);
}