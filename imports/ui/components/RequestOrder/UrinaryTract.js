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
	Radio,
	FormLabel
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { accordionStyles } from './Biochemistry';

export default function UrinaryTract(props) {
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
				<Typography>EVALUACIÓN DE VÍAS URINARIAS</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Método de muestreo:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="MethodValue"
									name="MethodValue"
									value={ data.MethodValue }
								>
									<FormControlLabel value="CISTOCENTESIS"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="CISTOCENTESIS"/>
									<FormControlLabel value="SONDEO" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="SONDEO"/>
									<FormControlLabel value="MICCIÓN" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="MICCIÓN"/>
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
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
											label="Análisis de cálculos"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Cytology }
													onChange={ handleChange }
													name="Cytology"
													color="primary"
												/>
											}
											label="Citología del sedimento urinario"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Protein }
													onChange={ handleChange }
													name="Protein"
													color="primary"
												/>
											}
											label="Relación proteína / creatinina en orina"
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
											label="Relación cortisol / creatinina en orina"
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
													checked={ data.ProteinUrinalysis }
													onChange={ handleChange }
													name="ProteinUrinalysis"
													color="primary"
												/>
											}
											label="Relación proteína/creatinina en orina y urianálisis"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Urinalysis }
													onChange={ handleChange }
													name="Urinalysis"
													color="primary"
												/>
											}
											label="Urianálisis"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.UrinalysisWith }
													onChange={ handleChange }
													name="UrinalysisWith"
													color="primary"
												/>
											}
											label="Urianálisis con urocultivo y antibiograma"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.UrineCulture }
													onChange={ handleChange }
													name="UrineCulture"
													color="primary"
												/>
											}
											label="Urocultivo con antibiograma"
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