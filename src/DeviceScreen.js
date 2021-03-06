import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Container, Toast, Title, Body, Right, StyleProvider,Button } from "native-base";
import MyHeader from './MyHeader'
import { Global } from './global'
import BLEMonitor from './BLEMonitor';
import { Grid, Col, Row } from "react-native-easy-grid";
import { AutoConnect } from './AutoConnectUtil'
import './Storage'

export default class DeviceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //headerBLEStatue : '0',
            //headerSDStatus : '0',
            //headerBATTStatus: '0',
            
            gif_display_offset: 4,

            pairing: false,
            device_unpair:true,
            device_disconnected: false,
            device_charging: false,
            SensingTime: 'N/A',
            BatteryVoltage: 'N/A',
            RTCTime: 'N/A',
            DeviceName: 'N/A',
            MACAddress: 'N/A',
            SoftwareRevision: '',
            HardwareRevision: '',
            Manufacturer: '',

            ChargingTime: 'N/A',
            ChargingCurrent: 'N/A',

            StartSensingDate: null,
            StartChargingDate: null,
            //countdown : 0
        };
        this.gif_set = [
            require('../assets/gif/motion_ble_connect_led_10fps_480.gif'),
            require('../assets/gif/motion_charge_led_10fps_480.gif'),
            require('../assets/gif/motion_insert_charge_10fps_480.gif'),
            require('../assets/gif/not_connect_480.gif'),
            require('../assets/gif/pair_instruction_10fps_480.gif'),]
        if (BLEStatus.isStart == false) {
            BLEStatus.isStart = true
            BluetoothManager.start();
        }
        this.buletooth_state = false

        this.UpdateReceiveDataListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleBLEReceiveData);
        this.UpdateStateListener = BluetoothManager.addListener('BleManagerDidUpdateState', this.handleBLEUpdateState);
        this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral', this.handleConnectPeripheral);
        this.discoverPeripheralListener = BluetoothManager.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectPeripheral);
        BluetoothManager.checkState();
        this.timer = null;
        this.autoReconnectTimer = null

        
        //this.countdownTimer = null
    }

    
    //蓝牙状态改变
    handleBLEUpdateState = (args) => {
        //console.log('BleManagerDidUpdateStatea:', args);
        BluetoothManager.bluetoothState = args.state;
        if (args.state == 'on') {  //蓝牙打开时自动搜索
            //this.setState({ bluetooth: '1' })
            this.buletooth_state = true
            //console.log("flame-debug bluetooth on start connect")
            this.load_storage_data()
        } else {
            this.buletooth_state = false
            //this.setState({ bluetooth: '0' })
        }
        
    }
    

    componentDidMount() { 
        //BluetoothManager.enableBluetooth()
        //this.load_storage_data()
    }
    componentWillUnmount() {
        this.UpdateReceiveDataListener.remove();
        this.UpdateStateListener.remove()
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove()
        this.discoverPeripheralListener.remove()
        this.timer && clearTimeout(this.timer);
        this.autoReconnectTimer && clearInterval(this.autoReconnectTimer);
        //this.countdownTimer && clearInterval(this.countdownTimer);
        //console.log("flame-debug DeviceScreen componentWillUnmount")
    }
    /*
    componentDidUpdate() {
        console.log("flame-debug DeviceScreen componentDidUpdate")
    }
    */
    load_storage_data() {
        device_storage
            .load({
                key: 'device',

                // autoSync (default: true) means if data is not found or has expired,
                // then invoke the corresponding sync method
                autoSync: false,

                // syncInBackground (default: true) means if data expired,
                // return the outdated data first while invoking the sync method.
                // If syncInBackground is set to false, and there is expired data,
                // it will wait for the new data and return only after the sync completed.
                // (This, of course, is slower)
                syncInBackground: true,

                // you can pass extra params to the sync method
                // see sync example below
                syncParams: {
                    extraFetchOptions: {
                        // blahblah
                    },
                    someFlag: true
                }
            })
            .then(ret => {
                // found data go to then()
                //console.log("flame-debug storage ", ret.name, ret.mac);
                AutoConnect(ret.name, ret.mac,false)
            })
            .catch(err => {
                // any exception including data not found
                // goes to catch()
                console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            });
    }

    //发现设备
    handleDiscoverPeripheral = (data) => {
        //console.log('flame DiscoverPeripheral', data.id, data.name);
        console.log("flame-debug found device ", data.name, data.id, data.rssi)
        if (BLEStatus.autoConnectMode && data.name != null && data.name.startsWith('PM') && parseInt(data.rssi) > -65) {
            BluetoothManager.stopScan();
            console.log("flame-debug start connect", data.name, data.id, data.rssi)
            //console.log("flame-debug advertising", JSON.stringify(data.advertising))
            //console.log("flame-debug serviceData", JSON.stringify(data.serviceData))
             
            AutoConnect(data.name, data.id,true)
        }
    }

    //接受蓝牙传输的数据
    handleBLEReceiveData = (data) => {
        if (BLEStatus.manufacturer === '') {
            BluetoothManager.readUUID(DeviceInfoUUID, HardwareRevisionUUID)
                .then(data => {
                    BLEStatus.hardware = data.map(b => String.fromCharCode(b)).join("")
                    //console.log("flame-debug read ", data.map(b => String.fromCharCode(b)).join(""))

                    BluetoothManager.readUUID(DeviceInfoUUID, SoftwareRevisionUUID)
                        .then(data => {
                            BLEStatus.software = data.map(b => String.fromCharCode(b)).join("")
                            //console.log("flame-debug read ", data.map(b => String.fromCharCode(b)).join(""))
                            BluetoothManager.readUUID(DeviceInfoUUID, ManufacturerUUID)
                                .then(data => {
                                    BLEStatus.manufacturer = data.map(b => String.fromCharCode(b)).join("")
                                    //console.log("flame-debug read ", data.map(b => String.fromCharCode(b)).join(""))
                                })
                                .catch(err => {
                                    //console.log("flame-debug read fail", err)
                                })
                        })
                        .catch(err => {
                            //console.log("flame-debug read fail", err)
                        })
                })
                .catch(err => {
                    //console.log("flame-debug read fail", err)
                })
        }

        var  charging = false , gif = 0, voltage = 'N/A',RTC = 'N/A'
        this.package = gParseData.handleUpdateValue(data);
        if (this.package.type !== 3) {
            voltage = this.state.BatteryVoltage
            RTC = this.state.RTCTime
        }
        if ("battery" in this.package) { 
            if (this.package.battery === "charging" || this.package.battery === "Full") {
                batt_status = '5'
                charging = true
                gif = 1
                //TODO update charing current
            }
            if (this.package.battery === "high") {
                //batt_status = '4'
            }
            if (this.package.battery === "medium") {
                //batt_status = '3'
            }
            if (this.package.battery === "low") {
                //batt_status = '2'
                //gif = 2
            }
            if (this.package.battery === "critical") {
                //batt_status = '1'
                gif = 2
            }
        }

        if ("voltage" in this.package) {
            voltage = (this.package.voltage/1000).toFixed(2)+' (V)'
        }
        if ("year" in this.package) {
            var year = this.package.year
            var month = this.package.month
            var date = this.package.date
            var hour = this.package.hour
            var minute = this.package.minute
            var second = this.package.second

            RTC = `${year}-${month}-${date} ${hour}:${minute}:${second}`
        }

        //handle charging package
        if (this.package.type===1) {
            current = (this.package.current).toFixed(2) + ' (mA)'
            if (this.state.StartChargingDate === null) {
                this.setState({
                    StartChargingDate: new Date(),
                    StartSensingDate:null,
                })
            }
            if (this.package.battery === "charging") {
                chargingt = this.calcConsumingTime(this.state.StartChargingDate)
            } else {
                chargingt = "Charge complete"
            }

            this.setState({
                device_charging: charging,
                gif_display_offset: gif,
                ChargingCurrent: current,
                ChargingTime: chargingt,
                BatteryVoltage: voltage,
                
                DeviceName: BLEStatus.connectedDeviceName,
                MACAddress: BLEStatus.connectedDeviceMAC,
                SoftwareRevision: BLEStatus.software,
                HardwareRevision: BLEStatus.hardware,
                Manufacturer: BLEStatus.manufacturer,
            })

        } else {
            if (this.state.StartSensingDate === null) {
                this.setState({
                    StartChargingDate: null,
                    StartSensingDate: new Date(),
                })
            }

            this.setState({
                //headerSDStatus: sd_status,
                //headerBATTStatus: batt_status,
                device_charging: charging,
                DeviceName: BLEStatus.connectedDeviceName,//BLEStatus.connectedDevice[0]['name'],
                MACAddress: BLEStatus.connectedDeviceMAC, //BLEStatus.connectedDevice[0]['id'],
                gif_display_offset: gif,
                BatteryVoltage: voltage,
                RTCTime: RTC,
                SensingTime: this.calcConsumingTime(this.state.StartSensingDate),
                StartChargingDate: null,
                SoftwareRevision: BLEStatus.software,
                HardwareRevision: BLEStatus.hardware,
                Manufacturer: BLEStatus.manufacturer,
            })
        }
    }

    //计算消耗的时间
    calcConsumingTime(date) {
        startDate = (date).valueOf();
        nowDate = (new Date()).valueOf();

        difference = nowDate - startDate
        
        diff_hour = Math.floor(difference / (3600 * 1000))
        
        var leave1 = difference % (3600 * 1000)
        diff_minute = Math.floor(leave1 / (60 * 1000))

        var leave2 = leave1 % (60 * 1000)
        diff_second = Math.round(leave2 / 1000)
        return `${diff_hour}:${diff_minute}:${diff_second}`
    }

    //蓝牙设备已连接 
    handleConnectPeripheral = (args) => {


        this.setState({
            device_unpair: false,
            device_disconnected: false,
            gif_display_offset: 0,
            StartSensingDate: new Date(),
            pairing:false,
            //DeviceName: BLEStatus.connectedDevice[0]['name'], //不能在这里访问BLEStatus.connectedDevice的数据，因为这函数调用时它还是空的
            //MACAddress: BLEStatus.connectedDevice[0]['id'],
        })
        //console.log("flame-debug storage save ", BLEStatus.connectedDeviceName, BLEStatus.connectedDeviceMAC)
        this.autoReconnectTimer && clearInterval(this.autoReconnectTimer);
        this.autoReconnectTimer = null

        this.timer && clearTimeout(this.timer);
        this.timer = null
        

            
    }
    //蓝牙设备已断开连接
    handleDisconnectPeripheral = (args) => {
        if (!this.state.device_unpair) {
            this.setState({
                device_disconnected: true,
                gif_display_offset: 3,
            })
        }
        if (BLEStatus.connectedDeviceMAC !== '' && this.autoReconnectTimer === null && this.buletooth_state) {
            this.autoReconnectTimer = setInterval(
                () => {
                    AutoConnect(BLEStatus.connectedDeviceName, BLEStatus.connectedDeviceMAC,false)
                    //console.log("flame-debug autoReconnectTimer")
                },
                3000,
            );
        }


    }


    start_pairing() {
        /*
        this.setState({
            pairing:true
        })*/
        BluetoothManager.enableBluetooth()
        BluetoothManager.scan([], 20, true) //如果想长期保持扫描状态就不设置任何参数，这里设置扫描5秒,但好像没用..手动设置时钟关闭
            .then(() => {
                this.setState({
                    pairing: true,
                    //countdown:20
                });
                this.timer = setTimeout(() => {
                    BluetoothManager.stopScan();
                    this.setState({ pairing: false });
                    if (!BLEStatus.isConnected) {
                        Toast.show({
                            text: "No Devices Found ",
                            type: "danger"
                        })
                    }
                }, 20000);
                /*
                this.countdownTimer = setInterval(
                    () => {
                        this.setState({
                            countdown: countdown - 1
                        })
                    },
                    1000,
                );
                */
            }).catch(err => {

            })
        //AutoConnect("PM-66C7FDD131E3", "E3:31:D1:FD:C7:66")
    }

    unpair_device() {
        this.setState({
            device_unpair: true,
            device_disconnected: false,
            device_charging: false,
            gif_display_offset: 4,
        })
        BLEStatus.isConnected = false
        BLEStatus.connectedDeviceName = ''
        BLEStatus.connectedDeviceMAC = ''
        BLEStatus.manufacturer = ''
        BLEStatus.hardware = ''
        BLEStatus.software = ''
        BluetoothManager.disconnect();
        device_storage.remove({
            key: 'device'
        })
    }

    render_item_unpair() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.font_grey}>To pair a PM device: </Text>
                </View>

                <View style={{ paddingLeft: 12, paddingTop: 20 }}>
                    <Text style={styles.font_grey}>1. Turn on the PM device; </Text>
                    <Text style={styles.font_grey}>2. Click the ‘Pair Device’ button below; </Text>
                    <Text style={styles.font_grey}>3. Place the device as close to the mobile phone as possible; </Text>
                    <Text style={styles.font_grey}>4. Wait until the device’s LED is flashing. </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            BLEStatus.autoConnectMode = false
                            this.props.navigation.navigate('Scan')
                        }
                        }>
                        <Text style={styles.font_underline}>Can not pair a PM device?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    {!this.state.pairing ?
                        <Button bordered full warning style={styles.button_style}
                            onPress={() => {
                                this.start_pairing()
                            }}>
                            <Text style={styles.font_orange}>Pair Device</Text>
                        </Button>
                        :
                        <Button bordered full warning disabled style={styles.button_style}>
                            <Text style={styles.font_grey}>Pairing...</Text>
                        </Button>
                    }

                </View>
            </View>
        )
    }

    render_item_connected() {
        return (
            <View style={{flex:1}}>
                {this.state.device_disconnected ? this.render_disconnected_information() : null}
                {!this.state.device_disconnected && !this.state.device_charging ? this.render_working_information() : null}
                {!this.state.device_disconnected && this.state.device_charging ? this.render_charging_information() : null}
                <Grid style={{ flex: 2, paddingTop: 20,paddingRight:5 }}>
                    <Col style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Text style={styles.font_grey_bold}>Device Name:</Text>
                        <Text style={styles.font_grey_bold}>MAC Address:</Text>
                        <Text style={styles.font_grey_bold}>Software Revision:</Text>
                        <Text style={styles.font_grey_bold}>Hardware Revision:</Text>
                        <Text style={styles.font_grey_bold}>Manufacturer:</Text>
                    </Col>

                    <Col>
                        <Text style={styles.font_grey}>{this.state.DeviceName}</Text>
                        <Text style={styles.font_grey}>{this.state.MACAddress}</Text>
                        <Text style={styles.font_grey}>{this.state.SoftwareRevision}</Text>
                        <Text style={styles.font_grey}>{this.state.HardwareRevision}</Text>
                        <Text style={styles.font_grey}>{this.state.Manufacturer}</Text>
                    </Col>
                </Grid>
                <Button bordered full warning style={styles.button_style}
                    onPress={() => {
                        this.unpair_device()
                    }}>
                    <Text style={styles.font_orange}>Unpair Device</Text>
                </Button>

            </View>
        )
    }

    render_working_information() {
        return (
            <Grid style={{flex:1}}>
                <Col style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={styles.font_grey_bold}>Sensing Time:</Text>
                    <Text style={styles.font_grey_bold}>Battery Voltage:</Text>
                    <Text style={styles.font_grey_bold}>RTC Time:</Text>
                </Col>

                <Col>
                    <Text style={styles.font_grey}>{this.state.SensingTime}</Text>
                    <Text style={styles.font_grey}>{this.state.BatteryVoltage}</Text>
                    <Text style={styles.font_grey}>{this.state.RTCTime}</Text>
                </Col>

            </Grid>
        )
    }

    render_charging_information() {
        return (
            <Grid style={{ flex: 1 }}>
                <Col style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={styles.font_grey_bold}>Charging Time:</Text>
                    <Text style={styles.font_grey_bold}>Battery Voltage:</Text>
                    <Text style={styles.font_grey_bold}>Charging Current:</Text>
                </Col>

                <Col>
                    <Text style={styles.font_grey}>{this.state.ChargingTime}</Text>
                    <Text style={styles.font_grey}>{this.state.BatteryVoltage}</Text>
                    <Text style={styles.font_grey}>{this.state.ChargingCurrent}</Text>
                </Col>

            </Grid>
        )
    }
    render_disconnected_information() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.font_grey_center}>PM device is not connected. </Text>
                <Text style={styles.font_grey_center}>Make sure the device is ON and within the effective range of Bluetooth.</Text>
            </View>
        )
    }


    render() {
        //console.log("flame-debug DeviceScreen render")
        return (
            <Container>
                <MyHeader title="Device" hide_icon={false} />
                <View>
                    <Image
                        style={styles.gif_style}
                        source={this.gif_set[this.state.gif_display_offset]}
                    />
                </View>

                {this.state.device_unpair ? this.render_item_unpair(): this.render_item_connected() }



            </Container>
        )
    }
}

const styles = StyleSheet.create({
    gif_style: {
        //alignSelf: "stretch",
        resizeMode: "stretch",
        height: deviceHeight / 3.5,
        width: deviceWidth,
        position: "relative",
        marginBottom: 10
    },
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
    button_style: {
        margin: 20,
        //backgroundColor:'grey'
    }
});
