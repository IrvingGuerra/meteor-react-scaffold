import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import './TextProcessor.css';
import { DOC_MARGIN } from "./constants";
import {fabric} from "./js/init";
import TextProcessorTabs from "./components/TextProcessorTabs/TextProcessorTabs";

export default function TextProcessor(props) {
    const [document, setDocument] = useState({
        title: '',
        margin: DOC_MARGIN.md,
        canvas: null
    });
    useEffect(() => {
        const c = new fabric.Canvas('doc');
        c.freeDrawingBrush.color = 'black';
        c.freeDrawingBrush.width = 2;
        setDocument({
            ...document,
            canvas: c
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if(!document.canvas){
            return;
        }
    }, [document.canvas])
    return (
        <div>
            <div className="textProcessorHeader">
                <div className="textProcessorHeaderTitleContainer">
                    <input
                        value={document.name}
                        className="textProcessorHeaderTitleText"
                        placeholder="Trámite 1"
                        type="text"
                        onChange={(value) => setDocument({ ...document, title: value.target.value })}
                    />
                </div>
                <TextProcessorTabs document={document} />
            </div>
            <div className="textProcessorBody">
                <Grid container direction="row" xs={12} justify="center">
                    <div className="docPaper">
                        <canvas id='doc' className='doc' width={816.37795276} height={1054.488189}/>
                    </div>
                </Grid>
            </div>
        </div>
    )
}