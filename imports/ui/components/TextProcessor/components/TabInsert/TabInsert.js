import React from 'react';
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, ListSubheader } from '@material-ui/core';
import {
	addAutoValue,
	addColumns,
	addComparison,
	addImage,
	addInput,
	addText,
	addTitle
} from '../../js/insertFunctions';
import Divider from '@material-ui/core/Divider';
import { STRINGS } from '../../constants/strings';
import { BootstrapTooltip } from '../TabFont/TabFont';
import '../TabFont/TabFont.css';

const useStyles = makeStyles((theme) => ({
	section: {
		width: 'fit-content',
		minHeight: 80,
		border: `1px solid ${ theme.palette.divider }`,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
		marginRight: 5,
		'& svg': {
			margin: theme.spacing(1.5)
		},
		'& hr': {
			margin: theme.spacing(0, 0.5)
		}
	}
}));

export default function TabInsert(props) {
	const classes = useStyles();
	const { doc } = props;
	return (
		<Grid container alignItems="center" justify="center">
			<Grid container alignItems="center" className={ classes.section }>
				<BootstrapTooltip title={ STRINGS.insert.label }>
					<button type="button" className="noButton" onClick={ () => addText(doc) }>
						<i id='bold' className="fa fa-list ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.title }>
					<button type="button" className="noButton" onClick={ () => addTitle(doc) }>
						<i id='bold' className="fa fa-th-list ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.image }>
					<button type="button" className="noButton" onClick={ () => {
						document.getElementById('addImage').click();
					} }>
						<i id='image' className="fa fa-image ico"/>
					</button>
				</BootstrapTooltip>
				<input style={ { display: 'none' } } type="file" id="addImage" name="image"
				       onChange={ () => addImage(doc) }/>

				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.insert.col }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 1) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.cols2 }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 2) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.cols3 }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 3) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.cols4 }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 4) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.cols5 }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 5) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.cols6 }>
					<button type="button" className="noButton" onClick={ () => addColumns(doc, 6) }>
						<i id='cols' className="fa fa-columns ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<BootstrapTooltip title={ STRINGS.insert.input }>
					<button type="button" className="noButton" onClick={ () => addInput(doc) }>
						<i id='input' className="fa fa-keyboard ico"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.insert.comparison }>
					<button type="button" className="noButton" onClick={ () => addComparison(doc) }>
						<i id='comparison' className="fa fa-less-than-equal ico"/>
					</button>
				</BootstrapTooltip>
				<Divider orientation="vertical" flexItem/>
				<FormControl variant="outlined">
					<InputLabel id="demo-simple-select-outlined-label">#Tags</InputLabel>
					<Select
						style={ { width: 100 } }
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value=""
						label="#Tags"
						placeholder="#Tags"
						onChange={ (value) => addAutoValue(doc, value.target.value)}
					>
						<ListSubheader>Tags para plantillas</ListSubheader>
						<MenuItem value='NumeroOrden'>Número de orden</MenuItem>
						<MenuItem value='Propietario'>Propietario</MenuItem>
						<MenuItem value='MVZ'>MVZ</MenuItem>
						<MenuItem value='Clinica'>Clínica</MenuItem>
						<MenuItem value='NombreMascota'>Nombre de mascota</MenuItem>
						<MenuItem value='Especie'>Especie</MenuItem>
						<MenuItem value='Raza'>Raza</MenuItem>
						<MenuItem value='Genero'>Genero</MenuItem>
						<MenuItem value='Edad'>Edad</MenuItem>
						<MenuItem value='TipoMuestra'>Tipo de muestra</MenuItem>
						<MenuItem value='FechaMuestreo'>Fecha de muestreo</MenuItem>}
						<MenuItem value='HoraMuestreo'>Hora de muestreo</MenuItem>
						<ListSubheader>Tags extras</ListSubheader>
						<MenuItem value='EFG'>EFG</MenuItem>
						<MenuItem value='TX'>TX</MenuItem>
						<MenuItem value='Observacion1'>Observación 1</MenuItem>
						<MenuItem value='Observacion2'>Observación 1</MenuItem>
						<ListSubheader>Extras (Si/No)</ListSubheader>
						<MenuItem value='Bioquimica'>Bioquimica</MenuItem>
						<MenuItem value='AnalitosIndividuales'>Analitos Individuales</MenuItem>
						<MenuItem value='Hemostasia'>Hemostasia</MenuItem>
						<MenuItem value='AnimalesNoConvencionales'>Animales no Convencionales</MenuItem>
						<MenuItem value='EvaluacionVias'>Evaluación de vías urinarias</MenuItem>
						<MenuItem value='CitologiaClinica'>Citología clínica</MenuItem>
						<MenuItem value='HematologiaInmunohematologia'>Hematología e inmunohematología</MenuItem>
						<MenuItem value='Parasitologia'>Parasitología</MenuItem>
						<MenuItem value='BacteriologiaMicologia'>Bacteriología y micología</MenuItem>
						<MenuItem value='Endocrinologia'>Endocrinología</MenuItem>
						<MenuItem value='Complemenatrias'>Complemenatrias</MenuItem>
						<MenuItem value='EnfermedadesInfecciosas'>Enfermedades infecciosas</MenuItem>
						<MenuItem value='Toxicologia'>Toxicología</MenuItem>
						<MenuItem value='Histopatologia'>Histopatología</MenuItem>
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
}
