import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Container,
	IconButton,
	Grid,
	Typography,
	Paper
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';
import { useTracker } from 'react-meteor-hooks';
import useModal from '../../hooks/useModal';
import { CustomTable } from '../../components/Tables/CustomTable';

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
	const { history, loader, alert } = props;
	const classes = useStyles();
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);

	const users = useTracker(() => {
		Meteor.subscribe('users');
		const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
		users.map((user) => {
			user.username = user.profile.username;
			user.emailUser = user.emails[0].address;
			user.profileUser = user.profile.profile;
			delete user.emails;
			delete user.profile;
		})
		return users;
	}, []);

	const usersHeaders = ['Nombre de usuario', 'Correo eléctronico', 'Perfil'];

	const deleteUser = () => {
		loader.current.setLoader(true);
		Meteor.call('user.delete', idDelete, (error, response) => {
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
		const user = users.filter(usr => usr._id === id)[0];
		modal.setModal('Eliminar Usuario', '¿Esta seguro de eliminar el usuario ' + user.username + '?');
	};

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										USUARIOS REGISTRADOS
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<BootstrapTooltip title="Agregar nuevo usuario">
									<IconButton onClick={ () => {
										history.push('/' + history.location.pathname.split('/')[1] + '/createUser');
									} }>
										<AddCircleIcon fontSize="large" color="primary"/>
									</IconButton>
								</BootstrapTooltip>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 }>
						<CustomTable
							headers={ usersHeaders }
							data={ users }
							options={
								{
									edit: true,
									remove: true,
									view: false
								}
							}
							handleEdit={ (idUser) => {
								history.push({
									pathname: '/' + history.location.pathname.split('/')[1] + '/editUser',
									state: { idUser }
								});
							} }
							handleRemove={ (idUser) => {
								confirmDelete(idUser);
							} }
						/>
					</Grid>
				</Grid>
			</Paper>
			<ModalDialog modal={ modal } _handleAccept={ deleteUser }/>
		</Container>
	);
};

export default ListUsers;