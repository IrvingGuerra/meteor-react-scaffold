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
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Order } from '../../../api/Orders/Order';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5),
		minWidth: 500
	},
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	}
}));

export default function MyOrders(props) {
	const classes = useStyles();

	const orders = useTracker(() => {
		Meteor.subscribe('orders');
		return Order.find({}).fetch();
	}, []);

	return (
		<>
			<Card className={ classes.card } elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.push('/' + props.history.location.pathname.split('/')[1] + '/requestOrder');
						} }>
							<AddIcon/>
						</Fab>
					}
					title="Mis ordenes"
				/>
				<CardContent>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Numero de orden</TableCell>
									<TableCell align="right">Opciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ orders.map((order) => (
									<TableRow key={ order._id }>
										<TableCell component="th" scope="row">
											{ order.number }
										</TableCell>
										<TableCell align="right">
											<IconButton onClick={ () => {
											} }>
												<VisibilityIcon/>
											</IconButton>
										</TableCell>
									</TableRow>
								)) }
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
		</>
	);
};