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
	Tooltip,
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

export default function TableSpecies() {
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

	const species = useTracker(() => {
		Meteor.subscribe('species');
		return Specie.find({}).fetch();
	}, []);

	const deleteSpecie = () => {
		Meteor.call('specie.delete', idDelete, (error, response) => {
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
		const specie = species.filter(e => e._id === idUser)[0];
		modal.setModal('Eliminar Especie', '¿Esta seguro de eliminar la especie ' + specie.name + '?');
	};

	return (
		<Grid container direction="column">
			<Grid item xs={ 12 }>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item>
						<Typography color="primary">
							<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
								ESPECIES REGISTRADAS
							</Box>
						</Typography>
					</Grid>
					<Grid item>
						<Tooltip placement="top" title="Agregar especie">
							<IconButton>
								<AddCircleIcon fontSize="large" color="primary"/>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={ 12 }>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell align="center"><i className={ 'fa fa-cog' }/></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ species.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((specie) => (
								<TableRow key={ specie.id }>
									<TableCell>{ specie.name }</TableCell>
									<TableCell>
										<IconButton onClick={ () => {
											props.history.push({
												pathname: '/' + props.history.location.pathname.split('/')[1] + '/editSpecie',
												state: { specie }
											});
										} }>
											<EditIcon color="primary"/>
										</IconButton>
										<IconButton aria-label="delete"
										            onClick={ () => confirmDelete(specie._id) }>
											<DeleteIcon color="secondary"/>
										</IconButton>
									</TableCell>
								</TableRow>
							)) }
							{ species.length === 0 && (
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
					count={ species.length }
					rowsPerPage={ rowsPerPage }
					page={ page }
					onChangePage={ handleChangePage }
					onChangeRowsPerPage={ handleChangeRowsPerPage }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteSpecie }/>
		</Grid>
	);
}