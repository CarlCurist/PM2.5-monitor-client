/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  ImageBackground,Alert,
} from 'react-native';

import {
  Container,
  Content,
  Icon,
  Left,
  Header,
  Button,
  Title,
  Body,
  Right,Card,CardItem,Thumbnail,Root
} from "native-base";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BLEMonitor from './src/BLEMonitor';
import Geolocation from 'react-native-geolocation-service';
import DatabaseServices from './src/DatabaseHelper'; //annotation for debug
import {Global} from './src/global'
import { isDeclareModuleExports } from '@babel/types';


//import NewDetailScreen from './src/NewDetailScreen'
//import NetworkModule from './src/Network';
//import DataCard from './src/DataCard/DataCard'
//import NHCardShowcase from './src/DataCard/card-showcase'
import MyHeader from './src/MyHeader'


var window_width = Dimensions.get('window').width;//得到屏幕宽度
//const Realm = require('realm');



export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
      //receiveData:'',
      battery : '',
      temperature: 'N/A',
      humidity: 'N/A',
      _1p0: 'N/A',
      _2p5: 'N/A',
      _10p: 'N/A',

      dataSet :[],
      temperatureSet : [],
      humiditySet:[],
      _1p0Set:[],
      _2p5Set:[],
      _10pSet:[],
      latestPackageTime:null,
      latestPackageTimeStr: 'N/A',
      

      device_connected:false, // TODO true for test
    }
    //this.bluetoothReceiveData = [];updateChart
    this.displayReceiveData = this.displayReceiveData.bind(this);
    this.getUTCString = this.getUTCString.bind(this);
    this.loadDataFromDatabase = this.loadDataFromDatabase.bind(this); //annotation for debug
    this.updateChart = this.updateChart.bind(this);
    this.setLastReceiveDataFromNow = this.setLastReceiveDataFromNow.bind(this)
    this.sendDataToServer = this.sendDataToServer.bind(this)
    
  }

  componentDidMount(){
    if(BLEStatus.isStart == false){
      BLEStatus.isStart = true
      BluetoothManager.start();
    }
    BLEStatus.updateValueListener = BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.displayReceiveData);
    this.connectPeripheralListener = BluetoothManager.addListener('BleManagerConnectPeripheral', this.handleConnectPeripheral);
    this.disconnectPeripheralListener = BluetoothManager.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectPeripheral);
    BluetoothManager.checkState();

    this.timer = setInterval(() => {this.setLastReceiveDataFromNow()}, 3000);//update per 30s
    /*
    var arr =[];
    arr.push(new Date("Thu Sep 26 2019 20:34:28 GMT+0800 (GMT+08:00)"));
    arr.push(new Date("Thu Sep 26 2019 3:50:29 GMT+0800 (GMT+08:00)"));
    arr.push(new Date("Fri Sep 27 2019 14:32:28 GMT+0800 (GMT+08:00)"));
    arr.push(new Date("Fri Sep 27 2019 11:42:28 GMT+0800 (GMT+08:00)"));
    arr.sort(function(a, b){
      return a > b ? 1 : -1; // 这里改为大于号
    });
    var a=new Date();
    var b=a.toString();
    console.log("flame-date "+b);
    */

   //if (hasLocationPermission) {
    this.requestPermission();

    //}

    this.loadDataFromDatabase();//annotation for debug

    //console.log("flame4 temperatureSet "+JSON.stringify(this.state.temperatureSet));

    /*
    DatabaseServices.testsave(7);
    DatabaseServices.testsave(8);
    DatabaseServices.testsave(9);
    */
    
    //tmp = this.lastReceiveDataFromNow(new Date('2019-10-31 17:51:20'))
    /*
    var d = new Date('2019-1-1 00:59:20');
    //var d = new Date();
    //d.setTime(d.getTime()-24*60*60*1000);
    console.log("flame "+d);
    var w = this.getUTCString(d);
    console.log("flame "+w);
    var e = new Date();
    */
    /*
    //var tmp = DatabaseServices.loadAll();
    //filter1 = tmp.filtered('air.temperature > 3')
    //var dd =  new Date(2019, 7, 31);
    var dd =  new Date('2019/9/28 13:56:00');
    console.log("flame-database 1 "+dd);
    var ddt = this.getUTCString();
    var tmp = DatabaseServices.loadDateFromUTC(ddt);
    console.log("flame-database 2 "+ddt);
    //filter1 = tmp.filtered('date < '+ ddt);
    for (let p of tmp) {
      console.log("flame-database 3 "+JSON.stringify(p));
    }
    console.log("flame-database 4 "+tmp.length);
    //DatabaseServices.deleteAllData();
    */
  }
  componentWillUnmount(){
    BLEStatus.updateValueListener.remove();
    if(BLEStatus.isConnected){
      BluetoothManager.disconnect();  //退出时断开蓝牙连接
    }
    this.timer && clearTimeout(this.timer);
    this.connectPeripheralListener.remove();
    this.disconnectPeripheralListener.remove()
  }

  //蓝牙设备已连接 
  handleConnectPeripheral = (args) => {
    this.setState({
      device_connected:true,
    })
  }
  //蓝牙设备已断开连接
  handleDisconnectPeripheral = (args) => {
    this.setState({
      device_connected: false,
    })
  }

  updateChart(a){
    this.state.dataSet.push(a);
    this.state.temperatureSet.push(a.temperature);
    this.state.humiditySet.push(a.humidity);
    this.state._1p0Set.push(a._1p0);
    this.state._2p5Set.push(a._2p5);
    this.state._10pSet.push(a._10p);

    this.temperatureChart.updateData(this.state.temperatureSet);
    this.humidityChart.updateData(this.state.humiditySet);
    this._1p0Chart.updateData(this.state._1p0Set);
    this._2p5Chart.updateData(this.state._2p5Set);
    this._10pChart.updateData(this.state._10pSet);

    //console.log("flame4 temperatureSet "+ JSON.stringify(this.state.temperatureSet));
  }
