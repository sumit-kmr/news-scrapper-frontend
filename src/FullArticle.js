/*global chrome*/
import React, { Component } from 'react';
import classes from './FullArticle.module.css';
import BlurBack from './BlurBack';
import Background from './assets/bag_article.jpg';
import BackButton from './BackButton';
import FloatingButtonLink from './FloatingButtonLink';
import FloatingButtonPlay from './FloatingActionButtonPlay';

class FullArticle extends Component {
    constructor(props) {
        super(props);
        this.childDiv = React.createRef();
    }

    componentDidMount() {
        this.childDiv.current.scrollIntoView();
    }

    componentWillUnmount() {
        window.speechSynthesis.cancel();
    }

    openLink = (url) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: url});
        });
    }

    timeout = null

    timer = () => {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
        this.timeout = setTimeout(this.timer, 10000);
    }


    readArticle = (article) => {
        if('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            this.timeout = setTimeout(this.timer, 10000);
            var msg = new SpeechSynthesisUtterance(article);
            msg.lang = 'en-US';
            msg.rate = 0.9;
            msg.onend = () => clearTimeout(this.timeout)
            window.speechSynthesis.speak(msg);
        } else {
            console.log("Can't play audio");
        }
    }

    render() {
        return (
            <BlurBack background={Background} fix>
                <div className={classes.mainContainer} ref={this.childDiv}>
                    <BackButton leftSpace={0.5} clicklistner={this.props.backBtnHandler}/>
                    <FloatingButtonLink clicklistner={() => this.openLink(this.props.article.Link)}/>
                    <FloatingButtonPlay clicklistner={() => this.readArticle(this.props.article.Text)}/>
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