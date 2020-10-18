export const _handleKeyUp = (event, doc) => {
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

export const _handleKeyDown = (event, doc) => {
	event = event || window.event;
	const key = event.which || event.keyCode; // keyCode detection
	const ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17)); // ctrl detection (WINDOWS)
	const cmd = event.metaKey ? event.metaKey : ((key === 93)); // cmd detection (MAC)
	if (key === 86 && ctrl || key === 86 && cmd) {
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
	} else if (key === 67 && ctrl || key === 67 && cmd) {
		const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
		obj.clone(function(cloned) {
			doc.pages[doc.actualPage].clipboard = cloned;
		});
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

export const _handleClickDown = (event, doc, setDoc) => {
	if (event.target.tagName !== 'CANVAS') return;
	const obj = doc.pages[doc.actualPage].canvas.getActiveObject();
	if (obj === undefined || obj === null) return;
	setDoc({
		...doc,
		lastElementSelected: obj
	});
};