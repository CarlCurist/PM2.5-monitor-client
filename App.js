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
  Button,
  TextInput,
  Dimensions,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BLEtest from './src/ble';
import BLEMonitor from './src/BLEMonitor';
import Geolocation from 'react-native-geolocation-service';
import { isDeclareModuleExports } from '@babel/types';


var window_width = Dimensions.get('window').width;//得到屏幕宽度

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
    }
    //this.bluetoothReceiveData = [];
    this.displayReceiveData = this.displayReceiveData.bind(this)
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
    

   //if (hasLocationPermission) {
    this.requestPermission();
    Geolocation.getCurrentPosition(
        (position) => {
            console.log("flame"+position);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    //}
    */
  }
  componentWillUnmount(){
    BLEStatus.updateValueListener.remove();
    if(BLEStatus.isConnected){
      BluetoothManager.disconnect();  //退出时断开蓝牙连接
    }
  }

  displayReceiveData(data){
    this.package =  gParseData.handleUpdateValue(data);

    if(this.package.type === 3){
      this.setState({battery:this.package.battery});
    }

    if(this.package.type===2){
      this.setState({temperature:this.package.temperature,
                    humidity:this.package.humidity,
                    _1p0:this.package._1p0,
                    _2p5:this.package._2p5,
                    _10p:this.package._10p})
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
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            <View style={{flex:1,justifyContent:"space-between",flexDirection: 'row'}}>
              <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Login',{logined:false})}>
                <Image source={require('./image/user.png')}
                style={{width: 35, height: 35}}/>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>Battery:{this.state.battery}</Text>
            </View>


            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Image source={require('./image/logo.png')}/>
              
            </View>
            
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>Temperature(°C) :{this.state.temperature}</Text> </Text>
                <Text style={styles.sectionDescription}>
                  A line chart used to show trends of change
                </Text>
              
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>Humidity(%) :{this.state.humidity}</Text></Text>
                <Text style={styles.sectionDescription}>
                  A line chart used to show trends of change
                  
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM1.0(µg/m 3) :{this.state._1p0}</Text></Text>
                <Text style={styles.sectionDescription}>
                  A line chart used to show trends of change
                  {/*<DebugInstructions />*/}
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM2.5(µg/m 3) :{this.state._2p5}</Text></Text>
                <Text style={styles.sectionDescription}>
                  A line chart used to show trends of change
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM10(µg/m 3) :{this.state._10p}</Text></Text>
                <Text style={styles.sectionDescription}>
                  A line chart used to show trends of change
                </Text>
              </View>
              {/*<LearnMoreLinks />*/}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '',password:'',token:'' };
  }
  render() {
    const { navigation } = this.props;
    const logined = navigation.getParam('logined', false);
    if(logined)
    {
      return (
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.sectionTitle}>Account information</Text>
          <Text style={styles.sectionDescription}>user name</Text>
          <View style={{flex: 2,alignItems: 'center',justifyContent:'space-evenly',}}>
            <Button
              title="Logout"
              onPress={() => alert("title","messages")}
            />
            <Button
              title="switch sensors"
              onPress={() => this.props.navigation.navigate('Scan')}
            />
          </View>
        </View>
      );
    }
    else{
      return(
        
        <View style={{ flex: 1,alignItems:'center', flexDirection: 'column', justifyContent: 'center' }}>
          {/*
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Text style={styles.sectionDescription}>user name:</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.username}
            />
          </View>
          */}
          <View style={{flex:1,alignItems:'center', justifyContent: 'center'}}>
            <TextInput  placeholder="username"
                        underlineColorAndroid={'transparent'}//去掉下划线
                        style={styles.username_input}
                        onChangeText={(username) => this.setState({username})}/>

            <TextInput  placeholder="password"
                        secureTextEntry={true}//隐藏输入内容
                        underlineColorAndroid={'transparent'}
                        style={styles.username_input}
                        onChangeText={(password) => this.setState({password})}/>
          </View>
          <View style={{flex:1,justifyContent:'space-evenly'}}>
            <Button
                title="Login"
                onPress={() => console.log('Flame '+this.state.username +' '+ this.state.password)}
            />
            <Button
                title="switch sensors"
                onPress={() => this.props.navigation.navigate('Scan')}
            />
          </View>
 
        </View>
      );
    }

  }
}

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
      )
    
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Scan:{
      screen:ScanBLEScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
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
  }

});


