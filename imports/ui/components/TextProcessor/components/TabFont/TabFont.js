import React from "react";
import { Grid, Tooltip, makeStyles, Select } from "@material-ui/core";
import {changeSize} from "../../js/fontFunctions";
import './TabFont.css';
import {STRINGS} from "../../constants/strings";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 13
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}

export default function TabFont(props) {
    const { document } = props;
    return (
        <Grid container direction="row" xs={12}>
            <Grid item xs={12} className="text-align-center">
                <Select
                    native
                >
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Pacifico">Pacifico</option>
                </Select>
                <BootstrapTooltip title={STRINGS.font.plus}>
                    <button type="button" className="noButton" onClick={() => changeSize(document,'plus')}>
                        <i className="fa fa-font icoFont">
                            <i className="up" />
                        </i>
                    </button>
                </BootstrapTooltip>
                <BootstrapTooltip title={STRINGS.font.less}>
                    <button type="button" className="noButton" onClick={() => changeSize(document,'less')}>
                        <i className="fa fa-font icoFont">
                            <i className="down" />
                        </i>
                    </button>
                </BootstrapTooltip>
            </Grid>
        </Grid>
    )
}