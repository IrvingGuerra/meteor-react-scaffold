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
import Hematology from '../../components/RequestOrder/Hematology';
import Parasitology from '../../components/RequestOrder/Parasitology';
import Bacteriology from '../../components/RequestOrder/Bacteriology';
import Endocrinology from '../../components/RequestOrder/Endocrinology';
import Complementary from '../../components/RequestOrder/Complementary';
import Infectious from '../../components/RequestOrder/Infectious';
import Toxicology from '../../components/RequestOrder/Toxicology';
import Histopathology from '../../components/RequestOrder/Histopathology';

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
		Region: '',
		Size: '',
		Delimited: '',
		Edge: '',
		Consistency: '',
		Ulcerated: '',
		Pigmented: '',
		Increase: '',
		Alopecic: '',
		Movable: '',
		Painful: '',
		VaginalCytology: false,
		OticCytology: false,
		OticCytologyValue: '',
		Immunocytochemistry: false,
		Washed: false,
		WashedValue: '',
		Bone: false,
		BoneHemogram: false,
		Other: false,
		OtherValue: ''
	})

	const [hematology, setHematology] = useState({
		Antibodies: false,
		Cells: false,
		Factor: false,
		Hemoparasites: false,
		Other: false,
		OtherValue: '',
		Hemogram: false,
		HemogramValue: '',
		Profile: false,
		Reticulocytes: false,
		Test: false
	})

	const [parasitology, setParasitology] = useState({
		Baermann: false,
		Coprological: false,
		Faust: false,
		SerialFaust: false,
		Floatation: false,
		SerialFloatation: false,
		Hemoparasites: false,
		ID: false,
		Knott: false,
		McMaster: false,
		Scraped: false,
		Blood: false,
		Sedimentation: false,
		Sieving: false,
		Graham: false,
		Kinyoun: false,
		Other: false,
		OtherValue: ''
	})

	const [bacteriology, setBacteriology] = useState({
		Brucella: false,
		Microbiological: false,
		MicrobiologicalValue: '',
		Brucellosis: false,
		Bacteriological: false,
		BacteriologicalGeneral: false,
		SensidiscoAdd: false,
		Sensidisco: false,
		BloodCultureGeneral: false,
		BloodCulture: false,
		MycologicalGeneral: false,
		MycologicalAnd: false,
		KOH: false,
		KOHPlus: false,
		Other: false,
		OtherValue: ''
	})

	const [endocrinology, setEndocrinology] = useState({
		ACTH: false,
		Cortisol: false,
		Cortisol2: false,
		Cortisol3: false,
		Erythropoietin: false,
		Estradiol: false,
		Estrogens: false,
		Fructosamine: false,
		Hemoglobin: false,
		Insulin: false,
		Parathormone: false,
		Profile: false,
		ProfileCan: false,
		ProfileFel: false,
		Progesterona: false,
		Prolactina: false,
		Relaxina: false,
		T4: false,
		Testosterona: false,
		Tirotropina: false,
		Tiroxina: false,
		Triyodotironina: false,
		Other: false,
		OtherValue: ''
	})

	const [complementary, setComplementary] = useState({
		AcidOne: false,
		Acid: false,
		LDL: false,
		Iron: false,
		SDMA: false,
		Electroforesis: false,
		Tricograma: false,
		Lipasa: false,
		Pancreas: false,
		Protein: false,
		Trypsin: false,
		Other: false,
		OtherValue: ''
	})

	const [infectious, setInfectious] = useState({
		AutoVaccine: false,
		Antibodies: false,
		ELISA: false,
		Coronavirus: false,
		Dirofilariosis: false,
		Distemper: false,
		DistemperValue: '',
		Ehrlichia: false,
		Ehrlichiosis: false,
		EhrlichiosisValue: '',
		Chagas: false,
		Giardiasis: false,
		Leishmania: false,
		Leptospirosis: false,
		LeptospirosisValue: '',
		Leucemia: false,
		LeucemiaValue: '',
		LeucemiaELISA: false,
		Panleucopenia: false,
		Rage: false,
		IgG: false,
		IgM: false,
		Triple: false,
		TripleResp: false,
		Hepatitis: false,
		Micoplasmosis: false,
		Parvovirus: false,
		ParvovirusValue: '',
		PIF: false,
		Other: false,
		OtherValue: ''
	})

	const [toxicology, setToxicology] = useState({
		Bromuro: false,
		Clembuterol: false,
		Dicumarina: false,
		Digoxina: false,
		Estricnina: false,
		Etilenglicol: false,
		Fenobarbital: false,
		Organofosforado: false,
		Organoclorado: false,
		Blood: false,
		Warfarina: false,
		Other: false,
		OtherValue: ''
	})

	const [histopathology, setHistopathology] = useState({
		Biopsias: false,
		Number: 0,
		FormolValue: '',
		PresentValue: '',
		PresentValueOther: '',
		PresentInValue: '',
		PresentInValueOther: '',
		RegionValue: '',
		Size: '',
		Delimited: '',
		Edge: '',
		Consistency: '',
		Ulcerated: '',
		Pigmented: '',
		Increase: '',
		Alopecic: '',
		Movable: '',
		Painful: '',
		Inmunohistoquímica: false
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
									<Hematology
										data={hematology}
										setData={setHematology}
									/>
									<Parasitology
										data={parasitology}
										setData={setParasitology}
									/>
									<Bacteriology
										data={bacteriology}
										setData={setBacteriology}
									/>
									<Endocrinology
										data={endocrinology}
										setData={setEndocrinology}
									/>
									<Complementary
										data={complementary}
										setData={setComplementary}
									/>
									<Infectious
										data={infectious}
										setData={setInfectious}
									/>
									<Toxicology
										data={toxicology}
										setData={setToxicology}
									/>
									<Histopathology
										data={histopathology}
										setData={setHistopathology}
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