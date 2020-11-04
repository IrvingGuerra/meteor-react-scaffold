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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useModal from '../../../hooks/useModal';
import { ModalDialog } from '../../../components/Utilities/Modals/ModalDialog';
import BootstrapTooltip from '../../../components/Tooltips/BootstrapTooltip';
import { Gender } from '../../../../api/Pets/Genders/Gender';

export default function ListGenders(props) {
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

	const genders = useTracker(() => {
		Meteor.subscribe('genders');
		return Gender.find({}).fetch();
	}, []);

	const deleteGender = () => {
		Meteor.call('gender.delete', idDelete, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			modal.toggle();
			props.alert.current.setAlert('Éxito', response._message);
		});
	};

	const confirmDelete = (idGender) => {
		setIdDelete(idGender);
		const gender = genders.filter(e => e._id === idGender)[0];
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
								props.history.push('/' + props.history.location.pathname.split('/')[1] + '/createGender');
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
								<TableCell align="center"><i className={ 'fa fa-cog' }/></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ genders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((gender) => (
								<TableRow key={ gender._id }>
									<TableCell align="center">{ gender.name }</TableCell>
									<TableCell align="center">
										<IconButton onClick={ () => {
											props.history.push({
												pathname: '/' + props.history.location.pathname.split('/')[1] + '/editGender',
												state: { gender }
											});
										} }>
											<EditIcon color="primary"/>
										</IconButton>
										<IconButton aria-label="delete"
										            onClick={ () => confirmDelete(gender._id) }>
											<DeleteIcon color="secondary"/>
										</IconButton>
									</TableCell>
								</TableRow>
							)) }
							{ genders.length === 0 && (
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
					count={ genders.length }
					rowsPerPage={ rowsPerPage }
					page={ page }
					onChangePage={ handleChangePage }
					onChangeRowsPerPage={ handleChangeRowsPerPage }
				/>
			</Grid>
			<ModalDialog modal={ modal } _handleAccept={ deleteGender }/>
		</Grid>
	);
}