import {fabric} from "./init";

export const addText = (doc) => {
    const itext = new fabric.Textbox('Escriba titulo de doco', {
        left: doc.pages[doc.actualPage].margin,
        top: doc.pages[doc.actualPage].margin,
        width: doc.pages[doc.actualPage].canvas.width - doc.pages[doc.actualPage].margin * 2,
        fontSize: 15,
        fill: '#000000',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        hasControls: true,
        lockMovementX: false,
        lockMovementY: false,
        hoverCursor: 'text',
    });
    doc.pages[doc.actualPage].canvas.add(itext);
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
        padding: 25
    });
    doc.pages[doc.actualPage].canvas.add(eje);
}