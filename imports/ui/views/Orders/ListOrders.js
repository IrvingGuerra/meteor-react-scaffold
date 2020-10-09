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

export default function ListOrders(props) {
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
					title="Ordenes"
				/>
				<CardContent>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Numero de orden</TableCell>
									<TableCell>Estatus</TableCell>
									<TableCell align="right">Opciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ orders.map((order) => (
									<TableRow key={ order._id }>
										<TableCell component="th" scope="row">
											{ order.number }
										</TableCell>
										<TableCell component="th" scope="row">
											{ order.status }
										</TableCell>
										<TableCell align="right">
											<IconButton onClick={ () => {
												props.history.push({
													pathname: '/' + props.history.location.pathname.split('/')[1] + '/orderDetails',
													state: { idOrder: order._id }
												});
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