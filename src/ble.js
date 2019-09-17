import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  Dimensions,
  FlatList,
  Button
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
import BleModule from './BleModule';
var window_width = Dimensions.get('window').width;//得到屏幕宽度

global.BluetoothManager = new BleModule();  

export default class BLEtest extends Component {
    constructor(props) {
        super(props);
        this.state = {
          BLEDevicesList: [], 
          loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
            data: [],
            scaning:false,
            isConnected:false,
            text:'',
            writeData:'',
            receiveData:'',
            readData:'',
            isMonitoring:false
        };
        this.bluetoothReceiveData = [];  //蓝牙接收的数据缓存
        this.deviceMap = new Map();  
      }

      componentDidMount(){
        BluetoothManager.start();  //蓝牙初始化     
        this.discoverPeripheralListener = BluetoothManager.addListener('BleManagerDiscoverPeripheral',this.handleDiscoverPeripheral);
        {/*	    
        this.updateStateListener = BluetoothManager.addListener('BleManagerDidUpdateState',this.handleUpdateState);
        this.stopScanListener = BluetoothManager.addListener('BleManagerStopScan',this.handleStopScan);	   
        
	    this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral',this.handleConnectPeripheral);
        this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral',this.handleDisconnectPeripheral);
        this.updateValueListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValue);  
        */}     
    }   

    componentWillUnmount(){
        this.discoverPeripheralListener.remove();
        {/*
        this.updateStateListener.remove();
        this.stopScanListener.remove();
               
        this.connectPeripheralListener.remove();
        this.disconnectPeripheralListener.remove();
        this.updateValueListener.remove();  
        if(this.state.isConnected){
            BluetoothManager.disconnect();  //退出时断开蓝牙连接
        }
        */}
    }
         //搜索到一个新设备监听
    handleDiscoverPeripheral=(data)=>{
        // console.log('BleManagerDiscoverPeripheral:', data);
        alert("find device");
        console.log('flame ',data.id,data.name);
        let id;  //蓝牙连接id
        let macAddress;  //蓝牙Mac地址           
        if(Platform.OS == 'android'){
            macAddress = data.id;
            id = macAddress;
        }else{  
            //ios连接时不需要用到Mac地址，但跨平台识别同一设备时需要Mac地址
            //如果广播携带有Mac地址，ios可通过广播0x18获取蓝牙Mac地址，
            macAddress = BluetoothManager.getMacAddressFromIOS(data);
            id = data.id;
        } 
        this.deviceMap.set(data.id,data);  //使用Map类型保存搜索到的蓝牙设备，确保列表不显示重复的设备
        this.setState({data:[...this.deviceMap.values()]});               
    }
    
      findAvailableDevices(){
        devices=[];
        item1 = {'name':'device1','mac':'DDDD'};
        item2 = {'name':'device2','mac':'AAAA'};
        devices.push(item1);
        devices.push(item2)
    
        this.setState({
          BLEDevicesList : devices,
          loaded : true
        })
      }
    render() {
        return (
          <View style={{flex:1,alignItems:'center', justifyContent: 'center'}}>
            <Text style={styles.sectionTitle}>Available devices</Text>
            <FlatList
            data={this.state.BLEDevicesList}
            renderItem={({item}) => <Text style={{fontSize: 28}}
                                      onPress={()=>{alert(item.mac)}}>{item.name+' '+item.mac}</Text>}
            keyExtractor={item => item.mac}
            />
            
            <Button
              title="scan"
              onPress={()=>this.findAvailableDevices()}
            />
          </View>
        )
    }
}

const styles = StyleSheet.create({

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  username_input: {
    width:window_width-32,//居中，宽度为屏幕宽度-32，这样左右都有16的边距
    borderRadius: 20,//输入框边界圆角度数
    borderColor: 'skyblue',//输入框边界颜色
    marginBottom:16,
    paddingLeft:10,//这里是为了在圆角之后输入
    padding:0,//去掉Android默认的padding
    borderWidth: 1,
    alignSelf:'center'//自身居中
  }

});
