import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'

import background from '../../assets/background1.jpg'
import BackgroundComponent from './BackgroundComponent'

//import Icon from 'react-native-vector-icons/FontAwesome'

import {
	Container,
	Header,
	Button,
	Title,
	Icon,
	Content,
	Footer,
	FooterTab,
	Left,
	Right,
	Body
  } from "native-base";

class UserScreen extends React.Component{
	render(){
		return (


			<View style={{ flex: 1}}>
				{/** 
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
			  <Title>Sensor</Title>
			</Body>
			<Right />
		  </Header>
				
				*/}


				<StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />    
				<BackgroundComponent source={background} />

				<View style={styles.container}>
					<Text style={styles.textTitle}>XXXX APP Name</Text>
					<Text style={styles.textSubTitle}>An air quality monitoring app</Text>

					{/*<View style={{ flexDirection:'column', marginTop: 100}}>
						<View style={[styles.btnSocial, { flexDirection: 'row' }]}>
							<Icon 
								name="facebook" 
								size={17} color="#2980b9" style={{ marginRight: 10 }} />

							<Text style={styles.textFacebook}>FACEBOOK</Text>
						</View>										

						<View style={[styles.btnSocial, { flexDirection: 'row' }]}>
							<Icon 
								name="google-plus" 
							size={17} color="#e74c3c" style={{ marginRight: 10 }} />

							<Text style={styles.textGoogle}>GOOGLE</Text>
						</View>					
					</View>	*/}				

					<View style={{ position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row'}}>
						<Text 
							style={styles.textBottom}
							onPress={() => this.props.navigation.navigate('Login')}>SIGN IN</Text>
						<Text 
							style={styles.textBottom}
							onPress={() => this.props.navigation.navigate('Register')}>SIGN UP</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default UserScreen

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
  	width: '50%',
  	textAlign: 'center',
  	fontWeight: 'bold',
  }
})