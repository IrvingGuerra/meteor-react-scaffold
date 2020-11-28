import { fabric } from './init';

const getTop = (doc, separation) => {
	let top = doc.pages[doc.actualPage].margin;
	doc.pages[doc.actualPage].canvas.getObjects().forEach((o) => {
		if (o.type !== 'image') {
			if (o.top >= top) {
				top = o.top + o.height + o.padding + separation;
			}
		}
	});
	return top;
};

const getDocWidth = (doc) => {
	return doc.pages[doc.actualPage].canvas.width - doc.pages[doc.actualPage].margin * 2;
};

export const addText = (doc) => {
	const newTextBox = new fabric.NewTextBox('Label', {
		left: doc.pages[doc.actualPage].margin,
		top: getTop(doc, 18),
		width: 100,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'label'
	});
	doc.pages[doc.actualPage].canvas.add(newTextBox);
};

export const addTitle = (doc) => {
	const eje = new fabric.NewTextBox('Titulo', {
		left: doc.pages[doc.actualPage].margin,
		top: getTop(doc, 18),
		width: doc.pages[doc.actualPage].canvas.width - doc.pages[doc.actualPage].margin * 2,
		fontFamily: 'Arial',
		fontSize: 30,
		fontWeight: 'bold',
		fill: '#ffffff',
		textAlign: 'center',
		borderTopRightRadius: 25,
		borderBottomRightRadius: 25,
		borderBottomLeftRadius: 25,
		borderTopLeftRadius: 25,
		backgroundColor: '#000000',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 25,
		id: 'title'
	});
	doc.pages[doc.actualPage].canvas.add(eje);
};

export const addInput = (doc) => {
	const eje = new fabric.NewTextBox('_________________', {
		left: doc.pages[doc.actualPage].margin,
		top: getTop(doc, 18),
		width: 50,
		fontFamily: 'Arial',
		fontSize: 15,
		fontWeight: 'normal',
		fill: '#000000', //Font Color
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'input'
	});
	doc.pages[doc.actualPage].canvas.add(eje);
};

export const addAutoValue = (doc, value) => {
	const eje = new fabric.NewTextBox('#'+value, {
		left: doc.pages[doc.actualPage].margin,
		top: getTop(doc, 18),
		width: 50,
		fontFamily: 'Arial',
		fontSize: 15,
		fontWeight: 'normal',
		fill: '#000000', //Font Color
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'autoValue'+value
	});
	doc.pages[doc.actualPage].canvas.add(eje);
};

export const addImage = (doc) => {
	const file = document.querySelector('#addImage').files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(f) {
		const data = f.target.result;
		new fabric.Image.fromURL(data, function(img) {
			const canvasImage = img.set({
				left: doc.pages[doc.actualPage].margin,
				top: doc.pages[doc.actualPage].margin,
				id: 'image'
			});
			doc.pages[doc.actualPage].canvas.add(canvasImage);
		});
	};
};

export const addCol = (doc, left, width, top, padding, id) => {
	let lockMovementX = false;
	let lockMovementY = false;
	if (id === 'cols'){
		lockMovementX = true;
		lockMovementY = true;
	}
	const newTextBox = new fabric.NewTextBox('', {
		left,
		top,
		width,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		textBoxBorderColor: 'black',
		lockMovementX,
		lockMovementY,
		padding,
		id
	});
	doc.pages[doc.actualPage].canvas.add(newTextBox);
};

const getLastColLeft = (doc) => {
	let left = doc.pages[doc.actualPage].margin;
	doc.pages[doc.actualPage].canvas.getObjects().forEach((o) => {
		if (o.id === 'col') {
			left = o.left;
		}
	});
	return left;
};

const getLastColWidth = (doc) => {
	let width = getDocWidth(doc);
	doc.pages[doc.actualPage].canvas.getObjects().forEach((o) => {
		if (o.id === 'col') {
			width = o.width;
		}
	});
	return width;
};

export const addColumns = (doc, number) => {
	const top = getTop(doc, 0);
	let left = getLastColLeft(doc);
	const fullWidth = getLastColWidth(doc);
	const divisor = 1 / number;
	for (let i = 0; i < number; i++) {
		if (number === 1) {
			addCol(doc, left, fullWidth * divisor, top + 18, 6, 'col');
		} else {
			addCol(doc, left, fullWidth * divisor, top, 6, 'cols');
			left += fullWidth * divisor;
		}
	}
};

const getNumberComparison = (doc) => {
	let number = 0;
	doc.pages[doc.actualPage].canvas.getObjects().forEach((o) => {
		if (o.id && o.id.includes('result')) {
			number++;
		}
	});
	return number;
};


export const addComparison = (doc) => {
	const number = getNumberComparison(doc);
	const top = getTop(doc, 18);
	const result = new fabric.NewTextBox('result'+number, {
		left: doc.pages[doc.actualPage].margin,
		top,
		width: 100,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'result'+number
	});
	const compLess = new fabric.NewTextBox('50', {
		left: doc.pages[doc.actualPage].margin + 100,
		top,
		width: 50,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'comp_less'+number
	});
	const char = new fabric.NewTextBox('-', {
		left: doc.pages[doc.actualPage].margin+150,
		top,
		width: 15,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
	});
	const compMore = new fabric.NewTextBox('100', {
		left: doc.pages[doc.actualPage].margin+165,
		top,
		width: 50,
		fontFamily: 'Arial',
		fontSize: 16,
		fontWeight: 'normal',
		fill: '#000000',
		textAlign: 'left',
		backgroundColor: '#ffffff',
		borderColor: 'blue',
		editingBorderColor: 'green',
		padding: 0,
		id: 'comp_more'+number
	});
	doc.pages[doc.actualPage].canvas.add(result);
	doc.pages[doc.actualPage].canvas.add(compLess);
	doc.pages[doc.actualPage].canvas.add(char);
	doc.pages[doc.actualPage].canvas.add(compMore);
}
