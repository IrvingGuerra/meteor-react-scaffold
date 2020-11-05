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
	Fab, Grid, Paper, Typography, Box, Container
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
import { CustomTable } from '../../components/Tables/CustomTable';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	date: {
		marginLeft: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	}
}));

export default function MyOrders(props) {
	const { history, loader, alert } = props;
	const user = useSelector(state => state.user);
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate())
	});

	const orders = useTracker(() => {
		Meteor.subscribe('orders' ,{
			startDate: filters.startDate,
			endDate: filters.endDate
		});
		const orders = Order.find({idRequested: user._id}).fetch();
		orders.map((order) => {
			delete order.requested;
			delete order.idRequested;
		});
		return orders;
	}, []);

	const ordersHeaders = ['Numero de orden', 'Estatus', 'Fecha'];

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										MIS ORDENES
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<BootstrapTooltip title="Solicitar orden">
									<IconButton onClick={ () => {
										history.push('/' + history.location.pathname.split('/')[1] + '/requestOrder');
									} }>
										<AddCircleIcon fontSize="large" color="primary"/>
									</IconButton>
								</BootstrapTooltip>
							</Grid>
						</Grid>
					</Grid>
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
						<CustomTable
							headers={ ordersHeaders }
							data={ orders }
							options={
								{
									edit: false,
									remove: false,
									view: true
								}
							}
							handleView={ (idOrder) => {
								history.push({
									pathname: '/' + history.location.pathname.split('/')[1] + '/orderDetails',
									state: { idOrder }
								});
							} }
						/>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};