import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import './TextProcessor.css';
import { DOC_MARGIN } from './constants';
import { fabric } from './js/init';
import TextProcessorTabs from './components/TextProcessorTabs/TextProcessorTabs';
import { STRINGS } from './constants/strings';
import { BootstrapTooltip } from './components/TabFont/TabFont';
import { _handleClickDown, _handleKeyDown, _handleKeyUp } from './js/events';
import LinearProgress from '@material-ui/core/LinearProgress';
import { jsPDF } from 'jspdf';

const grid = 18;

export default function TextProcessor(props) {

	const [doc, setDoc] = useState({
		_id: null,
		title: '',
		pages: [
			{
				canvas: null,
				margin: 18
			}
		],
		actualPage: 0,
		lastElementSelected: null,
		clipboard: null,
		showGrid: false
	});

	const [loading, setLoading] = useState(false);

	const createCanvas = (number) => {
		const canvas = document.createElement('CANVAS');
		canvas.setAttribute('id', 'doc' + number);
		canvas.setAttribute('width', '793.700787402');
		canvas.setAttribute('height', '1122.519685039');
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
				let c = new fabric.Canvas('doc' + i);
				if (i !== 0) hideCanvas(i);
				c.loadFromJSON(page.canvas, c.renderAll.bind(c), (o, object) => {
					if (!props.location.state.canEdit) {
						// Just can edit id label
						if (object.id === 'input') {
							object.set('selectable', true);
							object.set('lockMovementX', true);
							object.set('lockMovementY', true);
						} else if (object.id && object.id.includes('result')) {
							object.set('selectable', true);
						} else {
							object.set('selectable', false);
						}
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
			props.alert.current.setAlert('Error al guardar', 'Debes ponerle un nombre al doco', 'error');
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
		if (props.location.state && !props.location.state.canEdit) {
			Meteor.call('analysis.update', { analysis: docJson, orderId: props.location.state.orderId }, (err, res) => {
				if (err) {
					props.alert.current.setAlert('Error', err.reason, 'error');
					return;
				}
				props.alert.current.setAlert('Éxito', res._message);
			});
			return;
		}
		Meteor.call('template.save', docJson, (err, res) => {
			if (err) {
				props.alert.current.setAlert('Error', err.reason, 'error');
				return;
			}
			props.alert.current.setAlert('Éxito', res._message);
		});
	};

	const modeSignature = () => {
		doc.pages[doc.actualPage].canvas.isDrawingMode = !doc.pages[doc.actualPage].canvas.isDrawingMode;
		if (doc.pages[doc.actualPage].canvas.isDrawingMode) {
			document.getElementById('signature').className = 'fa fa-signature iconSave select';
		} else {
			document.getElementById('signature').className = 'fa fa-signature iconSave';
		}
	};

	const downloadDocument = () => {
		setLoading(true);
		const pdf = new jsPDF('p', 'mm', [297, 210]);
		doc.pages.forEach((page, i) => {
			if (i > 0) {
				pdf.addPage();
			}
			const canvasHeight = page.canvas.getHeight();
			const canvasWidth = page.canvas.getWidth();
			const imgData = page.canvas.toDataURL('image/jpeg', 1.0);
			const aspectHeight = (canvasHeight) / 297;
			const aspectWidth = (canvasWidth) / 210;
			pdf.addImage(imgData, 'JPEG', 0, 0, canvasWidth / aspectWidth, canvasHeight / aspectHeight, 'page' + i, 'FAST');
		});
		pdf.save(doc.title + '.pdf');
		setLoading(false);
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

	const _handleGrid = () => {
		setDoc({
			...doc,
			showGrid: !doc.showGrid
		});
	};

	useEffect(() => {
		if (doc.pages[doc.actualPage].canvas === null) return;
		document.addEventListener('keyup', e => _handleKeyUp(e, doc));
		document.addEventListener('keydown', e => _handleKeyDown(e, doc));
		document.addEventListener('mouseup', e => _handleClickDown(e, doc, setDoc));
		return () => {
			document.removeEventListener('keyup', e => _handleKeyUp(e, doc));
			document.removeEventListener('mouseup', e => _handleKeyDown(e, doc));
			document.removeEventListener('mouseup', e => _handleClickDown(e, doc, setDoc));
		};
	}, [doc.pages[doc.actualPage].canvas]);

	useEffect(() => {
		// SHOW GRID
		if (doc.pages[doc.actualPage].canvas === null) return;
		if (doc.showGrid === undefined) return;
		if (doc.showGrid) {
			for (let i = 0; i < (1054 / grid); i++) {
				doc.pages[doc.actualPage].canvas.add(new fabric.Line([i * grid, 0, i * grid, 1054], {
					stroke: '#CCCCCC',
					selectable: false
				}));
				doc.pages[doc.actualPage].canvas.add(new fabric.Line([0, i * grid, 1054, i * grid], {
					stroke: '#CCCCCC',
					selectable: false
				}));
			}
			doc.pages[doc.actualPage].canvas.on('object:moving', function(options) {
				if (Math.round(options.target.left / grid * 4) % 4 === 0 &&
					Math.round(options.target.top / grid * 4) % 4 === 0) {
					options.target.set({
						left: Math.round(options.target.left / grid) * grid,
						top: Math.round(options.target.top / grid) * grid
					}).setCoords();
				}
			});
		} else {
			doc.pages[doc.actualPage].canvas.getObjects('line').forEach(function(o) {
				doc.pages[doc.actualPage].canvas.remove(o);
			});
		}
	}, [doc.pages[doc.actualPage].canvas, doc.showGrid]);

	return (
		<Card elevation={ 6 }>
			{ loading && (
				<LinearProgress color="secondary"/>
			) }
			<div className="textProcessorHeaderTitleContainer">
				<BootstrapTooltip title={ STRINGS.save }>
					<button type="button" className="noButton" onClick={ () => save(doc) }>
						<i className="fa fa-save iconSave"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.download }>
					<button type="button" className="noButton" onClick={ downloadDocument }>
						<i id="download" className="fa fa-download iconDownload"/>
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
						<i id="signature" className="fa fa-signature iconSave"/>
					</button>
				</BootstrapTooltip>
			</div>
			<TextProcessorTabs
				doc={ doc }
				_handleNewPage={ _handleNewPage }
				_handlePrevPage={ _handlePrevPage }
				_handleNextPage={ _handleNextPage }
				_handleGrid={ _handleGrid }
			/>
			<div className="textProcessorBody">
				<div id="docPaper" className="docPaper"/>
			</div>
		</Card>
	);
}