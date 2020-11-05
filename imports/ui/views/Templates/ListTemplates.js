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
import { Template } from '../../../api/Templates/Template';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';
import useModal from '../../hooks/useModal';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Utilities from '../../../startup/both/Utilities';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	date: {
		marginLeft: theme.spacing(2)
	}
}));

export default function ListTemplates(props) {
	const classes = useStyles();
	// Filters
	const [filters, setFilters] = useState({
		startDate: new Date(Utilities.currentLocalDate()),
		endDate: new Date(Utilities.currentLocalDate())
	});
	//Pagination
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	//Modal and delete
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const templates = useTracker(() => {
		Meteor.subscribe('templates', {
			startDate: filters.startDate,
			endDate: filters.endDate
		});
		const data = Template.find({}).fetch();
		return data;
	}, []);

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

	const confirmDelete = (idTemplate) => {
		setIdDelete(idTemplate);
		const template = templates.filter(template => template._id === idTemplate)[0];
		modal.setModal('Eliminar Plantilla', '¿Esta seguro de eliminar la plantilla ' + template.title + '?');
	};

	return (
		<Grid item lg={ 8 } md={ 10 } sm={ 12 }>
			<Card elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					action={
						<Fab color="primary" aria-label="add" onClick={ () => {
							props.history.push('/' + props.history.location.pathname.split('/')[1] + '/createTemplate');
						} }>
							<AddIcon/>
						</Fab>
					}
					title="Plantillas creadas"
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
											<TableCell>Nombre de la plantilla</TableCell>
											<TableCell>Fecha de cración</TableCell>
											<TableCell>Creador de la plantilla</TableCell>
											<TableCell align="center"><i
												className={ 'fa fa-cog' }></i></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{ templates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((template) => (
											<TableRow key={ template._id }>
												<TableCell component="th" scope="row">
													{ template.title }
												</TableCell>
												<TableCell component="th" scope="row">
													{ template.date }
												</TableCell>
												<TableCell component="th" scope="row">
													{ template.creator.profile.username }
												</TableCell>
												<TableCell align="right">
													<IconButton onClick={ () => {
														props.history.push({
															pathname: '/' + props.history.location.pathname.split('/')[1] + '/editTemplate',
															state: { template, canEdit: true }
														});
													} }>
														<EditIcon/>
													</IconButton>
													<IconButton aria-label="delete"
													            onClick={ () => confirmDelete(template._id) }>
														<DeleteIcon/>
													</IconButton>
												</TableCell>
											</TableRow>
										)) }
										{ templates.length === 0 && (
											<TableRow>
												<TableCell align="center" colSpan={ 10 }>
													No hay datos
												</TableCell>
											</TableRow>
										) }
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								labelRowsPerPage={ 'Filas por página' }
								rowsPerPageOptions={ [5, 10, 25, 100] }
								component="div"
								count={ templates.length }
								rowsPerPage={ rowsPerPage }
								page={ page }
								onChangePage={ handleChangePage }
								onChangeRowsPerPage={ handleChangeRowsPerPage }
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<ModalDialog modal={ modal } _handleAccept={ deleteTemplate }/>
		</Grid>
	);
};