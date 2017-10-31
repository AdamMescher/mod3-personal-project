import React from "react";
import HeaderNav from './HeaderNav.js';
import { shallow } from "enzyme";

describe('HeaderNav', () => {
  const user = {
    id: 'abc',
    name: 'Lola'
  };
  const house = {
    houseKey: 'abc',
    houseName: 'fake house',
    houseCode: '6666',
    users: [user]
  };
  const mockFn = jest.fn();
  const wrapper = shallow(<HeaderNav
    currentUser={user}
    usersHouse={house}
    signOut={mockFn}
    leaveHouse={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match snap', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a title and subtitle', () => {
    const title = wrapper.find('h1');
    const subtitle = wrapper.find('h3');

    expect(title.length).toEqual(1);
    expect(subtitle.length).toEqual(1);
  });

  it('should have seven links', () => {
    const link = wrapper.find('Link');

    expect(link.length).toEqual(7);
  });

  it('should have signout and leavehouse div', () => {
    const signoutDiv = wrapper.find('.signout-div');
    const leavehouseDiv = wrapper.find('.leave-house-div');

    expect(signoutDiv.length).toEqual(1);
    expect(leavehouseDiv.length).toEqual(1);
  });

  it('should render userStuff', () => {
    const userStuff = wrapper.find('.user-stuff');
    const greeting = wrapper.find('.greeting');
    const buttons = wrapper.find('button');

    expect(userStuff.length).toEqual(1);
    expect(greeting.text()).toEqual('Welcome to fake house,  Lola.');
    expect(buttons.length).toEqual(2);
  });

  it('should not render userStuff when no user', () => {
    const altWrapper = shallow(<HeaderNav
      currentUser={{}}
      usersHouse={{}}
      signOut={mockFn}
      leaveHouse={mockFn}/>);
    const userStuff = altWrapper.find('.user-stuff');

    expect(userStuff.length).toEqual(0);
  });

  it('should fire actions', () => {
    const button1 = wrapper.find('button').first();
    const button2 = wrapper.find('button').last();
    const signoutDiv = wrapper.find('.signout-div');
    const leavehouseDiv = wrapper.find('.leave-house-div');

    button1.simulate('click');
    button2.simulate('click');
    signoutDiv.simulate('click');
    leavehouseDiv.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(4);
  });
});
