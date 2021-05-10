import React from 'react';
import classes from './Heading.module.css'

const heading = (props) => {
    return (
        <div className={props.fromTopNews ? classes.Heading_ : classes.Heading}>
            <h1>{props.children}</h1>
        </div>
    );
}

export default heading;