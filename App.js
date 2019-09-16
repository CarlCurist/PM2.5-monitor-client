/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={{flex:1,justifyContent:"space-between",flexDirection: 'row'}}>
            
            <Image source={require('./image/user.png')}
            style={{width: 35, height: 35}}/>
            <Text style={styles.sectionTitle}>Battery:</Text>
          </View>


          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('./image/logo.png')}/>
          </View>

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}><Text style={styles.highlight}>Temperature(°C) :</Text> </Text>
              <Text style={styles.sectionDescription}>
                A polyline graph used to show trends of change
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}><Text style={styles.highlight}>Humidity(%) :</Text></Text>
              <Text style={styles.sectionDescription}>
                A polyline graph used to show trends of change
                
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM1.0(µg/m 3) :</Text></Text>
              <Text style={styles.sectionDescription}>
                 A polyline graph used to show trends of change
                {/*<DebugInstructions />*/}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM2.5(µg/m 3) :</Text></Text>
              <Text style={styles.sectionDescription}>
                A polyline graph used to show trends of change
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}><Text style={styles.highlight}>PM10(µg/m 3) :</Text></Text>
              <Text style={styles.sectionDescription}>
                A polyline graph used to show trends of change
              </Text>
            </View>
            {/*<LearnMoreLinks />*/}
           </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
