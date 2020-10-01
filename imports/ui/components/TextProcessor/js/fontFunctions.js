export const changeSize = (doc, size) => {
	const obj = doc.canvas.getActiveObject();
	if (obj === undefined || obj === null) return;
	obj.setSelectionStyles({
		fontSize: size === 'plus' ? (obj.fontSize += 1) : (obj.fontSize -= 1)
	});
	doc.canvas.renderAll();
};

export const changeAlign = (doc, align) => {
	const obj = doc.canvas.getActiveObject();
	if (obj === undefined || obj === null) return;
	document.getElementById('left').className = 'fa fa-align-left ico';
	document.getElementById('center').className = 'fa fa-align-center ico';
	document.getElementById('right').className = 'fa fa-align-right ico';
	document.getElementById('justify').className = 'fa fa-align-justify ico';
	document.getElementById(
		`${ align }`
	).className = `fa fa-align-${ align } ico select`;
	obj.textAlign = align;
	doc.canvas.renderAll();
};

const setStyle = (object, styleName, value) => {
	if (object.setSelectionStyles && object.isEditing) {
		const style = { };
		style[styleName] = value;
		object.setSelectionStyles(style);
	}
	else {
		object[styleName] = value;
	}
	return object;
}

const getStyle = (object, styleName) => {
	return (object.getSelectionStyles && object.isEditing)
		? object.getSelectionStyles()[styleName]
		: object[styleName];
}

export const changeStyle = (doc, style) => {
	let obj = doc.canvas.getActiveObject();
	if (obj === undefined || obj === null) return;
	switch (style){
		case 'bold':
			const isBold = (getStyle(obj, 'fontWeight') || '').indexOf('bold') > -1;
			setStyle(obj, 'fontWeight', isBold ? 'normal' : 'bold');
			break;
		case 'italic':
			const isItalic = (getStyle(obj, 'fontStyle') || '').indexOf('italic') > -1;
			setStyle(obj, 'fontStyle', isItalic ? 'normal' : 'italic');
			break;
		case 'underline':
			const isUnderline = (getStyle(obj, 'textDecoration') || '').indexOf('underline') > -1;
			setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
			break;
	}
	doc.canvas.renderAll();
}