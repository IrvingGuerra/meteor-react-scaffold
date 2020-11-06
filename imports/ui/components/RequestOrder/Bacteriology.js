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

export default function Bacteriology(props) {
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
				<Typography>BACTERIOLOGÍA Y MICOLOGÍA</Typography>
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
													checked={ data.Brucella }
													onChange={ handleChange }
													name="Brucella"
													color="primary"
												/>
											}
											label="Aislamiento de Brucella canis"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Microbiological }
													onChange={ handleChange }
													name="Microbiological"
													color="primary"
												/>
											}
											label="Microbiológico de otitis (bacteriológico y micológico)"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="MicrobiologicalValue"
												name="MicrobiologicalValue"
												value={ data.MicrobiologicalValue }
											>
												<FormControlLabel disabled={ !data.Microbiological } value="Un oído"
												                  control={ <Radio onClick={ handleClickRadio }/> }
												                  label="Un oído"/>
												<FormControlLabel disabled={ !data.Microbiological } value="Dos oídos"
												                  control={ <Radio onClick={ handleClickRadio }/> }
												                  label="Dos oídos"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Brucellosis }
													onChange={ handleChange }
													name="Brucellosis"
													color="primary"
												/>
											}
											label="Brucelosis canina (aglutinación placa)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Bacteriological }
													onChange={ handleChange }
													name="Bacteriological"
													color="primary"
												/>
											}
											label="Bacteriológico de heces"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BacteriologicalGeneral }
													onChange={ handleChange }
													name="BacteriologicalGeneral"
													color="primary"
												/>
											}
											label="Bacteriológico general con antibiograma"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.SensidiscoAdd }
													onChange={ handleChange }
													name="SensidiscoAdd"
													color="primary"
												/>
											}
											label="Sensidisco adicional"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Salmonella }
													onChange={ handleChange }
													name="Salmonella"
													color="primary"
												/>
											}
											label="Salmonella en heces"
										/>
									</Grid>
								</Grid>
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BloodCultureGeneral }
													onChange={ handleChange }
													name="BloodCultureGeneral"
													color="primary"
												/>
											}
											label="Hemocultivo general"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BloodCulture }
													onChange={ handleChange }
													name="BloodCulture"
													color="primary"
												/>
											}
											label="Hemocultivo (Brucellacanis "
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.MycologicalGeneral }
													onChange={ handleChange }
													name="MycologicalGeneral"
													color="primary"
												/>
											}
											label="Micológico general "
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.MycologicalAnd }
													onChange={ handleChange }
													name="MycologicalAnd"
													color="primary"
												/>
											}
											label="Micológico general y antifungigrama"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.KOH }
													onChange={ handleChange }
													name="KOH"
													color="primary"
												/>
											}
											label="Evaluación KOH"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.KOHPlus }
													onChange={ handleChange }
													name="KOHPlus"
													color="primary"
												/>
											}
											label="Evaluación KOH + Micológico general"
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