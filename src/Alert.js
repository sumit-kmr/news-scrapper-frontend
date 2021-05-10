import React from 'react';
import classes from './Alert.module.css';

const alert = (props) => {
    return (
            <div className={props.error ? classes.error : classes.success}>
                {props.message}
            </div>
    );
}

export default alert;