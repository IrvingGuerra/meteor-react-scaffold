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
import { Template } from '../../../api/Templates/Template';
import { ModalDialog } from '../../components/Utilities/Modals/ModalDialog';
import useModal from '../../hooks/useModal';

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
	const modal = useModal();
	const [idDelete, setIdDelete] = useState(null);

	const templates = useTracker(() => {
		Meteor.subscribe('templates');
		return Template.find({}).fetch();
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
		<>
			<Card className={ classes.card } elevation={ 6 }>
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
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
			<ModalDialog modal={ modal } _handleAccept={ deleteTemplate }/>
		</>
	);
};

export default ListTemplates;