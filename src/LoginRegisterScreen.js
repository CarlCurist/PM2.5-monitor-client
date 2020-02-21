import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Global } from './global'
import { Tabs, Tab, Left, Right, Container } from "native-base";
import RegisterComponent from './RegisterComponent'
import LoginComponent from './LoginComponent'

export default class LoginRegisterScreen extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Container>
                <ImageBackground source={require("../assets/image/bg.gif")} style={{ width: deviceWidth, height: deviceHeight + 50 }}>
                    <View style={{ flex: 1, backgroundColor: "transparent" }}>
                        <View style={{ height: deviceHeight / 4, width: deviceWidth, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.font_Title}>WePIN</Text>
                        </View>

                        <Tabs >
                            <Tab
                                heading="Login"
                                style={{ backgroundColor: 'transparent' }}
                                activeTabStyle={{ backgroundColor: '#FFFFFF' }}
                                tabStyle={{ backgroundColor: '#D9D9D9' }}
                                activeTextStyle={{ color: '#F5802A', fontWeight: 'bold' }}
                                textStyle={{ color: '#C7C7C7' }}>
                                <LoginComponent navigate={this.props.navigation.navigate}/>
                            </Tab>
                            <Tab heading="Register"
                                style={{ backgroundColor: 'transparent' }}
                                activeTabStyle={{ backgroundColor: '#FFFFFF' }}
                                tabStyle={{ backgroundColor: '#D9D9D9' }}
                                activeTextStyle={{ color: '#F5802A', fontWeight: 'bold' }}
                                textStyle={{ color: '#C7C7C7' }}>
                                <RegisterComponent navigate={this.props.navigation.navigate} register={true}/>
                            </Tab>
                        </Tabs>

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
    font_orange: {
        color: '#F5802A',
        fontSize: 20,
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
    }
});
