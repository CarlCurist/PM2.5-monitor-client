export default class ParsePackage{
    constructor(){
	    this.bluetoothReceiveData=[]
    }

    //接收到新数据
    handleUpdateValue=(data)=>{
        //ios接收到的是小写的16进制，android接收的是大写的16进制，统一转化为大写16进制
        //let value = data.value.toUpperCase();	
        value = data.value;
        this.bluetoothReceiveData.push(value);			
        console.log('BluetoothUpdateValue', value);
        //this.setState({receiveData:this.bluetoothReceiveData.join('')})
        //BLEStatus.data = this.state.receiveData;
        var result = null;
        if(value[2]===3){
            result = this.parseBATT_PACKAGE(value);
        }
        if(value[2]===2){
            result = this.parseRUNN_PACKAGE(value);
        }
        return result;
    }

    parseBATT_PACKAGE(data){
        var result={};
        if(!this.checkValid(data)){
            return null;
        }
        result.type = 3;
        result.year = 2000+ this.BCDtoNum(data[3]);
        result.month = this.BCDtoNum(data[4]);
        result.data = this.BCDtoNum(data[5]);
        result.hour = this.BCDtoNum(data[6]);
        result.minute = this.BCDtoNum(data[7]);
        result.second = this.BCDtoNum(data [8]);
        result.cd = data[9]?true:false;

        result.voltage = ((data[10]<<8)+data[11])*3.3/65535*1.5*1000;
        
        if(result.voltage>=3900){
            result.battery = 'high';
        }else if(result.voltage>=3600 && result.voltage<3900){
            result.battery = 'midium';
        }else if(result.voltage>=3300 && result.voltage < 3600){
            result.battery = 'low';
        }else{
            result.battery = 'critical';
        }

        console.log("flame parse BATT_PACKAGE ",JSON.stringify(result));
        return result;

    }

    parseRUNN_PACKAGE(data){
        var result={};
        if(!this.checkValid(data)){
            return null;
        }
        result.type = 2;
        result.sd = data[3]?true:false;
        result.temperature = ((data[4]<<8)+data[5])*175/65535-45;
        result.humidity = ((data[6]<<8)+data[7])/65535*100
        result._1p0 = ((data[8]<<8)+data[9]);
        result._2p5 = ((data[10]<<8)+data[11]);
        result._10p = ((data[12]<<8)+data[13]);

        result.temperature = result.temperature.toFixed(2);
        result.humidity = result.humidity.toFixed(2);

        result.error = data[14];
        console.log("flame parse RUNN_PACKAGE ",JSON.stringify(result));
        console.log("flame original package ",data.join(' '));
        return result;
    }

    BCDtoNum(bcd){
        return bcd-(bcd >> 4)*6;
    }

    checkValid(data){
        if(data[0] != 0xAA && data[1] != 0xAA){
            console.log('flame invalid RUNN_PACKAGE :',data.join(' '))
            return false;
        }

        var checksum = (data[18]<<8)+data[19];
        var i,tmp=0xFFFF;
        for(i=2;i<=17;i++){
            tmp = tmp - data[i];
        }
        if (tmp != checksum)
        {
            console.log('flame invalid package checksum fail :',data.join(' '))
            return false;
        }
        return true;
    }


}
