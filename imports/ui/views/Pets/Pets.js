import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Container,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableSpecies from '../../components/Tables/TableSpecies';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	}
}));

const Pets = () => {
	const classes = useStyles();

	return (
		<Container maxWidth="lg" className={classes.container}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Especies</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TableSpecies />
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};

export default Pets;