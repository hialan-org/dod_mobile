import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from "react-native";
import GoogleSignInButton from "../components/GoogleSignInButton";
import * as AppAuth from 'expo-app-auth';
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {LOGIN_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import {Facebook} from 'react-content-loader/native'

const Loader = () => <Facebook backgroundColor="rgba(204, 204, 204,0.06)"/>


const {OAuthRedirect, URLSchemes} = AppAuth;

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const {type, user} = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this.props.login(user.auth.accessToken)
            } else {
                alert("Type error: " + type);
            }
        } catch ({message}) {
            alert('login: Error:' + message);
        }
    };

    onPress = () => {
        this.signInAsync();
    };

    get buttonTitle() {
        return this.props.user.accessToken ? 'Sign-Out of Google' : 'Sign-In with Google';
    }

    render() {
        const scheme = {
            OAuthRedirect,
            URLSchemes,
        };
        // const { user } = this.state;

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <>
                    {this.props.loading ? Loader() : (
                        <>
                            <Text>Dog of The Dow</Text>
                            <GoogleSignInButton onPress={this.onPress}>
                                {this.buttonTitle}
                            </GoogleSignInButton>
                            <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
                        </>
                    )}
                </>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading.general,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        login: (accessCode) => {
            return dispatch({type: LOGIN_REQUESTED, payload: accessCode})
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);