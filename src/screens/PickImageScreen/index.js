import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import MediaPicker from './media-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import AutoHeightImage from 'react-native-auto-height-image';

export default class PickImageScreen extends Component
{
    didFocusSubscription = null;
    constructor(props) {
        super(props);
        this.state={
            selectedImage: null,
            width: -1,
            height: -1
        }
    }

    select(){
        console.log(this.state.selectedImage);
    }

    takePicture(){
        this.props.navigation.navigate("TakePhotoScreen");
    }
    use(){
        var width = this.state.width;
        var height = this.state.height;
        if(width>0 && height > 0){
            this.setState({
                selectedImage: null,
                width: -1,
                height: -1
            });
            this.props.navigation.navigate("FilterScreen", {
                selectedImage: this.state.selectedImage,
                width: width,
                height: height
            });
        }
    }

    cancel(){
        this.setState({
            selectedImage: null,
            width: -1,
            height: -1
        })
    }

    settings(){
        this.props.navigation.navigate("SettingsScreen");
    }

    componentDidMount(){
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                if(this.mediaPicker != null)
                {
                    this.mediaPicker.reloadCameraRoll();
                }
            }
        );
    }

    componentWillUnmount(){
        if(this.didFocusSubscription != null)
        {
            this.didFocusSubscription.remove();
            this.didFocusSubscription = null;
        }
    }

    render(){
        if(this.state.selectedImage === null)
        {
            return (
                <View style={styles.container}>
                    <Image  source={require('./resources/logo.gif')} style={{height: 150, width: 150 }}/>
                    <MediaPicker
                        ref={ref => {
                            this.mediaPicker = ref;
                        }}
                        groupTypes={'All'}
                        batchSize={25}
                        maximum={1}
                        assetType={'Photos'}
                        imagesPerRow={3}
                        imageMargin={5}
                        callback={image => {
                            Image.getSize(image, (width, height) => {
                                this.setState({
                                    selectedImage: image,
                                    width: width,
                                    height: height
                                });
                            }, (error) => {
                            });
                        }}
                        backgroundColor={'black'}
                    />
                    <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                        <Icon.Button name="camera" onPress={this.takePicture.bind(this)}>
                            Take a new photo
                        </Icon.Button>
                        <View style={{width: 50}}/>
                        <Icon.Button name="question" onPress={this.settings.bind(this)}>
                            Help
                        </Icon.Button>
                    </View>

                </View>
            );
        }
        else {
            return(
                <View style={styles.container}>
                    <ScrollView>
                        <AutoHeightImage source={{uri: this.state.selectedImage}} width={Dimensions.get('window').width}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                            <Icon.Button name="times" style={{color: 'white'}} onPress={this.cancel.bind(this)}> Back </Icon.Button>
                            <View style={{width: 50}}/>
                            <Icon.Button name="check" style={{color: 'white'}} onPress={this.use.bind(this)}> Use </Icon.Button>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'

    },
});