import React, {Component} from 'react';
import {Image, TouchableHighlight, StyleSheet, View, Text} from 'react-native';
import {Amaro, Valencia, Hudson} from "./filters"
import {Surface} from 'gl-react-native'
import GLImage from'gl-react-image'

export default class FilterScreen extends Component{
    constructor(props) {
        super(props);
    }


    render(){
        var uri = this.props.navigation.getParam("selectedImage");
        return(
            <Surface style={{width: 640, height: 480}}>
                <Hudson inputImageTexture={{uri:uri}}>
                </Hudson>
            </Surface>

        )
    }
}