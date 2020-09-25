import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../components/Utilities/Alerts/AlertMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPassword } from '../../../redux/actions';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	card: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function UserManager(props) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const classes = useStyles();
	const [isLogin, setIsLogin] = useState(true);
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
				setAlert('Error', error.reason, 'error');
				return;
			}
			setAlert('Éxito', response._message);
			return;
		});
	};
	return (
		<Grid item xs={ 6 }component={ Paper } elevation={ 6 } square>
			<div className={ classes.card }>
				<Typography gutterBottom component="h1" variant="h5">
					Crear Usuario
				</Typography>
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
			</div>
		</Grid>
	);
}