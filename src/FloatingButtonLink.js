import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/IconButton';
import OpenInNew from '@material-ui/icons/OpenInNew';

const FloatingButton = (props) => {
    const useStyles = makeStyles(theme => ({
        fab: {
            position: 'fixed',
            zIndex: 500,
            top: theme.spacing(53),
            left: theme.spacing(35),
            color: '#080c3c',
            backgroundColor: 'rgba(92,219,149,0.7)',
            '&:hover': {
                backgroundColor: 'rgba(92,219,149,1)'
            }
        },
    }));

    const muiClasses = useStyles();

    return (
        <div>
            <Fab color="primary" aria-label="add" className={muiClasses.fab} onClick={props.clicklistner}>
                <OpenInNew />
            </Fab>
        </div>

    );
}

export default FloatingButton;