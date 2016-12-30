import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const image = { caption: 'test' };

jest.mock('./Database', () => ({
    getImages: jest.fn(() => Promise.resolve([image]))
}));

beforeEach(() => {
    const Database = require('./Database');
    Database.getImages.mockClear();
});

it('calls getImages when Images component updated', () => {
    const wrapper = shallow(<App />);

    const Database = require('./Database');
    expect(Database.getImages).toHaveBeenCalledTimes(1);

    wrapper.find('Images').props().update();

    expect(Database.getImages).toHaveBeenCalledTimes(2);

});

it('renders and gets Images', (done) => {
    const Database = require('./Database');

    const wrapper = shallow(<App />);

    expect(Database.getImages).toHaveBeenCalledTimes(1);

    setTimeout(() => {
        expect(wrapper.state('images')).toEqual([image]);

        const images = wrapper.find('Images');

        expect(images.prop('images')).toEqual([image]);

        done();
    }, 20);
});