//*annotation for debug
  loadDataFromDatabase(){
    var tmp = DatabaseServices.loadAll();
    if(tmp.length !== 0){
      this.state.dataSet = tmp.map(a=>a.air);
      this.state.temperatureSet = this.state.dataSet.map(a=>a.temperature);
      this.state.humiditySet = this.state.dataSet.map(a=>a.humidity);
      this.state._1p0Set = this.state.dataSet.map(a=>a._1p0);
      this.state._2p5Set = this.state.dataSet.map(a=>a._2p5);
      this.state._10pSet = this.state.dataSet.map(a=>a._10p);

      /*
      this.temperatureChart.updateData(this.state.temperatureSet);
      this.humidityChart.updateData(this.state.humiditySet);
      this._1p0Chart.updateData(this.state._1p0Set);
      this._2p5Chart.updateData(this.state._2p5Set);
      this._10pChart.updateData(this.state._10pSet);
      */
      var timestamp = tmp[tmp.length - 1].date
      var latestItem = tmp[tmp.length - 1].air;
      this.setState({
        temperature:latestItem.temperature.toFixed(2),
        humidity:latestItem.humidity.toFixed(2),
        _1p0:latestItem._1p0,
        _2p5:latestItem._2p5,
        _10p:latestItem._10p,
        latestPackageTime:timestamp,
      });
      this.setLastReceiveDataFromNow()
      //this.forceUpdate();
    }

  }
