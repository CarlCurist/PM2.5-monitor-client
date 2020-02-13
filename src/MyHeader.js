import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import {Container,Header,Title,Body,Right, StyleProvider} from "native-base";

export default class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            bluetooth: this.props.bluetooth,
            sdcard: this.props.sdcard,
            battery: this.props.battery,
        };
        //this.setIconPath()
        this.BLE_icon_set = [
            require('../assets/icon/bluetooth_icon_gray.png'), 
            require('../assets/icon/bluetooth_icon_orange.png')]
        this.SD_icon_set = [
            require('../assets/icon/sd_card_icon_gray.png'),
            require('../assets/icon/sd_card_icon_orange.png')]
        this.BATT_icon_set = [
            require('../assets/icon/battery_empty_icon_gray.png'), //0 = empty
            require('../assets/icon/battery_critical_icon_orange.png'),// critical = 1
            require('../assets/icon/battery_medium_icon_orange.png'),//low = 2
            require('../assets/icon/battery_high_icon_orange.png'),// medium = 3
            require('../assets/icon/batter_full_icon_orange.png'),// high =4
            require('../assets/icon/battery_charge_icon_orange.png')]//charging = 5
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            title: nextProps.title,
            bluetooth: nextProps.bluetooth,
            sdcard: nextProps.sdcard,
            battery: nextProps.battery,
        })
    }
    /*
    setIconPath() {
        ble_path = ''
        sd_path = ''
        batt_path = ''
        if (this.state.bluetooth === '0') {
            ble_path = '../assets/icon/bluetooth_icon_gray.png'
        } else {
            ble_path = '../assets/icon/bluetooth_icon_orange.png'
        }
        if (this.state.sdcard === '0') {
            sd_path = '../assets/icon/sd_card_icon_gray.png'
        } else {
            sd_path = '../assets/icon/sd_card_icon_orange.png'
        }
        switch (this.state.battery) {
            case '0':
                batt_path = '../assets/icon/battery_empty_icon_gray.png' //empty
                break
            case '1':
                batt_path = '../assets/icon/battery_critical_icon_orange.png' // critical = 1
                break
            case '2':
                batt_path = '../assets/icon/battery_medium_icon_orange.png' //low = 2
                break
            case '3':
                batt_path = '../assets/icon/battery_high_icon_orange.png' // medium = 3
                break
            case '4':
                batt_path = '../assets/icon/batter_full_icon_orange.png' // high =4
                break
            case '5':
                batt_path = '../assets/icon/battery_charge_icon_orange.png' //charging = 5
                break
            default:
                batt_path = '../assets/icon/battery_empty_icon_gray.png' //default = empty
                break
        }
        this.setState({
            BLE_icon_path: ble_path,
            SD_icon_path: sd_path,
            BATT_icon_path: batt_path
        })
    }
    */

    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <View>
                <Header style={{ backgroundColor: "transparent" }}>
                    <ImageBackground source={require("../assets/image/bg.gif")} style={{ width, height: 64}}>
                        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Title /*style={{ color: "#F5802A" }}*/> {this.state.title}</Title>
                        </Body>
                    </ImageBackground>
                </Header>
                <Header style={{ backgroundColor: "white", height: 30 }}>
                    <Right>
                        <Image
                            style={{ resizeMode: 'contain', height: 30, width: 30 }}
                            source={this.BLE_icon_set[parseInt(this.state.bluetooth)]}
                        />
                        <Image
                            style={{ resizeMode: 'contain', height: 30, width: 30 }}
                            source={this.SD_icon_set[parseInt(this.state.sdcard)]}
                        />
                        <Image
                            style={{ resizeMode: 'contain', height: 30, width: 30 }}
                            source={this.BATT_icon_set[parseInt(this.state.battery)]}
                        />
                    </Right>
                </Header>
            </View>
        )
    }
}

