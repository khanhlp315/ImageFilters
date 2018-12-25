import React, { Component } from 'react'
import{
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native'
import PropTypes from 'prop-types'

import Button from 'react-native-nativebutton'
import ImageProgress from 'react-native-image-progress'

class MediaItem extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        var { width } = Dimensions.get('window');
        this.imageSize = ((width - (this.props.imagesPerRow+1) * this.props.imageMargin) / this.props.imagesPerRow);
    }

    render(){
        var {item} = this.props
        var ImageComponent = this.props.showLoading? ImageProgress:Image

        return (
            <Button
                key={item.node.image.uri}
                style={{marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin}}
                onPress={event => this._handleClick(item.node.image)}>
                <ImageComponent
                    source={{ uri: item.node.image.uri }}
                    style={{height: this.imageSize, width: this.imageSize}} >
                </ImageComponent>
            </Button>
        )
    }

    _handleClick(item){
        this.props.onClick(item)
    }

}

var styles = StyleSheet.create({
    checkIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
    },
})

MediaItem.defaultProps = {
    item: {},
}

MediaItem.propTypes = {
    item: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedMarker: PropTypes.element,
    imageMargin: PropTypes.number.isRequired,
}


export default MediaItem