//*/
  getUTCString(date=null){
    // it will return last 24H by default
    if(date===null){
      date = new Date();
      date.setTime(date.getTime()-24*60*60*1000); // get yesterday
    }
    var t1 = date.getUTCMonth();
    var t2 = date.getUTCDate();
    // getUTCMounth() return 0-11
    return date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()+'@'+date.getUTCHours()+':'+date.getUTCMinutes()+':'+date.getUTCSeconds();
  }

  
  setLastReceiveDataFromNow(){
    if(this.state.latestPackageTime === null){
      return
    }
    var date = Date.parse(this.state.latestPackageTime)
    var newTime = Date.parse(new Date());//获得当前时间，转化时间戳
		var interval = (newTime - date)/1000;
    timestamp = ''
    if(interval<0){
			timestamp =  "now";
			}
		else if(interval>24*3600){
          timestamp = Math.round((interval/24/3600))+"d ago";
			}
		else if(interval>3600){
          timestamp =  Math.round((interval/3600))+"h ago";
				}
		else if(interval>60){
          timestamp =  Math.round((interval/60))+"m ago";
				}
		else{
          timestamp =  "now";
        }
    this.setState({latestPackageTimeStr:timestamp})
    
	 //var now=new Date(date);
     //var year=now.getFullYear(); 
     //var month=now.getMonth()+1; 
     //var date=now.getDate(); 
     //var hour=now.getHours(); 
     //var minute=now.getMinutes(); 
     //var second=now.getSeconds();
     //return year+"-"+month+"-"+date; 
  }

  sendDataToServer(tdeviceMac,tlocation,tair,ttimestamp){
    if(!BLEStatus.login){
      return
    }
    data = {
      date:ttimestamp,
      device:tdeviceMac,
      location:tlocation,
      air:tair
    }
    NetworkManager.postData(BLEStatus.username,ttimestamp,JSON.stringify(data))
    .then(()=>{
      console.log("upload success")
    })
    .catch((error)=>{
      //console.error(error);
    })
  }

  changeHeaderIcon = (data) => {
    var sd_status = '0', batt_status = '0'
    this.package = gParseData.handleUpdateValue(data);
    if ("battery" in this.package) {
      if (this.package.battery === "charging" || this.package.battery === "Full") {
        batt_status = '5'
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
    if ("cd" in this.package) {
      if (this.package.cd) {
        sd_status = '1'
      } else {
        sd_status = '0'
      }
    }
    this.setState({ headerSDStatus: sd_status, headerBATTStatus: batt_status })
  }

  displayReceiveData(data) {
    this.changeHeaderIcon(data)
    this.package =  gParseData.handleUpdateValue(data);

    

    if("battery" in this.package){
      this.setState({battery:this.package.battery});
      if(this.package.battery==="charging"){
        BLEStatus.isCharging = true;
        if(BLEStatus.synchronizeClock===false){
          gParseData.synchronizeClock();
        }
        
      }else{
        BLEStatus.synchronizeClock = false;
        BLEStatus.isCharging = false;
      }
    }

    if("timestat" in this.package){
      if(this.package.timestat){
        BLEStatus.synchronizeClock = true;
        console.log('synchronize clock success');
      }
      else{
        console.log('synchronize clock fail');
      }
    }

    if(this.package.type===2){
      this.setState({temperature:this.package.temperature.toFixed(2),
                    humidity:this.package.humidity.toFixed(2),
                    _1p0:this.package._1p0,
                    _2p5:this.package._2p5,
                    _10p:this.package._10p,
                    latestPackageTime:new Date()})
      var a = this.package;
      delete a.type;
      delete a.sd;
      delete a.error;
      //var b = JSON.parse(BLEStatus.connectedDevice);
     
      ttimestamp = new Date()
      //b = BLEStatus.connectedDevice
      //deviceMac = b[0]['id'];
      deviceMac = BLEStatus.connectedDeviceMAC

      //this.updateChart(a);

      //* annotation for debug
      Geolocation.getCurrentPosition(
        (position) => {

          //a.temperature parseFloat();
          //a. = parseInt()

          
          
          console.log('flame package ',JSON.stringify(a));
          console.log('flame connectedDevice ',deviceMac);
          //console.log("flame position "+position);
          console.log('flame position ',JSON.stringify(position['coords']));
          DatabaseServices.saveDataFromJson(deviceMac,position['coords'],a,ttimestamp);
          this.sendDataToServer(deviceMac,position['coords'],a,ttimestamp)
        },
        (error) => {
          var NullPosition = {
            accuracy:0,
            altitude:0,
            heading:0,
            latitude:0,
            longitude:0,
            speed:0
          }
          
          DatabaseServices.saveDataFromJson(deviceMac,NullPosition,a,ttimestamp);
          this.sendDataToServer(deviceMac,NullPosition,a,ttimestamp)
            // See error code charts below.
            console.log("flame GPS can't find location ",error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      //*/
    }
    

  }

  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'request fine location permissions',
          message:
            'request fine location permissions' +
            'request fine location permissions',
          buttonNeutral: 'ask me later',
          buttonNegative: 'no',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('flame 现在你获得fine location权限了');
      } else {
        console.log('flame 用户并不屌你');
      }

      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'request coarse location permissions',
          message:
            'request coarse location permissions' +
            'request coarse location permissions',
          buttonNeutral: 'ask me later',
          buttonNegative: 'no',
          buttonPositive: 'ok',
        },
      );
      if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('flame 现在你获得coarse location权限了');
      } else {
        console.log('flame 用户并不屌你');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  render_activated_card() {
    return (
      <Content padder>
        <TouchableOpacity
          onPress={() => {
            DetailScreenIconType = 0
            this.props.navigation.navigate('Detail')
          }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail square source={require("./assets/icon/temperature_icon_orange.png")} />
                <Body>
                  <Text style={styles.font_orange}>Temperature(°C)</Text>
                  <Text note style={styles.font_orange}>{this.state.latestPackageTimeStr}</Text>
                </Body>
                <Text style={styles.indice_orange}>{this.state.temperature}</Text>
              </Left>

            </CardItem>
            {/** 
                        <TouchableOpacity
            onPress={() => Alert.alert(
              'Alert Title')}>
                  <MyLineChart ref={instance => { this.temperatureChart = instance; }} />
                  </TouchableOpacity>
                  */}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DetailScreenIconType = 1
            this.props.navigation.navigate('Detail')
          }}>
          <Card >
            <CardItem>
              <Left>
                <Thumbnail square source={require("./assets/icon/humidity_icon_orange.png")} />
                <Body>
                  <Text style={styles.font_orange}>Humidity(%)</Text>
                  <Text note style={styles.font_orange}>{this.state.latestPackageTimeStr}</Text>
                </Body>
                <Text style={styles.indice_orange}>{this.state.humidity}</Text>
              </Left>

            </CardItem>
            {/** <MyLineChart ref={instance => { this.humidityChart = instance; }} />*/}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DetailScreenIconType = 2
            this.props.navigation.navigate('Detail')
          }}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail square source={require("./assets/icon/pm1p0_icon_orange.png")} />
                <Body>
                  <Text style={styles.font_orange}>PM1.0(µg/m 3)</Text>
                  <Text note style={styles.font_orange}>{this.state.latestPackageTimeStr}</Text>
                </Body>
                <Text style={styles.indice_orange}>{this.state._1p0}</Text>
              </Left>

            </CardItem>
            {/** <MyLineChart ref={instance => { this._1p0Chart = instance; }} />*/}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DetailScreenIconType = 3
            this.props.navigation.navigate('Detail')
          }}>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail square source={require("./assets/icon/pm2p5_icon_orange.png")} />
                <Body>
                  <Text style={styles.font_orange}>PM2.5(µg/m 3)</Text>
                  <Text note style={styles.font_orange}>{this.state.latestPackageTimeStr}</Text>
                </Body>
                <Text style={styles.indice_orange}>{this.state._2p5}</Text>
              </Left>

            </CardItem>
            {/** <MyLineChart ref={instance => { this._2p5Chart = instance; }} />*/}
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            DetailScreenIconType = 4
            this.props.navigation.navigate('Detail')
          }}>
          <Card style={{ marginBottom: 10 }}>
            <CardItem>
              <Left>
                <Thumbnail square source={require("./assets/icon/pm10p_icon_orange.png")} />
                <Body>
                  <Text style={styles.font_orange}>PM10(µg/m 3)</Text>
                  <Text note style={styles.font_orange}>{this.state.latestPackageTimeStr}</Text>
                </Body>
                <Text style={styles.indice_orange}>{this.state._10p}</Text>
              </Left>

            </CardItem>
            {/**<MyLineChart ref={instance => { this._10pChart = instance; }} />*/}
          </Card>
        </TouchableOpacity>
      </Content>
    )
  }

  render_inactivated_card() { 
    return (
      <Content padder>
          <Card >
            <CardItem>
              <Left>
              <Thumbnail square source={require("./assets/icon/pm10p_icon_gray.png")} />
                <Body>
                  <Text style={styles.font_grey}>Temperature(°C)</Text>
                <Text note style={styles.font_grey}>{this.state.latestPackageTimeStr}</Text>
                </Body>
              <Text style={styles.indice_grey}>{this.state.temperature}</Text>
              </Left>
            </CardItem>
          </Card>

          <Card >
            <CardItem>
              <Left>
              <Thumbnail square source={require("./assets/icon/humidity_icon_gray.png")} />
                <Body>
                <Text style={styles.font_grey}>Humidity(%)</Text>
                <Text note style={styles.font_grey}>{this.state.latestPackageTimeStr}</Text>
                </Body>
              <Text style={styles.indice_grey}>{this.state.humidity}</Text>
              </Left>

            </CardItem>
          </Card>


          <Card>
            <CardItem>
              <Left>
              <Thumbnail square source={require("./assets/icon/pm1p0_icon_gray.png")} />
                <Body>
                <Text style={styles.font_grey}>PM1.0(µg/m 3)</Text>
                <Text note style={styles.font_grey}>{this.state.latestPackageTimeStr}</Text>
                </Body>
              <Text style={styles.indice_grey}>{this.state._1p0}</Text>
              </Left>

            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Left>
              <Thumbnail square source={require("./assets/icon/pm2p5_icon_gray.png")} />
                <Body>
                <Text style={styles.font_grey}>PM2.5(µg/m 3)</Text>
                <Text note style={styles.font_grey}>{this.state.latestPackageTimeStr}</Text>
                </Body>
              <Text style={styles.indice_grey}>{this.state._2p5}</Text>
              </Left>

            </CardItem>
          </Card>

          <Card style={{ marginBottom: 10 }}>
            <CardItem>
              <Left>
              <Thumbnail square source={require("./assets/icon/pm10p_icon_gray.png")} />
                <Body>
                <Text style={styles.font_grey}>PM10(µg/m 3)</Text>
                <Text note style={styles.font_grey}>{this.state.latestPackageTimeStr}</Text>
                </Body>
              <Text style={styles.indice_grey}>{this.state._10p}</Text>
              </Left>

            </CardItem>
          </Card>
      </Content>
    )
  }

  render() {
    
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <MyHeader title="WePIN" hide_icon={false}/>
        {/** 
        <StatusBar barStyle="light-content" />
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home Screen</Title>
          </Body>
          <Right />
        </Header>
        */}
        

        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
        
            {/* 
            <View style={{flex:1,justifyContent:"space-between",flexDirection: 'row'}}>
              
              
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Login',{logined:false})}>
                <Image source={require('./image/user.png')}
                style={{width: 35, height: 35}}/>
              </TouchableOpacity>
              
              <Text style={styles.sectionTitle}>Battery:{this.state.battery}</Text>
            </View>
              */}
            
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <Image style={styles.drawerCover} source={require('./assets/icon/city_bg2.png')}>
              {/*<Text style={styles.BatteryText}>Battery:{this.state.battery}</Text>*/}
            </Image >
              
            </View>

          {this.state.device_connected && !BLEStatus.isCharging ? this.render_activated_card() : this.render_inactivated_card()}
            

            
            {/** 
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>Temperature(°C) :{this.state.temperature}</Text> </Text>
                <MyLineChart ref={instance => { this.temperatureChart = instance; }} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>Humidity(%) :{this.state.humidity}</Text></Text>
                <MyLineChart ref={instance => { this.humidityChart = instance; }} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM1.0(µg/m 3) :{this.state._1p0}</Text></Text>
                <MyLineChart ref={instance => { this._1p0Chart = instance; }} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM2.5(µg/m 3) :{this.state._2p5}</Text></Text>
                <MyLineChart ref={instance => { this._2p5Chart = instance; }} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM10(µg/m 3) :{this.state._10p}</Text></Text>
                <MyLineChart ref={instance => { this._10pChart = instance; }} />
              </View>
            </View>
            */}
            </ScrollView>
      </Container>
    );
  }
};



