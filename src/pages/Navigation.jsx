import React from 'react';
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import {connect} from 'react-redux';
import SettingsScreen from "./SettingsScreen";
import * as Constants from "expo-constants";
import * as GoogleSignIn from "expo-google-sign-in";
import {Platform, View} from "react-native";
import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGOUT_REQUESTED} from "../actions/types";
import DetailsScreen from "./DetailsScreen";
import EmptyScreen from "./EmptyScreen";
import InvestScreen from "./InvestScreen";
import Notifications from "./Notifications";
import BuyStocksScreen from "./BuyStocksScreen";
import {getUserInSecureStore} from "../utils";
import {translate} from "../i18n";
import StocksScreen from "./StocksScreen";

const isInClient = Constants.default.appOwnership === 'expo';
// const isInClient = false;
if (isInClient) {
    GoogleSignIn.allowInClient();
}

const clientIdForUseInTheExpoClient =
    '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com';

/*
 * Redefine this one with your client ID
 *
 * The iOS value is the one that really matters,
 * on Android this does nothing because the client ID
 * is read from the google-services.json.
 */
const yourClientIdForUseInStandalone = Platform.select({
    android:
        '152090196286-pkjcq0hb22e0s6c89skktrvqscjo1ok5.apps.googleusercontent.com',
    ios:
        '152090196286-b08vh6q33df5s2qtjo93ufgdf77thgj8.apps.googleusercontent.com',
});

const clientId = isInClient
    ? clientIdForUseInTheExpoClient
    : yourClientIdForUseInStandalone;

function MainNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="InvestScreen"
                component={InvestScreen}
                options={{
                    tabBarLabel: 'Invest',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wallet" color={color} size={size} />
                    ),
                }}/>
            <Tab.Screen
                name="StocksScreen"
                component={StocksScreen}
                options={{
                    tabBarLabel: 'Stocks',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="wallet" color={color} size={size} />
                    ),
                }}/>
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="message" color={color} size={size} />
                    ),
                }}/>
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cogs" color={color} size={size} />
                    ),
                }}/>
        </Tab.Navigator>
    );
}
MainNavigation.navigationOptions={
    headerShow: false,
}

class Navigation extends React.Component {
    componentDidMount() {
        this.initAsync();
    }

    initAsync = async () => {
        const user = await getUserInSecureStore();
        if(user){
            this.props.loginExist(user);
        } else {
            await GoogleSignIn.initAsync({
                // You may ommit the clientId when the firebase `googleServicesFile` is configured
                // clientId: '152090196286-pkjcq0hb22e0s6c89skktrvqscjo1ok5.apps.googleusercontent.com'
                clientId: clientId
            });
            this._syncUserWithStateAsync();
        }
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        if (user) {
            this.props.login(user.auth.accessToken);
        }
        // this.setState({ user });
    };

    render() {
        return (
                <NavigationContainer>
                    {this.props.user && this.props.user.accessToken ? (
                        <Stack.Navigator>
                            <Stack.Screen options={{ headerShown: false }} name="Main" component={MainNavigation}/>
                            <Stack.Screen name="Details" component={DetailsScreen}/>
                            <Stack.Screen name="BuyStocks" component={BuyStocksScreen}/>
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={LoginScreen}/>
                        </Stack.Navigator>
                    )}
                </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        login: (accessCode) => {
            return dispatch({type: LOGIN_REQUESTED, payload: accessCode})
        },
        loginExist: (user) => {
            return dispatch({type: LOGIN_SUCCESS, payload: user})
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);