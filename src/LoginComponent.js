import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import MyHeader from './MyHeader'
import { Global } from './global'
import { Form, Input, Left, Right, Icon, Content, Item, Button, Toast, Root } from "native-base";

export default class LoginComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    Login() {
        NetworkManager.requestLogin(this.state.username, this.state.password)
            .then((tmp) => {
                if (tmp === '0') {
                    Toast.show({
                        text: "Login success",
                        //buttonText: "Okay",
                        type: "success"
                    })
                    NetworkManager.requestSession()
                        .then((resultjson) => {
                            if (resultjson.login === true) {
                                this.setState({
                                    login: resultjson.login,
                                    username: resultjson.userName
                                })
                                BLEStatus.login = true
                                BLEStatus.username = resultjson.userName
                                BLEStatus.password = this.state.password
                                this.props.navigate('TabHome')
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        })
                }
                if (tmp === '-1') {
                    Toast.show({
                        text: "Login fails. Please check your username and password",
                        //buttonText: "Okay",
                        type: "danger"
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })

    }

    Forgot() {
        this.props.navigate('Forgot')
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
                                <Input
                                    placeholder="Email Address"
                                    onChangeText={(text) => this.setState({ username: text })} />
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
                                <Input
                                    placeholder="Password" secureTextEntry
                                    onChangeText={(text) => this.setState({ password: text })}/>
                            </Item>
                        </Form>
                    </View>

                    <View style={{ paddingTop: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <TouchableOpacity
                            onPress={() => this.Forgot()}
                        >
                            <Text style={styles.font_white_underline}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.Login()}
                        >
                            <Image
                                style={styles.go_button}
                                source={require('../assets/icon/login_icon_white.png')}
                            />
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => this.props.navigate('TabHome')}
                        >
                            <Image
                                style={styles.go_button}
                                source={require('../assets/icon/login_icon_white.png')}
                            />
                        </TouchableOpacity>

                    </View>

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
