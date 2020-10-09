import React, { useEffect, useState } from 'react';
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

export default function RequestOrder(props) {
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		petName: '',
		petSpecies: '',
		petBreed: '',
		petGender: '',
		petAge: ''
	});
	const handleSubmitForm = (e) => {
		e.preventDefault();
		Meteor.call('order.request', form, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
		});
	};
	useEffect(() => {
		if (props.location.state) {
			const user = props.location.state.user;
			setForm({
				_id: user._id
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
					title="Solicitar orden"
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