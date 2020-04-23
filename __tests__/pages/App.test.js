import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

jest.mock('expo', () => {
    const Constants = {};
    Object.defineProperty(Constants, 'platform', { get: jest.fn() });
    return {
        SecureStore: {
            getItemAsync: jest.fn(),
            setItemAsync: jest.fn(),
            deleteItemAsync: jest.fn()
        },
        WebBrowser: {
            openAuthSessionAsync: jest.fn()
        },
        Constants
    };
});

describe.skip('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});