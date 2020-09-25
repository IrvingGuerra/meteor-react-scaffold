export const changeSize = (document, size) => {
    let obj = document.canvas.getActiveObject();
    if(obj === undefined || obj === null){
        return;
    }
    obj.setSelectionStyles({
        fontSize: size === 'plus' ? (obj.fontSize += 1) : (obj.fontSize -= 1),
    });
    document.canvas.renderAll();
};