import {fabric} from "./init";

export const addText = (document) => {
    const itext = new fabric.Textbox('Escriba titulo de documento', {
        left: document.margin,
        top: document.margin,
        width: document.canvas.width - document.margin * 2,
        fontSize: 15,
        fill: 'black',
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        hasControls: true,
        lockMovementX: false,
        lockMovementY: false,
        hoverCursor: 'text',
    });
    document.canvas.add(itext);
}

export const addTitle = (document) => {
    /*
    const itext = new window.fabric.Text('Escriba titulo de documento', {
        left: document.margin,
        top: document.margin,
        width: document.canvas.width - document.margin * 2,
        fontSize: 24,
        fill: 'white',
        rx: 10,
        backgroundColor: 'black',
        borderColor: 'red',
        borderRadius: 15,
        borderWidth: 10,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        textAlign: 'left',
        hasControls: true,
        hasRotatingPoint: false,
        lockMovementX: false,
        lockMovementY: false,
        hoverCursor: 'text',
    });

     */
    const eje = new fabric.NewTextBox('Titulo', {
        left: document.margin,
        top: document.margin,
        width: document.canvas.width - document.margin * 2,
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: 'white',
        textAlign: 'center',
        //borderRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: 'black',
        padding: 25
    });
    document.canvas.add(eje);
}