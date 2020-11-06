import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Typography,
	Box,
	Container, InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { useTracker } from 'react-meteor-hooks';
import { Specie } from '../../../api/Pets/Species/Specie';
import { Breed } from '../../../api/Pets/Breeds/Breed';
import { Gender } from '../../../api/Pets/Genders/Gender';
import Biochemistry from '../../components/RequestOrder/Biochemistry';
import Analytes from '../../components/RequestOrder/Analytes';
import Hemostasis from '../../components/RequestOrder/Hemostasis';
import NonConventional from '../../components/RequestOrder/NonConventional';
import UrinaryTract from '../../components/RequestOrder/UrinaryTract';
import Cytology from '../../components/RequestOrder/Cytology';

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

export default function RequestOrder(props) {
	const { history, loader, alert } = props;
	const classes = useStyles();
	const [form, setForm] = useState({
		_id: null,
		petName: '',
		petSpecie: '',
		petBreed: '',
		petGender: '',
		petAge: ''
	});

	const [biochemistry, setBiochemistry] = useState({
		BasicProfile: false,
		HepaticProfile: false,
		HepaticProfileValue: '',
		RenalProfile: false,
		DiabeticProfile: false,
		DiabeticProfileValue: '',
		PresurgicalProfile: false,
		DermatologicalProfile: false,
		PancreaticProfile: false,
		ConvulsionsProfile: false,
		ConvulsionsProfileValue: '',
		FullProfile: false,
		Other: false,
		OtherValue: '',
		BasicProfileBig: false,
		HepaticProfileBig: false,
		RenalProfileBig: false,
		NeonatalProfile: false,
		FullProfileBig: false,
		OtherBig: false,
		OtherValueBig: ''
	})

	const [analytes, setAnalytes] = useState({
		RoutineAnalyte: false,
		RoutineAnalyteValue: '',
		FAIE: false,
		Acid: false,
		Ammonia: false,
		GLDH: false,
		Lipase: false,
		Electrolyte: false
	})

	const [hemostasis, setHemostasis] = useState({
		Count: false,
		Factor: false,
		ProfileCID: false,
		ProfileFull: false,
		Time: false,
		TTP: false,
		TP: false,
		Reactions: false,
		ReactionsValue: '',
		BleedingTime: false,
		Other: false,
		OtherValue: ''
	})

	const [nonConventional, setNonConventional] = useState({
		BloodCount: false,
		BasicProfile: false,
		FullProfile: false
	})

	const [urinaryTract, setUrinaryTract] = useState({
		MethodValue: false,
		Analysis: false,
		Cytology: false,
		Protein: false,
		Cortisol: false,
		ProteinUrinalysis: false,
		Urinalysis: false,
		UrinalysisWith: false,
		UrineCulture: false,
		Other: false,
		OtherValue: ''
	})

	const [cytology, setCytology] = useState({
		Liquid: false,
		LiquidValue: '',
		Tumors: false,
		SitesNumber: 0,
		ObtainingValue: '',
		PresentValue: '',
		PresentValueOther: '',
		PresentInValue: '',
		PresentInValueOther: '',
	})

	const [hematology, setHematology] = useState({
		value: false,
	})

	const [parasitology, setParasitology] = useState({
		value: false,
	})

	const [bacteriology, setBacteriology] = useState({
		value: false,
	})

	const [endocrinology, setEndocrinology] = useState({
		value: false,
	})

	const [complementary, setComplementary] = useState({
		value: false,
	})

	const [infectious, setInfectious] = useState({
		value: false,
	})

	const [toxicology, setToxicology] = useState({
		value: false,
	})

	const [histopathology, setHistopathology] = useState({
		value: false,
	})

	const handleSubmitForm = (e) => {
		e.preventDefault();
		loader.current.setLoader(true);
		form.biochemistry = biochemistry;
		Meteor.call('order.request', form, (error, response) => {
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

	/*
	useEffect(() => {
		if (props.location.state) {
			const user = props.location.state.user;
			setForm({
				_id: user._id
			});
		}
	}, []);

	 */

	const species = useTracker(() => {
		Meteor.subscribe('species');
		return Specie.find({}).fetch();
	}, []);

	const breeds = useTracker(() => {
		Meteor.subscribe('breeds');
		return Breed.find({}).fetch();
	}, []);

	const genders = useTracker(() => {
		Meteor.subscribe('genders');
		return Gender.find({}).fetch();
	}, []);

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="flex-start" alignItems="center">
							<Grid item>
								<IconButton onClick={ () => {
									history.goBack();
								} }>
									<ArrowBackIcon fontSize="large" color="primary"/>
								</IconButton>
							</Grid>
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										{ form._id ? 'VER ORDEN' : 'SOLICITAR ORDEN' }
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
										id="petName"
										label="Nombre de la mascota"
										name="petName"
										value={ form.petName }
										onChange={ e => setForm({ ...form, petName: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Especie</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petSpecie }
											onChange={ e => setForm({ ...form, petSpecie: e.target.value }) }
											label="Especie"
										>
											{ species.map((specie, i) => <MenuItem key={ i }
											                                       value={ specie._id }>{ specie.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Raza</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petBreed }
											onChange={ e => setForm({ ...form, petBreed: e.target.value }) }
											label="Raza"
										>
											{ breeds.map((breed, i) => <MenuItem key={ i }
											                                     value={ breed._id }>{ breed.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="demo-simple-select-outlined-label">Genero</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={ form.petGender }
											onChange={ e => setForm({ ...form, petGender: e.target.value }) }
											label="Genero"
										>
											{ genders.map((gender, i) => <MenuItem key={ i }
											                                       value={ gender._id }>{ gender.name }</MenuItem>) }
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={ 6 }>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="petAge"
										label="Edad"
										name="petAge"
										type="number"
										value={ form.petAge }
										onChange={ e => setForm({ ...form, petAge: e.target.value }) }
									/>
								</Grid>
								<Grid item xs={ 12 }>
									<Biochemistry
										data={biochemistry}
										setData={setBiochemistry}
									/>
									<Analytes
										data={analytes}
										setData={setAnalytes}
									/>
									<Hemostasis
										data={hemostasis}
										setData={setHemostasis}
									/>
									<NonConventional
										data={nonConventional}
										setData={setNonConventional}
									/>
									<UrinaryTract
										data={urinaryTract}
										setData={setUrinaryTract}
									/>
									<Cytology
										data={cytology}
										setData={setCytology}
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
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}