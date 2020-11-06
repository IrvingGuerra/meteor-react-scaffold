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

export default function Parasitology(props) {
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
				<Typography>PARASITOLOGÍA</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item>
						<Grid container direction="row" justify="flex-start" alignItems="flex-start">
							<Grid item xs={ 6 }>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Baermann }
												onChange={ handleChange }
												name="Baermann"
												color="primary"
											/>
										}
										label="Baermann"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Coprological }
												onChange={ handleChange }
												name="Coprological"
												color="primary"
											/>
										}
										label="Coprológico"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Faust }
												onChange={ handleChange }
												name="Faust"
												color="primary"
											/>
										}
										label="Faust"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.SerialFaust }
												onChange={ handleChange }
												name="SerialFaust"
												color="primary"
											/>
										}
										label="Faust Seriado"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Floatation }
												onChange={ handleChange }
												name="Floatation"
												color="primary"
											/>
										}
										label="Flotación"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.SerialFloatation }
												onChange={ handleChange }
												name="SerialFloatation"
												color="primary"
											/>
										}
										label="Flotación seriado"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Hemoparasites }
												onChange={ handleChange }
												name="Hemoparasites"
												color="primary"
											/>
										}
										label="Frotis sanguíneo (Hemoparásitos)"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.ID }
												onChange={ handleChange }
												name="ID"
												color="primary"
											/>
										}
										label="Identificación de parásitos"
									/>
								</Grid>
							</Grid>
							<Grid item xs={ 6 }>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Knott }
												onChange={ handleChange }
												name="Knott"
												color="primary"
											/>
										}
										label="Knott"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.McMaster }
												onChange={ handleChange }
												name="McMaster"
												color="primary"
											/>
										}
										label="Mc Master"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Scraped }
												onChange={ handleChange }
												name="Scraped"
												color="primary"
											/>
										}
										label="Raspado cutáneo profundo"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Blood }
												onChange={ handleChange }
												name="Blood"
												color="primary"
											/>
										}
										label="Sangre oculta en heces"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Sedimentation }
												onChange={ handleChange }
												name="Sedimentation"
												color="primary"
											/>
										}
										label="Sedimentación"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Sieving }
												onChange={ handleChange }
												name="Sieving"
												color="primary"
											/>
										}
										label="Tamizado"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Graham }
												onChange={ handleChange }
												name="Graham"
												color="primary"
											/>
										}
										label="Técnica Graham"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Kinyoun }
												onChange={ handleChange }
												name="Kinyoun"
												color="primary"
											/>
										}
										label="Tinción de Kinyoun"
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
			</AccordionDetails>
		</Accordion>
	);
}