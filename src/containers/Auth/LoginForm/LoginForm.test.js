import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from './LoginForm'

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureMockStore();
const store = mockStore({});

describe('LoginForm', () => {
    it('should be true',() => {
        const expected = true;
        expect(expected).toBe(true);
    });

    it('should be click',() => {
        const wrapper = shallow(  <Provider store={store}>
           <LoginForm/>
        </Provider>);
        const text = wrapper.find("standard-password");
        expect(text.length).toBe(0);
    })

    it('should be click 2',() => {
        const wrapper = shallow(  <Provider store={store}>
           <LoginForm/>
        </Provider>);
        const text = wrapper.find("standard-password").instance().value = "123456"; ;
        expect(text.instance().value.length).toBe(6);
    })
})