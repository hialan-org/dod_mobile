import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import * as GoogleSignIn from "expo-google-sign-in";
import {LOGIN_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.props.logout();
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginTop: 50, fontSize: 25 }}>Settings</Text>
                <Text style={{ marginTop: 50, fontSize: 25 }}>{this.props.user.email}</Text>
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text>Go to Home Tab</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Details')}>
                        <Text>Open Detail Screen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.signOutAsync()}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
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