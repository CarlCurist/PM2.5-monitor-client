import BleModule from './BleModule';
import ParsePackage from './ParsePackage'
import NetworkModule from './Network'
import {Dimensions} from 'react-native'

//确保全局只有一个BleManager实例，BleModule类保存着蓝牙的连接信息
global.BluetoothManager = new BleModule();  
global.gParseData = new ParsePackage();
global.NetworkManager = new NetworkModule();
global.BLEStatus = {
    isStart : false,
    isConnected:false,
    updateStateListener:null,
    stopScanListener:null,
    discoverPeripheralListener:null,
    connectPeripheralListener:null,
    disconnectPeripheralListener:null,
    updateValueListener:null,
    connectedDevice: '',
    connectedDeviceName: '',
    connectedDeviceMAC:'',
    isCharging:false,
    synchronizeClock:false,
    login:false,
    username: 'anonymous@unknown.com',
    password: '',
    autoConnectMode: true,
    manufacturer: '',
    hardware: '',
    software:'',
}

global.RWServiceUUID = '0000fff0-0000-1000-8000-00805f9b34fb';
global.ReadUUID = '0000fff1-0000-1000-8000-00805f9b34fb';
global.WriteUUID = '0000fff2-0000-1000-8000-00805f9b34fb';

global.DeviceInfoUUID = '0000180A-0000-1000-8000-00805F9B34FB';
global.ManufacturerUUID = '00002A29-0000-1000-8000-00805F9B34FB';
global.HardwareRevisionUUID = '00002A27-0000-1000-8000-00805F9B34FB';
global.SoftwareRevisionUUID = '00002A28-0000-1000-8000-00805F9B34FB';

global.deviceWidth = Dimensions.get("window").width;
global.deviceHeight = Dimensions.get("window").height;

global.DetailScreenIconType = 0