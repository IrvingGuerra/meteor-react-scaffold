import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
	Card,
	CardHeader,
	CardContent,
	Fab
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import useModal from '../../hooks/useModal';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5)
	},
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	}
}));

const ListUsers = (props) => {
	const classes = useStyles();
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);

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
		<>
			<Card className={ classes.card } elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.push(props.history.location.pathname + 'Create');
						} }>
							<AddIcon/>
						</Fab>
					}
					title="Usuarios Registrados"
				/>
				<CardContent>
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
													pathname: props.history.location.pathname + 'Edit',
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
				</CardContent>
			</Card>
			<ModalDialog modal={ modal } _handleAccept={ deleteUser }/>
		</>
	);
};

export default ListUsers;