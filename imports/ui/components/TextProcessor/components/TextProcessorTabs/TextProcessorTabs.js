import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";
import TabFont from "../TabFont/TabFont";
import TabInsert from "../TabInsert/TabInsert";
import {DOC_COLORS} from "../../constants";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const styles = {
    default_tabStyle:{
        color: 'black',
        fontSize:15
    },
    active_tabStyle:{
        fontSize:15,
        color: DOC_COLORS.blue,
        backgroundColor: 'white',
    },
    tab:{
        backgroundColor: 'white'
    }
};

const useStyles = makeStyles(styles);

export default function TextProcessorTabs(props) {
    const { doc } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value}
                      onChange={handleChange}
                      indicatorColor="primary"
                      aria-label="simple tabs example"
                      centered
                      className={classes.tab}
                >
                    <Tab label="FUENTE" className={value === 0 ? classes.active_tabStyle : classes.default_tabStyle} />
                    <Tab label="INSERT" className={value === 1 ? classes.active_tabStyle : classes.default_tabStyle} />
                    <Tab label="PAGINA" className={value === 2 ? classes.active_tabStyle : classes.default_tabStyle} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <TabFont doc={doc}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabInsert doc={doc}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                3
            </TabPanel>
        </div>
    );
}