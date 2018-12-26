import React, { Component } from 'react'
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'
// import ToggleSwitch from 'toggle-switch-react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <View>
                <View style={styles.textContainer}>
                    <Text>
                        ChangeBackgroundColor
                    </Text>
                </View>
                <View style={styles.iconContainer}>

                    <Icon
                        name='logo-facebook'
                    />
                    {/*<SocialIcon*/}

                        {/*type='instagram'*/}
                    {/*/>*/}
                    {/*<SocialIcon*/}
                        {/*type='facebook'*/}
                    {/*/>*/}
                </View>
                <View style={ styles.buttonContainer}>
                    {/*<ToggleSwitch*/}
                        {/*isOn={false}*/}
                        {/*onColor='green'*/}
                        {/*offColor='black'*/}
                        {/*label='Dark'*/}

                        {/*labelStyle={{color: 'black'}}*/}
                        {/*size='medium'*/}
                        {/*onToggle={ (isOn) => console.log('changed to : ', isOn,) }*/}
                    {/*/>*/}
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        onPress={this.onPress}
                    >
                        <Text> LEARN MORE </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.onPress}
                    >
                        <Text > CONTACT US </Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        flexDirection:'column',
        position: 'absolute',
        top:200
    },
    iconContainer:{
        flex:1,
        flexDirection:'row',
        position:'absolute',
        top:250,
        left : 80,
        justifyContent:'space-between'
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