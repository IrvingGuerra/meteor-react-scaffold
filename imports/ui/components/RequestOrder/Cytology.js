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
import { accordionStyles } from './Biochemistry';

export default function Cytology(props) {
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
				<Typography>CITOLOGÍA CLÍNICA</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container direction="column" justify="center" alignItems="stretch" spacing={1}>
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
								                  control={ <Radio onClick={ handleClickRadio }/> } label="PERICÁRDICO"/>
								<FormControlLabel disabled={ !data.Liquid } value="CEFALORRAQUÍDEO"
								                  control={ <Radio onClick={ handleClickRadio }/> } label="CEFALORRAQUÍDEO"/>
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
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="SitesNumber"
										label="No. de sitios: "
										type="number"
										value={ data.SitesNumber }
										onChange={handleChangeText}
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
								<FormControlLabel value="Tamaño del órgano" control={ <Radio onClick={ handleClickRadio }/> }
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
								<FormControlLabel value="Piel"
								                  control={ <Radio onClick={ handleClickRadio }/> }
								                  label="Piel"/>
								<FormControlLabel value="Subcutáneo"
								                  control={ <Radio onClick={ handleClickRadio }/> }
								                  label="Subcutáneo"/>
								<FormControlLabel value="Linfonodo"
								                  control={ <Radio onClick={ handleClickRadio }/> }
								                  label="Linfonodo"/>
								<FormControlLabel value=" Glándula mamaria"
								                  control={ <Radio onClick={ handleClickRadio }/> }
								                  label=" Glándula mamaria"/>
								<FormControlLabel value="Vagina"
								                  control={ <Radio onClick={ handleClickRadio }/> }
								                  label="Vagina"/>
								<FormControlLabel value="Otro"
								                  control={ <Radio onClick={ handleClickRadio }/> }
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
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
}