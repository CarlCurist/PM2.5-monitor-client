import Realm from 'realm';

const AirSchema = {
    name: 'Air',
    properties: {
      temperature:     'double',
      humidity: 'double',
      _1p0:     'int',
      _2p5:  'int', 
      _10p:     'int',
    }
  };
  const LocationSchema = {
    name: 'Location',
    properties: {
      accuracy:     'double',
      altitude: 'double',
      heading:     'double',
      latitude:  'double', 
      longtitude:     'double',
      speed:     'double'
    }
  };
  const ItemSchema = {
    name: 'Item',
    properties: {
      date:     'date',
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
                location:{
                    accuracy:tmp,
                    altitude:tmp,
                    heading: tmp,
                    latitude:tmp, 
                    longtitude:tmp,
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
      }
  }



  module.exports = DatabaseServices;