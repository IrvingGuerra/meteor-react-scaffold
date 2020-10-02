import React from "react";
import {Button, Grid} from "@material-ui/core";
import {addText, addTitle} from "../../js/insertFunctions";

export default function TabInsert(props) {
    const { doc } = props;
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => addText(doc)}>
                Añadir campo de texto
            </Button>
            <Button variant="contained" color="primary" onClick={() => addTitle(doc)}>
                Añadir titulo
            </Button>
            <Button variant="contained" color="primary" onClick={() => addTitle(doc)}>
                Añadir subtitulo
            </Button>
        </div>
    )
}