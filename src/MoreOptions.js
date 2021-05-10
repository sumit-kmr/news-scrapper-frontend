import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';

const MoreOptions = (props) => {
    const useStyles = makeStyles(theme => ({
        fab: {
            position: 'fixed',
            zIndex: 500,
            top: theme.spacing(2),
            left: theme.spacing(38),
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
                <MoreVert />
            </Fab>
        </div>

    );
}

export default MoreOptions;