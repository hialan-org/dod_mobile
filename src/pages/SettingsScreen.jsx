import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Text, Button} from "react-native-paper";
import {connect} from 'react-redux';
import * as GoogleSignIn from "expo-google-sign-in";
import {LOGIN_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import {common} from "../utils/stylesheet";
import {clearSecureStore} from "../utils";

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        await clearSecureStore();
        this.props.logout();
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 50, fontSize: 25 }}>Settings</Text>
                <Text style={{ marginTop: 50, fontSize: 25 }}>{this.props.user.email}</Text>
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        style={common.button}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={common.buttonText}>Go to Home Tab</Text>
                    </Button>
                    <Button
                        style={common.button}
                        onPress={() => this.props.navigation.navigate('Details')}>
                        <Text style={common.buttonText}>Open Detail Screen</Text>
                    </Button>
                    <Button
                        style={common.button}
                        onPress={() => this.signOutAsync()}>
                        <Text style={common.buttonText}>Sign Out</Text>
                    </Button>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
});

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch({type: LOGOUT_REQUESTED}),
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen);