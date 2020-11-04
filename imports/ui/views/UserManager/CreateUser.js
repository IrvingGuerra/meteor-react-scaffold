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

export default function CreateUser(props) {
	const { history, loader, alert } = props;
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		profile: 'admin'
	});

	const handleSubmitForm = (e) => {
		e.preventDefault();
		loader.current.setLoader(true);
		Meteor.call('user.save', { user: form }, (error, response) => {
			loader.current.setLoader(false);
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
			Meteor.call('user.get', props.location.state.idUser , (error, response) => {
				loader.current.setLoader(false);
				if (error) {
					alert.current.setAlert('Error', error.reason, 'error');
					return;
				}
				setForm({
					_id: response._data._id,
					firstname: response._data.profile.firstname,
					lastname: response._data.profile.lastname,
					username: response._data.profile.username,
					email: response._data.emails[0].address,
					password: '',
					profile: response._data.profile.profile
				});
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
										{ form._id ? 'EDITAR USUARIO' : 'CREAR USUARIO' }
									</Box>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 }>
						<form className={ classes.form } onSubmit={ handleSubmitForm }>
							<Grid container spacing={ 2 }>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="firstname"
										label="Nombre"
										name="firstname"
										value={ form.firstname }
										onChange={ e => setForm({ ...form, firstname: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastname"
										label="Apellidos"
										name="lastname"
										value={ form.lastname }
										onChange={ e => setForm({ ...form, lastname: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="username"
										label="Nombre de usuario"
										name="username"
										value={ form.username }
										onChange={ e => setForm({ ...form, username: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Perfil</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.profile }
											onChange={ e => setForm({ ...form, profile: e.target.value }) }
											label="Perfil"
										>
											<MenuItem value='admin'>Admin</MenuItem>
											<MenuItem value='specialist'>Especialista</MenuItem>
											<MenuItem value='labworker'>Laboratorista</MenuItem>
											<MenuItem value='client'>Cliente</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										value={ form.email }
										onChange={ e => setForm({ ...form, email: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										value={ form.password }
										onChange={ e => setForm({ ...form, password: e.target.value }) }
									/>
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