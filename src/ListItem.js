import React from 'react';
import classes from './ListItem.module.css';
import Ripples from 'react-ripples';

const getTime = date => {
    let hr = date.getHours();
    let min = date.getMinutes();
    let ampm = null;
    if(hr > 12) {
        ampm = 'PM';
        hr = hr - 12;
    } else if(hr === 12) {
        ampm = 'PM';
    } else {
        ampm = 'AM';
        if(hr === 0) {
            hr = 12;
        }
    }
    if(min < 10) {
        min = '0' + min;
    }
    return hr + ':' + min + ' ' + ampm;
}

const getDate = date => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date_ = date.getDate() + ' ' + months[date.getMonth()];
    return date_;
}

const ListItem = React.forwardRef((props, ref) => {
    return (
        <Ripples color='rgba(255,255,255,0.3)'>
            <table className={classes.table} ref={ref}>
                <tbody onClick={props.click}>
                    <tr>
                        <td rowSpan="2" className={classes.thumbnailContainer}>
                            <img alt='thumbnail' src={props.article.Image} className={classes.thumbnail}></img>
                        </td>
                        <td className={classes.title}>{props.article.Title}</td>
                    </tr>
                    <tr>
                        <td className={classes.desc}>{props.article.ReadTime}<span>&#8226;</span>{' ' + getTime(props.article.Date) + ' '}<span>&#8226;</span>{' ' + getDate(props.article.Date)}</td>
                    </tr>
                </tbody>
            </table>
        </Ripples>
    );
});

export default ListItem;