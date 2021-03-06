import React, {Component} from 'react';
import { Surface } from "gl-react-native";
import {Amaro, Brannan, Earlybird, F1977, Hefe, Hudson, Inkwell, Lokofi, LordKelvin, Nashville, Normal, Rise, Sierra, Sutro, Toaster, Valencia, Walden, XproII} from './screens/FilterScreen/filters/'
import MediaPicker from "./screens/PickImageScreen/media-picker"
import {createStackNavigator, createAppContainer} from 'react-navigation'

import SplashScreen from './screens/SplashScreen'
import PickImageScreen from './screens/PickImageScreen'
import TakePhotoScreen from './screens/TakePhotoScreen'
import FilterScreen from './screens/FilterScreen'
import SettingsScreen from './screens/SettingsScreen'

const navigationStack = createStackNavigator({
    // SettingsScreen: {
    //     screen: SettingsScreen,
    // },
    // FilterScreen: {
    //     screen: FilterScreen,
    // },
    SplashScreen: {
        screen: SplashScreen,
    },
    PickImageScreen: {
        screen: PickImageScreen,
    },
    TakePhotoScreen: {
        screen: TakePhotoScreen,
    },
    FilterScreen: {
        screen: FilterScreen,
    },
    SettingsScreen: {
        screen: SettingsScreen,
    }
}, { headerMode: 'none'});

const App = createAppContainer(navigationStack);

export default App;