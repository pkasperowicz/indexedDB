// @flow
import React, {Component} from 'react';

type Props = {
    onChange: (string) => any
};

class SearchBox extends Component {

    state : {
        value: string
    };

    props : Props;

    constructor(props: Props, context: {}) {
        super(props, context);
        this.state = {
            value: ''
        };
    }

    onChange (e : Event) {
        let value = e.target.value || '';
        if (typeof value === 'string' || value instanceof String) {
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