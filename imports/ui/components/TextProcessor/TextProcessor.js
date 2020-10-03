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
		pages: [
			{
				canvas: null,
				margin: DOC_MARGIN.md
			}
		],
		actualPage: 0,
		lastElementSelected: null
	});

	const createCanvas = (number) => {
		const canvas = document.createElement('CANVAS');
		canvas.setAttribute('id', 'doc' + number);
		canvas.setAttribute('width', '816.37795276');
		canvas.setAttribute('height', '1054.488189');
		canvas.setAttribute('style', 'border: 1px solid black');
		document.getElementById('docPaper').append(canvas);
	};

	const hideCanvas = (number) => {
		document.getElementById('doc' + number).parentNode.style.display = 'none';
	};

	const showCanvas = (number) => {
		document.getElementById('doc' + number).parentNode.style.display = 'block';
	};

	useEffect(() => {
		if (props.location.state) {
			// Load all pages (template is in bd, here is doc)
			const template = props.location.state.template;
			const pagesArrayJsons = [];
			template.pages.forEach((page, i) => {
				createCanvas(i);
				let c = new fabric.Canvas('doc'+i);
				if(i !== 0) hideCanvas(i);
				c.loadFromJSON(page.canvas, c.renderAll.bind(c), (o, object) => {
					if (!props.location.state.canEdit) {
						object.set('selectable', false);
					}
				});
				pagesArrayJsons.push({
					canvas: c,
					margin: page.margin
				});
			});
			setDoc({
				_id: props.location.state.template._id,
				title: props.location.state.template.title,
				pages: pagesArrayJsons,
				actualPage: 0,
				lastElementSelected: null
			});
			return;
		}
		createCanvas(doc.actualPage);
		const copyPages = doc.pages;
		copyPages[doc.actualPage].canvas = new fabric.Canvas('doc' + doc.actualPage);
		setDoc({
			...doc,
			pages: copyPages
		});
		//add listeners
	}, []);

	const save = (doc) => {
		if (doc.title === '') {
			setAlert('Error al guardar', 'Debes ponerle un nombre al doco', 'error');
			return;
		}
		const pagesArrayStrings = [];
		// Array of Strings
		doc.pages.forEach((page) => {
			pagesArrayStrings.push({
				canvas: JSON.stringify(page.canvas),
				margin: page.margin
			});
		});
		const docJson = {
			_id: doc._id,
			title: doc.title,
			pages: pagesArrayStrings
		};
		console.log("Guardaremos " + docJson.pages);
		Meteor.call('template.save', docJson, (err, res) => {
			if (err) {
				setAlert('Error', err.reason, 'error');
				return;
			}
			setAlert('Éxito', res._message);
		});
	};

	const _handleKeyDown = (event) => {
		if (event.keyCode === 46) {
			const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
			if (obj === undefined || obj === null) return;
			doc.pages[doc.actualPage].canvas.remove(obj);
		}
	};

	const _handleClickDown = (event) => {
		if (event.target.tagName !== 'CANVAS') return;
		const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (obj === undefined || obj === null) return;
		setDoc({
			...doc,
			lastElementSelected: obj
		});
	};

	const modeSignature = () => {
		doc.pages[doc.actualPage].canvas.isDrawingMode = !doc.pages[doc.actualPage].canvas.isDrawingMode;
		if (doc.pages[doc.actualPage].canvas.isDrawingMode) {
			document.getElementById('pencil').className = 'fa fa-pencil iconSave select';
		} else {
			document.getElementById('pencil').className = 'fa fa-pencil iconSave';
		}
	};

	const _handleNewPage = () => {
		const nextPage = doc.pages.length;
		hideCanvas(doc.actualPage);
		createCanvas(nextPage);
		const copyPages = doc.pages;
		copyPages.push({
			canvas: new fabric.Canvas('doc' + nextPage),
			margin: DOC_MARGIN.md
		});
		setDoc({
			...doc,
			pages: copyPages,
			actualPage: nextPage
		});
	};

	const _handleNextPage = () => {
		const nextPage = doc.actualPage + 1;
		hideCanvas(doc.actualPage);
		showCanvas(nextPage);
		setDoc({
			...doc,
			actualPage: nextPage
		});
	};

	const _handlePrevPage = () => {
		const prevPage = doc.actualPage - 1;
		hideCanvas(doc.actualPage);
		showCanvas(prevPage);
		setDoc({
			...doc,
			actualPage: prevPage
		});
	};

	useEffect(() => {
		document.addEventListener('keyup', _handleKeyDown);
		document.addEventListener('mouseup', _handleClickDown);
		return () => {
			document.removeEventListener('keyup', _handleKeyDown);
			document.removeEventListener('mouseup', _handleClickDown);
		};
	}, [doc.pages[doc.actualPage].canvas]);

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
			<TextProcessorTabs
				doc={ doc }
				_handleNewPage={ _handleNewPage }
				_handlePrevPage={ _handlePrevPage }
				_handleNextPage={ _handleNextPage }
			/>
			<div className="textProcessorBody">
				<div id="docPaper" className="docPaper"/>
			</div>
		</Card>
	);
}