import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	FormControlLabel,
	Checkbox,
	Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { accordionStyles } from './Biochemistry';

export default function NonConventional(props) {
	const { data, setData } = props;
	const classes = accordionStyles();

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.checked });
	};

	const handleChangeRadioAndText = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const [headerColor, setHeaderColor] = useState(false);

	const hasTrue = (object) => {
		let boolean = false;
		Object.keys(object).forEach(key => {
			if (object[key]) {
				boolean = true;
			}
		});
		return boolean;
	};

	useEffect(() => {
		setHeaderColor(hasTrue(data));
	}, [data]);

	return (
		<Accordion className={ classes.accordion }>
			<AccordionSummary
				className={ headerColor ? classes.accordionSummaryColor : classes.accordionSummary }
				expandIcon={ <ExpandMoreIcon/> }
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>ANIMALES NO CONVENCIONALES</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item>
						<Grid container direction="row" justify="flex-start" alignItems="flex-start">
							<Grid item>
								<Grid container direction="column" justify="flex-start" alignItems="stretch">
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BloodCount }
													onChange={ handleChange }
													name="BloodCount"
													color="primary"
												/>
											}
											label="Hemograma"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BasicProfile }
													onChange={ handleChange }
													name="BasicProfile"
													color="primary"
												/>
											}
											label="Perfil básico"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.FullProfile }
													onChange={ handleChange }
													name="FullProfile"
													color="primary"
												/>
											}
											label="Perfil completo"
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}