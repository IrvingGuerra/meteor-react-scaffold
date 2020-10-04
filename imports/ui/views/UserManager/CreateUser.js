import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Card, Fab, CardHeader, CardContent } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5)
	},
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function CreateUser(props) {
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
		Meteor.call('user.save', { user: form }, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
			return;
		});
	};
	return (
		<Grid item xs={ 8 }>
			<Card className={ classes.card } elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.goBack();
						} }>
							<ArrowBackIcon />
						</Fab>
					}
					title="Crear Usuario"
				/>
				<CardContent>
					<form onSubmit={ handleSubmitForm }>
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
									inputProps={ {
										autoComplete: 'new-password',
										form: {
											autoComplete: 'off'
										}
									} }
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
							Crear
						</Button>
					</form>
				</CardContent>
			</Card>
		</Grid>
	);
}