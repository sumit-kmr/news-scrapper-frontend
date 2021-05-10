import React, { Component } from 'react';
import classes from './App.module.css';
import WelcomePage from './WelcomePage';
import ChooseCategories from './ChooseCategories';
import TopNews from './TopNews';
import FullArticle from './FullArticle';
import BackBlur from './BlurBack';
import Background from './assets/bag_home.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.appRef = React.createRef();
    this.state = {
      currentPage: 'welcome',
      selectedCategories: null,
      selectedArticle: null,
      loadedArticle: null
    }
  }

  articles = null;
  indexToView = -1;

  welcomeSetupHandler = () => {
    this.setState({ currentPage: 'choose' })
  }

  chooseCategoriesContinueHandler = (selectedCategories) => {
    this.articles = null;
    this.setState({
      currentPage: 'topNews',
      selectedCategories: selectedCategories
    });
    localStorage.setItem('categories', JSON.stringify(selectedCategories));
  }

  listItemClickHandler = (article, articles, index) => {
    setTimeout(() => {
      this.setState({
        currentPage: 'fullArticle',
        selectedArticle: article
      })
    }, 100)
    this.articles = articles;
    this.indexToView = index;
  }

  fullArticleBackButtonHandler = () => {
    this.setState({ currentPage: 'topNews' });
  }

  componentDidMount() {
    const savedCategories = JSON.parse(localStorage.getItem('categories'));
    if (savedCategories && this.state.currentPage === 'welcome') {
      this.setState({
        currentPage: 'topNews',
        selectedCategories: savedCategories
      });
    }
  }

  render() {
    let currPage = null;
    switch (this.state.currentPage) {
      case 'welcome': currPage = <BackBlur background={Background}><WelcomePage setupBtn={this.welcomeSetupHandler} /></BackBlur>; break;
      case 'choose': currPage = <BackBlur background={Background}><ChooseCategories continueHandler={this.chooseCategoriesContinueHandler} categories={this.state.selectedCategories} /></BackBlur>; break;
      case 'topNews': currPage = <TopNews categories={this.state.selectedCategories} 
                                          listitemclick={this.listItemClickHandler} 
                                          chooseHandler={this.welcomeSetupHandler} 
                                          articles={this.articles}
                                          index={this.indexToView} />; break;
      case 'fullArticle': currPage = <FullArticle article={this.state.selectedArticle} backBtnHandler={this.fullArticleBackButtonHandler} />; break;
      default: currPage = null;
    }
    return (
      <div className={classes.App} ref={this.appRef}>
        {currPage}
      </div>
    );
  }
}

export default App;
