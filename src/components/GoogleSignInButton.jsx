import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {Button, Text} from 'react-native-paper';
import {common} from "../utils/stylesheet";

const googleIcon = {
    uri:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png',
};

export default class GoogleSignInButton extends React.PureComponent {
    render() {
        const { children, style, ...props } = this.props;
        return (
            <Button
                // icon={googleIcon}
                icon={({ size, color }) => (
                    <Image source={googleIcon} style={common.iconImage} />
                )}
                style={common.button}
                {...props}
            >
                <Text style={common.buttonText}>{children}</Text>
            </Button>
        );
    }
}