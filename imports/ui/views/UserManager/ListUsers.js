import React from 'react';
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
	CardHeader, CardContent
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5)
	},
	heading: {
		paddingLeft: theme.spacing(4)
	}
}));

const ListUsers = (props) => {
	const classes = useStyles();
	const user = useSelector(state => state.user);

	const users = useTracker(() => {
		Meteor.subscribe('users');
		return Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
	}, []);

	return (
		<Card className={ classes.card } elevation={ 6 }>
			<CardHeader
				className={ classes.heading }
				action={
					<IconButton aria-label="settings" onClick={() => {
						props.history.push(user.profile.profile+'/createUser');
					}}>
						<AddCircleIcon  style={{ color: 'green', fontSize: 55 }}/>
					</IconButton>
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
										<IconButton>
											<EditIcon/>
										</IconButton>
										<IconButton aria-label="delete">
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
	);
};

export default ListUsers;