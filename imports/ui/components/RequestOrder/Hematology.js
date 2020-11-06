import React, { useEffect, useState } from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	FormControlLabel,
	Checkbox,
	Grid,
	FormControl,
	RadioGroup,
	Radio
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { accordionStyles } from './Biochemistry';

export default function Hematology(props) {
	const { data, setData } = props;
	const classes = accordionStyles();

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.checked });
	};

	const handleChangeText = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleClickRadio = (event) => {
		if (event.target.value === data[event.target.name]) {
			setData({ ...data, [event.target.name]: '' });
		} else {
			setData({ ...data, [event.target.name]: event.target.value });
		}
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
				<Typography>HEMOSTASIA</Typography>
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
													checked={ data.Count }
													onChange={ handleChange }
													name="Count"
													color="primary"
												/>
											}
											label="Conteo y evaluación plaquetaria"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Factor }
													onChange={ handleChange }
													name="Factor"
													color="primary"
												/>
											}
											label="Factor de Von Willebran"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ProfileCID }
													onChange={ handleChange }
													name="ProfileCID"
													color="primary"
												/>
											}
											label="Perfil CID"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ProfileFull }
													onChange={ handleChange }
													name="ProfileFull"
													color="primary"
												/>
											}
											label="Perfil de hemostasia	completo"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Time }
													onChange={ handleChange }
													name="Time"
													color="primary"
												/>
											}
											label="Tiempos de coagulación (TP + TTP)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.TTP }
													onChange={ handleChange }
													name="TTP"
													color="primary"
												/>
											}
											label="TTP"
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
													checked={ data.TP }
													onChange={ handleChange }
													name="TP"
													color="primary"
												/>
											}
											label="TP"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Reactions }
													onChange={ handleChange }
													name="Reactions"
													color="primary"
												/>
											}
											label="Reacciones cruzadas de compatibilidad"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="ReactionsValue"
												name="ReactionsValue"
												value={ data.ReactionsValue }
											>
												<FormControlLabel disabled={ !data.Reactions } value="one"
												                  control={ <Radio onClick={ handleClickRadio }/> }
												                  label="1 donador"/>
												<FormControlLabel disabled={ !data.Reactions } value="two"
												                  control={ <Radio onClick={ handleClickRadio }/> }
												                  label="2 donadores"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BleedingTime }
													onChange={ handleChange }
													name="BleedingTime"
													color="primary"
												/>
											}
											label="Tiempo de sangrado"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Other }
													onChange={ handleChange }
													name="Other"
													color="primary"
												/>
											}
											label="Otro"
										/>
									</Grid>
									<Grid item xs={ 12 }>
										<TextField
											disabled={ !data.Other }
											fullWidth
											id="other"
											label="Otro"
											name="OtherValue"
											value={ data.OtherValue }
											onChange={ handleChangeText }
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