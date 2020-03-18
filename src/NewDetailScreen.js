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

const dataSource = {
    chart: {
        //caption: "Houses leased vs sold across US in 2017",
        //subcaption: "Click & drag on the plot area to zoom & then scroll",
        //yaxisname: "Number of houses",
        //xaxisname: "Date",
        forceaxislimits: "1",
        pixelsperpoint: "0",
        pixelsperlabel: "30",
        compactdatamode: "1",
        //dataseparator: "|",
        theme: "fusion",

        //toolTipBgColor: "#F5802A",
        //toolTipBorderColor: "#F5802A",
        //showToolTip: "0",
    },
    categories: [
        {
            category:
                "Jan 01|Jan 02|Jan 03|Jan 04|Jan 05|Jan 06|Jan 07|Jan 08|Jan 09|Jan 10|Jan 11|Jan 12|Jan 13|Jan 14|Jan 15|Jan 16|Jan 17|Jan 18|Jan 19|Jan 20|Jan 21|Jan 22|Jan 23|Jan 24|Jan 25|Jan 26|Jan 27|Jan 28|Jan 29|Jan 30|Jan 31|Feb 01|Feb 02|Feb 03|Feb 04|Feb 05|Feb 06|Feb 07|Feb 08|Feb 09|Feb 10|Feb 11|Feb 12|Feb 13|Feb 14|Feb 15|Feb 16|Feb 17|Feb 18|Feb 19|Feb 20|Feb 21|Feb 22|Feb 23|Feb 24|Feb 25|Feb 26|Feb 27|Feb 28|Mar 01|Mar 02|Mar 03|Mar 04|Mar 05|Mar 06|Mar 07|Mar 08|Mar 09|Mar 10|Mar 11|Mar 12|Mar 13|Mar 14|Mar 15|Mar 16|Mar 17|Mar 18|Mar 19|Mar 20|Mar 21|Mar 22|Mar 23|Mar 24|Mar 25|Mar 26|Mar 27|Mar 28|Mar 29|Mar 30|Mar 31|Apr 01|Apr 02|Apr 03|Apr 04|Apr 05|Apr 06|Apr 07|Apr 08|Apr 09|Apr 10|Apr 11|Apr 12|Apr 13|Apr 14|Apr 15|Apr 16|Apr 17|Apr 18|Apr 19|Apr 20|Apr 21|Apr 22|Apr 23|Apr 24|Apr 25|Apr 26|Apr 27|Apr 28|Apr 29|Apr 30|May 01|May 02|May 03|May 04|May 05|May 06|May 07|May 08|May 09|May 10|May 11|May 12|May 13|May 14|May 15|May 16|May 17|May 18|May 19|May 20|May 21|May 22|May 23|May 24|May 25|May 26|May 27|May 28|May 29|May 30|May 31|Jun 01|Jun 02|Jun 03|Jun 04|Jun 05|Jun 06|Jun 07|Jun 08|Jun 09|Jun 10|Jun 11|Jun 12|Jun 13|Jun 14|Jun 15|Jun 16|Jun 17|Jun 18|Jun 19|Jun 20|Jun 21|Jun 22|Jun 23|Jun 24|Jun 25|Jun 26|Jun 27|Jun 28|Jun 29|Jun 30|Jul 01|Jul 02|Jul 03|Jul 04|Jul 05|Jul 06|Jul 07|Jul 08|Jul 09|Jul 10|Jul 11|Jul 12|Jul 13|Jul 14|Jul 15|Jul 16|Jul 17|Jul 18|Jul 19|Jul 20|Jul 21|Jul 22|Jul 23|Jul 24|Jul 25|Jul 26|Jul 27|Jul 28|Jul 29|Jul 30|Jul 31|Aug 01|Aug 02|Aug 03|Aug 04|Aug 05|Aug 06|Aug 07|Aug 08|Aug 09|Aug 10|Aug 11|Aug 12|Aug 13|Aug 14|Aug 15|Aug 16|Aug 17|Aug 18|Aug 19|Aug 20|Aug 21|Aug 22|Aug 23|Aug 24|Aug 25|Aug 26|Aug 27|Aug 28|Aug 29|Aug 30|Aug 31|Sep 01|Sep 02|Sep 03|Sep 04|Sep 05|Sep 06|Sep 07|Sep 08|Sep 09|Sep 10|Sep 11|Sep 12|Sep 13|Sep 14|Sep 15|Sep 16|Sep 17|Sep 18|Sep 19|Sep 20|Sep 21|Sep 22|Sep 23|Sep 24|Sep 25|Sep 26|Sep 27|Sep 28|Sep 29|Sep 30|Oct 01|Oct 02|Oct 03|Oct 04|Oct 05|Oct 06|Oct 07|Oct 08|Oct 09|Oct 10|Oct 11|Oct 12|Oct 13|Oct 14|Oct 15|Oct 16|Oct 17|Oct 18|Oct 19|Oct 20|Oct 21|Oct 22|Oct 23|Oct 24|Oct 25|Oct 26|Oct 27|Oct 28|Oct 29|Oct 30|Oct 31|Nov 01|Nov 02|Nov 03|Nov 04|Nov 05|Nov 06|Nov 07|Nov 08|Nov 09|Nov 10|Nov 11|Nov 12|Nov 13|Nov 14|Nov 15|Nov 16|Nov 17|Nov 18|Nov 19|Nov 20|Nov 21|Nov 22|Nov 23|Nov 24|Nov 25|Nov 26|Nov 27|Nov 28|Nov 29|Nov 30|Dec 01|Dec 02|Dec 03|Dec 04|Dec 05|Dec 06|Dec 07|Dec 08|Dec 09|Dec 10|Dec 11|Dec 12|Dec 13|Dec 14|Dec 15|Dec 16|Dec 17|Dec 18|Dec 19|Dec 20|Dec 21|Dec 22|Dec 23|Dec 24|Dec 25|Dec 26|Dec 27|Dec 28|Dec 29|Dec 30|Dec 31"
        }
    ],
    dataset: [
        {
            "color": "F5802A",
            //seriesname: "Sold",
            data:
                "2140|2160|1667|1645|1740|1932|1127|1137|1172|1181|1142|1134|1117|1147|1141|1149|1150|1113|1119|1110|1092|1102|1128|1131|1083|1081|1087|1088|1092|1609|1112|1065|1063|1057|1045|1043|1078|1083|1043|2039|1036|1031|1048|1056|1074|1045|1037|1034|1039|1031|1045|2048|2031|2019|2026|2017|2011|2022|2027|2022|1017|1019|1010|1015|1023|1029|1020|1009|2012|2008|2015|2027|1033|1008|1007|1009|1010|1013|1017|1024|1012|1009|1007|1009|1011|1015|1020|1004|1009|1011|1028|1037|1049|1057|1045|1047|1056|1068|1077|1089|1100|1090|1086|1094|1098|1101|1125|1131|1111|1102|1109|1099|1094|1112|1121|1102|1094|1087|1089|1097|2139|1148|1131|1127|1129|1122|1137|1158|1174|1145|1143|1137|2139|2147|2156|1162|1134|1127|1130|1123|1117|1137|1138|1117|2109|1107|1100|1107|1120|2122|2120|2112|1100|1094|1090|1100|2102|2052|2054|2044|2047|1063|1077|2080|2050|1047|1030|1022|1021|1022|1025|1015|1009|1010|1007|2002|1010|1020|2000|1994|2990|2987|2910|2001|999|982|977|967|966|974|990|987|974|977|969|962|967|972|977|961|957|959|960|958|967|970|959|954|962|961|957|980|987|977|976|979|982|983|1000|1009|994|999|1002|1009|1015|1024|1029|1020|1011|1009|1015|1010|1025|1031|1019|1018|1022|1014|1018|1022|1025|1010|1022|1017|1019|1010|1015|1023|1029|1020|1009|1012|1008|1015|1027|1033|1008|1007|1009|1010|1013|1017|1024|1012|1009|1007|1009|1011|1015|1020|1004|1009|1045|1043|1078|1083|1043|1039|1036|1031|1048|1056|1074|1045|1037|1034|1039|1031|1045|1048|1031|1019|1026|1017|1011|1022|1027|1022|1020|1023|1024|1025|1040|1057|1035|1033|1037|1047|1049|1068|1074|1052|1059|1064|1860|1064|1080|1089|1080|2081|2079|2086|2084|2090|2099|2090|2391|1088|1084|1082|1089|1100|1094|1127|1129|1122|1137|1158|1174|1145|1143|1137|1139|1947|2156|2162|2134|1927|1930|1923|1917|1937|1938|1117|1109|1907|2100|2107|2137|1640|1620|1827|2130|2131"
        },
        /*
        {
          seriesname: "Rented",
          data:
            "2127|2129|2122|2137|2158|2174|2145|2143|2137|2139|2147|2156|2162|2134|2127|2131|2123|2117|2137|2138|2217|2192|2171|2122|2173|2137|2144|2124|2127|2133|2131|2147|2166|2167|2145|2614|2132|2127|2137|2172|2181|2142|2134|2117|2147|2141|2149|2165|2113|2119|2161|2692|2612|2128|2131|2838|2881|2897|2898|2495|2430|2780|2873|2463|2639|2366|2361|2468|2566|2774|2745|2377|2834|2399|2301|2445|2348|2431|2319|2426|2517|2161|2726|2627|2262|2672|2267|2254|2265|2455|3272|2667|2669|2556|2665|2673|2759|2567|2659|2652|2558|2665|2747|2853|2558|2557|2549|2446|2563|2667|2674|2672|2589|2578|2599|2671|2675|2777|2754|2579|2115|2537|2177|2975|2983|2988|2133|2983|2889|2886|2881|2799|2186|2124|2985|2887|2884|2879|2871|2975|2798|2781|2679|2776|2687|2691|2720|2707|2887|2872|2878|2664|2637|2774|2577|2489|2322|2327|2117|2136|2234|1939|1937|1974|1977|1969|1962|1967|1972|1977|1961|1957|1959|1916|1958|1967|1973|1959|1954|1962|1961|1957|1983|1987|1977|1976|1979|1982|1983|2133|2319|1994|1999|2233|2339|2135|2324|2239|2332|2131|2933|2135|2144|2255|2351|2159|2158|2252|2154|2158|2225|2255|2152|2112|2152|2954|2952|2251|2122|2552|2554|2454|2457|2653|2757|2558|2555|2457|2355|2252|2521|2522|2525|2515|2559|2551|2527|2222|2521|2522|2222|1994|3222|2417|2419|2214|2145|2423|2429|2442|2449|2412|2448|2215|2327|2333|3238|2337|2339|2311|2513|2517|2524|2512|2559|2557|2595|2611|2415|2642|2464|2946|2611|2628|2367|2469|2657|2645|2647|2656|2668|2677|2689|2641|2669|2686|2964|2968|2611|2125|2131|2111|2162|2619|2699|2964|2112|2121|2612|2964|2867|2869|2976|2567|2365|2334|2637|2467|2469|2668|2674|2652|2659|2674|2677|2674|2778|2879|2778|2871|2779|2786|2784|2779|2997|2977|2917|2878|2874|2872|2879|2771|2974|2139|2148|2131|2127|2129|2122|2137|2158|2174|2145|2143|2137|2139|2147|2156|2162|2134|2127|2713|2123|2117|2137|2138|2117|2169|2717|2641|2147|2124|2122|2124"
        }
        */
    ]
};

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
        this.change_data_set(0)
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
                    {this.raw_data_set.length !== 0 && this.display_raw_data_off !== 0 ?
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

                    {this.raw_data_set.length!==0 && this.display_raw_data_off !== this.raw_data_set.length - 1 ?
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