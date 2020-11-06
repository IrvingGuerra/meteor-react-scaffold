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
	Radio, FormLabel
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { accordionStyles, hasTrue } from './Biochemistry';

export default function Cytology(props) {
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
		<Accordion className={ classes.accordion } onChange={(e, state) => {
			e.preventDefault();
			setOpen(state);
		}}>
			<AccordionSummary
				className={ headerColor ? classes.accordionSummaryColor : classes.accordionSummary }
				expandIcon={ <ExpandMoreIcon/> }
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>CITOLOGÍA CLÍNICA</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{open && (
					<Grid container direction="column" justify="center" alignItems="stretch" spacing={ 1 }>
						<Grid item>
							<FormControlLabel
								control={
									<Checkbox
										checked={ data.Liquid }
										onChange={ handleChange }
										name="Liquid"
										color="primary"
									/>
								}
								label="Líquido"
							/>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<RadioGroup
									className={ classes.group }
									aria-label="LiquidValue"
									name="LiquidValue"
									value={ data.LiquidValue }
								>
									<FormControlLabel disabled={ !data.Liquid } value="PERITONEAL"
									                  control={ <Radio onClick={ handleClickRadio }/> } label="PERITONEAL"/>
									<FormControlLabel disabled={ !data.Liquid } value="PLEURAL"
									                  control={ <Radio onClick={ handleClickRadio }/> } label="PLEURAL"/>
									<FormControlLabel disabled={ !data.Liquid } value="PERICÁRDICO"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="PERICÁRDICO"/>
									<FormControlLabel disabled={ !data.Liquid } value="CEFALORRAQUÍDEO"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="CEFALORRAQUÍDEO"/>
									<FormControlLabel disabled={ !data.Liquid } value="SINOVIAL"
									                  control={ <Radio onClick={ handleClickRadio }/> } label="SINOVIAL"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Tumors }
													onChange={ handleChange }
													name="Tumors"
													color="primary"
												/>
											}
											label="Citología de tumores o tejidos"
										/>
									</Grid>
								</Grid>
								<Grid item xs={ 6 }>
									<Grid item xs={ 12 }>
										<TextField
											fullWidth
											name="SitesNumber"
											label="No. de sitios: "
											type="number"
											value={ data.SitesNumber }
											onChange={ handleChangeText }
										/>
									</Grid>

								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Método de obtención:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="ObtainingValue"
									name="ObtainingValue"
									value={ data.ObtainingValue }
								>
									<FormControlLabel value="AAF (PAF)"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="AAF (PAF)"/>
									<FormControlLabel value="Impronta" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Impronta"/>
									<FormControlLabel value="Raspado" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Raspado"/>
									<FormControlLabel value="Hisopado" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Hisopado"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Presenta:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="PresentValue"
									name="PresentValue"
									value={ data.PresentValue }
								>
									<FormControlLabel value="Nódulo / Masa"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Nódulo / Masa"/>
									<FormControlLabel value="Tamaño del órgano"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Tamaño del órgano"/>
									<FormControlLabel value="Otro" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Otro"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								disabled={ data.PresentValue !== 'Otro' }
								fullWidth
								id="other"
								label="Otro"
								name="PresentValueOther"
								value={ data.PresentValueOther }
								onChange={ handleChangeText }
							/>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">En:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="PresentInValue"
									name="PresentInValue"
									value={ data.PresentInValue }
								>
									<FormControlLabel value="Piel" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Piel"/>
									<FormControlLabel value="Subcutáneo" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Subcutáneo"/>
									<FormControlLabel value="Linfonodo" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Linfonodo"/>
									<FormControlLabel value=" Glándula mamaria"
									                  control={ <Radio onClick={ handleClickRadio }/> }
									                  label=" Glándula mamaria"/>
									<FormControlLabel value="Vagina" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Vagina"/>
									<FormControlLabel value="Otro" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Otro"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								disabled={ data.PresentInValue !== 'Otro' }
								fullWidth
								id="other"
								label="Otro"
								name="PresentInValueOther"
								value={ data.PresentInValueOther }
								onChange={ handleChangeText }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								fullWidth
								id="Region"
								label="Región anatómica"
								name="Region"
								value={ data.Region }
								onChange={ handleChangeText }
							/>
						</Grid>
						<Grid item xs={ 12 }>
							<TextField
								fullWidth
								id="Size"
								label="Tamaño"
								name="Size"
								value={ data.Size }
								onChange={ handleChangeText }
							/>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Bien delimitado:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Delimited"
									name="Delimited"
									value={ data.Delimited }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Borde:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Edge"
									name="Edge"
									value={ data.Edge }
								>
									<FormControlLabel value="Liso" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Liso"/>
									<FormControlLabel value="Irregular" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Irregular"/>
									<FormControlLabel value="Multinodular" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Multinodular"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Consistencia:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Consistency"
									name="Consistency"
									value={ data.Consistency }
								>
									<FormControlLabel value="Blanda" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Blanda"/>
									<FormControlLabel value="Firme" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Firme"/>
									<FormControlLabel value="Dura" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Dura"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Ulcerado:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Ulcerated"
									name="Ulcerated"
									value={ data.Ulcerated }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Pigmentado:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Pigmented"
									name="Pigmented"
									value={ data.Pigmented }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Crecimiento:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Increase"
									name="Increase"
									value={ data.Increase }
								>
									<FormControlLabel value="Lento" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Lento"/>
									<FormControlLabel value="Rápido" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Rápido"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Alopécico:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Alopecic"
									name="Alopecic"
									value={ data.Alopecic }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Desplazable:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Movable"
									name="Movable"
									value={ data.Movable }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<FormControl component="fieldset">
								<FormLabel component="legend">Doloroso:</FormLabel>
								<RadioGroup
									className={ classes.group }
									aria-label="Painful"
									name="Painful"
									value={ data.Painful }
								>
									<FormControlLabel value="Si" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="Si"/>
									<FormControlLabel value="No" control={ <Radio onClick={ handleClickRadio }/> }
									                  label="No"/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item>
							<Grid container direction="row" justify="flex-start" alignItems="flex-start">
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.VaginalCytology }
													onChange={ handleChange }
													name="VaginalCytology"
													color="primary"
												/>
											}
											label="Citología vaginal"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.OticCytology }
													onChange={ handleChange }
													name="OticCytology"
													color="primary"
												/>
											}
											label="Citología ótica"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup
												className={ classes.group }
												aria-label="OticCytologyValue"
												name="OticCytologyValue"
												value={ data.OticCytologyValue }
											>
												<FormControlLabel disabled={ !data.OticCytology } value="Un oído"
												                  control={ <Radio onClick={ handleClickRadio }/> } label="Un oído"/>
												<FormControlLabel disabled={ !data.OticCytology } value="Dos oídos "
												                  control={ <Radio onClick={ handleClickRadio }/> } label="Dos oídos "/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Immunocytochemistry }
													onChange={ handleChange }
													name="Immunocytochemistry"
													color="primary"
												/>
											}
											label="Inmunocitoquímica"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Washed }
													onChange={ handleChange }
													name="Washed"
													color="primary"
												/>
											}
											label="Lavado"
										/>
									</Grid>
									<Grid item xs={ 12 }>
										<TextField
											disabled={ !data.Washed }
											fullWidth
											id="Lavado"
											label="Lavado"
											name="WashedValue"
											value={ data.WashedValue }
											onChange={ handleChangeText }
										/>
									</Grid>

								</Grid>
								<Grid item xs={ 6 }>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.Bone }
													onChange={ handleChange }
													name="Bone"
													color="primary"
												/>
											}
											label="Médula ósea"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.BoneHemogram }
													onChange={ handleChange }
													name="BoneHemogram"
													color="primary"
												/>
											}
											label="Médula ósea con hemograma"
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
				)}
			</AccordionDetails>
		</Accordion>
	);
}