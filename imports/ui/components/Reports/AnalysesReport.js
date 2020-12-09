import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography
} from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { Order } from '../../../api/Orders/Order';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Utilities from '../../../startup/both/Utilities';
import { CustomTable } from '../Tables/CustomTable';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ExportCSV } from './ExportCSV';

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
	Meteor.subscribe('analysesReport', filters, { sort: { date: -1 } });
	return Order.find({}).fetch();
}, [filters]);

const useUsers = (profile) => useTracker(() => {
	Meteor.subscribe('users', profile);
	return Meteor.users.find({}).fetch();
}, [profile]);

export default function AnalysesReport(props) {
	const { history } = props;
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate()),
		profile: 'all',
		idRequest: 'all'
	});

	const orders = useOrders(filters);

	const users = useUsers(filters.profile);

	const ordersHeaders = ['Numero de orden', 'Estatus', 'Fecha de apertura', 'Fecha de cierre', 'Dias entre apertura y cierre', 'Solicitó', 'Perfil solicitó'];

	return (
		<Container maxWidth="lg" className={ classes.container }>
			<Paper className={ classes.paper } elevation={ 10 }>
				<Grid container direction="column">
					<Grid item xs={ 12 }>
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Grid item>
								<Typography color="primary" component="span">
									<Box fontSize={ 24 } fontWeight="fontWeightMedium" m={ 2 }>
										ANALISIS REALIZADOS
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
						<ExportCSV csvData={ orders } fileName={ 'Analisis realizados' }/>
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
							<InputLabel id="demo-simple-select-outlined-label">Perfil</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={ filters.profile }
								onChange={ e => setFilters({ ...filters, profile: e.target.value }) }
								label="Perfil"
							>
								<MenuItem key={ 1 } value="all">Todos los perfiles</MenuItem>
								<MenuItem key={ 2 } value='admin'>Admin</MenuItem>
								<MenuItem key={ 3 } value='specialist'>Especialista</MenuItem>
								<MenuItem key={ 4 } value='labworker'>Laboratorista</MenuItem>
								<MenuItem key={ 5 } value='client'>Cliente</MenuItem>
							</Select>
						</FormControl>
						<FormControl variant="outlined" className={ classes.formControl }>
							<InputLabel id="select-request">Solicito</InputLabel>
							<Select
								labelId="selectRequestLabel"
								id="selectRequest"
								value={ filters.idRequest }
								onChange={ e => setFilters({ ...filters, idRequest: e.target.value }) }
								label="selectRequest"
							>
								<MenuItem key={ 1 } value="all">Todos los solicitantes</MenuItem>
								{ users.map((user, index) => {
									return (
										<MenuItem key={ index } value={ user._id }>{ user.username }</MenuItem>
									);
								}) }
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={ 12 }>
						<CustomTable
							headers={ ordersHeaders }
							data={ orders }
							options={
								{
									edit: true,
									remove: false,
									view: false
								}
							}
							handleEdit={ (idOrder) => {
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
