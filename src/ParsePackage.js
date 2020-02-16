import {Global} from './global'

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
        if(value[2]===1){
            result = this.parseCHRG_PACKAGE(value);
        }
        return result;
    }

    parseCHRG_PACKAGE(data){
        var result={};
        if(!this.checkValid(data)){
            return null;
        }
        result.type = 1;
        result.battery = data[3] ? "Full":"charging";
        result.current = ((data[4]<<8) + data[5])*3.3/65535*500;
        result.timestat = data[6] ? true:false;

        console.log("flame parse CHRG_PACKAGE ",JSON.stringify(result));
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
        result.date = this.BCDtoNum(data[5]);
        result.hour = this.BCDtoNum(data[6]);
        result.minute = this.BCDtoNum(data[7]);
        result.second = this.BCDtoNum(data [8]);
        result.cd = data[9]?true:false;
        

        result.voltage = ((data[10]<<8)+data[11])*3.3/65535*1.5*1000;
        
        if (result.voltage >= 3975){
            result.battery = 'high';
        } else if (result.voltage >= 3750 && result.voltage < 3975){
            result.battery = 'medium';
        } else if (result.voltage >= 3525 && result.voltage < 3750){
            result.battery = 'low';
        }else{
            result.battery = 'critical'; //3300-3525
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
        result.humidity = ((data[6]<<8)+data[7])/65535*100;
        result._1p0 = ((data[8]<<8)+data[9]);
        result._2p5 = ((data[10]<<8)+data[11]);
        result._10p = ((data[12]<<8)+data[13]);
        result.raw = JSON.stringify(data)

        //result.temperature = result.temperature.toFixed(2); //this function will let number become string
        //result.humidity = result.humidity.toFixed(2);

        result.error = data[14];
        console.log("flame parse RUNN_PACKAGE ",JSON.stringify(result));
        console.log("flame original package ",data.join(' '));
        return result;
    }

    BCDtoNum(bcd){
        return bcd-(bcd >> 4)*6;
    }

    NumtoBCD(num){
        return num + parseInt(num/10)*6;
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
    
    calcCheckSum(data){
        var i,tmp=0;
        for(i=2;i<=17;i++){
            tmp = tmp + data[i];
        }
        return tmp;
    }

    synchronizeClock(){
        var data = Array(20),i;
        currentDate = new Date();//'2019-1-1 00:59:20'
    
        data[0]=data[1]=0xAA;
        data[2] = 1;
        data[3] = 0;//millisecond
        data[4] = this.NumtoBCD(currentDate.getSeconds());
        data[5] = this.NumtoBCD(currentDate.getMinutes());
        data[6] = this.NumtoBCD(currentDate.getHours());
        data[7] = currentDate.getDay()===0 ? 7: currentDate.getDay()+1;
        data[8] = this.NumtoBCD(currentDate.getDate());
        data[9] = this.NumtoBCD(currentDate.getMonth()+1);
        data[10] = this.NumtoBCD(currentDate.getYear()-100);

        for(i=11;i<18;i++)
            data[i]=0;

        checksum = this.calcCheckSum(data);
        data[18] = checksum>>8;
        data[19] = checksum & 0xff;

        var debugstr = '';
        for(i=0;i<20;i++){
            debugstr += data[i].toString(16) + ' ';
        }
        //console.log(currentDate.getDay() + ' ' +currentDate.getYear());
        console.log('flame synchronizeClock package :',debugstr);

        BluetoothManager.writeUUID(data,RWServiceUUID,WriteUUID)
        .then(()=>{
            console.log('flame writeUUID success');

        })
        .catch(err=>{
            console.log('flame writeUUID ',err);               
        })
        return data;
    }




}
