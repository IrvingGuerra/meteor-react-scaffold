import React, { useEffect, useState } from 'react';
import { Grid, Tooltip, makeStyles, Select, FormControl, InputLabel, MenuItem, IconButton } from '@material-ui/core';
import {
	changeAlign, changeBorder, changeBorderColor, changePadding,
	changeSize,
	changeStyle,
	getStyle
} from '../../js/fontFunctions';
import './TabFont.css';
import { STRINGS } from '../../constants/strings';
import Divider from '@material-ui/core/Divider';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';

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
		minHeight: 80,
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
		width: 120
	}
}));

export function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={ classes } { ...props } />;
}

export default function TabFont(props) {
	const classes = useStyles();
	const { doc } = props;
	const [actualObjectFont, setActualObjectFont] = useState('');
	const [actualColorFont, setActualColorFont] = useState('#ffffff');

	useEffect(() => {
		// Cuando detecta que le da click a algo
		if (doc.lastElementSelected === undefined || doc.lastElementSelected === null) return;
		let obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (obj === undefined || obj === null) return;
		if (obj.type === 'path' || obj.type === 'image') return; // Is drawing
		setActualObjectFont(doc.lastElementSelected.get('fontFamily'));
		changeAlign(doc, doc.lastElementSelected.get('textAlign'));
		// Update icons styles
		const isBold = (getStyle(obj, 'fontWeight') || '').indexOf('bold') > -1;
		isBold ? document.getElementById('bold').className = 'fa fa-bold ico select'
			: document.getElementById('bold').className = 'fa fa-bold ico';
		const isItalic = (getStyle(obj, 'fontStyle') || '').indexOf('italic') > -1;
		isItalic ? document.getElementById('italic').className = 'fa fa-italic ico select'
			: document.getElementById('italic').className = 'fa fa-italic ico';
		const isUnderline = (getStyle(obj, 'textDecoration') || '').indexOf('underline') > -1;
		isUnderline ? document.getElementById('underline').className = 'fa fa-underline ico select'
			: document.getElementById('underline').className = 'fa fa-underline ico';
		// Update Color Font
		setActualColorFont(obj.get('fill'));
		// Update borders
		const borderTopLeftRadius = getStyle(obj, 'borderTopLeftRadius');
		borderTopLeftRadius > 0 ? document.getElementById('topLeft').className = 'fa fa-border-style ico select'
			: document.getElementById('topLeft').className = 'fa fa-border-style ico';
		const borderTopRightRadius = getStyle(obj, 'borderTopRightRadius');
		borderTopRightRadius > 0 ? document.getElementById('topRight').className = 'fa fa-border-style rotate90 ico select'
			: document.getElementById('topRight').className = 'fa fa-border-style rotate90 ico';
		const borderBottomRightRadius = getStyle(obj, 'borderBottomRightRadius');
		borderBottomRightRadius > 0 ? document.getElementById('bottomRight').className = 'fa fa-border-style rotate180 ico select'
			: document.getElementById('bottomRight').className = 'fa fa-border-style rotate180 ico';
		const borderBottomLeftRadius = getStyle(obj, 'borderBottomLeftRadius');
		borderBottomLeftRadius > 0 ? document.getElementById('bottomLeft').className = 'fa fa-border-style ico rotate270 select'
			: document.getElementById('bottomLeft').className = 'fa fa-border-style rotate270 ico';
		// Update Color Border
		const textBoxBorderColor = getStyle(obj, 'textBoxBorderColor');
		textBoxBorderColor === 'white' ? document.getElementById('textBoxBorderColor').className = 'fa fa-border-none ico'
			: document.getElementById('textBoxBorderColor').className = 'fa fa-border-none ico select';
	}, [doc.lastElementSelected]);

	useEffect(() => {
		if (doc.lastElementSelected === undefined || doc.lastElementSelected === null) return;
		const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (obj === undefined || obj === null) return;
		obj.set('fontFamily', actualObjectFont);
		doc.pages[doc.actualPage].canvas.renderAll();
	}, [actualObjectFont]);

	useEffect(() => {
		if (doc.lastElementSelected === undefined || doc.lastElementSelected === null) return;
		const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (obj === undefined || obj === null) return;
		obj.set('fill', actualColorFont);
		doc.pages[doc.actualPage].canvas.renderAll();
	}, [actualColorFont]);

	const changeFontColor = (colors) => {
		setActualColorFont(colors.color);
	};

	const changeBackGroundColor = (colors) => {
		if (doc.lastElementSelected === undefined || doc.lastElementSelected === null) return;
		const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (obj === undefined || obj === null) return;
		obj.set('backgroundColor', colors.color);
		doc.pages[doc.actualPage].canvas.renderAll();
	};

	return (
		<Grid container alignItems="center" justify="center">
			<Grid container alignItems="center" className={ classes.section }>
				<FormControl variant="outlined" className={ classes.formControl }>
					<InputLabel id="demo-simple-select-outlined-label">Fuente</InputLabel>
					<Select
						style={ { width: 120 } }
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
					<button type="button" className="noButton" onClick={ () => changeSize(doc, 'plus') }>
						<i className="fa fa-font icoFont">
							<i className="up"/>
						</i>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.less }>
					<button type="button" className="noButton" onClick={ () => changeSize(doc, 'less') }>
						<i className="fa fa-font icoFont">
							<i className="down"/>
						</i>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.less }>
					<button type="button" className="noButton" onClick={ () => {
						document.getElementById('colorFontPicker').click();
					} }>
						<i className="fa fa-font icoFontColor">
							<i style={ {
								borderRight: 'solid',
								borderRightColor: actualColorFont,
								borderRightWidth: '20px',
								padding: '2px',
								position: 'absolute',
								bottom: '5px',
								left: 0
							} }/>
						</i>
					</button>
				</BootstrapTooltip>
				<ColorPicker
					animation="slide-up"
					color={ actualColorFont }
					onChange={ changeFontColor }
				>
					<span id="colorFontPicker"/>
				</ColorPicker>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(doc, 'left') }>
						<i id='left' className="fa fa-align-left ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(doc, 'center') }>
						<i id='center' className="fa fa-align-center ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(doc, 'right') }>
						<i id='right' className="fa fa-align-right ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.align.left }>
					<button type="button" className="noButton" onClick={ () => changeAlign(doc, 'justify') }>
						<i id='justify' className="fa fa-align-justify ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.font.bold }>
					<button type="button" className="noButton" onClick={ () => changeStyle(doc, 'bold') }>
						<i id='bold' className="fa fa-bold ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.italic }>
					<button type="button" className="noButton" onClick={ () => changeStyle(doc, 'italic') }>
						<i id='italic' className="fa fa-italic ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.font.underline }>
					<button type="button" className="noButton" onClick={ () => changeStyle(doc, 'underline') }>
						<i id='underline' className="fa fa-underline ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.font.backgroundColor }>
					<button type="button" className="noButton" onClick={ () => {
						document.getElementById('colorBackgroundPicker').click();
					} }>
						<i className="fa fa-fill-drip ico"/>
					</button>
				</BootstrapTooltip>
				<ColorPicker
					animation="slide-up"
					color={ '#ffffff' }
					onChange={ changeBackGroundColor }
				>
					<span id="colorBackgroundPicker"/>
				</ColorPicker>

				<BootstrapTooltip title={ STRINGS.border.topLeft }>
					<button type="button" className="noButton" onClick={ () => changeBorder(doc, 'topLeft') }>
						<i id='topLeft' className="fa fa-border-style ico"/>
					</button>
				</BootstrapTooltip>

				<BootstrapTooltip title={ STRINGS.border.topRight }>
					<button type="button" className="noButton" onClick={ () => changeBorder(doc, 'topRight') }>
						<i id='topRight' className="fa fa-border-style rotate90 ico"/>
					</button>
				</BootstrapTooltip>

				<BootstrapTooltip title={ STRINGS.border.bottomRight }>
					<button type="button" className="noButton" onClick={ () => changeBorder(doc, 'bottomRight') }>
						<i id='bottomRight' className="fa fa-border-style rotate180 ico"/>
					</button>
				</BootstrapTooltip>

				<BootstrapTooltip title={ STRINGS.border.bottomLeft }>
					<button type="button" className="noButton" onClick={ () => changeBorder(doc, 'bottomLeft') }>
						<i id='bottomLeft' className="fa fa-border-style rotate270 ico"/>
					</button>
				</BootstrapTooltip>

				<Divider orientation="vertical" flexItem/>

				<BootstrapTooltip title={ STRINGS.padding.expand }>
					<button type="button" className="noButton" onClick={ () => changePadding(doc, 'plus') }>
						<i id='bottomLeft' className="fa fa-expand ico"/>
					</button>
				</BootstrapTooltip>

				<BootstrapTooltip title={ STRINGS.padding.compress }>
					<button type="button" className="noButton" onClick={ () => changePadding(doc, 'less') }>
						<i id='bottomLeft' className="fa fa-compress ico"/>
					</button>
				</BootstrapTooltip>

				<Divider orientation="vertical" flexItem/>

				<BootstrapTooltip title={ STRINGS.border.colorBorder }>
					<button type="button" className="noButton" onClick={ () => changeBorderColor(doc) }>
						<i id='textBoxBorderColor' className="fa fa-border-none ico"/>
					</button>
				</BootstrapTooltip>

			</Grid>
		</Grid>
	);
}