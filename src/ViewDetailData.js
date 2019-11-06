import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native'
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

  export default class ViewDetailData extends Component {
    constructor(props) {
        super(props);   
        this.state={
            data: [],
            startTime:"",
            endTime:"",
        }
    }

    render () {
        //const { navigation } = this.props;
        return (
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
            <Title>Detail</Title>
          </Body>
          <Right />
        </Header>
            
            <View style={styles.container}>  

            </View>
            
            </Container>
        )
    }
  }

  const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor:'white',
        marginTop:Platform.OS == 'ios'?20:0,
    },
})