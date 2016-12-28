// @flow
import React, {Component} from 'react';

class SearchBox extends Component {

    state : {
        value: string
    };

    props : {
        onChange: (string) => any
    };

    constructor(props: {}, context: {}) {
        super(props, context);
        this.state = {
            value: ''
        };
    }

    onChange (e : Event) {
        if (e.target instanceof HTMLInputElement) {
            let value = e.target.value;
            this.setState({value});
            this.props.onChange(value);
        }
    }

    render () {
        return <div>
            <input type="text" value={this.state.value} onChange={this.onChange.bind(this)} />
        </div>;
    }

}

export default SearchBox;