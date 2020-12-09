import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Paper, Typography, Box, Container } from '@material-ui/core';
import { Template } from '../../../api/Templates/Template';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';
import useModal from '../../hooks/useModal';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Utilities from '../../../startup/both/Utilities';
import BootstrapTooltip from '../../components/Tooltips/BootstrapTooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { CustomTable } from '../../components/Tables/CustomTable';
import { useTracker } from 'meteor/react-meteor-data';

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

const useTemplates = (filters) => useTracker(() => {
	const subscription = Meteor.subscribe('templates', {
		startDate: filters.startDate,
		endDate: filters.endDate
	}, {
		sort: { date: -1 }
	});
	return {
		templates: Template.find({}).fetch(),
		loading: !subscription.ready()
	};
}, [filters]);

export default function ListTemplates(props) {
	const { history, loader } = props;
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate())
	});
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);

	const { templates } = useTemplates(filters);

	const templatesHeaders = ['Nombre de la plantilla', 'Fecha de creación', 'Creador de la plantilla'];

	const deleteTemplate = () => {
		Meteor.call('template.delete', idDelete, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			modal.toggle();
			props.alert.current.setAlert('Éxito', response._message);
		});
	};

	const confirmDelete = (id) => {
		setIdDelete(id);
		const template = templates.filter(template => template._id === id)[0];
		modal.setModal('Eliminar Plantilla', '¿Esta seguro de eliminar la plantilla ' + template.title + '?');
	};

	const copyTemplate = (idTemplate) => {
		Meteor.call('template.copy', idTemplate, (error, response) => {
			if (error) {
				props.alert.current.setAlert('Error', error.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', response._message);
		});
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
										PLANTILLAS CREADAS
									</Box>
								</Typography>
							</Grid>
							<Grid item>
								<BootstrapTooltip title="Agregar nuevo plantilla">
									<IconButton onClick={ () => {
										history.push('/' + history.location.pathname.split('/')[1] + '/createTemplate');
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
							headers={ templatesHeaders }
							data={ templates }
							options={
								{
									edit: true,
									remove: true,
									copy: true,
									view: false
								}
							}
							handleEdit={ (idTemplate) => {
								history.push({
									pathname: '/' + history.location.pathname.split('/')[1] + '/editTemplate',
									state: { idTemplate, canEdit: true }
								});
							} }
							handleRemove={ (idTemplate) => {
								confirmDelete(idTemplate);
							} }
							handleCopy={ (idTemplate) => {
								copyTemplate(idTemplate);
							} }
						/>
					</Grid>
				</Grid>
			</Paper>
			<ModalDialog modal={ modal } _handleAccept={ deleteTemplate }/>
		</Container>

	);
};
