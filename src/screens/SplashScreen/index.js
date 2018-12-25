import React, {Component} from 'react';
import {Image, PermissionsAndroid, View, StyleSheet} from 'react-native';

export default class SplashScreen extends Component
{
    didFocusSubscription = null;
    async requestPermissions() {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'ImageFilters',
                    'message': 'ImageFilters access to your external storage '
                }
            );

            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'ImageFilters',
                    'message': 'ImageFilters access to your external storage '
                }
            );
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'ImageFilters',
                    'message': 'ImageFilters access to your camera '
                }
            );

            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    'title': 'ImageFilters',
                    'message': 'ImageFilters access to your audio '
                }
            );

            setTimeout(()=>{
                this.props.navigation.navigate("PickImageScreen");
            }, 5000);
        } catch (err) {
            await this.requestPermissions();
            console.warn(err);
        }
    }

    async componentDidMount()
    {
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                setTimeout(()=>{
                    this.props.navigation.navigate("PickImageScreen");
                }, 5000);
            }
        );
        await this.requestPermissions();
    }

    componentWillUnmount()
    {
        if(this.didFocusSubscription != null)
        {
            this.didFocusSubscription.remove();
            this.didFocusSubscription = null;
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Image source={require('./resources/logo.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'

    },
});
