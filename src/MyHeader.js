import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { Container, Header, Title, Body, Right, StyleProvider } from "native-base";
import { Global } from './global'
import BLEMonitor from './BLEMonitor';

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
        
        this.UpdateReceiveDataListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleBLEReceiveData);
        this.UpdateStateListener = BluetoothManager.addListener('BleManagerDidUpdateState', this.handleBLEUpdateState);
        this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral', this.handleConnectPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectPeripheral);
        BluetoothManager.checkState();
    }

    componentDidMount() {
        
    }
    componentWillReceiveProps(nextProps) { 
        /*
        this.setState({
            title: nextProps.title,
            bluetooth: nextProps.bluetooth,
            sdcard: nextProps.sdcard,
            battery: nextProps.battery,
        })
        */
    }

    componentWillUnmount() {
        this.UpdateReceiveDataListener.remove();
        this.UpdateStateListener.remove();
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove()
    }

    //接受蓝牙传输的数据
    handleBLEReceiveData = (data) => { 
        var sd_status = '0', batt_status = '0'
        this.package = gParseData.handleUpdateValue(data);
        if ("cd" in this.package) {
            if (this.package.cd) {
                sd_status = '1'
            } else {
                sd_status = '0'
            }
        }
        if ("battery" in this.package) {
            if (this.package.battery === "charging" || this.package.battery === "Full") {
                batt_status = '5'
                //TODO update charing current
            }
            if (this.package.battery === "high") {
                batt_status = '4'
            }
            if (this.package.battery === "medium") {
                batt_status = '3'
            }
            if (this.package.battery === "low") {
                batt_status = '2'
            }
            if (this.package.battery === "critical") {
                batt_status = '1'
            }
        }
        this.setState({
            sdcard: sd_status,
            battery:batt_status,
        })
    }

    //蓝牙状态改变
    handleBLEUpdateState = (args) => {
        //console.log('BleManagerDidUpdateStatea:', args);
        BluetoothManager.bluetoothState = args.state;
        if (args.state == 'on') {  //蓝牙打开时自动搜索
            this.setState({ bluetooth: '1' })
        } else {
            this.setState({ bluetooth: '0' })
        }
    }

    //蓝牙设备已断开连接
    handleDisconnectPeripheral = (args) => {
        this.setState({
            sdcard: '0',
            battery: '0',
        })
    }

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

