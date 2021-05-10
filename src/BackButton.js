import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const BackButton = (props) => {
    const useStyles = makeStyles(theme => ({
        fab: {
            position: 'fixed',
            zIndex: 500,
            top: theme.spacing(2),
            left: theme.spacing(props.leftSpace ? props.leftSpace : 1.5),
            color: '#f64c72',
            backgroundColor: 'rgba(8,12,60,0.5)',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.4)'
            }
        },
    }));

    const muiClasses = useStyles();

    return (
        <div>
            <Fab color="primary" aria-label="add" className={muiClasses.fab} size="small" onClick={props.clicklistner}>
                <ArrowBack />
            </Fab>
        </div>

    );
}

export default BackButton;