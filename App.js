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
import SideBar from "./src/sidebar";

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BLEtest from './src/ble';
import BLEMonitor from './src/BLEMonitor';
import Geolocation from 'react-native-geolocation-service';
//import DatabaseServices from './src/DatabaseHelper'; //annotation for debug
import {Global} from './src/global'
import { isDeclareModuleExports } from '@babel/types';

import MyLineChart from './src/both-axes';
import ExtrasExample from './src/extras';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import LoginScreen from './src/user/LoginScreen'
import UserScreen from './src/user/UserScreen'
import RegisterScreen from './src/user/RegisterScreen'
//import DataCard from './src/DataCard/DataCard'
//import NHCardShowcase from './src/DataCard/card-showcase'


var window_width = Dimensions.get('window').width;//得到屏幕宽度
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
//const Realm = require('realm');



class HomeScreen extends React.Component {
  constructor(props) {
    super(props);   
    this.state={
      //receiveData:'',
      battery : '',
      temperature : 0,
      humidity : 0,
      _1p0 : 0,
      _2p5 : 0,
      _10p : 0,

      dataSet :[],
      temperatureSet : [],
      humiditySet:[],
      _1p0Set:[],
      _2p5Set:[],
      _10pSet:[],
    }
    //this.bluetoothReceiveData = [];updateChart
    this.displayReceiveData = this.displayReceiveData.bind(this);
    this.getUTCString = this.getUTCString.bind(this);
    //this.loadDataFromDatabase = this.loadDataFromDatabase.bind(this); //annotation for debug
    this.updateChart = this.updateChart.bind(this);
    
  }

  componentDidMount(){
    if(BLEStatus.isStart == false){
      BLEStatus.isStart = true
      BluetoothManager.start();
    }
    BLEStatus.updateValueListener=BluetoothManager.addListener('BleManagerDidUpdateValueForCharacteristic', this.displayReceiveData);

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

    //this.loadDataFromDatabase();//annotation for debug

    //console.log("flame4 temperatureSet "+JSON.stringify(this.state.temperatureSet));

    /*
    DatabaseServices.testsave(7);
    DatabaseServices.testsave(8);
    DatabaseServices.testsave(9);
    */
    
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
/*annotation for debug
  loadDataFromDatabase(){
    var tmp = DatabaseServices.loadAll();
    if(tmp.length !== 0){
      this.state.dataSet = tmp.map(a=>a.air);
      this.state.temperatureSet = this.state.dataSet.map(a=>a.temperature);
      this.state.humiditySet = this.state.dataSet.map(a=>a.humidity);
      this.state._1p0Set = this.state.dataSet.map(a=>a._1p0);
      this.state._2p5Set = this.state.dataSet.map(a=>a._2p5);
      this.state._10pSet = this.state.dataSet.map(a=>a._10p);
      this.temperatureChart.updateData(this.state.temperatureSet);
      this.humidityChart.updateData(this.state.humiditySet);
      this._1p0Chart.updateData(this.state._1p0Set);
      this._2p5Chart.updateData(this.state._2p5Set);
      this._10pChart.updateData(this.state._10pSet);
  
      var latestItem = tmp[tmp.length - 1].air;
      this.setState({
        temperature:latestItem.temperature.toFixed(2),
        humidity:latestItem.humidity.toFixed(2),
        _1p0:latestItem._1p0,
        _2p5:latestItem._2p5,
        _10p:latestItem._10p,
      });
  
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

  displayReceiveData(data){
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
                    _10p:this.package._10p})
      var a = this.package;
      delete a.type;
      delete a.sd;
      delete a.error;
      var b = JSON.parse(BLEStatus.connectedDevice);
      deviceMac = b[0]['id'];

      //this.updateChart(a);

      /* annotation for debug
      Geolocation.getCurrentPosition(
        (position) => {

          //a.temperature parseFloat();
          //a. = parseInt()

          
          
          console.log('flame package ',JSON.stringify(a));
          console.log('flame connectedDevice ',deviceMac);
          //console.log("flame position "+position);
          console.log('flame position ',JSON.stringify(position['coords']));
          DatabaseServices.saveDataFromJson(deviceMac,position['coords'],a);
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
          
          DatabaseServices.saveDataFromJson(deviceMac,NullPosition,a);
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
  

  render() {
    
    return (
    <Container style={{backgroundColor: "#FFF"}}>
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


        
        
        <SafeAreaView>
          
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

                <ImageBackground  style={styles.drawerCover} source={require('./assets/logo.jpg')}>
                  <Text style={styles.BatteryText}>Battery:{this.state.battery}</Text>
                </ImageBackground >
              
            </View>



          <Content padder>
              <Card style={{marginBottom: 10}}>
                <CardItem>
                  <Left>
                    <Thumbnail square source={require("./assets/temperature.png")} />
                    <Body>
                      <Text>Temperature(°C)</Text>
                      <Text note>11h ago</Text>
                    </Body>
                    <Text style={styles.sectionTitle}>{this.state.temperature}</Text>
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
            </Content>
            
          <Content padder >
              <Card style={{marginBottom: 10}}>
                <CardItem>
                  <Left>
                    <Thumbnail square source={require("./assets/humidity.png")} />
                    <Body>
                      <Text>Humidity(%)</Text>
                      <Text note>11h ago</Text>
                    </Body>
                    <Text style={styles.sectionTitle}>{this.state.humidity}</Text>
                  </Left>

                </CardItem>
                {/** <MyLineChart ref={instance => { this.humidityChart = instance; }} />*/} 
              </Card>
            </Content>
            
            <Content padder>
              <Card style={styles.mb}>
                <CardItem>
                  <Left>
                    <Thumbnail square source={require("./assets/haze.png")} />
                    <Body>
                      <Text>PM1.0(µg/m 3)</Text>
                      <Text note>11h ago</Text>
                    </Body>
                    <Text style={styles.sectionTitle}>{this.state._1p0}</Text>
                  </Left>

                </CardItem>
                {/** <MyLineChart ref={instance => { this._1p0Chart = instance; }} />*/} 
              </Card>
            </Content>

            <Content padder>
              <Card style={styles.mb}>
                <CardItem>
                  <Left>
                    <Thumbnail square source={require("./assets/haze.png")} />
                    <Body>
                      <Text>PM2.5(µg/m 3)</Text>
                      <Text note>11h ago</Text>
                    </Body>
                    <Text style={styles.sectionTitle}>{this.state._2p5}</Text>
                  </Left>

                </CardItem>
                {/** <MyLineChart ref={instance => { this._2p5Chart = instance; }} />*/} 
              </Card>
            </Content>

            <Content padder>
              <Card style={{marginBottom: 50}}>
                <CardItem>
                  <Left>
                    <Thumbnail square source={require("./assets/haze.png")} />
                    <Body>
                      <Text>PM10(µg/m 3)</Text>
                      <Text note>11h ago</Text>
                    </Body>
                    <Text style={styles.sectionTitle}>{this.state._10p}</Text>
                  </Left>

                </CardItem>
                {/**<MyLineChart ref={instance => { this._10pChart = instance; }} />*/} 
              </Card>
            </Content>
            
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
        </SafeAreaView>
            
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
  },
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
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


