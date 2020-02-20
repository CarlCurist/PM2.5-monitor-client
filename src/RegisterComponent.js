import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import MyHeader from './MyHeader'
import { Global } from './global'
import { Form, Input, Left, Right, Icon, Content, Item, Button, Toast, Root } from "native-base";

export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codesent:false
        }
    }

    sendCode() {
        this.setState({ codesent: true })
        Alert.alert("The verification code has been sent to your mailbox.");
    }

    render_item_no_send() {
        return (
            <Button full iconRight style={styles.button_style}
                onPress={() => { this.sendCode() }}
            >
                <Text style={styles.font_orange}>Get Verification Code</Text>

                <Image
                    style={styles.icon_style}
                    source={require("../assets/icon/get_icon_oragen.png")}
                />

            </Button>
        )
    }

    render_item_sent() {
        return (
            <View style={{flex:1}}>
                <View style={{ paddingTop: 10 }}>
                    <Form style={{ backgroundColor: "#FFF" }} >
                        <Item>
                            <Image
                                style={styles.icon_style}
                                source={require("../assets/icon/verification_icon_gray.png")}
                            />
                            <Input placeholder="Verification Code" />
                        </Item>
                    </Form>
                </View>



                <View style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => this.sendCode()}
                    >
                        <Text style={styles.font_white_underline}>Resend verification code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            style={styles.go_button}
                            source={require('../assets/icon/login_icon_white.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <Content padder>
                    <View style={{ paddingTop: 30 }}>
                        <Form style={{ backgroundColor: "#FFF" }} >
                            <Item>
                                <Image
                                    style={styles.icon_style}
                                    source={require("../assets/icon/user_icon_gray.png")}
                                />
                                <Input placeholder="Email Address" />
                            </Item>
                        </Form>
                    </View>
                    
                    <View style={{paddingTop:10}}>
                        <Form style={{ backgroundColor: "#FFF" }} >
                            <Item>
                                <Image
                                    style={styles.icon_style}
                                    source={require("../assets/icon/password_gray.png")}
                                />
                                <Input placeholder="Password" secureTextEntry/>
                            </Item>
                        </Form>
                    </View>

                    {this.state.codesent ? this.render_item_sent():this.render_item_no_send()}

                </Content>

            </View>

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
    font_orange: {
        color: '#F5802A',
        fontSize: 20,
    },
    font_white_underline: {
        color: '#FFFFFF',
        fontSize: 20,
        textDecorationLine: "underline",

    },
    font_Title: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    icon_style: {
        height: 30,
        width: 30
    },
    button_style: {
        margin: 1, 
        backgroundColor: '#FFFFFF',
        marginTop:10
    },
    go_button: {
        height: deviceWidth / 3,
        width: deviceWidth / 3,
        resizeMode: "contain",
        position: "relative",
        marginTop: 20,
    },
});
