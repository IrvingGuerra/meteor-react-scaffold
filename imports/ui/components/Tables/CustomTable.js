import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export const CustomTable = (props) => {
	const { headers, data, options, handleEdit, handleRemove, handleCopy, handleView } = props;
	const { edit, remove, copy, view } = options;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{ headers.map((header, i) => <TableCell key={ i } align="center">{ header }</TableCell>) }
							{ (edit || remove || view) && (
								<TableCell align="center"><i className={ 'fa fa-cog' }/></TableCell>
							) }
						</TableRow>
					</TableHead>
					<TableBody>
						{ data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, i) => {
							const columns = [];
							Object.keys(element).forEach(key => {
								if (key !== '_id' && !columns.includes(key)) {
									columns.push(key);
								}
							});
							return (
								<TableRow key={ i }>
									{ columns.map((col, index) => <TableCell key={ element._id + index }
									                                         align="center">{ element[col] }</TableCell>) }
									<TableCell align="center">
										{ edit && (
											<IconButton onClick={ () => handleEdit(element._id) }>
												<EditIcon color="primary"/>
											</IconButton>
										) }
										{ remove && (
											<IconButton aria-label="delete" onClick={ () => handleRemove(element._id) }>
												<DeleteIcon color="secondary"/>
											</IconButton>
										) }
										{ copy && (
											<IconButton onClick={ () => handleCopy(element._id) }>
												<FileCopyIcon color="primary"/>
											</IconButton>
										) }
										{ (view && element.status && element.status === 'attended') && (
											<IconButton onClick={ () => handleView(element._id) }>
												<VisibilityIcon color="primary"/>
											</IconButton>
										) }
									</TableCell>
								</TableRow>
							);
						}) }
						{ data.length === 0 && (
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
				count={ data.length }
				rowsPerPage={ rowsPerPage }
				page={ page }
				onChangePage={ handleChangePage }
				onChangeRowsPerPage={ handleChangeRowsPerPage }
			/>
		</>
	);
};