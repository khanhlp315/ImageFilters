import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, View, Dimensions, Text, PanResponder } from 'react-native';
import {Amaro, Brannan, Earlybird, F1977, Hefe, Hudson, Inkwell, Lokofi, LordKelvin, Nashville, Normal, Rise, Sierra, Sutro, Toaster, Valencia, XproII, Walden} from "./filters"
import {Surface} from 'gl-react-native'
import GLImage from'gl-react-image'
import SwipeRecognizer from 'react-native-swipe-recognizer';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class FilterScreen extends Component{
    constructor(props) {
        super(props);
        this._filters = [
            Normal,
            Amaro,
            Brannan,
            Earlybird,
            F1977,
            Hefe, Hudson, Inkwell,
            Lokofi, LordKelvin,
            Nashville,
            Rise,
            Sierra,
            Sutro,
            Toaster,
            Valencia,
            XproII,
            Walden
        ];
        this._filterNames=[
            "Normal",
            "Amaro",
            "Brannan",
            "Earlybird",
            "F1977",
            "Hefe", "Hudson", "Inkwell",
            "Lokofi", "LordKelvin",
            "Nashville",
            "Rise",
            "Sierra",
            "Sutro",
            "Toaster",
            "Valencia",
            "XproII",
            "Walden"
        ]

        this.state={
            index: 0
        };
    }

    componentWillMount() {
        const options = {
            minimumSwipeDistance: 100,
            minimumSwipeSpeed: 0.01,
        };
        const swipeRecognizer = new SwipeRecognizer(options);
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gestureState) => {
                return swipeRecognizer.isHorizontalSwipe(gestureState);
            },
            onPanResponderRelease: (e, gestureState) => {
                if (swipeRecognizer.isRightSwipe(gestureState)) {
                    this.onSwipeRight();
                };
                if (swipeRecognizer.isLeftSwipe(gestureState)) {
                    this.onSwipeLeft();
                };
            },
        });
    }


    onSwipeLeft(){
        console.log("Left");
        var tempIndex = this.state.index;
        tempIndex--;
        if(tempIndex < 0){
            tempIndex = this._filters.length - 1;
        }
        this.setState({
            index: tempIndex
        });
    }

    onSwipeRight(){
        console.log("Right");
        var tempIndex = this.state.index;
        tempIndex++;
        if(tempIndex >= this._filters.length){
            tempIndex = 0;
        }
        this.setState({
            index: tempIndex
        });
    }

    use(){

    }



    cancel(){
        this.props.navigation.goBack();
    }


    render(){
        var uri = this.props.navigation.getParam("selectedImage");
        var Filter = this._filters[this.state.index];
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <View style={styles.slide} { ...this._panResponder.panHandlers }>
                <Text>Swipe to select filter</Text>
                <View style={{height: 50}}/>
                <Surface style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width}}>
                    <Filter inputImageTexture={{uri:uri}}>
                    </Filter>
                </Surface>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                    <Icon.Button name="check" style={{color: 'white'}} onPress={this.use.bind(this)}> Use </Icon.Button>
                    <View style={{width: 50}}/>
                    <Icon.Button name="times" style={{color: 'white'}} onPress={this.cancel.bind(this)}> Back </Icon.Button>
                </View>
                <Text>Selected filter: {this._filterNames[this.state.index]}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})
