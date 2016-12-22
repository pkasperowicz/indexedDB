import React, { Component } from 'react';
import './Images.css';
import Dropzone from 'react-dropzone';
import Database from './Database';


class Images extends Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            files: props.files
        };
    }

    componentWillReceiveProps (newProps) {
        if (newProps.files !== this.props.files) {
            let files = this.state.files.concat(newProps.files);
            this.setState({files});
        }
    }

    onDrop (newFiles) {
        newFiles.map(Database.addFile);
        let files = this.state.files.concat(newFiles);
        this.setState({files});
    }

    render () {
        return <div>
                <Dropzone onDrop={this.onDrop.bind(this)} >
                    Drop files here
                </Dropzone>
                <div>
                    <h2>Added Images</h2>
                    <div className="images">
                        {this.state.files.map(file =>
                            <div className="single-image">
                                <img className="preview" src={file.preview} alt={file.fileName} />
                            </div> )}
                    </div>
                </div>
            </div>;
    }

}

export default Images;