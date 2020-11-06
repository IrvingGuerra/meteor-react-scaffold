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
import { accordionStyles, hasTrue } from './Biochemistry';

export default function Endocrinology(props) {
	const { data, setData } = props;
	const classes = accordionStyles();
	const [headerColor, setHeaderColor] = useState(false);
	const [open, setOpen] = useState(false);

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

	useEffect(() => {
		setHeaderColor(hasTrue(data));
	}, [data]);

	return (
		<Accordion className={ classes.accordion } onChange={ (e, state) => {
			e.preventDefault();
			setOpen(state);
		} }>
			<AccordionSummary
				className={ headerColor ? classes.accordionSummaryColor : classes.accordionSummary }
				expandIcon={ <ExpandMoreIcon/> }
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>ENDOCRINOLOGÍA</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{ open && (
					<Grid container direction="column" justify="center" alignItems="stretch">
						<Grid item>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ACTH }
													onChange={ handleChange }
													name="ACTH"
													color="primary"
												/>
											}
											label="ACTH"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Cortisol }
													onChange={ handleChange }
													name="Cortisol"
													color="primary"
												/>
											}
											label="Cortisol"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Cortisol2 }
													onChange={ handleChange }
													name="Cortisol2"
													color="primary"
												/>
											}
											label="Cortisol 2 muestras"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Cortisol3 }
													onChange={ handleChange }
													name="Cortisol3"
													color="primary"
												/>
											}
											label="Cortisol 3 muestras"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Erythropoietin }
													onChange={ handleChange }
													name="Erythropoietin"
													color="primary"
												/>
											}
											label="Eritropoyetina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Estradiol }
													onChange={ handleChange }
													name="Estradiol"
													color="primary"
												/>
											}
											label="Estradiol"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Estrogens }
													onChange={ handleChange }
													name="Estrogens"
													color="primary"
												/>
											}
											label="Estrógenos"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Fructosamine }
													onChange={ handleChange }
													name="Fructosamine"
													color="primary"
												/>
											}
											label="Fructosamina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Hemoglobin }
													onChange={ handleChange }
													name="Hemoglobin"
													color="primary"
												/>
											}
											label="Hemoglobina Glucosilada"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Insulin }
													onChange={ handleChange }
													name="Insulin"
													color="primary"
												/>
											}
											label="Insulina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Parathormone }
													onChange={ handleChange }
													name="Parathormone"
													color="primary"
												/>
											}
											label="Paratohormona"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Profile }
													onChange={ handleChange }
													name="Profile"
													color="primary"
												/>
											}
											label="Perfil endocrino"
										/>
									</Grid>
								</Grid>
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ProfileCan }
													onChange={ handleChange }
													name="ProfileCan"
													color="primary"
												/>
											}
											label="Perfil Tiroideo canino"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ProfileFel }
													onChange={ handleChange }
													name="ProfileFel"
													color="primary"
												/>
											}
											label="Perfil Tiroideo Felino"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Progesterona }
													onChange={ handleChange }
													name="Progesterona"
													color="primary"
												/>
											}
											label="Progesterona"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Prolactina }
													onChange={ handleChange }
													name="Prolactina"
													color="primary"
												/>
											}
											label="Prolactina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Relaxina }
													onChange={ handleChange }
													name="Relaxina"
													color="primary"
												/>
											}
											label="Relaxina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.T4 }
													onChange={ handleChange }
													name="T4"
													color="primary"
												/>
											}
											label="T4 libre"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Testosterona }
													onChange={ handleChange }
													name="Testosterona"
													color="primary"
												/>
											}
											label="Testosterona"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Tirotropina }
													onChange={ handleChange }
													name="Tirotropina"
													color="primary"
												/>
											}
											label="Tirotropina Canina TSH"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Tiroxina }
													onChange={ handleChange }
													name="Tiroxina"
													color="primary"
												/>
											}
											label="Tiroxina Total Canina T4T"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Triyodotironina }
													onChange={ handleChange }
													name="Triyodotironina"
													color="primary"
												/>
											}
											label="Triyodotironina T3T"
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
				) }
			</AccordionDetails>
		</Accordion>
	);
}