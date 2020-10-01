import React, { useEffect, useState } from 'react';
import { Card, Tooltip } from '@material-ui/core';
import './TextProcessor.css';
import { DOC_MARGIN } from './constants';
import { fabric } from './js/init';
import TextProcessorTabs from './components/TextProcessorTabs/TextProcessorTabs';
import { STRINGS } from './constants/strings';
import { BootstrapTooltip } from './components/TabFont/TabFont';
import { setAlert } from '../Utilities/Alerts/AlertMessage';

export default function TextProcessor(props) {
	const [document, setDocument] = useState({
		_id: null,
		title: '',
		margin: DOC_MARGIN.md,
		canvas: null
	});

	useEffect(() => {
		const c = new fabric.Canvas('doc');
		if (props.location.state !== undefined) {
			c.loadFromJSON(props.location.state.template.canvas, c.renderAll.bind(c), (o, object) => {
				object.set('hasControls', true);
			});
			setDocument({
				_id: props.location.state.template._id,
				title: props.location.state.template.title,
				margin: props.location.state.template.margin,
				canvas: c
			});
			return;
		}
		setDocument({
			...document,
			canvas: c
		});
	}, []);

	const save = (document) => {
		if (document.title === '') {
			setAlert('Error al guardar', 'Debes ponerle un nombre al documento', 'error');
			return;
		}
		// Save as json
		const documentJson = {
			_id: document._id,
			title: document.title,
			margin: document.margin,
			canvas: JSON.stringify(document.canvas)
		};
		Meteor.call('template.save', documentJson, (err, res) => {
			if (err) {
				setAlert('Error', err.reason, 'error');
				return;
			}
			setAlert('Éxito', res._message);
		});
	};


	const _handleKeyDown = (event) => {
		if(event.keyCode == 46) {
			const obj = document.canvas.getActiveObject();
			if(obj === undefined) return;
			document.canvas.remove(obj);
		}
	}

	useEffect(() => {
		window.addEventListener('keyup', _handleKeyDown);
		return () => {
			window.removeEventListener('keyup', _handleKeyDown);
		};
	}, [document.canvas])

	return (
		<Card elevation={ 6 }>
			<div className="textProcessorHeaderTitleContainer">
				<BootstrapTooltip title={ STRINGS.save }>
					<button type="button" className="noButton" onClick={ () => save(document) }>
						<i className="fa fa-floppy-o iconSave"/>
					</button>
				</BootstrapTooltip>
				<input
					value={ document.title }
					className="textProcessorHeaderTitleText"
					placeholder="Trámite 1"
					type="text"
					onChange={ (value) => setDocument({ ...document, title: value.target.value }) }
				/>
			</div>
			<TextProcessorTabs document={ document }/>
			<div className="textProcessorBody">
				<div className="docPaper">
					<canvas id='doc' className='doc' width={ 816.37795276 } height={ 1054.488189 }/>
				</div>
			</div>
		</Card>
	);
}