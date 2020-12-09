import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
	Chip,
	ListItemText,
	List,
	ListItem,
	ListItemSecondaryAction,
	Paper,
	Typography,
	Box,
	Container, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTracker } from 'meteor/react-meteor-data';
import { Template } from '../../../api/Templates/Template';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Specie } from '../../../api/Pets/Species/Specie';
import { Breed } from '../../../api/Pets/Breeds/Breed';
import { Gender } from '../../../api/Pets/Genders/Gender';
import Biochemistry from '../../components/RequestOrder/Biochemistry';
import Analytes from '../../components/RequestOrder/Analytes';
import Hemostasis from '../../components/RequestOrder/Hemostasis';
import NonConventional from '../../components/RequestOrder/NonConventional';
import UrinaryTract from '../../components/RequestOrder/UrinaryTract';
import Cytology from '../../components/RequestOrder/Cytology';
import Hematology from '../../components/RequestOrder/Hematology';
import Parasitology from '../../components/RequestOrder/Parasitology';
import Bacteriology from '../../components/RequestOrder/Bacteriology';
import Endocrinology from '../../components/RequestOrder/Endocrinology';
import Complementary from '../../components/RequestOrder/Complementary';
import Infectious from '../../components/RequestOrder/Infectious';
import Toxicology from '../../components/RequestOrder/Toxicology';
import Histopathology from '../../components/RequestOrder/Histopathology';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	form: {
		margin: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

// Publications

const useTemplates = () => useTracker(() => {
	Meteor.subscribe('allTemplates');
	return Template.find({}).fetch();
}, []);

export default function OrderDetails(props) {
	const { history, loader, alert } = props;
	const user = useSelector(state => state.user);
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		number: '',
		petOwner: '',
		MVZ: '',
		clinic: '',
		petName: '',
		petSpecie: '',
		petBreed: '',
		petGender: '',
		petAge: '',
		kind: '',
		EFG: '',
		TX: '',
		observation1: '',
		observation2: '',
		status: '',
		analyses: []
	});
	const [newStatus, setNewStatus] = useState('')

	const handleAssignAnalyses = (e) => {
		e.preventDefault();
		Meteor.call('order.update', { order: form, status: 'awaitingSample' }, (error, response) => {
			if (error) {
				alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			alert.current.setAlert('Éxito', response._message);
			setTimeout(() => {
				history.goBack();
			}, 1000);
		});
	};

	const handleUpdateStatus = (e) => {
		e.preventDefault();
		Meteor.call('order.changeStatus', { idOrder: form._id, status: newStatus }, (error, response) => {
			if (error) {
				alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			alert.current.setAlert('Éxito', response._message);
			setTimeout(() => {
				history.goBack();
			}, 1000);
		});
	};

	useEffect(() => {
		if (props.location.state) {
			loader.current.setLoader(true);
			Meteor.call('order.get', props.location.state.idOrder, (error, response) => {
				loader.current.setLoader(false);
				if (error) {
					alert.current.setAlert('Error', error.reason, 'error');
					return;
				}
				setForm(response._data);
				setNewStatus(response._data.status)
			});
		}
	}, []);

	const species = useTracker(() => {
		Meteor.subscribe('species');
		return Specie.find({}).fetch();
	}, []);

	const breeds = useTracker(() => {
		Meteor.subscribe('breeds');
		return Breed.find({}).fetch();
	}, []);

	const genders = useTracker(() => {
		Meteor.subscribe('genders');
		return Gender.find({}).fetch();
	}, []);

	const clients = useTracker(() => {
		Meteor.subscribe('clients');
		return Meteor.users.find({'profile.profile':"client"}).fetch();
	}, []);

	const templates = useTemplates();

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="flex-start" alignItems="center">
							<Grid item>
								<IconButton onClick={ () => {
									history.goBack();
								} }>
									<ArrowBackIcon fontSize="large" color="primary"/>
								</IconButton>
							</Grid>
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										DETALLES DE LA ORDEN
									</Box>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 }>
						<form className={ classes.form }
						      onSubmit={ (e) => form.status === 'open' ? handleAssignAnalyses(e) : handleUpdateStatus(e) }>
							<Grid container spacing={ 2 }>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="petOwner"
										label="Propietario"
										name="petOwner"
										value={ form.petOwner }
										onChange={ e => setForm({ ...form, petOwner: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="MVZ"
										label="MVZ"
										name="MVZ"
										value={ form.MVZ }
										onChange={ e => setForm({ ...form, MVZ: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Clínica</InputLabel>
										<Select
											labelId="selectClinicLabel"
											id="selectClinic"
											value={ form.clinic }
											onChange={ e => setForm({ ...form, clinic: e.target.value }) }
											label="selectClinicLabel"
										>
											{ clients.map((client, i) => <MenuItem key={ i }
											                                       value={ client._id }>{ client.profile.username }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="petName"
										label="Nombre de la mascota"
										name="petName"
										value={ form.petName }
										onChange={ e => setForm({ ...form, petName: e.target.value }) }
									/>
								</Grid>
								{form.status !== 'attended' && (
									<Grid item xs={ 12 }>
										<FormControl variant="outlined" fullWidth required>
											<InputLabel id="demo-simple-select-outlined-label">Estatus</InputLabel>
											{(form.status === 'open') && (
												<Select
													value={ 'open' }
													onChange={ e => setNewStatus(e.target.value) }
													label="Estatus"
												>

													<MenuItem key={ 1 } value="open">Abierto</MenuItem>
												</Select>
											)}
											{(form.status === 'awaitingSample') && (
												<Select
													value={ newStatus }
													onChange={ e => setNewStatus(e.target.value) }
													label="Estatus"
												>

													<MenuItem key={ 2 } value="awaitingSample">En espera de muestra</MenuItem>
													<MenuItem key={ 3 } value="process">En proceso</MenuItem>
												</Select>
											)}
											{(form.status === 'process' && (user.profile.profile === 'specialist' || user.profile.profile === 'admin')) && (
												<Select
													value={ newStatus }
													onChange={ e => setNewStatus(e.target.value) }
													label="Estatus"
												>
													<MenuItem key={ 3 } value="process">En proceso</MenuItem>
													<MenuItem key={ 4 } value="awaitingResults">En espera de
														resultados</MenuItem>
												</Select>
											)}
											{(form.status === 'awaitingResults' && (user.profile.profile === 'specialist' || user.profile.profile === 'admin')) && (
												<Select
													value={ newStatus }
													onChange={ e => setNewStatus(e.target.value) }
													label="Estatus"
												>
													<MenuItem key={ 3 } value="process">En proceso</MenuItem>
													<MenuItem key={ 4 } value="awaitingResults">En espera de
														resultados</MenuItem>
													<MenuItem key={ 5 } value="attended">Atendido</MenuItem>
												</Select>
											)}
										</FormControl>
									</Grid>
								)}
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Especie</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petSpecie }
											onChange={ e => setForm({ ...form, petSpecie: e.target.value }) }
											label="Especie"
										>
											{ species.map((specie, i) => <MenuItem key={ i }
											                                       value={ specie._id }>{ specie.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Raza</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petBreed }
											onChange={ e => setForm({ ...form, petBreed: e.target.value }) }
											label="Raza"
										>
											{ breeds.map((breed, i) => <MenuItem key={ i }
											                                     value={ breed._id }>{ breed.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Genero</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petGender }
											onChange={ e => setForm({ ...form, petGender: e.target.value }) }
											label="Genero"
										>
											{ genders.map((gender, i) => <MenuItem key={ i }
											                                       value={ gender._id }>{ gender.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="petAge"
										label="Edad"
										name="petAge"
										value={ form.petAge }
										onChange={ e => setForm({ ...form, petAge: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="kind"
										label="Tipo de muestra"
										name="kind"
										type="text"
										value={ form.kind }
										onChange={ e => setForm({ ...form, kind: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="EFG"
										label="Signos clínicos / EFG:"
										required
										fullWidth
										multiline
										rows={4}
										variant="outlined"
										value={ form.EFG }
										onChange={ e => setForm({ ...form, EFG: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="TX"
										label="Tx reciente previo al muestreo:"
										required
										fullWidth
										multiline
										rows={4}
										variant="outlined"
										value={ form.TX }
										onChange={ e => setForm({ ...form, TX: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={6}>
									<MuiPickersUtilsProvider utils={ DateFnsUtils }>
										<DatePicker
											disableToolbar
											variant="outlined"
											fullWidth
											format="yyyy-MM-dd"
											margin="normal"
											id="Fecha de muestreo"
											label="Fecha de muestreo"
											value={ form.samplingDate }
											onChange={ (date) => setForm({ ...form, samplingDate: new Date(date) }) }
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item xs={6}>
									<MuiPickersUtilsProvider utils={ DateFnsUtils }>
										<TimePicker
											disableToolbar
											variant="outlined"
											fullWidth
											margin="normal"
											id="Hora de muestreo"
											label="Hora de muestreo"
											value={ form.samplingHour }
											onChange={ (date) => setForm({ ...form, samplingHour: new Date(date) }) }
										/>
									</MuiPickersUtilsProvider>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="outlined-multiline-static"
										label="Observación 1"
										required
										fullWidth
										multiline
										rows={4}
										variant="outlined"
										value={ form.observation1 }
										onChange={ e => setForm({ ...form, observation1: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="outlined-multiline-static"
										label="Observación 2"
										required
										fullWidth
										multiline
										rows={4}
										variant="outlined"
										value={ form.observation2 }
										onChange={ e => setForm({ ...form, observation2: e.target.value }) }
									/>
								</Grid>
								{form._id && (
									<Grid item xs={ 12 }>
										<Biochemistry
											data={form.biochemistry}
										/>
										<Analytes
											data={form.analytes}
										/>
										<Hemostasis
											data={form.hemostasis}
										/>
										<NonConventional
											data={form.nonConventional}
										/>
										<UrinaryTract
											data={form.urinaryTract}
										/>
										<Cytology
											data={form.cytology}
										/>
										<Hematology
											data={form.hematology}
										/>
										<Parasitology
											data={form.parasitology}
										/>
										<Bacteriology
											data={form.bacteriology}
										/>
										<Endocrinology
											data={form.endocrinology}
										/>
										<Complementary
											data={form.complementary}
										/>
										<Infectious
											data={form.infectious}
										/>
										<Toxicology
											data={form.toxicology}
										/>
										<Histopathology
											data={form.histopathology}
										/>
									</Grid>
								)}

								{ (form.status === 'open' || form.status === 'awaitingSample' || form.status === 'process') && (
									<Grid item xs={ 12 }>
										<Autocomplete
											multiple
											id="tags-standard"
											defaultValue={form.analyses}
											options={ templates.map((template) => template) }
											getOptionLabel={ (template) => template.title }
											renderTags={ (value, getTagProps) =>
												value.map((template, index) => (
													<Chip label={ template.title } { ...getTagProps({ index }) } />
												))
											}
											renderInput={ (
												params) => (
												<TextField { ...params } variant="filled" label="Seleccione analisis"/>
											) }
											onChange={ (event, values) => {
												setForm({ ...form, analyses: values });
											} }
											getOptionSelected={ (option, { multiple }) => {
												if (!multiple) {
													return false;
												}
												return false;
											} }
										/>
									</Grid>
								) }

								{ (form.status !== 'open') && (
									<Grid item xs={ 12 }>
										<List dense={ true }>
											{ form.analyses.map((analysis, index) => {
												if (templates.length > 0) {
													return (
														<ListItem key={ index }>
															<ListItemText
																primary={ analysis.title }
															/>
															<ListItemSecondaryAction>
																<IconButton onClick={ () => {
																	history.push({
																		pathname: '/' + history.location.pathname.split('/')[1] + '/editTemplate',
																		state: {
																			template: analysis,
																			canEdit: false,
																			orderId: form._id,
																			number: form.number,
																			petOwner: form.petOwner,
																			MVZ: form.MVZ,
																			clinic: clients.filter(g => g._id === form.clinic)[0].profile.username,
																			petName: form.petName,
																			petSpecie: species.filter(g => g._id === form.petSpecie)[0].name,
																			petBreed: breeds.filter(g => g._id === form.petBreed)[0].name,
																			petGender: genders.filter(g => g._id === form.petGender)[0].name,
																			petAge: form.petAge,
																			kind: form.kind,
																			samplingDate: form.samplingDate,
																			samplingHour: form.samplingHour,
																			downloadMode: form.status === 'attended'
																		}
																	});
																} }>
																	{form.status === 'attended' ? (
																		<VisibilityIcon/>
																	) : (
																		<NavigateNextIcon/>
																	)}
																</IconButton>
															</ListItemSecondaryAction>
														</ListItem>
													);
												}
											}) }
										</List>
									</Grid>
								) }
							</Grid>
							{(form.status !== 'open' && form.status !== 'awaitingResults' && form.status !== 'attended')  && (
								<Button
									fullWidth
									variant="contained"
									color="primary"
									className={ classes.submit }
									onClick={handleAssignAnalyses}
								>
									Actualizar analisis
								</Button>
							)}
							{form.status !== 'attended' && (
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={ classes.submit }
								>
									{ form.status === 'open' ? (
										'Asignar analisis'
									) : (
										'Actualizar estatus'
									) }
								</Button>
							)}
						</form>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
