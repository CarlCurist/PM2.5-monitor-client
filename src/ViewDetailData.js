import React, { Component } from 'react'
import {
    StyleSheet,
    
    TouchableOpacity,
    View,
    Platform,
} from 'react-native'
import {
    Container,
    Text,
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
  import PureChart from 'react-native-pure-chart';
  import DatePicker from 'react-native-datepicker'
  import {Global} from './global'
  import DatabaseServices from './DatabaseHelper'; //annotation for debug

  export default class ViewDetailData extends Component {
    constructor(props) {
        super(props);
        //initalize state
        switch (props.navigation.getParam('typeOfData')) {
            case 0:
            case 1:
                this.state = {
                    data: [],
                    startTime: new Date(),
                    endTime: new Date(),
                    typeOfData: 1,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
                    bar1Active: true,
                    bar2Active: false,
                    bar3Active: false,
                    bar4Active: false,
                    bar5Active: false,
                }
                break
            case 2:
                this.state = {
                    data: [],
                    startTime: new Date(),
                    endTime: new Date(),
                    typeOfData: 2,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
                    bar1Active: false,
                    bar2Active: true,
                    bar3Active: false,
                    bar4Active: false,
                    bar5Active: false,
                }
                break
            case 3:
                this.state = {
                    data: [],
                    startTime: new Date(),
                    endTime: new Date(),
                    typeOfData: 3,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
                    bar1Active: false,
                    bar2Active: false,
                    bar3Active: true,
                    bar4Active: false,
                    bar5Active: false,
                }
                break
            case 4:
                this.state = {
                    data: [],
                    startTime: new Date(),
                    endTime: new Date(),
                    typeOfData: 4,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
                    bar1Active: false,
                    bar2Active: false,
                    bar3Active: false,
                    bar4Active: true,
                    bar5Active: false,
                }
                break
            case 5:
                this.state = {
                    data: [],
                    startTime: new Date(),
                    endTime: new Date(),
                    typeOfData: 5,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
                    bar1Active: false,
                    bar2Active: false,
                    bar3Active: false,
                    bar4Active: false,
                    bar5Active: true,
                }
                break
        }

        this.allData=[]
        this.chartData = []

        this.state.startTime.setTime(this.state.startTime.getTime() - 24 * 60 * 60 * 1000)
    }

      componentWillMount() {
        /*
        var s = new Date()
        var e = new Date()
        this.setState({endTime:s})
        e.setTime(e.getTime()-24*60*60*1000);
        this.setState({startTime:e})
        */
        type = this.props.navigation.getParam('typeOfData')
          if (type != 0) { 
              this.setTypeOfData(type)
          }
        
        
        //this.loadData()
    }

    componentWillReceiveProps(nextProps){
        //type =this.props.navigation.getParam('typeOfData')
        type = nextProps.navigation.getParam('typeOfData')
        if (type != 0) {
            this.setTypeOfData(type)
        }
    }

    loadData(start,end,data_type){
        //var tmp = DatabaseServices.loadAll();
        var tmp = DatabaseServices.loadDateFromUTC(start,end)
        if(tmp.length !== 0){
            //this.allData = tmp.map(a=>a.air);
            //var temperatureSet = this.allData.map(a=>a.temperature);
            //var timeset = tmp.map(a=>a.date);
            //var humiditySet = this.allData.map(a=>a.humidity);

            this.chartData = this.chooseData(tmp, data_type)
            for(var i=0;i<this.chartData.length;i++){
                this.chartData[i].y = Number(this.chartData[i].y.toFixed(2))
            }
            //console.log("flame-debug test "+this.chartData[0].y.toFixed(2))
            //console.log("flame-debug test "+ JSON.stringify(this.chartData))
            //console.log("flame-debug temperatureSet "+ JSON.stringify(temperatureSet))
            //console.log("flame-debug timeset "+ JSON.stringify(timeset))
            //console.log("flame-debug humiditySet "+ JSON.stringify(humiditySet))

        }
      }
      
      chooseData(air_set,data_type) {
          if (data_type==1) {
              return air_set.map(a => {
                  return {
                      x: a.date.getMonth() + 1 + '/' + a.date.getDate() + ' ' + a.date.getHours() + ':' + a.date.getMinutes(),
                      y: a.air.temperature
                  }
              })
          }

          if (data_type==2) {
              return air_set.map(a => {
                  return {
                      x: a.date.getMonth()+1 + '/' + a.date.getDate() + ' ' + a.date.getHours() + ':' + a.date.getMinutes(),
                      y: a.air.humidity
                  }
              })
          }

          if (data_type == 3) {
              return air_set.map(a => {
                  return {
                      x: a.date.getMonth() + 1 + '/' + a.date.getDate() + ' ' + a.date.getHours() + ':' + a.date.getMinutes(),
                      y: a.air._1p0
                  }
              })
          }
          if (data_type == 4) {
              return air_set.map(a => {
                  return {
                      x: a.date.getMonth() + 1 + '/' + a.date.getDate() + ' ' + a.date.getHours() + ':' + a.date.getMinutes(),
                      y: a.air._2p5
                  }
              })
          }
          if (data_type == 5) {
              return air_set.map(a => {
                  return {
                      x: a.date.getMonth() + 1 + '/' + a.date.getDate() + ' ' + a.date.getHours() + ':' + a.date.getMinutes(),
                      y: a.air._10p
                  }
              })
          }
    }
    
      setTypeOfData(i) {
        this.refresh(i)
        this.setState({
            typeOfData: i,
            bar1Active: false,
            bar2Active: false,
            bar3Active: false,
            bar4Active: false,
            bar5Active: false,
        })

        switch(i){
            case 1:
                this.setState({bar1Active:true})
                break
            case 2:
                this.setState({bar2Active:true})
                break
            case 3:
                this.setState({bar3Active:true})
                break
            case 4:
                this.setState({bar4Active:true})
                break
            case 5:
                this.setState({bar5Active:true})
                break
        }

        
        //this.setState({typeOfData:1})
      }
      
      getUTCString(date = null) {
          // it will return last 24H by default
          if (date === null) {
              date = new Date();
              date.setTime(date.getTime() - 24 * 60 * 60 * 1000); // get yesterday
          }
          //console.log("flame-debug ViewDetail "+date)
          if (typeof date == "string") {
              //new Date(date) fails in normal time but run normally when debugging
              //get more information https://www.jianshu.com/p/dfdd86796ab3
              date = new Date(Date.parse(date.replace(/-/g, "/"))) 
              //console.log("flame-debug ViewDetail convert date succeed! " + date)
          }
          
          //var t1 = date.getUTCMonth();
          //var t2 = date.getUTCDate();
          // getUTCMounth() return 0-11
          return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + '@' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
      }

      refresh(data_type) {
          UTC_start_time = ""
          UTC_end_time = ""
          if (this.state.startTime != "" && this.state.endTime != "") {
              UTC_start_time = this.getUTCString(this.state.startTime)
              UTC_end_time = this.getUTCString(this.state.endTime)
          }
          this.loadData(UTC_start_time, UTC_end_time, data_type)
          //this.forceUpdate()
      }

    render () {
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
                <PureChart data={this.chartData} type='line'
                        width={'100%'}
                        height={deviceHeight/2} 
                        xAxisGridLineColor={'white'}
                        //showEvenNumberXaxisLabel={false}
                        numberOfYAxisGuideLine={10}
                        //minValue={10}
                        showXAxisLabel= {false}
                        gap={20}
                        />

                <View style={{flexDirection:"row",marginTop:20}}>
                    <View>
                        <Text>Start from:</Text>
                        <DatePicker
                        style={{width: deviceWidth/2}}
                        date={this.state.startTime}
                        mode="datetime"
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({startTime: date})}}
                        />
                    </View>

                    <View>
                        <Text>End at:</Text>
                        <DatePicker
                        style={{width: deviceWidth/2}}
                        date={this.state.endTime}
                        mode="datetime"
                        placeholder="select date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({endTime: date})}}
                        />
                    </View>
                </View>

            </View>

                <Button full primary style={{ marginBottom: 20 }} onPress={() => this.setTypeOfData(this.state.typeOfData)}>
                    <Text>refresh</Text>
            </Button>
            
            <Footer>
                <FooterTab>
                        <Button active={this.state.bar1Active} onPress={() => this.setTypeOfData(1)}>
                    <Text>Temperature</Text>
                    </Button>
                    <Button active={this.state.bar2Active} onPress={() => this.setTypeOfData(2)}>
                    <Text>Humidity</Text>
                    </Button>
                    <Button active={this.state.bar3Active} onPress={() => this.setTypeOfData(3)}>
                    <Text>PM1.0</Text>
                    </Button>
                    <Button active={this.state.bar4Active} onPress={() => this.setTypeOfData(4)}>
                    <Text>PM2.5</Text>
                    </Button>
                    <Button active={this.state.bar5Active} onPress={() => this.setTypeOfData(5)}>
                    <Text>PM10</Text>
                    </Button>
                </FooterTab>
            </Footer>
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