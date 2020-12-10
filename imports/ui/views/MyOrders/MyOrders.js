import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	Grid, Paper, Typography, Box, Container, InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { Order } from '../../../api/Orders/Order';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Utilities from '../../../startup/both/Utilities';
import { CustomTable } from '../../components/Tables/CustomTable';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';
import { getStatusSpanish } from '../../../utils';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	date: {
		marginLeft: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	}
}));

const useOrders = (filters) => useTracker(() => {
	Meteor.subscribe('orders', filters, { sort: { date: -1 } });
	const orders = Order.find({}).fetch();
	orders.map((order => {
		order.status = getStatusSpanish(order.status);
	}))
	return orders;
}, [filters]);

export default function MyOrders(props) {
	const { history } = props;
	const user = useSelector(state => state.user);
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate()),
		status: 'all',
		idRequested: user._id
	});

	const orders = useOrders(filters);

	const ordersHeaders = ['Numero de orden', 'Estatus', 'Fecha', 'Solicitó'];

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
						<FormControl variant="outlined" className={ classes.formControl }>
							<InputLabel id="demo-simple-select-outlined-label">Estatus</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={ filters.status }
								onChange={ e => setFilters({ ...filters, status: e.target.value }) }
								label="Estatus"
							>
								<MenuItem key={ 1 } value="all">Todos los status</MenuItem>
								<MenuItem key={ 2 } value="open">Abierto</MenuItem>
								<MenuItem key={ 3 } value="awaitingSample">En espera de muestra</MenuItem>
								<MenuItem key={ 4 } value="process">En proceso</MenuItem>
								<MenuItem key={ 5 } value="awaitingResults">En espera de
									resultados</MenuItem>
								<MenuItem key={ 6 } value="attended">Atendido</MenuItem>
							</Select>
						</FormControl>
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
