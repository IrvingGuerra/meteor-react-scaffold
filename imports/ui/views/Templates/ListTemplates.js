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
	CardHeader,
	CardContent,
	Fab
} from '@material-ui/core';
import { useTracker } from 'react-meteor-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Template } from '../../../api/Templates/Template';
import { setAlert } from '../../components/Utilities/Alerts/AlertMessage';

const useStyles = makeStyles((theme) => ({
	card: {
		marginTop: theme.spacing(5),
		minWidth: 500
	},
	heading: {
		padding: theme.spacing(4, 4, 0, 4)
	}
}));

const ListTemplates = (props) => {
	const classes = useStyles();

	const templates = useTracker(() => {
		Meteor.subscribe('templates');
		return Template.find({}).fetch();
	}, []);

	const deleteTemplate = (idTemplate) => {
		Meteor.call('template.delete', idTemplate, (error, response) => {
			if (error) {
				setAlert('Error', error.reason, 'error');
				return;
			}
			setAlert('Éxito', response._message);
		});
	};

	return (
		<Card className={ classes.card } elevation={ 6 }>
			<CardHeader
				className={ classes.heading }
				action={
					<Fab color="primary" aria-label="add" onClick={ () => {
						props.history.push(props.history.location.pathname + 'Create');
					} }>
						<AddIcon/>
					</Fab>
				}
				title="Plantillas creadas"
			/>
			<CardContent>
				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Nombre de la plantilla</TableCell>
								<TableCell align="right">Configuracion</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ templates.map((template) => (
								<TableRow key={ template._id }>
									<TableCell component="th" scope="row">
										{ template.title }
									</TableCell>
									<TableCell align="right">
										<IconButton onClick={ () => {
											props.history.push({
												pathname: props.history.location.pathname + 'Edit',
												state: { template, canEdit: true }
											});
										} }>
											<EditIcon/>
										</IconButton>
										<IconButton aria-label="delete" onClick={ () => deleteTemplate(template._id) }>
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

export default ListTemplates;