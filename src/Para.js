import React from 'react';
import classes from './Para.module.css';

const para = (props) => <p className={classes.Para}>{props.children}</p>

export default para;