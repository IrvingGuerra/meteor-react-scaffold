import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Card,
	Fab,
	CardHeader,
	CardContent,
	Typography,
	Input,
	Chip,
	Checkbox,
	ListItemText, List, ListItem, ListItemSecondaryAction
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTracker } from 'react-meteor-hooks';
import { Template } from '../../../api/Templates/Template';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5)
	},
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	}
}));

export default function OrderDetails(props) {
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		number: '',
		petName: '',
		petSpecies: '',
		petBreed: '',
		petGender: '',
		petAge: '',
		status: '',
		analyses: []
	});
	const [analyses, setanalyses] = useState([]);

	const templates = useTracker(() => {
		Meteor.subscribe('templates');
		return Template.find({}).fetch();
	}, []);

	const handleSubmitForm = (e) => {
		e.preventDefault();
		Meteor.call('order.update', { order: form, status: 'awaitingSample' }, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
		});
	};

	useEffect(() => {
		if (props.location.state) {
			Meteor.call('order.get', props.location.state.idOrder, (error, response) => {
				if (error) {
					props.alert.current.setAlert('Error', error.reason, 'error');
					return;
				}
				setForm(response._data);
				props.alert.current.setAlert('Éxito', response._message);
			});
		}
	}, []);

	return (
		<Grid item xs={ 8 }>
			<Card className={ classes.card } elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.goBack();
						} }>
							<ArrowBackIcon/>
						</Fab>
					}
					title="Detalles de la orden"
				/>
				<CardContent>
					<form onSubmit={ handleSubmitForm }>
						<Grid container spacing={ 2 }>
							<Grid item xs={ 12 }>
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
								<TextField
									variant="outlined"
									required
									fullWidth
									id="petSpecies"
									label="Especie"
									name="petSpecies"
									value={ form.petSpecies }
									onChange={ e => setForm({ ...form, petSpecies: e.target.value }) }
								/>
							</Grid>
							<Grid item xs={ 6 }>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="petBreed"
									label="Raza"
									name="petBreed"
									value={ form.petBreed }
									onChange={ e => setForm({ ...form, petBreed: e.target.value }) }
								/>
							</Grid>
							<Grid item xs={ 6 }>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="petGender"
									label="Género"
									name="petGender"
									value={ form.petGender }
									onChange={ e => setForm({ ...form, petGender: e.target.value }) }
								/>
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
							{form.status === 'open' && (
								<Grid item xs={ 12 }>
									<FormControl className={ classes.formControl }>
										<InputLabel id="demo-mutiple-chip-label">Asigna los analisis</InputLabel>
										<Select
											labelId="demo-mutiple-chip-label"
											id="demo-mutiple-chip"
											multiple
											value={ analyses }
											onChange={ e => {
												setanalyses(e.target.value);
												setForm({ ...form, analyses: e.target.value });
											} }
											input={ <Input id="select-multiple-chip"/> }
											renderValue={ (selected) => (
												<div className={ classes.chips }>
													{ selected.map((value) => {
														const template = templates.find(t => t._id === value._id);
														return (
															<Chip key={ value._id } label={ template.title }
															      className={ classes.chip }/>
														);
													}) }
												</div>
											) }
										>
											{ templates.map((template) => (
												<MenuItem key={ template._id } value={ template }>
													<Checkbox checked={ analyses.indexOf(template) > -1 }/>
													<ListItemText primary={ template.title }/>
												</MenuItem>
											)) }
										</Select>
									</FormControl>
								</Grid>
							)}

							{form.status === 'awaitingSample' && (
								<Grid item xs={ 12 }>
									<List dense={true}>
										{form.analyses.map((analysis) => {
											if (templates.length > 0){
												return(
													<ListItem key={analysis._id}>
														<ListItemText
															primary={analysis.title}
														/>
														<ListItemSecondaryAction>
															<IconButton onClick={ () => {
																props.history.push({
																	pathname: '/' + props.history.location.pathname.split('/')[1] + '/editTemplate',
																	state: {
																		template: analysis,
																		canEdit: false,
																		orderId: form._id
																	}
																});
															} }>
																<NavigateNextIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												)
											}
										})}
									</List>
								</Grid>
							)}

						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={ classes.submit }
						>
							{ form._id ? 'Actualizar' : 'Solicitar' }
						</Button>
					</form>
				</CardContent>
			</Card>
		</Grid>
	);
}