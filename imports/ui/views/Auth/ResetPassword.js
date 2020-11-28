import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/actions';
import { useParams } from 'react-router-dom';

export function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{ 'Copyright © ' }
			<Link color="inherit" href="https://sis.labvetanaliza.com/">
				LabvetAnaliza
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
		backgroundImage: 'url(/img/backgroundLogin.png)',
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

export default function ResetPassword(props) {
	const { history, alert } = props;
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const classes = useStyles();
	const { token } = useParams();
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	useEffect(() => {
		if (user && user.profile) {
			history.push(`/${ user.profile.profile }`);
		}
	}, []);

	const validatePasswords = () => {
		if (password === '' || repeatPassword === '') {
			alert.current.setAlert('Error', 'Las contraseñas no pueden estar vacias', 'error');
			return false;
		}
		if (password !== repeatPassword) {
			alert.current.setAlert('Error', 'Las contraseñas no coinciden', 'error');
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validatePasswords()) {
			return;
		}
		dispatch(
			resetPassword(token, password, (response) => {
				if (!response) {
					alert.current.setAlert('Error', 'Ocurrio un error al restablecer la contraseña', 'error');
					return;
				}
				alert.current.setAlert('Éxito', 'Contraseña restablecida exitosamente');
				setTimeout(() => {
					history.push('/');
				}, 1000);
			})
		);
	};

	return (
		<Grid container component="main" className={ classes.root }>
			<CssBaseline/>
			<Grid item xs={ false } sm={ 4 } md={ 7 } className={ classes.image }/>
			<Grid item xs={ 12 } sm={ 8 } md={ 5 } component={ Paper } elevation={ 6 } square>
				<div className={ classes.paper }>
					<Avatar className={ classes.avatar }>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Restablecer contraseña
					</Typography>
					<form className={ classes.form } onSubmit={ handleSubmit }>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							value={ password }
							onChange={ e => setPassword(e.target.value) }
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="repeatPassword"
							label="Repetir contraseña"
							type="password"
							value={ repeatPassword }
							onChange={ e => setRepeatPassword(e.target.value) }
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={ classes.submit }
						>
							RESTABLECER CONTRASEÑA
						</Button>
						<Box mt={ 5 }>
							<Copyright/>
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
