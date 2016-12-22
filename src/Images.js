import React, { Component } from 'react';
import './Images.css';
import Dropzone from 'react-dropzone';
import Database from './Database';
import uuid from 'node-uuid';
import type Image from './model/Image';


class Images extends Component {

    props: {
        images: Image[]
    };

    render () {
        return <div>
                <Dropzone onDrop={newFiles => newFiles.map(Database.addFile)} >
                    Drop files here
                </Dropzone>
                <div>
                    <h2>Added Images</h2>
                    <div className="images">
                        {this.props.images.map(image =>
                            <div key={uuid.v4()} className="single-image">
                                <img className="preview" src={image.getUrl()} alt={image.name} />
                            </div> )}
                    </div>
                </div>
            </div>;
    }

}

export default Images;