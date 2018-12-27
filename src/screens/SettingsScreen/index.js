import React, { Component } from 'react'
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to RainbowFilters
                </Text>
                <Text style={styles.instructions}>
                    To get started, select a picture to edit
                </Text>
                <Text style={styles.instructions}>
                    Swipe the picture to select filter and adjust the parameters
                </Text>
                <Text style={styles.instructions}>
                    Tap the Save button to save after adjusting
                </Text>
                <Icon.Button name="arrow-left" style={{color: 'white'}} onPress={this.back.bind(this)}> Back </Icon.Button>
            </View>
        );
    }

    back(){
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    welcome:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    instructions:{
        textAlign: 'center',
        color: 'white',
        marginBottom: 5
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        position: 'absolute',

        top:200,
        right:20

    },
    button: {
        height:20,
        backgroundColor: '#DDDDDD',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 15,
        top:350,
    }

})