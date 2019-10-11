import React from 'react'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class MyLineChart extends React.PureComponent {
    constructor(props) {
        super(props);   
        this.state={
          //data:props.data,
          data:[],
        }
        
        
      }
/*
      static getDerivedStateFromProps(props, state) {
        return {
            data:props.data
        }
    }
    */

    updateData(newData){
        this.setState({
            data:newData
        });
        this.forceUpdate();
    }

    
    render() {

        //const data = [ 50, 10, 40, 95, -4, -60, 200 ]
        //const xAxis = ["15:00",6,5,4,3,2,1]

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
        // All react-native-svg-charts components support full flexbox and therefore all
        // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
        // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
        // and then displace the other axis with just as many pixels. Simple but manual.

        return (
            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    data={this.state.data}
                    style={{ marginBottom: 0 }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.state.data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    {/*
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={data}
                        formatLabel={(value, index) => xAxis[index]}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                    */}
                </View>
            </View>
        )
    }

}

export default MyLineChart
