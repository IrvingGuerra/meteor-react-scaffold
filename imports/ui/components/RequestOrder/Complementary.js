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

export default function Complementary(props) {
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
				<Typography>COMPLEMENTARIAS</Typography>
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
													checked={ data.AcidOne }
													onChange={ handleChange }
													name="AcidOne"
													color="primary"
												/>
											}
											label="Ácidos biliares (una determinación)"
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
											label="Ácidos biliares (basal y postprandial)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.LDL }
													onChange={ handleChange }
													name="LDL"
													color="primary"
												/>
											}
											label="Colesterol LDL / HDL"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Iron }
													onChange={ handleChange }
													name="Iron"
													color="primary"
												/>
											}
											label="Hierro total"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.SDMA }
													onChange={ handleChange }
													name="SDMA"
													color="primary"
												/>
											}
											label="Biomarcador SDMA"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Electroforesis }
													onChange={ handleChange }
													name="Electroforesis"
													color="primary"
												/>
											}
											label="Electroforesis de proteínas"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Tricograma }
													onChange={ handleChange }
													name="Tricograma"
													color="primary"
												/>
											}
											label="Tricograma"
										/>
									</Grid>
								</Grid>
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Lipasa }
													onChange={ handleChange }
													name="Lipasa"
													color="primary"
												/>
											}
											label="Lipasa pancreática específica canina / felina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Pancreas }
													onChange={ handleChange }
													name="Pancreas"
													color="primary"
												/>
											}
											label="Páncreas	exocrino"
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
											label="Proteínas de Bence-Jones en orina"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ProteinC }
													onChange={ handleChange }
													name="ProteinC"
													color="primary"
												/>
											}
											label="Proteina C reactiva"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Trypsin }
													onChange={ handleChange }
													name="Trypsin"
													color="primary"
												/>
											}
											label="Tripsina Inmunoreactiva específica canina / felina"
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