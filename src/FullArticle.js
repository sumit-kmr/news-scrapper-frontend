/*global chrome*/
import React, { Component } from 'react';
import classes from './FullArticle.module.css';
import BlurBack from './BlurBack';
import Background from './assets/bag_article.jpg';
import BackButton from './BackButton';
import FloatingButton from './FloatingButton';

class FullArticle extends Component {
    constructor(props) {
        super(props);
        this.childDiv = React.createRef();
    }

    componentDidMount() {
        this.childDiv.current.scrollIntoView()
    }

    openLink = (url) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: url});
        });
    }

    render() {
        return (
            <BlurBack background={Background} fix>
                <div className={classes.mainContainer} ref={this.childDiv}>
                    <BackButton leftSpace={0.5} clicklistner={this.props.backBtnHandler}/>
                    <FloatingButton clicklistner={() => this.openLink(this.props.article.Link)}/>
                    <div className={classes.imgContainer}>
                        <img src={this.props.article.Image} alt='' className={classes.image}></img>
                    </div>
                    <h2 className={classes.heading}>{this.props.article.Title}</h2>
                    <p className={classes.content}>{this.props.article.Text}</p>
                    <p className={classes.end}>* * *</p>
                </div>
            </BlurBack>
        );
    }
}

export default FullArticle;