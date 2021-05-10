import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    if (props.choose === true) {
        let buttonClass = null;
        let onclick = null;
        if(props.selArr.includes(props.id)) {
            buttonClass = classes.active;
            onclick = props.rem;
        } else {
            buttonClass = classes.Button;
            onclick = props.add;
        }
        return (
            <button
                className={buttonClass}          
                onClick={onclick}>{props.children}</button>
        );
    } else {
        return (
            <button
                className={classes.Button}
                onClick={props.clicklistener}>{props.children}</button>
        );
    }
}

export default button;