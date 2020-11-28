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
import { forgotPassword } from '../../../redux/actions';

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
		backgroundImage: 'url(https://sis.labvetanaliza.com/img/backgroundLogin.png)',
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

export default function ForgotPassword(props) {
	const { history, alert } = props;
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const classes = useStyles();
	const [email, setEmail] = useState('');

	useEffect(() => {
		if (user && user.profile) {
			history.push(`/${ user.profile.profile }`);
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			forgotPassword(email, (response) => {
				if (!response) {
					alert.current.setAlert('Error', 'Verificar correo', 'error');
					return;
				}
				alert.current.setAlert('Éxito', 'Correo enviado! Por favor abra su correo electrónico y haga click en el link del mensaje enviado');
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
						Recuperar contraseña
					</Typography>
					<form className={ classes.form } onSubmit={ handleSubmit }>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="email"
							label="Email"
							type="email"
							value={ email }
							onChange={ e => setEmail(e.target.value) }
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={ classes.submit }
						>
							RECUPERAR
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
