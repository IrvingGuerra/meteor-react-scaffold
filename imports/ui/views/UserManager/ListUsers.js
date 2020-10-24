import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	IconButton,
	Card,
	CardHeader,
	CardContent,
	Fab,
	Grid
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import useModal from '../../hooks/useModal';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	}
}));

const ListUsers = (props) => {
	const classes = useStyles();
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const users = useTracker(() => {
		Meteor.subscribe('users');
		return Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
	}, []);

	const deleteUser = () => {
		Meteor.call('user.delete', idDelete, (error, response) => {
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
		const user = users.filter(usr => usr._id === idUser)[0];
		modal.setModal('Eliminar Usuario', '¿Esta seguro de eliminar el usuario ' + user.profile.username + '?');
	};

	return (
		<Grid item lg={ 8 } md={ 10 } sm={ 12 }>
			<Card elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.push('/' + props.history.location.pathname.split('/')[1] + '/createUser');
						} }>
							<AddIcon/>
						</Fab>
					}
					title="Usuarios Registrados"
				/>
				<CardContent>
					<Grid container spacing={ 2 }>
						<Grid item xs={ 12 }>
							<TableContainer>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Nombre de usuario</TableCell>
											<TableCell>Correo eléctronico</TableCell>
											<TableCell>Perfil</TableCell>
											<TableCell>Configuracion</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{ users.map((user) => (
											<TableRow key={ user._id }>
												<TableCell component="th" scope="row">
													{ user.profile.username }
												</TableCell>
												<TableCell>{ user.emails[0].address }</TableCell>
												<TableCell>{ user.profile.profile }</TableCell>
												<TableCell>
													<IconButton onClick={ () => {
														props.history.push({
															pathname: '/' + props.history.location.pathname.split('/')[1] + '/editUser',
															state: { user }
														});
													} }>
														<EditIcon/>
													</IconButton>
													<IconButton aria-label="delete"
													            onClick={ () => confirmDelete(user._id) }>
														<DeleteIcon/>
													</IconButton>
												</TableCell>
											</TableRow>
										)) }
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={ [10, 25, 100] }
								component="div"
								count={ users.length }
								rowsPerPage={ rowsPerPage }
								page={ page }
								onChangePage={ handleChangePage }
								onChangeRowsPerPage={ handleChangeRowsPerPage }
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<ModalDialog modal={ modal } _handleAccept={ deleteUser }/>
		</Grid>
	);
};

export default ListUsers;