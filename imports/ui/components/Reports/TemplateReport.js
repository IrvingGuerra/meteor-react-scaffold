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
	Card,
	CardHeader,
	CardContent,
	Grid
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import { Template } from '../../../api/Templates/Template';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Utilities from '../../../startup/both/Utilities';
import { ExportCSV } from './ExportCSV';

const useStyles = makeStyles((theme) => ({
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	},
	date: {
		marginLeft: theme.spacing(2)
	}
}));

export default function TemplateReport(props) {
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

	const [templates, isLoading] = useTracker(() => {
		Meteor.subscribe('templates');
		const subscription = Meteor.subscribe('templates', {
			startDate: filters.startDate,
			endDate: filters.endDate
		});
		const data = Template.find({}).fetch();
		console.log(data);
		return [data, !subscription.ready()];
	}, []);

	return (
		<Grid item lg={ 8 } md={ 10 } sm={ 12 }>
			<Card elevation={ 6 }>
				<CardHeader
					className={ classes.heading }
					title="Reporte de plantillas"
				/>
				<CardContent>
					<Grid container spacing={ 2 }>
						<Grid item xs={ 12 }>
							<ExportCSV csvData={templates} fileName={"Test"}/>
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
							<TableContainer>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Nombre de la plantilla</TableCell>
											<TableCell>Fecha de cración</TableCell>
											<TableCell>Creador de la plantilla</TableCell>
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
		</Grid>
	);
};