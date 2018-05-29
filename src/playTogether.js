import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Profile, Find, Login, Register } from "./components/screens";
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { firebase } from "react-native-firebase";

const Tabs = createBottomTabNavigator({
    profile: Profile,
    find: Find
})

const IntroStack = createStackNavigator({
    login: Login,
    register: Register
})

const MainStack = createSwitchNavigator({
    intro: IntroStack,
    main: Tabs
})


class playTogether extends Component {
    render() {
        return(
            <MainStack />
        )
    }
}



export default playTogether;