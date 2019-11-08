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
        this.state={
            data: [],
            startTime:"",
            endTime:"",
            typeOfData:1,//temperature=1 humidity=2 pm1.0=3 pm2.5=4 pm10=5
            bar1Active:true,
            bar2Active:false,
            bar3Active:false,
            bar4Active:false,
            bar5Active:false,
        }
        this.sampleData = [
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 287},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 200},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
            {x: '2018-01-01', y: 30},
            {x: '2018-01-02', y: 608},
            {x: '2018-01-03', y: 170},
            {x: '2018-01-04', y: 250},
            {x: '2018-01-05', y: 10},
        ]
        this.allData=[]
        this.chartData=[]
    }

    componentDidMount(){
        type =this.props.navigation.getParam('typeOfData')
        this.setTypeOfData(type)

        var s = new Date()
        var e = new Date()
        this.setState({endTime:s})
        e.setTime(e.getTime()-24*60*60*1000);
        this.setState({startTime:e})

        this.loadData()
    }

    componentWillReceiveProps(nextProps){
        //type =this.props.navigation.getParam('typeOfData')
        type =nextProps.navigation.getParam('typeOfData')
        this.setTypeOfData(type)
    }

    loadData(start,end){
        var tmp = DatabaseServices.loadAll();
        if(tmp.length !== 0){
            this.allData = tmp.map(a=>a.air);
            var temperatureSet = this.allData.map(a=>a.temperature);
            var timeset = tmp.map(a=>a.date);
            var humiditySet = this.allData.map(a=>a.humidity);

            this.chartData = tmp.map(a=>{
                return {
                    x:a.date.getMonth()+'/'+a.date.getDate()+' '+a.date.getHours()+':'+a.date.getMinutes(),
                    y:a.air.temperature
                }
            })
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
    
    setTypeOfData(i){
        this.setState({
            typeOfData:i,
            bar1Active:false,
            bar2Active:false,
            bar3Active:false,
            bar4Active:false,
            bar5Active:false,
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

            <Button full primary style={{marginBottom: 20}}>
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