import React from 'react';

const blurBack = (props) => {
    const imageUrl = props.background;
    return (
        <div style={

            {
                backgroundImage: 'url(' + imageUrl + ')',
                backgroundAttachment: props.fix ? 'fixed' : 'none',
                backgroundSize: 'contain',
                margin: '-10px',
                padding: '10px 10px 10px 10px'
            }
        } >{props.children}</div>
    );
} 

export default blurBack;