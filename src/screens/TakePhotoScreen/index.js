import React, {Component} from 'react';
import {CameraRoll, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class PickImageScreen extends Component{
    constructor(props) {
        super(props);
        this.state={
            camera: 'front'
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <Icon.Button name="retweet" onPress={()=>{
                        if(this.state.camera === 'front'){
                            this.setState({
                                camera: 'back'
                            })
                        }
                        else if(this.state.camera === 'back'){
                            this.setState({
                                camera: 'front'
                            })
                        }
                    }}>
                        Change camera
                    </Icon.Button>
                </View>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={this.state.camera === 'back'?RNCamera.Constants.Type.back: RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <Icon.Button name="camera" onPress={this.takePicture.bind(this)}>
                        Take a photo
                    </Icon.Button>
                </View>
            </View>
        );
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, doNotSave: false };
            await this.camera.takePictureAsync(options).then(data => {
                CameraRoll.saveToCameraRoll(data.uri);
                this.props.navigation.goBack();
            });
        }
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
