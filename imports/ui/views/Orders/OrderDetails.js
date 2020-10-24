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
import Autocomplete from '@material-ui/lab/Autocomplete';

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
			props.history.goBack();
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

							{ form.status === 'awaitingSample' && (
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
																props.history.push({
																	pathname: '/' + props.history.location.pathname.split('/')[1] + '/editTemplate',
																	state: {
																		template: analysis,
																		canEdit: false,
																		orderId: form._id
																	}
																});
															} }>
																<NavigateNextIcon/>
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