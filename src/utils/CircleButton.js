import React, { Component } from "react";
import { ImageBackground, Image, StyleSheet, Text, View, Dimensions, Alert } from "react-native";
deviceWidth = Dimensions.get("window").width;
deviceHeight = Dimensions.get("window").height;

export default class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: props.icon_type>4?true:false,
            icon_type: props.icon_type,
            text_type: props.icon_type%5,
        }
        this.icon_set = [
            //normal
            require('../../assets/icon/temperature_icon_orange.png'),
            require('../../assets/icon/humidity_icon_orange.png'),
            require('../../assets/icon/pm1p0_icon_orange.png'),
            require('../../assets/icon/pm2p5_icon_orange.png'),
            require('../../assets/icon/pm10p_icon_orange.png'),
            //focus
            require('../../assets/icon/temperature_icon_white.png'),
            require('../../assets/icon/humidity_icon_white.png'),
            require('../../assets/icon/pm1p0_icon_white.png'),
            require('../../assets/icon/pm2p5_icon_white.png'),
            require('../../assets/icon/pm10p_icon_white.png'),]
        this.texe_set = ["TEMP","HUM","PM1.0","PM2.5","PM10"]
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({
            focused: nextProps.icon_type > 4 ? true : false,
            icon_type: nextProps.icon_type,
            text_type: nextProps.icon_type % 5,
        })
        
    }

    render() {
        return (
            <View style={{paddingTop:2}}>
                {this.state.focused ?
                    <View style={styles.circle_focused}>
                        <Image
                            style={styles.icon_style}
                            source={this.icon_set[this.state.icon_type]}
                        />
                        <Text style={styles.font_focused}>{this.texe_set[this.state.text_type]}</Text>
                    </View>
                :
                    <View style={styles.circle_normal}>
                        <Image
                            style={styles.icon_style}
                            source={this.icon_set[this.state.icon_type]}
                        />
                        <Text style={styles.font_normal}>{this.texe_set[this.state.text_type]}</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle_focused: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth/5.5,
        height: deviceWidth/5.5,
        backgroundColor: '#F5802A',
        borderColor: "#F5802A",
        borderStyle: 'solid',
        borderWidth:3,
        borderRadius: deviceWidth / 5.5,
        paddingBottom: 2
    },
    font_normal: {
        fontSize: 10, textAlign: 'center', color: '#F5802A' 
    },
    font_focused: {
        fontSize: 10, textAlign: 'center', color: '#FFF'
    },
    circle_normal: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth / 5.5,
        height: deviceWidth / 5.5,
        backgroundColor: '#FFF',
        borderColor: "#F5802A",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: deviceWidth / 5.5,
        
    },
    icon_style: {
        width: deviceWidth / 8.2,
        height: deviceWidth / 8.2,
    }
});