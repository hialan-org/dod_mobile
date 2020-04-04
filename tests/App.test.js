import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import App from "../App";

test('should verify two questions', () => {
    console.log(render(<App {...props} />).toJSON());
    //
    //
    // fireEvent.press(getByText('submit'));
    //
    // expect(props.verifyQuestions).toBeCalledWith({
    //     '1': { q: 'q1', a: 'a1' },
    //     '2': { q: 'q2', a: 'a2' },
    // });
});