import React from "react";
import {Button, Grid} from "@material-ui/core";
import {addText, addTitle} from "../../js/insertFunctions";

export default function TabInsert(props) {
    const { document } = props;
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => addText(document)}>
                Añadir campo de texto
            </Button>
            <Button variant="contained" color="primary" onClick={() => addTitle(document)}>
                Añadir titulo
            </Button>
            <Button variant="contained" color="primary" onClick={() => addTitle(document)}>
                Añadir subtitulo
            </Button>
        </div>
    )
}