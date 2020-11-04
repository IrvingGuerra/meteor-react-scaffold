import {
	Box,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useTracker } from 'react-meteor-hooks';
import { Specie } from '../../../api/Pets/Species/Specie';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useModal from '../../hooks/useModal';
import { ModalDialog } from '../Utilities/Modals/ModalDialog';
import BootstrapTooltip from '../Tooltips/BootstrapTooltip';
import { Breed } from '../../../api/Pets/Breeds/Breed';

export default function TableBreeds(props) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [idDelete, setIdDelete] = useState(null);
	const modal = useModal();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const breeds = useTracker(() => {
		Meteor.subscribe('breeds');
		return Breed.find({}).fetch();
	}, []);

	const deleteBreed = () => {
		Meteor.call('breed.delete', idDelete, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			modal.toggle();
			props.alert.current.setAlert('Éxito', response._message);
		});
	};

	const confirmDelete = (idUser) => {
		setIdDelete(idUser);
		const breed = breeds.filter(e => e._id === idUser)[0];
		modal.setModal('Eliminar Raza', '¿Esta seguro de eliminar la raza ' + specie.name + '?');
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
								props.history.push('/' + props.history.location.pathname.split('/')[1] + '/createBreed');
							} }>
								<AddCircleIcon fontSize="large" color="primary"/>
							</IconButton>
						</BootstrapTooltip>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">Nombre</TableCell>
								<TableCell align="center">Especie</TableCell>
								<TableCell align="center"><i className={ 'fa fa-cog' }/></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ breeds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((breed) => (
								<TableRow key={ breed._id }>
									<TableCell align="center">{ breed.name }</TableCell>
									<TableCell align="center">{ breed.breed.name }</TableCell>
									<TableCell align="center">
										<IconButton onClick={ () => {
											props.history.push({
												pathname: '/' + props.history.location.pathname.split('/')[1] + '/editBreed',
												state: { breed }
											});
										} }>
											<EditIcon color="primary"/>
										</IconButton>
										<IconButton aria-label="delete"
										            onClick={ () => confirmDelete(breed._id) }>
											<DeleteIcon color="secondary"/>
										</IconButton>
									</TableCell>
								</TableRow>
							)) }
							{ breeds.length === 0 && (
								<TableRow>
									<TableCell align="center" colSpan={ 10 }>
										No hay datos
									</TableCell>
								</TableRow>
							) }
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					labelRowsPerPage={ 'Filas por página' }
					rowsPerPageOptions={ [5, 10, 25, 100] }
					component="div"
					count={ breeds.length }
					rowsPerPage={ rowsPerPage }
					page={ page }
					onChangePage={ handleChangePage }
					onChangeRowsPerPage={ handleChangeRowsPerPage }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteBreed }/>
		</Grid>
	);
}