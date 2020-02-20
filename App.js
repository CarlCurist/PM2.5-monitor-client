import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Image, Button, Container } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from "native-base";
import HomeScreen from './HomeScreen'
import MyHeader from './src/MyHeader'
import DeviceScreen from './src/DeviceScreen'
import BLEMonitor from './src/BLEMonitor';
import UserProfileScreen from './src/UserProfileScreen'
import LoginRegisterScreen from './src/LoginRegisterScreen'

class FeedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed!</Text>
              
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

/*
const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation, route }) {


  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <HomeStack.Screen name="DeviceHome" component={DeviceScreen} />
      <HomeStack.Screen name="Scan" component={BLEMonitor}/>
    </HomeStack.Navigator>
  );
}
*/

function NotificationsScreen() {
  
  return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Notifications!</Text>
      </View>

  );
}

function ProfileScreen() {
  return (

    <View style={{ flex: 1}}>
      <MyHeader title="123" hide_icon={true} />
      
    </View>

  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#F5802A',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#FAFAFA' },
        showIcon: true,
        showLabel: false,
      }}
      tabBarPosition='bottom'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === 'Sensor') {
            if (focused) {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/sensor_icon_orange.png')}
              />;
            }
            else {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/sensor_icon_gray.png')}
              />;
            }
          }
          if (route.name === 'Home') {
            if (focused) {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/home_icon_orange.png')}
              />;
            }
            else {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/home_icon_gray.png')}
              />;
            }
          }
          if (route.name === 'User') {
            if (focused) {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/user_icon_orange.png')}
              />;
            }
            else {
              return <Image
                style={{ resizeMode: 'contain', height: 30, width: 30 }}
                source={require('./assets/icon/user_icon_gray.png')}
              />;
            }
          }

          /*
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Image
            style={{ resizeMode: 'contain', height: 30, width: 30 }}
            source={require('./image/sensor_icon_orange.png')}
          />;
          */
        },
      })}
    >
      <Tab.Screen
        name="Sensor" 
        component={DeviceScreen}//HomeStackScreen
        options={{
          //tabBarLabel: 'Sensor',
          
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        //options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="User"
        //component={MyHeader}
        component={UserProfileScreen}
        //options={{ tabBarLabel: 'User' }}
      />
    </Tab.Navigator>
  );
}
const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Root>
        {/*<MyTabs />*/}
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{
          headerShown: false,
        }}>
          <RootStack.Screen name="TabHome" component={MyTabs} />
          <RootStack.Screen name="Scan" component={BLEMonitor} />
          <RootStack.Screen name="Login" component={LoginRegisterScreen} />
        </RootStack.Navigator>
      </Root>
    </NavigationContainer>
  );
}
