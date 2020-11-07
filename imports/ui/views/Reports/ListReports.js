import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnalisesReport from '../../components/Reports/AnalisesReport';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	date: {
		marginLeft: theme.spacing(2)
	}
}));

export default function ListReports(props) {
	const classes = useStyles();

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Accordion>
				<AccordionSummary
					expandIcon={ <ExpandMoreIcon/> }
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Análisis realizados</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<AnalisesReport { ...props } />
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};