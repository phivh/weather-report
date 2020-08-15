import React from 'react';
import { shallow } from 'enzyme';

import { item } from './mock-data';
import { WeatherItem } from './components/weatherItem';

describe('WeatherItem', () => { 

  test('Should render WeatherItem', () => {
    const wrapper = shallow(<WeatherItem {...item} />);

    expect(wrapper.find(WeatherItem)).toHaveLength(1);
  });

  test('Should render the info box with text', () => {
    const wrapper = shallow(<WeatherItem {...item} />);
    expect(wrapper.find('h3').text()).toBe('A');
  });
});