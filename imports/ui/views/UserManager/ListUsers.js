import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	IconButton,
	Grid,
	Typography,
	Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';
import { useTracker } from 'react-meteor-hooks';
import useModal from '../../hooks/useModal';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	}
}));

const ListUsers = (props) => {
	const classes = useStyles();
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Grid item>
								<Typography color="primary">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										USUARIOS REGISTRADOS
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<BootstrapTooltip title="Agregar nuevo usuario">
									<IconButton onClick={ () => {
										props.history.push('/' + props.history.location.pathname.split('/')[1] + '/createUser');
									} }>
										<AddCircleIcon fontSize="large" color="primary"/>
									</IconButton>
								</BootstrapTooltip>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 }>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Nombre de usuario</TableCell>
										<TableCell>Correo eléctronico</TableCell>
										<TableCell>Perfil</TableCell>
										<TableCell align="center"><i className={ 'fa fa-cog' }/></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{ users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
										<TableRow key={ user._id }>
											<TableCell component="th" scope="row">
												{ user.profile.username }
											</TableCell>
											<TableCell>{ user.emails[0].address }</TableCell>
											<TableCell>{ user.profile.profile }</TableCell>
											<TableCell align="center">
												<IconButton onClick={ () => {
													props.history.push({
														pathname: '/' + props.history.location.pathname.split('/')[1] + '/editUser',
														state: { user }
													});
												} }>
													<EditIcon color="primary"/>
												</IconButton>
												<IconButton aria-label="delete"
												            onClick={ () => confirmDelete(user._id) }>
													<DeleteIcon color="secondary"/>
												</IconButton>
											</TableCell>
										</TableRow>
									)) }
									{ users.length === 0 && (
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
							count={ users.length }
							rowsPerPage={ rowsPerPage }
							page={ page }
							onChangePage={ handleChangePage }
							onChangeRowsPerPage={ handleChangeRowsPerPage }
						/>
					</Grid>
				</Grid>
			</Paper>
			<ModalDialog modal={ modal } _handleAccept={ deleteUser }/>
		</Container>
	);
};

export default ListUsers;