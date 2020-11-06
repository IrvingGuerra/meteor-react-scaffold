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

export default function Hematology(props) {
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
				<Typography>HEMATOLOGÍA E INMUNOHEMATOLOGÍA</Typography>
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
												checked={ data.Antibodies }
												onChange={ handleChange }
												name="Antibodies"
												color="primary"
											/>
										}
										label="Anticuerpos antinucleares"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Cells }
												onChange={ handleChange }
												name="Cells"
												color="primary"
											/>
										}
										label="Células LE"
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
										label="Factor reumatoide"
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
										label="Hemoparásitos"
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
							<Grid item xs={ 6 }>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Hemogram }
												onChange={ handleChange }
												name="Hemogram"
												color="primary"
											/>
										}
										label="Hemograma"
									/>
								</Grid>
								<Grid item>
									<FormControl component="fieldset">
										<RadioGroup
											className={ classes.group }
											aria-label="HemogramValue"
											name="HemogramValue"
											value={ data.HemogramValue }
										>
											<FormControlLabel disabled={ !data.Hemogram } value="Pequeñas especies"
											                  control={ <Radio onClick={ handleClickRadio }/> } label="Pequeñas especies"/>
											<FormControlLabel disabled={ !data.Hemogram } value="Grandes especies"
											                  control={ <Radio onClick={ handleClickRadio }/> } label="Grandes especies"/>
										</RadioGroup>
									</FormControl>
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
										label="Perfil anemia"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Reticulocytes }
												onChange={ handleChange }
												name="Reticulocytes"
												color="primary"
											/>
										}
										label="Reticulocitos"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.Test }
												onChange={ handleChange }
												name="Test"
												color="primary"
											/>
										}
										label="Prueba de Coombs"
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