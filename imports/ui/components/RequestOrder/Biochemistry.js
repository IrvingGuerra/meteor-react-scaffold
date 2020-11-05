import React from 'react';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	FormControl,
	RadioGroup,
	Radio
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	group: {
		width: 'auto',
		height: 'auto',
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		marginLeft: theme.spacing(4)
	}
}));

export default function Biochemistry(props) {
	const { data, setData } = props;
	const classes = useStyles();

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.checked });
	};

	const handleChangeRadioAndText = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={ <ExpandMoreIcon/> }
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>BIOQUÍMICA</Typography>
			</AccordionSummary>
			<AccordionDetails>


				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography color="primary" component="span">
								<Box fontSize={ 18 } fontWeight="fontWeightMedium" m={ 2 }>
									PEQUEÑAS ESPECIES
								</Box>
							</Typography>
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
													checked={ data.BasicProfile }
													onChange={ handleChange }
													name="BasicProfile"
													color="primary"
												/>
											}
											label="Perfil Básico"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.HepaticProfile }
													onChange={ handleChange }
													name="HepaticProfile"
													color="primary"
												/>
											}
											label="Perfil Hepático"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup className={ classes.group }
											            aria-label="HepaticProfileValue"
											            name="HepaticProfileValue"
											            value={ data.HepaticProfileValue }
											            onChange={ handleChangeRadioAndText }
											>
												<FormControlLabel value="one" control={ <Radio/> } label="Uno"/>
												<FormControlLabel value="two" control={ <Radio/> } label="Dos"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.RenalProfile }
													onChange={ handleChange }
													name="RenalProfile"
													color="primary"
												/>
											}
											label="Perfil Renal"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.DiabeticProfile }
													onChange={ handleChange }
													name="DiabeticProfile"
													color="primary"
												/>
											}
											label="Perfil Diabético"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup className={ classes.group }
											            aria-label="DiabeticProfileValue"
											            name="DiabeticProfileValue"
											            value={ data.DiabeticProfileValue }
											            onChange={ handleChangeRadioAndText }
											>
												<FormControlLabel value="one" control={ <Radio/> } label="Uno"/>
												<FormControlLabel value="two" control={ <Radio/> } label="Dos"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.PresurgicalProfile }
													onChange={ handleChange }
													name="PresurgicalProfile"
													color="primary"
												/>
											}
											label="Perfil Prequirúrgico"
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
													checked={ data.DermatologicalProfile }
													onChange={ handleChange }
													name="DermatologicalProfile"
													color="primary"
												/>
											}
											label="Perfil Dermatológico"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.PancreaticProfile }
													onChange={ handleChange }
													name="PancreaticProfile"
													color="primary"
												/>
											}
											label="Perfil Pancréatico"
										/>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.ConvulsionsProfile }
													onChange={ handleChange }
													name="ConvulsionsProfile"
													color="primary"
												/>
											}
											label="Perfil Convulsiones"
										/>
									</Grid>
									<Grid item>
										<FormControl component="fieldset">
											<RadioGroup className={ classes.group }
											            aria-label="ConvulsionsProfileValue"
											            name="ConvulsionsProfileValue"
											            value={ data.ConvulsionsProfileValue }
											            onChange={ handleChangeRadioAndText }
											>
												<FormControlLabel value="one" control={ <Radio/> } label="Uno"/>
												<FormControlLabel value="two" control={ <Radio/> } label="Dos"/>
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={ data.FullProfile }
													onChange={ handleChange }
													name="FullProfile"
													color="primary"
												/>
											}
											label="Perfil Completo"
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
									<Grid item xs={12}>
										<TextField
											disabled={!data.Other}
											fullWidth
											id="other"
											label="Otro"
											name="OtherValue"
											value={ data.OtherValue }
											onChange={handleChangeRadioAndText}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction="row" justify="center" alignItems="center">
							<Typography color="primary" component="span">
								<Box fontSize={ 18 } fontWeight="fontWeightMedium" m={ 2 }>
									GRANDES ESPECIES
								</Box>
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container direction="row" justify="flex-start" alignItems="flex-start">
							<Grid item xs={ 6 }>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.BasicProfileBig }
												onChange={ handleChange }
												name="BasicProfileBig"
												color="primary"
											/>
										}
										label="Perfil Básico"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.HepaticProfileBig }
												onChange={ handleChange }
												name="HepaticProfileBig"
												color="primary"
											/>
										}
										label="Perfil Hepático"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.RenalProfileBig }
												onChange={ handleChange }
												name="RenalProfileBig"
												color="primary"
											/>
										}
										label="Perfil Renal"
									/>
								</Grid>
							</Grid>
							<Grid item xs={ 6 }>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.NeonatalProfile }
												onChange={ handleChange }
												name="NeonatalProfile"
												color="primary"
											/>
										}
										label="Perfil Neonatal"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.FullProfileBig }
												onChange={ handleChange }
												name="FullProfileBig"
												color="primary"
											/>
										}
										label="Perfil Completo"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={ data.OtherBig }
												onChange={ handleChange }
												name="OtherBig"
												color="primary"
											/>
										}
										label="Otro"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										disabled={!data.OtherBig}
										fullWidth
										id="other"
										label="Otro"
										name="OtherValueBig"
										value={ data.OtherValueBig }
										onChange={handleChangeRadioAndText}
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