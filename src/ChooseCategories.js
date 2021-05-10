import React, { Component } from 'react';
import Heading from './Heading';
import Button from './Button';
import Alert from './Alert';

class ChooseCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: props.categories ? props.categories : [],
            showAlert: false
        }
        this.categories = ['Education', 'Auto', 'Business', 'India', 'Lifestyle', 'Entertainment', 'Sport', 'Technology', 'Trending', 'World']
    }

    addCategory = (category) => {
        const prevCategories = [...this.state.selectedCategories];
        prevCategories.push(category);
        this.setState({ selectedCategories: prevCategories });
    }

    removeCategory = (category) => {
        const filterArr = this.state.selectedCategories.filter((value) => value !== category);
        this.setState({ selectedCategories: filterArr });
    }

    showAlert = () => {
        this.setState({ showAlert: true })
        setTimeout(() => {
            this.setState({ showAlert: false })
        }, 1000);
    }

    continueButtonHandler = () => {
        if (this.state.selectedCategories.length === 0) {
            this.showAlert();
        } else {
            this.props.continueHandler(this.state.selectedCategories)
        }
    }

    render() {
        const buttons = this.categories.map((val) => {
            return <Button
                add={() => this.addCategory(val)}
                rem={() => this.removeCategory(val)}
                choose={true}
                selArr={this.state.selectedCategories}
                key={val}
                id={val}>{val}</Button>
        });
        let alert = null;
        if (this.state.showAlert) {
            alert =
                <div style={{ width: '100%' }}>
                    <Alert error={true} message='Select atleast one category' />
                </div>
        }
        return (
            <div style={{height: '500px', color: '#5cdb95', padding: '0px 10px'}}>
                <div>
                    <Heading>Choose categories of your interest</Heading>
                    {buttons}
                </div>
                <div style={{ marginTop: '70px' }}>
                    {
                        alert ? alert : <Button clicklistener={this.continueButtonHandler}>Continue</Button>
                    }
                </div>
            </div>
        );
    }
}

export default ChooseCategories;