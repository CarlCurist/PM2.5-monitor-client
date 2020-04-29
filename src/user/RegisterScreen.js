import React from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, CheckBox } from 'react-native'
import {Toast} from "native-base";

import background from '../../assets/background3.jpg'
import BackgroundComponent from './BackgroundComponent'

//import RoundCheckbox from 'rn-round-checkbox'
import Icon from 'react-native-vector-icons/FontAwesome'

class RegisterScreen extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      remember: true,
      username:"",
      password1:"",
      password2:"",
    }
  }

  render(){
    return (
      <View style={{ flex: 1}}>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />    
        <BackgroundComponent source={background} />

        <View style={styles.container}>
          <Text style={styles.textTitle}>XXXX APP Name</Text>
          <Text style={styles.textSubTitle}>An air quality monitoring app</Text>

          <View style={{ flexDirection:'column', marginTop: 30, justifyContent: 'center'}}>
            <Text style={styles.textLogin}>Create Account</Text>

            <TextInput
              style={styles.textInput}
              underlineColorAndroid='transparent'
              placeholder='Username'
              placeholderTextColor='#fff' 
              onChangeText={(text) => this.setState({username:text})}/>

            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              underlineColorAndroid='transparent'
              placeholder='Password'
              placeholderTextColor='#fff' 
              onChangeText={(text) => this.setState({password1:text})}/>              

            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              underlineColorAndroid='transparent'
              placeholder='Confirm Password'
              placeholderTextColor='#fff' 
              onChangeText={(text) => this.setState({password2:text})}/>              

            <View style={styles.btnSignin}>
              <Text style={styles.textBtnSignin}
              onPress={() => this.startRegister()}>SIGN UP</Text>
            </View>
          </View>         

          <View style={{ justifyContent: 'flex-end', flex: 1, paddingBottom: 40 }}>
            <Text 
              style={styles.textBottom}
              onPress={() => this.props.navigation.navigate('Login')}>SIGN IN</Text>
          </View>
        </View>
      </View>
    )
  }

  startRegister(){
    if(this.state.password1 !== this.state.password2){
      Toast.show({
        text: "The two passwords you typed do not match.",
        type: "danger"
      })
      return
    }

    fetch('http://106.54.62.64:8080/user/register',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                "userName": this.state.username,
                "password": this.state.password1,
              })
            })
        .then((response) => response.json())
        .then((responseJson) => {
         if (responseJson.code==='-1'){
          Toast.show({
            text: "The username already exists.",
            type: "danger"
          })
         }
         if (responseJson.code==='0'){
          Toast.show({
            text: "Registered successfully",
            type: "success"
          })
          this.props.navigation.navigate('Login')
         }
        })
        .catch((error) => {
          Toast.show({
            text: "Please check your phone is connected to Internet.",
            type: "danger"
          })
        });
  }
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, 
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff'
  },
  textSubTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  btnSocial: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center'
  },
  textFacebook: {
    color: '#2980b9',
    fontWeight: 'bold',
    fontSize: 17
  },
  textGoogle: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 17
  },
  textBottom: {
    color: '#fff',
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textInput: {
    width: 250,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16
  },
  textLogin: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  btnSignin: {
    backgroundColor: '#e67e22',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
    alignSelf:'center',
    marginTop: 30
  },
  textBtnSignin: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    elevation: 10
  },
  textWhite: {
    color: '#fff',
    fontWeight: 'bold'
  }
})