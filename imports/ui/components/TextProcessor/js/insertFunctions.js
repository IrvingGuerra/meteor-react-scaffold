import {fabric} from "./init";

export const addText = (doc) => {
    const newTextBox = new fabric.NewTextBox('Label', {
        left: doc.pages[doc.actualPage].margin,
        top: doc.pages[doc.actualPage].margin,
        width: doc.pages[doc.actualPage].canvas.width - doc.pages[doc.actualPage].margin * 2,
        fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: 'normal',
        fill: '#000000', //Font Color
        textAlign: 'left',
        backgroundColor: 'white',
        padding: 0,
        id: 'label'
    });
    doc.pages[doc.actualPage].canvas.add(newTextBox);
}

export const addTitle = (doc) => {
    const eje = new fabric.NewTextBox('Titulo', {
        left: doc.pages[doc.actualPage].margin,
        top: doc.pages[doc.actualPage].margin,
        width: doc.pages[doc.actualPage].canvas.width - doc.pages[doc.actualPage].margin * 2,
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        //borderRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'black',
        padding: 25,
        id: 'title'
    });
    doc.pages[doc.actualPage].canvas.add(eje);
}

export const addInput = (doc) => {
    const eje = new fabric.NewTextBox('_________________', {
        left: doc.pages[doc.actualPage].margin,
        top: doc.pages[doc.actualPage].margin,
        width: 50,
        fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: 'normal',
        fill: '#000000', //Font Color
        textAlign: 'left',
        backgroundColor: 'white',
        padding: 0,
        id: 'input'
    });
    doc.pages[doc.actualPage].canvas.add(eje);
}