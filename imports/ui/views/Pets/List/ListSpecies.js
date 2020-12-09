import {
	Box,
	Grid,
	Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useTracker } from 'meteor/react-meteor-data';
import { Specie } from '../../../../api/Pets/Species/Specie';
import useModal from '../../../hooks/useModal';
import { ModalDialog } from '../../../components/Utilities/Modals/ModalDialog';
import BootstrapTooltip from '../../../components/Tooltips/BootstrapTooltip';
import { CustomTable } from '../../../components/Tables/CustomTable';

export default function ListSpecies(props) {
	const { history, loader, alert } = props;
	const [idDelete, setIdDelete] = useState(null);
	const modal = useModal();

	const species = useTracker(() => {
		Meteor.subscribe('species');
		return Specie.find({}).fetch();
	}, []);

	const speciesHeaders = ['Nombre'];

	const deleteSpecie = () => {
		loader.current.setLoader(true);
		Meteor.call('specie.delete', idDelete, (error, response) => {
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
		const specie = species.filter(e => e._id === id)[0];
		modal.setModal('Eliminar Especie', '¿Esta seguro de eliminar la especie ' + specie.name + '?');
	};

	return (
		<Grid container direction="column">
			<Grid item xs={ 12 }>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="primary" component="span">
							<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
								ESPECIES REGISTRADAS
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<BootstrapTooltip title="Agregar nueva especie">
							<IconButton onClick={ () => {
								history.push('/' + history.location.pathname.split('/')[1] + '/createSpecie');
							} }>
								<AddCircleIcon fontSize="large" color="primary"/>
							</IconButton>
						</BootstrapTooltip>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<CustomTable
					headers={ speciesHeaders }
					data={ species }
					options={
						{
							edit: true,
							remove: true,
							view: false
						}
					}
					handleEdit={ (idSpecie) => {
						history.push({
							pathname: '/' + history.location.pathname.split('/')[1] + '/editSpecie',
							state: { idSpecie }
						});
					} }
					handleRemove={ (idSpecie) => {
						confirmDelete(idSpecie);
					} }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteSpecie }/>
		</Grid>
	);
}
