import {
	Box,
	Grid,
	Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useTracker } from 'react-meteor-hooks';
import useModal from '../../../hooks/useModal';
import { ModalDialog } from '../../../components/Utilities/Modals/ModalDialog';
import BootstrapTooltip from '../../../components/Tooltips/BootstrapTooltip';
import { Gender } from '../../../../api/Pets/Genders/Gender';
import { CustomTable } from '../../../components/Tables/CustomTable';

export default function ListGenders(props) {
	const { history, loader, alert } = props;
	const [idDelete, setIdDelete] = useState(null);
	const modal = useModal();

	const genders = useTracker(() => {
		Meteor.subscribe('genders');
		return Gender.find({}).fetch();
	}, []);

	const gendersHeaders = ['Nombre'];

	const deleteGender = () => {
		loader.current.setLoader(true);
		Meteor.call('gender.delete', idDelete, (error, response) => {
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
		const gender = genders.filter(e => e._id === id)[0];
		modal.setModal('Eliminar Genero', '¿Esta seguro de eliminar el genero ' + gender.name + '?');
	};

	return (
		<Grid container direction="column">
			<Grid item xs={ 12 }>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="primary" component="span">
							<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
								GENEROS REGISTRADOS
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<BootstrapTooltip title="Agregar un nuevo genero">
							<IconButton onClick={ () => {
								history.push('/' + history.location.pathname.split('/')[1] + '/createGender');
							} }>
								<AddCircleIcon fontSize="large" color="primary"/>
							</IconButton>
						</BootstrapTooltip>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<CustomTable
					headers={ gendersHeaders }
					data={ genders }
					options={
						{
							edit: true,
							remove: true,
							view: false
						}
					}
					handleEdit={ (idGender) => {
						history.push({
							pathname: '/' + history.location.pathname.split('/')[1] + '/editGender',
							state: { idGender }
						});
					} }
					handleRemove={ (idGender) => {
						confirmDelete(idGender);
					} }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteGender }/>
		</Grid>
	);
}