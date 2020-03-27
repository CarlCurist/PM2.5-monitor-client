import React, { Component } from "react";
import { ImageBackground, Image, StyleSheet, Text, View, Platform, Alert, TouchableOpacity } from "react-native";
import FusionCharts from "react-native-fusioncharts";
import {
    Container,
    Button,Header,
    
    Title,
    Content,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Toast
} from "native-base";
import { Global } from './global'
import CircleButton from './utils/CircleButton'
import RectangleButton from './utils/RectangleButton'
import DatePicker from 'react-native-datepicker'
import DatabaseServices from './DatabaseHelper';



const myevent = {
    // Add your events method here:
    // Event name should be in small letters.
    renderComplete: (e, a) => {
        Alert.alert(`You clicked on dsa`);
    }
}

export default class NewDetailScreen extends Component {
    constructor(props) {
        super(props);

        //this.state = dataSource;
        this.state = {

            events: {
                // Add your events method here:
                // Event name should be in small letters.
                zoomreset: () => {
                    Alert.alert(`You clicked on sadf`);
                }
            },

            temp_icon_type: 0,
            hum_icon_type: 1,
            p1_icon_type: 2,
            p25_icon_type: 3,
            p10_icon_type: 4,

            //data_displaly_type: 0, //type 0==temp 1==hum 2==pm1 3==pm2.5 4==pm10
            //data_displaly_mode: 0,//0==raw 1==hourly 2==daily 3==monthly
            display_hourly_icon_focused: false,
            display_daily_icon_focused: false,
            display_monthly_icon_focused: false,

            startTime: new Date(),
            endTime: new Date(),

            
        };

        this.libraryPath = Platform.select({
            // Specify fusioncharts.html file location
            //ios: require("./assets/fusioncharts.html"),
            android: { uri: "file:///android_asset/fusioncharts.html" }
        });
        //start from 6 days ago
        this.state.startTime.setHours(0, 0, 0, 0)
        this.state.startTime.setTime(this.state.startTime.getTime() - 86400000 * 6)

        this.display_raw_dataSource = {
            chart: {
                forceaxislimits: "1",
                pixelsperpoint: "0",
                pixelsperlabel: "30",
                compactdatamode: "1",
                theme: "fusion",
            },
            categories: [
                {
                    category:[]
                }
            ],
            dataset: [
                {
                    "color": "F5802A",
                    //seriesname: "Sold",
                    data:[]
                },
            ]
        };

        this.display_scrollline_dataSource = {
            chart: {
                //caption: "Deaths reported because of mosquito bites in India",
                //subcaption: "(As per government records)",
                showvalues: "0",
                numvisibleplot: "12",
                //plottooltext:
                //    "<b>$dataValue</b> people died because of mosquito bites in $label",
                theme: "fusion"
            },
            categories: [
                {
                    category: []
                }
            ],
            dataset: [
                {
                    "color": "F5802A",
                    data: []
                }
            ]
        };
        this.data_displaly_type = 0, //type 0==temp 1==hum 2==pm1 3==pm2.5 4==pm10
        this.data_displaly_mode = 0,//0==raw 1==hourly 2==daily 3==monthly
        //this.diaplay_data_type = 0
        this.raw_data_set = []
        this.display_raw_data_off = 0
        
        this.hourly_timestamp_set = []
        this.hourly_data_set = []
        this.daily_timestamp_set = []
        this.daily_data_set = []
        this.monthly_timestamp_set = []
        this.monthly_data_set = []
        
    }

