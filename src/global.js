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
    connectedDevice:'',
    isCharging:false,
    synchronizeClock:false,
    login:false,
    username:'',
}

global.RWServiceUUID = '0000fff0-0000-1000-8000-00805f9b34fb';
global.ReadUUID = '0000fff1-0000-1000-8000-00805f9b34fb';
global.WriteUUID = '0000fff2-0000-1000-8000-00805f9b34fb';

global.deviceWidth = Dimensions.get("window").width;
global.deviceHeight = Dimensions.get("window").height;