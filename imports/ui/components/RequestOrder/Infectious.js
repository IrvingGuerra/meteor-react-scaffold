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

export default function Infectious(props) {
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
				<Typography>ENFERMEDADES INFECCIOSAS</Typography>
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
													checked={ data.AutoVaccine }
													onChange={ handleChange }
													name="AutoVaccine"
													color="primary"
												/>
											}
											label="Autovacuna (papilomas)"
										/>
									</Grid>
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
											label="Anticuerpos	antirrábicos"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ELISA }
													onChange={ handleChange }
													name="ELISA"
													color="primary"
												/>
											}
											label="Calicivirus Felino (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Coronavirus }
													onChange={ handleChange }
													name="Coronavirus"
													color="primary"
												/>
											}
											label="Coronavirus Felino (heces)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Dirofilariosis }
													onChange={ handleChange }
													name="Dirofilariosis"
													color="primary"
												/>
											}
											label="Dirofilariosis (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Distemper }
													onChange={ handleChange }
													name="Distemper"
													color="primary"
												/>
											}
											label="Distemper canino"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="DistemperValue"
												name="DistemperValue"
												value={ data.DistemperValue }
											>
												<FormControlLabel disabled={ !data.Distemper } value="ELISA"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="ELISA"/>
												<FormControlLabel disabled={ !data.Distemper } value="PCR"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="PCR"/>
												<FormControlLabel disabled={ !data.Distemper } value="IFA"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="IFA"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Ehrlichia }
													onChange={ handleChange }
													name="Ehrlichia"
													color="primary"
												/>
											}
											label="4 Dx - Ehrlichia, Dirofilaria, Borrelia y Anaplasma (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Ehrlichiosis }
													onChange={ handleChange }
													name="Ehrlichiosis"
													color="primary"
												/>
											}
											label="Ehrlichiosis"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="EhrlichiosisValue"
												name="EhrlichiosisValue"
												value={ data.EhrlichiosisValue }
											>
												<FormControlLabel disabled={ !data.Ehrlichiosis } value="ELISA"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="ELISA"/>
												<FormControlLabel disabled={ !data.Ehrlichiosis } value="PCR"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="PCR"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Chagas }
													onChange={ handleChange }
													name="Chagas"
													color="primary"
												/>
											}
											label="Enfermedad de Chagas (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Giardiasis }
													onChange={ handleChange }
													name="Giardiasis"
													color="primary"
												/>
											}
											label="Giardiasis (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Leishmania }
													onChange={ handleChange }
													name="Leishmania"
													color="primary"
												/>
											}
											label="Leishmania infantum (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Leptospirosis }
													onChange={ handleChange }
													name="Leptospirosis"
													color="primary"
												/>
											}
											label="Leptospirosis"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="LeptospirosisValue"
												name="LeptospirosisValue"
												value={ data.LeptospirosisValue }
											>
												<FormControlLabel disabled={ !data.Leptospirosis } value="MAT"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="MAT"/>
												<FormControlLabel disabled={ !data.Leptospirosis } value="PCR"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="PCR"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Leucemia }
													onChange={ handleChange }
													name="Leucemia"
													color="primary"
												/>
											}
											label="Leucemia Viral Felina"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="LeucemiaValue"
												name="LeucemiaValue"
												value={ data.LeucemiaValue }
											>
												<FormControlLabel disabled={ !data.Leucemia } value="ELISA"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="ELISA"/>
												<FormControlLabel disabled={ !data.Leucemia } value="PCR"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="PCR"/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.LeucemiaELISA }
													onChange={ handleChange }
													name="LeucemiaELISA"
													color="primary"
												/>
											}
											label="Leucemia Viral Felina e Inmunodeficiencia (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Panleucopenia }
													onChange={ handleChange }
													name="Panleucopenia"
													color="primary"
												/>
											}
											label="Panleucopenia viral felina (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Rage }
													onChange={ handleChange }
													name="Rage"
													color="primary"
												/>
											}
											label="Rabia (SEROLOGÍA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.IgG }
													onChange={ handleChange }
													name="IgG"
													color="primary"
												/>
											}
											label="Toxoplasmosis IgG (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.IgM }
													onChange={ handleChange }
													name="IgM"
													color="primary"
												/>
											}
											label="Toxoplasmosis IgM (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Triple }
													onChange={ handleChange }
													name="Triple"
													color="primary"
												/>
											}
											label="Triple digestiva canina (Parvovirus, coronavirus y giardia) (ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.TripleResp }
													onChange={ handleChange }
													name="TripleResp"
													color="primary"
												/>
											}
											label="Triple respiratoria (Distemper, adenovirus e influenza)	(ELISA)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Hepatitis }
													onChange={ handleChange }
													name="Hepatitis"
													color="primary"
												/>
											}
											label="Hepatitis canina (PCR)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Micoplasmosis }
													onChange={ handleChange }
													name="Micoplasmosis"
													color="primary"
												/>
											}
											label="Micoplasmosis canina (PCR)"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Parvovirus }
													onChange={ handleChange }
													name="Parvovirus"
													color="primary"
												/>
											}
											label="Parvovirus canina"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="ParvovirusValue"
												name="ParvovirusValue"
												value={ data.ParvovirusValue }
											>
												<FormControlLabel disabled={ !data.Parvovirus } value="ELISA"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="ELISA"/>
												<FormControlLabel disabled={ !data.Parvovirus } value="PCR"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="PCR"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.PIF }
													onChange={ handleChange }
													name="PIF"
													color="primary"
												/>
											}
											label="P.I.F (ELISA)"
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