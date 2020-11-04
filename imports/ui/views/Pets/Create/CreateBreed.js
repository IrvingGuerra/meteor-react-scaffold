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
	Paper,
	Container,
	Typography,
	Box,
	IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTracker } from 'react-meteor-hooks';
import { Specie } from '../../../../api/Pets/Species/Specie';

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

export default function CreateBreed(props) {
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		name: '',
		idSpecie: ''
	});
	const handleSubmitForm = (e) => {
		e.preventDefault();
		Meteor.call('breed.save', form, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
			setTimeout(() => {
				props.history.goBack();
			}, 1000);
		});
	};
	const species = useTracker(() => {
		Meteor.subscribe('species');
		return Specie.find({}).fetch();
	}, []);
	useEffect(() => {
		if (props.location.state) {
			const breed = props.location.state.breed;
			setForm({
				_id: breed._id,
				name: breed.name,
				idSpecie: breed.idSpecie
			});
		}
	}, []);
	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="flex-start" alignItems="center">
							<Grid item>
								<IconButton onClick={ () => {
									props.history.goBack();
								} }>
									<ArrowBackIcon fontSize="large" color="primary"/>
								</IconButton>
							</Grid>
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										{ form._id ? 'EDITAR RAZA' : 'CREAR RAZA' }
									</Box>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 }>
						<form className={ classes.form } onSubmit={ handleSubmitForm }>
							<Grid container spacing={ 2 }>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="name"
										label="Nombre"
										name="username"
										value={ form.name }
										onChange={ e => setForm({ ...form, name: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Especie</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.idSpecie }
											onChange={ e => setForm({ ...form, idSpecie: e.target.value }) }
											label="Especie"
										>
											{ species.map((specie, index) => {
												return (
													<MenuItem key={ index } value={ specie._id }>
														{ specie.name }
													</MenuItem>
												);
											}) }
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={ classes.submit }
							>
								{ form._id ? 'Actualizar' : 'Crear' }
							</Button>
						</form>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}