import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import './TextProcessor.css';
import { DOC_MARGIN } from './constants';
import { fabric } from './js/init';
import TextProcessorTabs from './components/TextProcessorTabs/TextProcessorTabs';
import { STRINGS } from './constants/strings';
import { BootstrapTooltip } from './components/TabFont/TabFont';
import jsPDF from 'jspdf';

let timesKey = 0;
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

	const createCanvas = (number) => {
		const canvas = document.createElement('CANVAS');
		canvas.setAttribute('id', 'doc' + number);
		canvas.setAttribute('width', '863');
		canvas.setAttribute('height', '1050');
		canvas.setAttribute('style', 'border: 1px solid black; width: 816px; height: 1054px');
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

	const _handleKeyUp = (event) => {
		const object = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (object === undefined || object === null) return;
		if (event.keyCode === 46) {
			doc.pages[doc.actualPage].canvas.remove(object);
			return;
		}
		if (object.id.includes('result')) {
			if (event.keyCode >= 48 && event.keyCode <= 57) {
				//is number
				const number = object.id.replace('result', '');
				const result = object.text;
				let compLess = 0;
				let compMore = 0;
				doc.pages[doc.actualPage].canvas.getObjects().forEach(function(o) {
					if (o.id === 'comp_less' + number) {
						compLess = o.text;
					} else if (o.id === 'comp_more' + number) {
						compMore = o.text;
					}
				});
				console.log(result);
				console.log(compLess);
				console.log(compMore);
				if (!isNaN(parseFloat(result))) {
					if (parseFloat(result) < parseFloat(compLess) || parseFloat(result) > parseFloat(compMore)) {
						object.set('fontWeight', 'bold');
					} else {
						object.set('fontWeight', 'normal');
					}
				}
			}
			doc.pages[doc.actualPage].canvas.renderAll();
		}
	};

	const _handleKeyDown = (event) => {
		event = event || window.event;
		const key = event.which || event.keyCode; // keyCode detection
		const ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17)); // ctrl detection (WINDOWS)
		const cmd = event.metaKey ? event.metaKey : ((key === 93)); // cmd detection (MAC)
		if (key === 86 && ctrl || key === 86 && cmd) {
			timesKey++;
			if (timesKey === 2) {
				timesKey = 0;
				doc.pages[doc.actualPage].clipboard.clone(function(clonedObj) {
					doc.pages[doc.actualPage].canvas.discardActiveObject();
					clonedObj.set({
						left: clonedObj.left + 10,
						top: clonedObj.top + 10,
						evented: true
					});
					if (clonedObj.type === 'activeSelection') {
						// active selection needs a reference to the canvas.
						clonedObj.canvas = canvas;
						clonedObj.forEachObject(function(obj) {
							doc.pages[doc.actualPage].canvas.add(obj);
						});
						// this should solve the unselectability
						clonedObj.setCoords();
					} else {
						doc.pages[doc.actualPage].canvas.add(clonedObj);
					}
					doc.pages[doc.actualPage].clipboard.top += 10;
					doc.pages[doc.actualPage].clipboard.left += 10;
					doc.pages[doc.actualPage].canvas.setActiveObject(clonedObj);
					doc.pages[doc.actualPage].canvas.renderAll();
				});
			}
		} else if (key === 67 && ctrl || key === 67 && cmd) {
			timesKey++;
			if (timesKey === 2) {
				timesKey = 0;
				const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
				obj.clone(function(cloned) {
					doc.pages[doc.actualPage].clipboard = cloned;
				});
			}
		}
		const object = doc.pages[doc.actualPage].canvas.getActiveObject();
		if (object === undefined || object === null) return;
		if (object.id.includes('result')) {
			if (event.keyCode >= 48 && event.keyCode <= 57) {
			} else {
				if (event.preventDefault) event.preventDefault();
			}
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
			document.getElementById('signature').className = 'fa fa-signature iconSave select';
		} else {
			document.getElementById('signature').className = 'fa fa-signature iconSave';
		}
	};

	const downloadDocument = () => {
		doc.pages[doc.actualPage].canvas.setDimensions({
			width: doc.pages[doc.actualPage].canvas.getWidth() * 2,
			height: doc.pages[doc.actualPage].canvas.getHeight() * 2
		});
		doc.pages[doc.actualPage].canvas.setZoom(2);
		const canvasHeight = doc.pages[doc.actualPage].canvas.getHeight();
		const canvasWidth = doc.pages[doc.actualPage].canvas.getWidth();
		const imgData = doc.pages[doc.actualPage].canvas.toDataURL('image/jpeg', 0.1);
		const pdf = new jsPDF('p', 'px', [canvasHeight, canvasWidth], true);
		pdf.addImage(imgData, 'JPEG', 0, 0, canvasWidth, canvasHeight, '', 'FAST');
		pdf.save(doc.title + '.pdf', {
			returnPromise: true
		}).then(
			alert('PDF render all done!')
		);
		doc.pages[doc.actualPage].canvas.setDimensions({
			width: doc.pages[doc.actualPage].canvas.getWidth() / 2,
			height: doc.pages[doc.actualPage].canvas.getHeight() / 2
		});
		doc.pages[doc.actualPage].canvas.setZoom(1);
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
		document.addEventListener('keyup', _handleKeyUp);
		document.addEventListener('keydown', _handleKeyDown);
		document.addEventListener('mouseup', _handleClickDown);
		return () => {
			document.removeEventListener('keyup', _handleKeyUp);
			document.removeEventListener('mouseup', _handleKeyDown);
			document.removeEventListener('mouseup', _handleClickDown);
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
			<div className="textProcessorHeaderTitleContainer">
				<BootstrapTooltip title={ STRINGS.save }>
					<button type="button" className="noButton" onClick={ () => save(doc) }>
						<i className="fa fa-save iconSave"/>
					</button>
				</BootstrapTooltip>
				<BootstrapTooltip title={ STRINGS.download }>
					<button type="button" className="noButton" onClick={ () => downloadDocument() }>
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