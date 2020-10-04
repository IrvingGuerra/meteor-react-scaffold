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
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPassword } from '../../../redux/actions';

export function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{ 'Copyright © ' }
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{ ' ' }
			{ new Date().getFullYear() }
			{ '.' }
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Login(props) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const classes = useStyles();
	const [isLogin, setIsLogin] = useState(true);
	const [form, setForm] = useState({
		_id: null,
		email: '',
		password: ''
	});

	const [formSignUp, setFormSignUp] = useState({
		_id: null,
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		profile: 'client'
	});

	useEffect(() => {
		if (user && user.profile) {
			props.history.push(`/${ user.profile.profile }`);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			loginWithPassword(form.email, form.password, (response) => {
				if (!response) {
					props.alert.current.setAlert('Error', 'Credenciales incorrectas', 'error');
					return;
				}
				props.history.push(`/${ response }`);
			})
		);
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		Meteor.call('user.save', { user: formSignUp }, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
		});
	};
	return (
		<Grid container component="main" className={ classes.root }>
			<CssBaseline/>
			<Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }/>
			<Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
				{ isLogin ? (
					<div className={ classes.paper }>
						<Avatar className={ classes.avatar }>
							<LockOutlinedIcon/>
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<form className={ classes.form } onSubmit={ handleSubmit }>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={ form.email }
								onChange={ e => setForm({ ...form, email: e.target.value }) }
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={ form.password }
								onChange={ e => setForm({ ...form, password: e.target.value }) }
							/>
							<FormControlLabel
								control={ <Checkbox value="remember" color="primary"/> }
								label="Recuardame"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={ classes.submit }
							>
								INICIAR SESIÓN
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										¿Olvidaste tu contraseña?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2" onClick={ () => setIsLogin(false) }>
										{ '¿No tienes una cuenta? Registrate' }
									</Link>
								</Grid>
							</Grid>
							<Box mt={ 5 }>
								<Copyright/>
							</Box>
						</form>
					</div>
				) : (
					<div className={ classes.paper }>
						<Avatar className={ classes.avatar }>
							<LockOutlinedIcon/>
						</Avatar>
						<Typography component="h1" variant="h5">
							Registro
						</Typography>
						<form className={ classes.form } onSubmit={ handleSubmitRegister }>
							<Grid container spacing={ 2 }>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="firstname"
										label="Nombre"
										name="firstname"
										value={ formSignUp.firstname }
										onChange={ e => setFormSignUp({ ...formSignUp, firstname: e.target.value }) }
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
										value={ formSignUp.lastname }
										onChange={ e => setFormSignUp({ ...formSignUp, lastname: e.target.value }) }
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
										value={ formSignUp.username }
										onChange={ e => setFormSignUp({ ...formSignUp, username: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										value={ formSignUp.email }
										onChange={ e => setFormSignUp({ ...formSignUp, email: e.target.value }) }
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
										autoComplete="current-password"
										value={ formSignUp.password }
										onChange={ e => setFormSignUp({ ...formSignUp, password: e.target.value }) }
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
								REGISTRARSE
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<Link href="#" variant="body2" onClick={ () => setIsLogin(true) }>
										¿Ya tienes una cuenta? Inicia sesión
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				) }
			</Grid>
		</Grid>
	);
}