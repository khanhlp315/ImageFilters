import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, View, Dimensions, Text, PanResponder, CameraRoll, ToastAndroid} from 'react-native';
import {Amaro, Brannan, Earlybird, F1977, Hefe, Hudson, Inkwell, Lokofi, LordKelvin, Nashville, Normal, Rise, Sierra, Sutro, Toaster, Valencia, XproII, Walden} from "./filters"
import ImageEffects from './image-effects'
import {Surface} from 'gl-react-native'
import SwipeRecognizer from 'react-native-swipe-recognizer';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Slider} from "./slider";
import {DocumentDirectoryPath} from 'react-native-fs'


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
            index: 0,
            sepia: 0,
            hue: 0,
            blur: 0,
            sharpen: 0,
            negative: 0,
            contrast: 1,
            saturation: 1,
            brightness: 1,
            temperature: 6500
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
                }
                if (swipeRecognizer.isLeftSwipe(gestureState)) {
                    this.onSwipeLeft();
                }
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
        this._surface.captureFrame({ type: "png", format: "file", quality: 1, filePath:`${DocumentDirectoryPath}/${new Date().getTime()}.png` }).then(uri => {
            console.log(uri);
            CameraRoll.saveToCameraRoll(uri);
            ToastAndroid.show("Image saved", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        });


        // this._viewShot.capture().then(uri =>{
        //     console.log(uri);
        //     this.props.navigation.navigate("FilterScreen", {
        //         selectedImage: uri
        //     });
        //
        // });
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
            <View style={styles.slide} >
                <Text>Swipe to select filter</Text>
                <View { ...this._panResponder.panHandlers }>
                    <Surface
                        ref={ref => {
                            this._surface = ref;
                        }}
                        height={Dimensions.get('window').width} width={Dimensions.get('window').width}>
                        <ImageEffects sepia={this.state.sepia} hue={this.state.hue} blur={this.state.blur}
                                      sharpen={this.state.sharpen} negative={this.state.negative} contrast={this.state.contrast}
                                      saturation={this.state.saturation} brightness={this.state.brightness} temperature={this.state.temperature}>
                            <Filter>
                                {uri}
                            </Filter>
                        </ImageEffects>
                    </Surface>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                    <Icon.Button name="check" style={{color: 'white'}} onPress={this.use.bind(this)}> Save </Icon.Button>
                    <View style={{width: 50}}/>
                    <Icon.Button name="times" style={{color: 'white'}} onPress={this.cancel.bind(this)}> Back </Icon.Button>
                </View>
                <Text>Selected filter: {this._filterNames[this.state.index]}</Text>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Hue</Text>
                    <Slider style={{width: '100%'}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={2*Math.PI} step={0.1} value={this.state.hue} onValueChange={value => this.setState({ hue: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Blur</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={6} step={0.1} value={this.state.blur} onValueChange={value => this.setState({ blur: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Sepia</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={1} step={0.05} value={this.state.sepia} onValueChange={value => this.setState({ sepia: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Sharpen</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={1} step={0.05} value={this.state.sharpen} onValueChange={value => this.setState({ sharpen: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Negative</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={1} step={0.05} value={this.state.negative} onValueChange={value => this.setState({ negative: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Contrast</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={4} step={0.1} value={this.state.contrast} onValueChange={value => this.setState({ contrast: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Saturation</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={10} step={0.1} value={this.state.saturation} onValueChange={value => this.setState({ saturation: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Brightness</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={0} maximumValue={4} step={0.1} value={this.state.brightness} onValueChange={value => this.setState({ brightness: value })}/>
                </View>
                <View style={styles.sliderContainer} style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
                    <Text style={{alignSelf: 'center'}}>Temperature</Text>
                    <Slider style={{width: Dimensions.get('window').width}} minimumTrackTintColor='#13a9d6' thumbImage={require('./resources/thumb.png')} thumbStyle={styles.thumb} thumbTintColor='#0c6692'
                            minimumValue={2000} maximumValue={12000} step={0.1} value={this.state.temperature} onValueChange={value => this.setState({ temperature: value })}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    thumb: {
        width: 30,
        height: 30,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    sliderContainer:{
        flexDirection: 'row',
    }
})
