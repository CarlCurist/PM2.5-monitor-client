import React, { Component } from "react";
import { ImageBackground, Image, StyleSheet, Text, View, Dimensions, Alert } from "react-native";
deviceWidth = Dimensions.get("window").width;
deviceHeight = Dimensions.get("window").height;

export default class RectangleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: props.focused,
            button_text:props.button_text,
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            focused: nextProps.focused,
            button_text: nextProps.button_text,
        })

    }

    render() {
        return (
            <View style={{ paddingTop: 2 }}>
                {this.state.focused ?
                    <View style={styles.btnFocusedStyle}>
                        <Text style={styles.font_focused}>{this.state.button_text}</Text>
                    </View>
                    :
                    <View style={styles.btnDefaultStyle}>
                        <Text style={styles.font_normal}>{this.state.button_text}</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnDefaultStyle: {
        width: deviceWidth / 3.3,
        height: deviceWidth / 10,
        backgroundColor: '#FFF',
        borderColor: '#F5802A',
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center' ,
        //paddingTop: 8
    },
    btnFocusedStyle: {
        width: deviceWidth / 3.3,
        height: deviceWidth / 10,
        backgroundColor: '#F5802A',
        borderColor: '#F5802A',
        borderRadius: 15,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: 'center',
    },
    font_normal: {
        fontSize: 20, textAlign: 'center', color: '#F5802A'
    },
    font_focused: {
        fontSize: 20, textAlign: 'center', color: '#FFF'
    },
});