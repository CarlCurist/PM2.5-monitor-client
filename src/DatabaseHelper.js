import Realm from 'realm';

const AirSchema = {
    name: 'Air',
    properties: {
      temperature:     'double',
      humidity: 'double',
      _1p0:     'double',
      _2p5:  'double', 
      _10p:     'double',
      raw:'string',
    }
  };
  const LocationSchema = {
    name: 'Location',
    properties: {
      accuracy:     'double',
      altitude: 'double',
      heading:     'double',
      latitude:  'double', 
      longitude:     'double',
      speed:     'double'
    }
  };
  const ItemSchema = {
    name: 'Item',
    properties: {
      date:     'date',
      device: 'string',
      location: 'Location',
      air:     'Air',
    }
  };

  let Database = new Realm({schema: [AirSchema, LocationSchema, ItemSchema]})

  let DatabaseServices = {
      testsave: function(tmp){
        Database.write(()=>{
            var a = {
                date: new Date(),
                device:"JD-DI-fs1654",
                location:{
                    accuracy:tmp,
                    altitude:tmp,
                    heading: tmp,
                    latitude:tmp, 
                    longitude:tmp,
                    speed:tmp
                },
                air:{
                    temperature:tmp,
                    humidity:tmp,
                    _1p0:tmp,
                    _2p5: tmp, 
                    _10p:tmp,
                }
            }
            Database.create('Item',a);
        })
      },

      saveDataFromJson: function(tdeviceMac,tlocation,tair,recordDate=null){
        Database.write(()=>{
          var a ={
            date:recordDate?recordDate:new Date(),
            device:deviceMac,
            location:tlocation,
            air:tair
          }
          Database.create('Item',a);
        })
      },

      loadAll: function(){
        return Database.objects("Item");
      },

      loadDateFromUTC: function(utcdate_string){
        return Database.objects("Item").filtered('date > '+ utcdate_string);
      },

      deleteAllData: function(){
        /*
        let t = Database.objects("Item");
        Database.delete(t);
        */
       Database.write(() =>{
         Database.deleteAll();
         });
      }
  }

  



  module.exports = DatabaseServices;