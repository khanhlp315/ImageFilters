import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, View, Text, Dimensions} from 'react-native';
import MediaPicker from './media-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import AutoHeightImage from 'react-native-auto-height-image';

export default class PickImageScreen extends Component
{
    didFocusSubscription = null;
    constructor(props) {
        super(props);
        this.state={
            selectedImage: null
        }
    }

    select(){
        console.log(this.state.selectedImage);
    }

    takePicture(){
        this.props.navigation.navigate("TakePhotoScreen");

    }
    use(){
        this.setState({
            selectedImage: null
        });
        this.props.navigation.navigate("FilterScreen", {
            selectedImage: this.state.selectedImage
        });
    }

    cancel(){
        this.setState({
            selectedImage: null
        })
    }

    componentDidMount(){
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                if(this.mediaPicker._mounted)
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
                    <Image  source={require('./resources/logo.png')} style={{height: 150, width: 150 }}/>
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
                        callback={image => this.setState({
                            selectedImage: image
                        })}
                        backgroundColor={'black'}
                    />
                    <Icon.Button name="camera" onPress={this.takePicture.bind(this)}>
                        Take a new photo
                    </Icon.Button>
                </View>
            );
        }
        else {
            return(
                <View style={styles.container}>
                    <AutoHeightImage source={{uri: this.state.selectedImage}} width={Dimensions.get('window').width}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
                        <Icon.Button name="check" style={{color: 'white'}} onPress={this.use.bind(this)}> Use </Icon.Button>
                        <View style={{width: 50}}/>
                        <Icon.Button name="times" style={{color: 'white'}} onPress={this.cancel.bind(this)}> Back </Icon.Button>
                    </View>

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