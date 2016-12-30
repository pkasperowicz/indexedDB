import React from 'react';
import { mount } from 'enzyme';
import SearchBox from './SearchBox';

it('calls onChange when input change', () => {
    let onChangeFunction = jest.fn();
    const component = mount(<SearchBox onChange={onChangeFunction} />);

    component.find('input').simulate('change', { target: { value: 'changedInput' }});

    expect(onChangeFunction).toHaveBeenCalledWith('changedInput');
    expect(component.state('value')).toEqual('changedInput');
});