    componentDidMount() {
        //type = this.props.navigation.getParam('typeOfData')
        //type = this.props.navigation.state.params
        this.refresh()
        this.change_data_set(DetailScreenIconType)
        //this.change_data_set(0)
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
        }
        return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + '@' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
    }

    refresh() {
        UTC_start_time = ""
        UTC_end_time = ""
        if (this.state.startTime != "" && this.state.endTime != "") {
            UTC_start_time = this.getUTCString(this.state.startTime)
            UTC_end_time = this.getUTCString(this.state.endTime)
        }
        this.loadData(UTC_start_time, UTC_end_time)
        //this.forceUpdate()
    }

    loadData(start, end) {
        this.raw_data_set = []
        var tmp = DatabaseServices.loadDateFromUTC(start, end)
        if (tmp.length !== 0) {
            //console.log("flame-debug DetailScreen ", JSON.stringify(tmp))
            
            //calc raw data
            raw_data_item_timestamp = ""
            raw_data_category = []
            raw_temp_dataset = []
            raw_hum_dataset = []
            raw_1p0_dataset = []
            raw_2p5_dataset = []
            raw_p10_dataset = []
            for (var item of tmp) {
                datetime = item.date.getFullYear() + '-' + (parseInt(item.date.getMonth()) + 1) + '-' + item.date.getDate()
                if (datetime !== raw_data_item_timestamp) {
                    if (raw_data_item_timestamp !== "") {
                        this.raw_data_set.push({
                            "datetime": raw_data_item_timestamp,
                            "category": raw_data_category,
                            "temp": raw_temp_dataset,
                            "hum": raw_hum_dataset,
                            "1p0": raw_1p0_dataset,
                            "2p5": raw_2p5_dataset,
                            "p10": raw_p10_dataset,
                        })   
                    }
                    raw_data_item_timestamp = datetime
                    raw_data_category = []
                    raw_temp_dataset = []
                    raw_hum_dataset = []
                    raw_1p0_dataset = []
                    raw_2p5_dataset = []
                    raw_p10_dataset = []
                }
                //console.log("flame-debug DetailScreen ", item.date.getMonth() + 1 + '-' + item.date.getDate() + ' ' + item.date.getHours() + ':' + item.date.getMinutes())
                preciseTime = item.date.getHours() + ':' + item.date.getMinutes()
                raw_data_category.push({ "label": preciseTime })
                raw_temp_dataset.push({ "value": item.air.temperature.toFixed(2) })
                raw_hum_dataset.push({ "value": item.air.humidity.toFixed(2) })
                raw_1p0_dataset.push({ "value": item.air._1p0.toFixed(2) })
                raw_2p5_dataset.push({ "value": item.air._2p5.toFixed(2) })
                raw_p10_dataset.push({ "value": item.air._10p.toFixed(2) })

            }
            this.raw_data_set.push({
                "datetime": raw_data_item_timestamp,
                "category": raw_data_category,
                "temp": raw_temp_dataset,
                "hum": raw_hum_dataset,
                "1p0": raw_1p0_dataset,
                "2p5": raw_2p5_dataset,
                "p10": raw_p10_dataset,
            }) 
            this.display_raw_data_off = this.raw_data_set.length - 1
            //console.log("flame-debug DetailScreen ", JSON.stringify(this.raw_data_set[0]))

            //calc hourly daily monthly data
            hourly_data_set = {}
            daily_data_set = {}
            monthly_data_set = {}
            for (var item of tmp) {
                hourlyTimestamp = item.date.getFullYear() + '-' + (parseInt(item.date.getMonth()) + 1) + '-' + item.date.getDate() + ' ' + item.date.getHours() + ':00'
                dailyTimestamp = item.date.getFullYear() + '-' + (parseInt(item.date.getMonth()) + 1) + '-' + item.date.getDate()
                monthlyTimestamp = item.date.getFullYear() + '-' + (parseInt(item.date.getMonth()) + 1)
                if (!(hourlyTimestamp in hourly_data_set)) {
                    hourly_data_set[hourlyTimestamp] = []
                }
                if (!(dailyTimestamp in daily_data_set)) {
                    daily_data_set[dailyTimestamp] = []
                }
                if (!(monthlyTimestamp in monthly_data_set)) {
                    monthly_data_set[monthlyTimestamp] = []
                }

                hourly_data_set[hourlyTimestamp].push({
                    "temp": item.air.temperature.toFixed(2),
                    "hum": item.air.humidity.toFixed(2),
                    "1p0": item.air._1p0.toFixed(2) ,
                    "2p5": item.air._2p5.toFixed(2),
                    "p10": item.air._10p.toFixed(2),
                })
                daily_data_set[dailyTimestamp].push({
                    "temp": item.air.temperature.toFixed(2),
                    "hum": item.air.humidity.toFixed(2),
                    "1p0": item.air._1p0.toFixed(2),
                    "2p5": item.air._2p5.toFixed(2),
                    "p10": item.air._10p.toFixed(2),
                })
                monthly_data_set[monthlyTimestamp].push({
                    "temp": item.air.temperature.toFixed(2),
                    "hum": item.air.humidity.toFixed(2),
                    "1p0": item.air._1p0.toFixed(2),
                    "2p5": item.air._2p5.toFixed(2),
                    "p10": item.air._10p.toFixed(2),
                })
            }

            t = this.calcAverage(hourly_data_set)
            this.hourly_timestamp_set = t["timestamp"]
            this.hourly_data_set = t["data"]

            t = this.calcAverage(daily_data_set)
            this.daily_timestamp_set = t["timestamp"]
            this.daily_data_set = t["data"]

            t = this.calcAverage(monthly_data_set)
            this.monthly_timestamp_set = t["timestamp"]
            this.monthly_data_set = t["data"]
            

            //console.log("flame-debug DetailScreen hourly_timestamp", JSON.stringify(hourly_keys))
            //console.log("flame-debug DetailScreen hourly_data_set", JSON.stringify(hourly_data_set))
            //console.log("flame-debug DetailScreen daily_data_set", JSON.stringify(daily_data_set))
            //console.log("flame-debug DetailScreen monthly_data_set", JSON.stringify(monthly_data_set))
        } else {
            this.raw_data_set=[]
        }

        this.updateChart()
    }

    calcAverage(all_data_set) {
        keys = Object.keys(all_data_set)
        timestamp_set = []
        temp_dataset = []
        hum_dataset = []
        _1p0_dataset = []
        _2p5_dataset = []
        _p10_dataset = []
        console.log("flame-debug DetailScreen hourly_timestamp", JSON.stringify(keys))
        for (var key of keys) {
            timestamp_set.push({ "label": key })
            //console.log("flame-debug DetailScreen hourly_timestamp", JSON.stringify(hourly_data_set[key]))
            t_temp = 0
            t_hum = 0
            t_1p0 = 0
            t_2p5 = 0
            t_p10 = 0
            for (var item of all_data_set[key]) {
                t_temp += Number(item["temp"])
                t_hum += Number(item["hum"])
                t_1p0 += Number(item["1p0"])
                t_2p5 += Number(item["2p5"])
                t_p10 += Number(item["p10"])
            }
            t_temp /= all_data_set[key].length
            t_hum /= all_data_set[key].length
            t_1p0 /= all_data_set[key].length
            t_2p5 /= all_data_set[key].length
            t_p10 /= all_data_set[key].length

            temp_dataset.push({ "value": t_temp.toFixed(2) })
            hum_dataset.push({ "value": t_hum.toFixed(2) })
            _1p0_dataset.push({ "value": t_1p0.toFixed(2) })
            _2p5_dataset.push({ "value": t_2p5.toFixed(2) })
            _p10_dataset.push({ "value": t_p10.toFixed(2) })

            //console.log("flame-debug DetailScreen length ", all_data_set[key].length)
            //console.log("flame-debug DetailScreen temp ", t_temp)
            //console.log("flame-debug DetailScreen t_hum ", t_hum)
        }
        return {
            "timestamp": timestamp_set,
            "data": {
                "temp": temp_dataset,
                "hum": hum_dataset,
                "1p0": _1p0_dataset,
                "2p5": _2p5_dataset,
                "p10": _p10_dataset
            }
        }
    }


    //type 0==temp 1==hum 2==pm1 3==pm2.5 4==pm10
    change_data_set(type) { 
        switch(type){
            case 0:
                this.data_displaly_type = 0
                this.setState({
                    temp_icon_type: 0+5,
                    hum_icon_type: 1,
                    p1_icon_type: 2,
                    p25_icon_type: 3,
                    p10_icon_type: 4,
                    //data_displaly_type:0
                })
                this.updateChart()
                break
            case 1:
                this.data_displaly_type = 1
                this.setState({
                    temp_icon_type: 0,
                    hum_icon_type: 1+5,
                    p1_icon_type: 2,
                    p25_icon_type: 3,
                    p10_icon_type: 4,
                    //data_displaly_type:1
                })
                this.updateChart()
                break
            case 2:
                this.data_displaly_type = 2
                this.setState({
                    temp_icon_type: 0,
                    hum_icon_type: 1,
                    p1_icon_type: 2+5,
                    p25_icon_type: 3,
                    p10_icon_type: 4,
                    //data_displaly_type:2
                })
                this.updateChart()
                break
            case 3:
                this.data_displaly_type = 3
                this.setState({
                    temp_icon_type: 0,
                    hum_icon_type: 1,
                    p1_icon_type: 2,
                    p25_icon_type: 3+5,
                    p10_icon_type: 4,
                    //data_displaly_type:3
                })
                this.updateChart()
                break
            case 4:
                this.data_displaly_type = 4
                this.setState({
                    temp_icon_type: 0,
                    hum_icon_type: 1,
                    p1_icon_type: 2,
                    p25_icon_type: 3,
                    p10_icon_type: 4 + 5,
                    //data_displaly_type:4
                })
                this.updateChart()
                break
        }
    }

    change_data_display_mode(mode) {
        if (mode == this.data_displaly_mode) {
            this.data_displaly_mode = 0
            this.setState({
                //data_displaly_mode: 0,
                display_hourly_icon_focused: false,
                display_daily_icon_focused: false,
                display_monthly_icon_focused: false,
            })
            this.updateChart()
        } else {
            switch (mode) {
                case 1:
                    this.data_displaly_mode=1
                    this.setState({
                        //data_displaly_mode: 1,
                        display_hourly_icon_focused: true,
                        display_daily_icon_focused: false,
                        display_monthly_icon_focused: false,
                    })
                    this.updateChart()
                    break
                case 2:
                    this.data_displaly_mode=2
                    this.setState({
                        //data_displaly_mode: 2,
                        display_hourly_icon_focused: false,
                        display_daily_icon_focused: true,
                        display_monthly_icon_focused: false,
                    })
                    this.updateChart()
                    break
                case 3:
                    this.data_displaly_mode=3
                    this.setState({
                        //data_displaly_mode: 3,
                        display_hourly_icon_focused: false,
                        display_daily_icon_focused: false,
                        display_monthly_icon_focused: true,
                    })
                    this.updateChart()
                    break
            }
        }

    }

    updateChart() {
        if (this.data_displaly_mode === 0) {
            if (this.raw_data_set.length === 0) {
                this.display_raw_dataSource["categories"][0]["category"] = []
                this.display_raw_dataSource["dataset"][0]["data"] = []
                this.forceUpdate()
                return
            }
            if (this.data_displaly_type === 0) {
                this.display_raw_dataSource["categories"][0]["category"] = this.raw_data_set[this.display_raw_data_off]["category"]
                this.display_raw_dataSource["dataset"][0]["data"] = this.raw_data_set[this.display_raw_data_off]["temp"]
            }
            if (this.data_displaly_type === 1) {
                this.display_raw_dataSource["categories"][0]["category"] = this.raw_data_set[this.display_raw_data_off]["category"]
                this.display_raw_dataSource["dataset"][0]["data"] = this.raw_data_set[this.display_raw_data_off]["hum"]
            }
            if (this.data_displaly_type === 2) {
                this.display_raw_dataSource["categories"][0]["category"] = this.raw_data_set[this.display_raw_data_off]["category"]
                this.display_raw_dataSource["dataset"][0]["data"] = this.raw_data_set[this.display_raw_data_off]["1p0"]
            }
            if (this.data_displaly_type === 3) {
                this.display_raw_dataSource["categories"][0]["category"] = this.raw_data_set[this.display_raw_data_off]["category"]
                this.display_raw_dataSource["dataset"][0]["data"] = this.raw_data_set[this.display_raw_data_off]["2p5"]
            }
            if (this.data_displaly_type === 4) {
                this.display_raw_dataSource["categories"][0]["category"] = this.raw_data_set[this.display_raw_data_off]["category"]
                this.display_raw_dataSource["dataset"][0]["data"] = this.raw_data_set[this.display_raw_data_off]["p10"]
            }
            this.forceUpdate()
        }

        if (this.data_displaly_mode === 1) { 
            if (this.hourly_data_set.length === 0) {
                this.display_scrollline_dataSource["categories"][0]["category"] = []
                this.display_scrollline_dataSource["dataset"][0]["data"] = []
                this.forceUpdate()
                return
            }
            this.display_scrollline_dataSource["categories"][0]["category"] = this.hourly_timestamp_set
            if (this.data_displaly_type === 0) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.hourly_data_set["temp"]
            }
            if (this.data_displaly_type === 1) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.hourly_data_set["hum"]
            }
            if (this.data_displaly_type === 2) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.hourly_data_set["1p0"]
            }
            if (this.data_displaly_type === 3) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.hourly_data_set["2p5"]
            }
            if (this.data_displaly_type === 4) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.hourly_data_set["p10"]
            }
            
        }

        if (this.data_displaly_mode === 2) {
            if (this.hourly_data_set.length === 0) {
                this.display_scrollline_dataSource["categories"][0]["category"] = []
                this.display_scrollline_dataSource["dataset"][0]["data"] = []
                this.forceUpdate()
                return
            }
            this.display_scrollline_dataSource["categories"][0]["category"] = this.daily_timestamp_set
            if (this.data_displaly_type === 0) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.daily_data_set["temp"]
            }
            if (this.data_displaly_type === 1) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.daily_data_set["hum"]
            }
            if (this.data_displaly_type === 2) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.daily_data_set["1p0"]
            }
            if (this.data_displaly_type === 3) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.daily_data_set["2p5"]
            }
            if (this.data_displaly_type === 4) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.daily_data_set["p10"]
            }
        }

        if (this.data_displaly_mode === 3) {
            if (this.hourly_data_set.length === 0) {
                this.display_scrollline_dataSource["categories"][0]["category"] = []
                this.display_scrollline_dataSource["dataset"][0]["data"] = []
                this.forceUpdate()
                return
            }
            this.display_scrollline_dataSource["categories"][0]["category"] = this.monthly_timestamp_set
            if (this.data_displaly_type === 0) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.monthly_data_set["temp"]
            }
            if (this.data_displaly_type === 1) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.monthly_data_set["hum"]
            }
            if (this.data_displaly_type === 2) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.monthly_data_set["1p0"]
            }
            if (this.data_displaly_type === 3) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.monthly_data_set["2p5"]
            }
            if (this.data_displaly_type === 4) {
                this.display_scrollline_dataSource["dataset"][0]["data"] = this.monthly_data_set["p10"]
            }
            /**
             *         this.hourly_timestamp_set = []
        this.hourly_data_set = []
        this.daily_timestamp_set = []
        this.daily_data_set = []
        this.monthly_timestamp_set = []
        this.monthly_data_set = []
             */
        }
        this.forceUpdate()

    }
    render_chart() {
        if (this.data_displaly_mode === 0) {
            return (
                <View style={styles.container}>
                    {this.raw_data_set.length !== 0 ?
                        <Text style={styles.font_grey_center}>
                            Datetime: {this.raw_data_set[this.display_raw_data_off]["datetime"]}
                        </Text>
                        :
                        null
                    }

                    <View style={{ flex: 1 }}>
                        <FusionCharts
                            type="zoomline"
                            width="100%"
                            height="100%"
                            dataFormat="JSON"
                            dataSource={this.display_raw_dataSource}
                            libraryPath={this.libraryPath} // set the libraryPath property
                            //baseChartMessageColor="#F5802A"
                            events={this.state.events}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <FusionCharts
                            type="scrollline2d"
                            width="100%"
                            height="100%"
                            dataFormat="JSON"
                            dataSource={this.display_scrollline_dataSource}
                            libraryPath={this.libraryPath} // set the libraryPath property
                        />
                    </View>
                </View>
            )
        }
    }
    
    render() {
        return (
            <Container style={{ backgroundColor: "#FFF" }}>
                 
                <Header style={{ backgroundColor: "transparent" }}>
                    <ImageBackground source={require("../assets/image/bg.gif")} style={{ width: deviceWidth, height: 56 }}>
                        <View style={{ flex: 1,flexDirection:"row", justifyContent: "space-between", alignItems: 'center' }}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Icon name="arrow-back" />
                            </Button>
                            <Title> Detail</Title>
                            <Title >             </Title>
                        </View>
                    </ImageBackground>
                </Header>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 10
                }}>
                    <TouchableOpacity
                        onPress={() => this.change_data_set(0)}>
                        <CircleButton icon_type={this.state.temp_icon_type} />
                    </TouchableOpacity >

                    <TouchableOpacity
                        onPress={() => this.change_data_set(1)}>
                        <CircleButton icon_type={this.state.hum_icon_type} />
                    </TouchableOpacity >

                    <TouchableOpacity
                        onPress={() => this.change_data_set(2)}>
                        <CircleButton icon_type={this.state.p1_icon_type} />
                    </TouchableOpacity >

                    <TouchableOpacity
                        onPress={() => this.change_data_set(3)}>
                        <CircleButton icon_type={this.state.p25_icon_type} />
                    </TouchableOpacity >

                    <TouchableOpacity
                        onPress={() => this.change_data_set(4)}>
                        <CircleButton icon_type={this.state.p10_icon_type} />
                    </TouchableOpacity >

                </View>
                
                {this.render_chart()}

                <View style={{ flexDirection: "row"}}>
                    <View>
                        <Text>Start from:</Text>
                        <DatePicker
                            style={{ width: deviceWidth / 2 }}
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
                            onDateChange={(date) => {
                                this.setState({ startTime: date })
                                this.refresh()
                            }}
                        />
                    </View>

                    <View>
                        <Text>End at:</Text>
                        <DatePicker
                            style={{ width: deviceWidth / 2 }}
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
                            onDateChange={(date) => {
                                this.setState({ endTime: date })
                                this.refresh()
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 10
                }}>
                    <TouchableOpacity
                        onPress={() => this.change_data_display_mode(1)}>
                        <RectangleButton focused={this.state.display_hourly_icon_focused} button_text="Hourly"/>
                    </TouchableOpacity >
                    <TouchableOpacity
                        onPress={() => this.change_data_display_mode(2)}>
                        <RectangleButton focused={this.state.display_daily_icon_focused} button_text="Daily" />
                    </TouchableOpacity >
                    <TouchableOpacity
                        onPress={() => this.change_data_display_mode(3)}>
                        <RectangleButton focused={this.state.display_monthly_icon_focused} button_text="Monthly" />
                    </TouchableOpacity >
                </View>

                
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    {this.data_displaly_mode === 0 && this.raw_data_set.length !== 0 && this.display_raw_data_off !== 0 ?
                        <Button bordered warning
                            style={styles.bottom_button}
                            onPress={() => {
                                this.display_raw_data_off -= 1
                                this.change_data_set(this.data_displaly_type)
                            }}>
                            <Image
                                source={require('../assets/icon/left_icon_orange.png')}
                                style={{ height: 30, width: 30 }} />
                        </Button>
                        :
                        <Button bordered warning disabled
                            style={styles.bottom_button}>
                            <Image
                                source={require('../assets/icon/left_icon_gray.png')}
                                style={{ height: 30, width: 30 }} />
                        </Button>
                }

                    {this.data_displaly_mode === 0 && this.raw_data_set.length!==0 && this.display_raw_data_off !== this.raw_data_set.length - 1 ?
                        <Button bordered warning
                            style={styles.bottom_button}
                            onPress={() => {
                                this.display_raw_data_off += 1
                                this.change_data_set(this.data_displaly_type)
                            }}>
                            <Image
                                source={require('../assets/icon/right_icon_orange.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </Button>
                        :
                        <Button bordered warning disabled
                            style={styles.bottom_button}>
                            <Image
                                source={require('../assets/icon/right_icon_gray.png')}
                                style={{ height: 30, width: 30 }}
                            />
                        </Button>
                        

                }

                </View>
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    heading: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },

    bottom_button: {
        height: 40,
        width: deviceWidth / 2.2,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: 'center' 
    },
    font_grey_center: {
        color: '#CDCDCD',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});