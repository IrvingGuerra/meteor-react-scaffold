import {
	Box,
	Grid,
	Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useTracker } from 'meteor/react-meteor-data';
import useModal from '../../../hooks/useModal';
import { ModalDialog } from '../../../components/Utilities/Modals/ModalDialog';
import BootstrapTooltip from '../../../components/Tooltips/BootstrapTooltip';
import { Breed } from '../../../../api/Pets/Breeds/Breed';
import { CustomTable } from '../../../components/Tables/CustomTable';
import { Specie } from '../../../../api/Pets/Species/Specie';

export default function ListBreeds(props) {
	const { history, loader, alert } = props;
	const [idDelete, setIdDelete] = useState(null);
	const modal = useModal();

	const breeds = useTracker(() => {
		Meteor.subscribe('breeds');
		const breeds = Breed.find({}).fetch();
		breeds.map((breed) => {
			breed.specieName = breed.specie.name;
			delete breed.specie;
		})
		return breeds;
	}, []);

	const breedsHeaders = ['Nombre', 'Especie'];

	const deleteBreed = () => {
		loader.current.setLoader(true);
		Meteor.call('breed.delete', idDelete, (error, response) => {
			loader.current.setLoader(false);
			if (error) {
				alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			modal.toggle();
			alert.current.setAlert('Éxito', response._message);
		});
	};

	const confirmDelete = (id) => {
		setIdDelete(id);
		const breed = breeds.filter(e => e._id === id)[0];
		modal.setModal('Eliminar Raza', '¿Esta seguro de eliminar la raza ' + breed.name + '?');
	};

	return (
		<Grid container direction="column">
			<Grid item xs={ 12 }>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="primary" component="span">
							<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
								RAZAS REGISTRADAS
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<BootstrapTooltip title="Agregar nueva raza">
							<IconButton onClick={ () => {
								history.push('/' + history.location.pathname.split('/')[1] + '/createBreed');
							} }>
								<AddCircleIcon fontSize="large" color="primary"/>
							</IconButton>
						</BootstrapTooltip>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<CustomTable
					headers={ breedsHeaders }
					data={ breeds }
					options={
						{
							edit: true,
							remove: true,
							view: false
						}
					}
					handleEdit={ (idBreed) => {
						history.push({
							pathname: '/' + history.location.pathname.split('/')[1] + '/editBreed',
							state: { idBreed }
						});
					} }
					handleRemove={ (idBreed) => {
						confirmDelete(idBreed);
					} }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteBreed }/>
		</Grid>
	);
}
