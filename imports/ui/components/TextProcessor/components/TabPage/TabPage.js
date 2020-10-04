import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { STRINGS } from '../../constants/strings';
import { BootstrapTooltip } from '../TabFont/TabFont';
import '../TabFont/TabFont.css';
import { getStyle } from '../../js/fontFunctions';

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
	}
}));

export default function TabPage(props) {
	const classes = useStyles();
	const { doc, _handleNewPage, _handlePrevPage, _handleNextPage, _handleGrid } = props;
	return (
		<Grid container alignItems="center" justify="center">
			<Grid container alignItems="center" className={ classes.section }>
				{
					doc.actualPage > 0 ? (
						<BootstrapTooltip title={ STRINGS.page.prevPage }>
							<button type="button" className="noButton" onClick={ _handlePrevPage }>
								<i id='bold' className="fa fa-step-backward ico"/>
							</button>
						</BootstrapTooltip>
					) : (
						<button disabled={ true } type="button" className="noButton">
							<i id='bold' className="fa fa-step-backward icoDisabled"/>
						</button>
					)
				}
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.page.addPage }>
					<button type="button" className="noButton" onClick={ _handleNewPage }>
						<i id='bold' className="fa fa-plus-square ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>

				{
					doc.pages.length > 1 && doc.actualPage !== doc.pages.length-1 ? (
						<BootstrapTooltip title={ STRINGS.page.nextPage }>
							<button type="button" className="noButton" onClick={ _handleNextPage }>
								<i id='bold' className="fa fa-step-forward ico"/>
							</button>
						</BootstrapTooltip>
					) : (
						<button disabled={ true } type="button" className="noButton">
							<i id='bold' className="fa fa-step-forward icoDisabled"/>
						</button>
					)
				}

				<Divider orientation="vertical" flexItem/>

				<BootstrapTooltip title={ STRINGS.page.showGrid }>
					<button type="button" className="noButton" onClick={ () => {
						doc.showGrid ? document.getElementById('grid').className = 'fa fa-border-none ico'
							: document.getElementById('grid').className = 'fa fa-border-none ico select';

						_handleGrid();
					} }>
						<i id='grid' className="fa fa-border-none ico"/>
					</button>
				</BootstrapTooltip>

			</Grid>
		</Grid>
	);
}