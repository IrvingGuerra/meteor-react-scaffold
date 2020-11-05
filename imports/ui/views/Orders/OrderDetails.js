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
import { useTracker } from 'react-meteor-hooks';
import { Template } from '../../../api/Templates/Template';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Specie } from '../../../api/Pets/Species/Specie';
import { Breed } from '../../../api/Pets/Breeds/Breed';
import { Gender } from '../../../api/Pets/Genders/Gender';

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

export default function OrderDetails(props) {
	const { history, loader, alert } = props;
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		number: '',
		petName: '',
		petSpecie: '',
		petBreed: '',
		petGender: '',
		petAge: '',
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

	const templates = useTracker(() => {
		Meteor.subscribe('allTemplates');
		return Template.find({}).fetch();
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
										id="petName"
										label="Nombre de la mascota"
										name="petName"
										value={ form.petName }
										onChange={ e => setForm({ ...form, petName: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Estatus</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ newStatus }
											onChange={ e => setNewStatus(e.target.value) }
											label="Estatus"
										>
											<MenuItem key={ 1 } value="open">Abierto</MenuItem>
											<MenuItem key={ 2 } value="awaitingSample">En espera de muestra</MenuItem>
											<MenuItem key={ 3 } value="process">En proceso</MenuItem>
											<MenuItem key={ 4 } value="awaitingResults">En espera de
												resultados</MenuItem>
											<MenuItem key={ 5 } value="attended">Atendido</MenuItem>
										</Select>
									</FormControl>
								</Grid>
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

								{ form.status === 'open' && (
									<Grid item xs={ 12 }>
										<Autocomplete
											multiple
											id="tags-standard"
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