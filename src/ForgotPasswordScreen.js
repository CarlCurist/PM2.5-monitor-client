import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Global } from './global'
import { Tabs, Tab, Left, Right, Container, Header } from "native-base";
import RegisterComponent from './RegisterComponent'

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container>
                <ImageBackground source={require("../assets/image/bg.gif")} style={{ width: deviceWidth, height: deviceHeight + 50 }}>
                    <View style={{ flex: 1, backgroundColor: "transparent" }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}>
                            <Image
                                style={styles.goback_button}
                                source={require('../assets/icon/return_icon_white.png')}
                            />
                        </TouchableOpacity>

                        <View style={{ height: deviceHeight / 6, width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.font_Title}>WePIN</Text>
                        </View>
                        <Header style={{ backgroundColor: "white" }}>
                            <View style={{flex:1 , justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.font_orange_bold}>Forgot Password</Text>
                            </View>
                        </Header>
                        
                        <RegisterComponent register={false}/>


                    </View>
                </ImageBackground>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    font_grey: {
        color: '#CDCDCD',
        fontSize: 15,
        //fontWeight: 'bold',
        //textShadowColor: '#C0C0C0',
        //textShadowRadius: 2,
        //textShadowOffset: { width: 2, height: 2 },
    },
    font_grey_center: {
        color: '#CDCDCD',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    font_grey_bold: {
        color: '#CDCDCD',
        fontSize: 15,
        fontWeight: 'bold',
    },
    font_orange_bold: {
        color: '#F5802A',
        fontSize: 20,
        fontWeight: 'bold',
    },
    font_underline: {
        color: '#CDCDCD',
        fontSize: 20,
        textDecorationLine: "underline"
    },
    font_Title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    arrow_style: {
        height: 20,
        width: 20
    },
    goback_button: {
        height: deviceWidth / 8,
        width: deviceWidth / 8,
        top: 0,
        left: 0,
        resizeMode: "contain",
        //position: "absolute",
    }
});
