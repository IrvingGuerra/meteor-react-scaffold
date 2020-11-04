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
import ListSpecies from './List/ListSpecies';
import ListBreeds from './List/ListBreeds';
import ListGenders from './List/ListGenders';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	}
}));

const Pets = (props) => {
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
					<ListSpecies { ...props } />
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Razas</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<ListBreeds { ...props } />
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Generos</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<ListGenders { ...props } />
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};

export default Pets;