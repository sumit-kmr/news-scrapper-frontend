import React, { Component } from 'react';
import Heading from './Heading';
import ListItem from './ListItem';
import Loader from './Loader';
import axios from 'axios';
import BlurBack from './BlurBack';
import DropDownMenu from './DropDownMenu';
import Background from './assets/bag_article.jpg';

class TopNews extends Component {

    constructor(props) {
        super(props);
        const endPointLinks = props.categories.map(category => {
            return 'http://ec2-18-224-95-122.us-east-2.compute.amazonaws.com/' + category.toLowerCase();
        })
        this.state = {
            endPoints: endPointLinks,
            isLoaded: props.articles !== null ? true : false,
            error: null,
            articles: props.articles ? props.articles : []
        }
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (this.props.articles === null) {
            this.loadArticles();
        } else {
            this.ref.current.scrollIntoView();
        }
    }

    loadArticles = async () => {
        this.setState({ isLoaded: false });
        const { endPoints } = this.state;
        let articles = [];
        let errorCount = 0;
        for (let i = 0; i < endPoints.length; i++) {
            await axios.get(endPoints[i])
                // eslint-disable-next-line
                .then(res => {

                    articles.push(...res.data.article);
                })
                // eslint-disable-next-line
                .catch(err => {
                    console.log(err);
                    errorCount++;
                })
            if (i === endPoints.length - 1) {
                if (errorCount === endPoints.length) {
                    this.setState({
                        error: new Error('Error in fetching some news'),
                        isLoaded: true
                    })
                } else {
                    articles = articles.map(article => {
                        const curr = { ...article };
                        const wordCount = curr.Text.split(' ').length;
                        const wpm = 220;
                        const readTime = Math.ceil(wordCount / wpm);
                        curr['ReadTime'] = readTime + ' min read ';
                        curr['Date'] = new Date(curr.Date);
                        if (isNaN(curr['Date'].getHours())) {
                            const slices = article.Date.split(' ');
                            slices.pop();
                            slices.push('+0530');
                            const correctedDate = slices.join(' ');
                            curr['Date'] = new Date(correctedDate);
                        }
                        return curr;
                    })
                    articles.sort((d1, d2) => d2.Date - d1.Date);
                    this.setState({
                        isLoaded: true,
                        articles: articles
                    })
                }
            }
        }
    }

    render() {
        const { articles, isLoaded, error } = this.state;
        if (!isLoaded) {
            return <Loader />;
        } else {
            if (error) {
                return (
                    <div>
                        <DropDownMenu refreshHandler={this.loadArticles} chooseHandler={this.props.chooseHandler} />
                        <Heading fromTopNews={true}>Error :(</Heading>
                    </div>
                );
            } else {
                const listItems = articles.map((article, index) => {
                    let listItem = null;
                    if(this.props.index !== -1 && index === this.props.index) {
                        listItem = <ListItem 
                                        article={article}
                                        key={index}
                                        click={() => this.props.listitemclick(article, articles, index)}
                                        ref={this.ref} />
                    } else {
                        listItem = <ListItem 
                                        article={article}
                                        key={index}
                                        click={() => this.props.listitemclick(article, articles, index)} />
                    }
                    return listItem;
                });
                return (
                    <div style={{ padding: '10px 5px 0px' }}>
                        <BlurBack background={Background} fix>
                            <DropDownMenu refreshHandler={this.loadArticles} chooseHandler={this.props.chooseHandler} />
                            <Heading fromTopNews={true}>Top news</Heading>
                            {listItems}
                        </BlurBack>
                    </div>
                );
            }
        }
    }
}

export default TopNews;