class ScanBLEScreen extends React.Component {

  render() {
    {/*
    return (
      <View style={{flex:1,alignItems:'center', justifyContent: 'center'}}>
        <Text style={styles.sectionTitle}>Available devices</Text>
        <FlatList
        data={this.state.BLEDevicesList}
        renderItem={({item}) => <Text style={{fontSize: 28}}
                                  onPress={()=>{alert(item.mac);this.props.navigation.goBack()}}>{item.name+' '+item.mac}</Text>}
        keyExtractor={item => item.mac}
        />
        
        <Button
          title="scan"
          onPress={()=>this.findAvailableDevices()}
        />
      </View>
    )
    */}
    return(
          <BLEMonitor/>
          //<MyLineChart/>
          
      )
    
  }
}
/*
const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,//HomeScreen
    },
    Login: {
      screen: LoginScreen,
    },
    User:{
      screen:UserScreen,
    },
    Register:{
      screen:RegisterScreen,
    },
    Scan:{
      screen:BLEMonitor,
    },
    Detail:{
      screen:ViewDetailData,
    }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const RootStack = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Scan:{
      screen:BLEMonitor,
    }
  },
  {
    initialRouteName: 'RootStack',
  }
);

const AppContainer = createAppContainer(Drawer);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>)
  }
}
*/
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  indice_orange: {
    fontSize: 24,
    fontWeight: '600',
    //color: Colors.black,
    color: '#F5802A',
  },
  font_orange: {
    color: '#F5802A',
  },
  indice_grey: {
    fontSize: 24,
    fontWeight: '600',
    color: '#CDCDCD',
  },
  font_grey: {
    color: '#CDCDCD',
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
  },
  drawerCover: {
    //alignSelf: "stretch",
    resizeMode:"stretch",
    height: deviceHeight / 5,//deviceHeight / 3.5,
    width: deviceWidth,
    position: "relative",
    marginBottom: 10
  },
  BatteryText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'right',
  },
});


