import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Images from './Images';
import Database from './Database';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            files: []
        };
    }

    componentWillMount() {
        Database.getFiles().then(files => this.setState({files}));
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    <Images files={this.state.files}/>
                </p>
            </div>
        );
    }
}

export default App;
