import React, { Component } from 'react';
import './Images.css';
import Dropzone from 'react-dropzone';
import Database from './Database';
import uuid from 'node-uuid';
import type Image from './model/Image';


class Images extends Component {

    props: {
        images: Image[],
        update: Function
    };

    update (newFiles: File[]) {
        let addedFiles = newFiles.map(Database.addFile);

        Promise.all(addedFiles)
            .then(this.props.update);
    }

    render () {
        return <div>
                <Dropzone onDrop={this.update.bind(this)} >
                    Drop files here
                </Dropzone>
                <div>
                    <h2>Added Images</h2>
                    <div className="images">
                        {this.props.images.map(image =>
                            <div key={uuid.v4()} className="single-image">
                                <img className="preview" src={image.getUrl()} alt={image.caption} />
                            </div> )}
                    </div>
                </div>
            </div>;
    }

}

export default Images;