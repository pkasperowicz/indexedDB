// @flow
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Images from './Images';
import Database from './Database';
import type Image from './model/Image';

class App extends Component {

    state: {
      images: Image[]
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            images: []
        };
    }

    componentWillMount() {
        Database.getImages().then(images => this.setState({images}));
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="App-intro">
                    <Images images={this.state.images}/>
                </div>
            </div>
        );
    }
}

export default App;
