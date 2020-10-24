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
	Fab, Grid
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Order } from '../../../api/Orders/Order';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Utilities from '../../../startup/both/Utilities';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	date: {
		marginLeft: theme.spacing(2)
	}
}));

export default function MyOrders(props) {
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate())
	});
	//Pagination
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const orders = useTracker(() => {
		Meteor.subscribe('orders' ,{
			startDate: filters.startDate,
			endDate: filters.endDate
		});
		return Order.find({}).fetch();
	}, []);

	return (
		<Grid item lg={ 8 } md={ 10 } sm={ 12 }>
			<Card elevation={ 6 }>
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
					<Grid container spacing={ 2 }>
						<Grid item xs={ 12 }>
							<MuiPickersUtilsProvider utils={ DateFnsUtils }>
								<DatePicker
									className={ classes.date }
									disableToolbar
									variant="inline"
									format="yyyy-MM-dd"
									margin="normal"
									id="Fecha de inicio"
									label="Fecha de inicio"
									value={ filters.startDate }
									onChange={ (date) => setFilters({ ...filters, startDate: new Date(date) }) }
								/>
								<DatePicker
									className={ classes.date }
									disableToolbar
									variant="inline"
									format="yyyy-MM-dd"
									margin="normal"
									id="Fecha de fin"
									label="Fecha de fin"
									value={ filters.endDate }
									onChange={ (date) => setFilters({ ...filters, endDate: new Date(date) }) }
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={ 12 }>
							<TableContainer>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Numero de orden</TableCell>
											<TableCell>Fecha</TableCell>
											<TableCell>Solicito</TableCell>
											<TableCell>Atendio</TableCell>
											<TableCell>Estatus</TableCell>
											<TableCell align="center"><i className={'fa fa-cog'}></i></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{ orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
											<TableRow key={ order._id }>
												<TableCell component="th" scope="row">
													{ order.number }
												</TableCell>
												<TableCell component="th" scope="row">
													{ order.date }
												</TableCell>
												<TableCell component="th" scope="row">
													{ order.requested.profile.username }
												</TableCell>
												<TableCell component="th" scope="row">
													{ order.requested.profile.username }
												</TableCell>
												<TableCell component="th" scope="row">
													{ order.status}
												</TableCell>
												<TableCell align="right">
													<IconButton onClick={ () => {
													} }>
														<VisibilityIcon/>
													</IconButton>
												</TableCell>
											</TableRow>
										)) }
										{orders.length === 0 && (
											<TableRow>
												<TableCell align="center" colSpan={10} >
													No hay datos
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								labelRowsPerPage={"Filas por página"}
								rowsPerPageOptions={ [5, 10, 25, 100] }
								component="div"
								count={ orders.length }
								rowsPerPage={ rowsPerPage }
								page={ page }
								onChangePage={ handleChangePage }
								onChangeRowsPerPage={ handleChangeRowsPerPage }
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};