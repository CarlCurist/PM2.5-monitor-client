import React from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, CheckBox } from 'react-native'

import background from '../../assets/background2.jpg'
import BackgroundComponent from './BackgroundComponent'
import {Toast} from "native-base";
import {Global} from '../global'

//import RoundCheckbox from 'rn-round-checkbox'
import Icon from 'react-native-vector-icons/FontAwesome'

class LoginScreen extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      remember: true,
      username:"",
      password:"",
      login:false,
    }
  }

  renderInput(){
    return(
      <View style={{ flexDirection:'column', marginTop: 50, justifyContent: 'center'}}>
      <Text style={styles.textLogin}>Sign in to continue</Text>

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
        onChangeText={(text) => this.setState({password:text})}/>              
      {/** 
      <View style={{ flexDirection:'row'}}>
        <View style={{ flex:1, flexDirection:'row' }}>
          <RoundCheckbox
            backgroundColor="#fff"
            iconColor="#2c3e50"
            size={20}
            onValueChange={() => { this.setState({ remember: !this.state.remember }) }}
            checked={this.state.remember} />

          <Text style={[styles.textWhite, { marginLeft: 5 }]}>Remeber</Text>
        </View>
        <View style={{ flex:1 }}>
          <Text style={ [styles.textWhite, {alignSelf: 'flex-end'}] }>Forget Password</Text>
        </View>
      </View>
      */}
      <View style={styles.btnSignin}>
        <Text style={styles.textBtnSignin}
        onPress={() => this.StartLogin()}>SIGN IN</Text>
      </View>
    </View>         
    )
  }

  renderSignup(){
    return(
      <View style={{ justifyContent: 'flex-end', flex: 1, paddingBottom: 40 }}>
      <Text 
        style={styles.textBottom}
        onPress={() => this.props.navigation.navigate('Register')}>SIGN UP</Text>
    </View>
    )
  }

  renderUserProfile(){
    return(
    <View style={styles.btnLogout}>
      <Text style={styles.textBtnSignin}
      onPress={() => this.Logout()}>Log out</Text>
    </View>
    )
  }
  
  render(){
    return (
      <View style={{ flex: 1}}>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />    
        <BackgroundComponent source={background} />

        <View style={styles.container}>
          {this.state.login?
          <Text style={styles.textTitle}>Hello,{this.state.username}</Text>
          :<Text style={styles.textTitle}>XXXX APP Name</Text>}
          <Text style={styles.textSubTitle}>An air quality monitoring app</Text>
          {this.state.login?null:this.renderInput()}
          {this.state.login?null:this.renderSignup()}
          {this.state.login?this.renderUserProfile():null}
        </View>
      </View>
    )
  }

  Logout(){
    NetworkManager.requestLogout()
    .then((code)=>{
      if(code==='0'){
        Toast.show({
          text: "logout success",
          //buttonText: "Okay",
          type: "success"
        })
        this.setState({
          login:false,
          username:''
        })
        BLEStatus.login=false
        BLEStatus.username = ''
      }
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  StartLogin(){
    NetworkManager.requestLogin(this.state.username,this.state.password)
    .then((tmp)=>{
      if(tmp === '0'){
        Toast.show({
          text: "Login success",
          //buttonText: "Okay",
          type: "success"
        })
        NetworkManager.requestSession()
        .then((resultjson)=>{
          if(resultjson.login===true){
            this.setState({
              login:resultjson.login,
              username:resultjson.userName
            })
            BLEStatus.login = true
            BLEStatus.username = resultjson.userName
          }
        })
        .catch((error)=>{
          console.error(error);
        })
      }
      if(tmp === '-1'){
        Toast.show({
          text: "Login fails. Please check your username and password",
          //buttonText: "Okay",
          type: "danger"
        })
      }
    })
    .catch((error)=>{
      console.error(error);
    })
    /*
    if(tmp === 0){
      Toast.show({
        text: "success "+"name:"+this.state.username+" pass:"+this.state.password,
        //buttonText: "Okay",
        type: "success"
      })
    }
    if(tmp === -1){
      Toast.show({
        text: "Fail",
        //buttonText: "Okay",
        type: "danger"
      })
    }
    */

  }
}

export default LoginScreen

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
  btnLogout: {
    backgroundColor: '#e67e22',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
    alignSelf:'center',
    marginTop: 200,
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