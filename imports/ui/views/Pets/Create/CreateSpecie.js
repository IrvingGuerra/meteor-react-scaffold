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

export default function CreateSpecie(props) {
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		name: '',
	});
	const handleSubmitForm = (e) => {
		e.preventDefault();
		props.loader.current.setLoader(true);
		Meteor.call('specie.save', form , (error, response) => {
			props.loader.current.setLoader(false);
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
	useEffect(() => {
		if (props.location.state) {
			props.loader.current.setLoader(true);
			Meteor.call('specie.get', props.location.state.idSpecie , (error, response) => {
				props.loader.current.setLoader(false);
				if (error) {
					props.alert.current.setAlert('Error', error.reason, 'error');
					return;
				}
				setForm({
					_id: response._data._id,
					name: response._data.name,
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
										{ form._id ? 'EDITAR ESPECIE' : 'CREAR ESPECIE' }
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