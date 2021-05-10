import React from 'react'
import Heading from './Heading'
import Para from './Para'
import Button from './Button'

const welcomePage = (props) => {
    return (
            <div style={{height: '500px', color: '#5cdb95'}}>
                <Heading>Welcome to<br />News Scrapper</Heading>
                <Para>Now read news articles of your choice from top news sites quickly and ad-free.</Para>
                <Button clicklistener={props.setupBtn}>Setup</Button>
            </div>
    )
}

export default welcomePage;