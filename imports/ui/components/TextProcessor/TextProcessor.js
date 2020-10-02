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
	const [doc, setDoc] = useState({
		_id: null,
		title: '',
		margin: DOC_MARGIN.md,
		canvas: null,
		lastElementSelected: null
	});

	useEffect(() => {
		const c = new fabric.Canvas('doc');
		if (props.location.state !== undefined) {
			c.loadFromJSON(props.location.state.template.canvas, c.renderAll.bind(c), (o, object) => {
				object.set('hasControls', true);
			});
			setDoc({
				_id: props.location.state.template._id,
				title: props.location.state.template.title,
				margin: props.location.state.template.margin,
				canvas: c
			});
			return;
		}
		setDoc({
			...doc,
			canvas: c
		});
	}, []);

	const save = (doc) => {
		if (doc.title === '') {
			setAlert('Error al guardar', 'Debes ponerle un nombre al doco', 'error');
			return;
		}
		// Save as json
		const docJson = {
			_id: doc._id,
			title: doc.title,
			margin: doc.margin,
			canvas: JSON.stringify(doc.canvas)
		};
		Meteor.call('template.save', docJson, (err, res) => {
			if (err) {
				setAlert('Error', err.reason, 'error');
				return;
			}
			setAlert('Éxito', res._message);
		});
	};


	const _handleKeyDown = (event) => {
		if(event.keyCode == 46) {
			const obj = doc.canvas.getActiveObject();
			if(obj === undefined || obj === null) return;
			doc.canvas.remove(obj);
		}
	}

	const _handleClickDown = (event) => {
		if(event.target.tagName !== 'CANVAS') return;
		const obj = doc.canvas.getActiveObject();
		if(obj === undefined || obj === null) return;
		setDoc({
			...doc,
			lastElementSelected: obj
		});
	}

	useEffect(() => {
		window.addEventListener('keyup', _handleKeyDown);
		window.addEventListener("mouseup", _handleClickDown);
		return () => {
			window.removeEventListener('keyup', _handleKeyDown);
			window.removeEventListener("mouseup", _handleClickDown);
		};
	}, [doc.canvas])

	const modeSignature = () => {
		doc.canvas.isDrawingMode = !doc.canvas.isDrawingMode;
		if (doc.canvas.isDrawingMode) {
			document.getElementById('pencil').className = 'fa fa-pencil iconSave select';
		} else {
			document.getElementById('pencil').className = 'fa fa-pencil iconSave';
		}
	}

	return (
		<Card elevation={ 6 }>
			<div className="textProcessorHeaderTitleContainer">
				<BootstrapTooltip title={ STRINGS.save }>
					<button type="button" className="noButton" onClick={ () => save(doc) }>
						<i className="fa fa-floppy-o iconSave"/>
					</button>
				</BootstrapTooltip>
				<input
					value={ doc.title }
					className="textProcessorHeaderTitleText"
					placeholder="Trámite 1"
					type="text"
					onChange={ (value) => setDoc({ ...doc, title: value.target.value }) }
				/>
				<BootstrapTooltip title={ STRINGS.signature }>
					<button type="button" className="noButton" onClick={ () => modeSignature() }>
						<i id="pencil" className="fa fa-pencil iconSave"/>
					</button>
				</BootstrapTooltip>
			</div>
			<TextProcessorTabs doc={ doc }/>
			<div className="textProcessorBody">
				<div className="docPaper">
					<canvas id='doc' className='doc' width={ 816.37795276 } height={ 1054.488189 }/>
				</div>
			</div>
		</Card>
	);
}