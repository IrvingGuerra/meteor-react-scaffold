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

export default function Analytes(props) {
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
		console.log(hasTrue(data));
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
				<Typography>ANALITOS INDIVIDUALES</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item>
						<Grid container direction="row" justify="flex-start" alignItems="flex-start">
							<Grid item xs={ 6 }>
								<Grid container direction="column" justify="flex-start" alignItems="stretch">
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.RoutineAnalyte }
													onChange={ handleChange }
													name="RoutineAnalyte"
													color="primary"
												/>
											}
											label="Analito(s) de rutina:"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											disabled={!data.RoutineAnalyte}
											fullWidth
											name="RoutineAnalyteValue"
											label="Analito(s) de rutina:"
											value={ data.RoutineAnalyteValue }
											onChange={handleChangeRadioAndText}
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.FAIE }
													onChange={ handleChange }
													name="FAIE"
													color="primary"
												/>
											}
											label="FAIE"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Acid }
													onChange={ handleChange }
													name="Acid"
													color="primary"
												/>
											}
											label="Ácido fólico y cianocobalamina"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={ 6 }>
								<Grid container direction="column" justify="flex-start" alignItems="stretch">
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Ammonia }
													onChange={ handleChange }
													name="Ammonia"
													color="primary"
												/>
											}
											label="Amoniaco"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.GLDH }
													onChange={ handleChange }
													name="GLDH"
													color="primary"
												/>
											}
											label="GLDH"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Lipase }
													onChange={ handleChange }
													name="Lipase"
													color="primary"
												/>
											}
											label="Lipasa sérica"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Electrolyte }
													onChange={ handleChange }
													name="Electrolyte"
													color="primary"
												/>
											}
											label="Electrolito individual (Na,K y Cl)"
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