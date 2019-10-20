
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
  //Button,
  TextInput,
  Dimensions,
  FlatList,
  PermissionsAndroid,
} from 'react-native';

import {
  Container,
  Header,
  Button,
  Title,
  Content,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";

var window_width = Dimensions.get('window').width;//得到屏幕宽度

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '',password:'',token:'' };
  }
  render() {
    //const { navigation } = this.props;
    const logined = this.props.navigation.getParam('logined', false);
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
        <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>My Profile</Title>
          </Body>
          <Right />
        </Header>

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
        </Container>
      );
    }

  }
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
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