import React from 'react';
import { Text, View, StyleSheet,Image} from 'react-native';
import MyHeader from './MyHeader'
import { Global } from './global'
import { Thumbnail, Left, Right, List, ListItem, Content} from "native-base";

export default class UserProfileScreen extends React.Component {
    constructor(props) { 
        super(props);
    }

    logout() {
        this.props.navigation.navigate("Scan")
    }

    render() {
        return (
            <View style={{ flex: 1 ,backgroundColor:"#FFFFFF"}}>
                <MyHeader title="User" hide_icon={true} />
                
                <View style={{ height: deviceHeight / 4 ,width: deviceWidth, justifyContent: 'center', alignItems: 'center'}}>
                    <Thumbnail large source={require("../assets/image/user_profile.jpg")} />
                    <Text style={styles.font_grey}>{BLEStatus.username}</Text>
                </View>

                <View style={{ flex: 1}}>
                    <Content>
                        <List
                            dataArray={list_items_useless}
                            renderRow={data =>
                                <ListItem
                                    button
                                    //onPress={() => this.props.navigation.navigate(data.route)}
                                >
                                    <Left>
                                        <Text style={styles.font_orange}>{data.text}</Text>
                                    </Left>
                                    <Right>
                                        <Image
                                            style={styles.arrow_style}
                                            source={require("../assets/icon/right_icon_orange.png")}
                                        />
                                    </Right>
                                </ListItem>}
                        />
                    </Content>
                    <Content>
                        <List
                            dataArray={list_items_true}
                            renderRow={data =>
                                <ListItem
                                    button
                                    onPress={() => this.logout()}
                                >
                                    <Left>
                                        <Text style={styles.font_orange}>{data.text}</Text>
                                    </Left>
                                    <Right>
                                        <Image
                                            style={styles.arrow_style}
                                            source={require("../assets/icon/logout_icon_orange.png")}
                                        />
                                    </Right>
                                </ListItem>}
                        />
                    </Content>
                </View>
            </View>
        )
    }
}

const list_items_useless = [
    {
        route: "item1",
        text: "unknown"
    },
    {
        route: "item2",
        text: "unknown"
    },
    {
        route: "item3",
        text: "Exposure Summary"
    },
    {
        route: "item4",
        text: "User Profile"
    }
];
const list_items_true = [
    {
        route: "item1",
        text: "Logout"
    }
];

const styles = StyleSheet.create({
    font_grey: {
        color: '#CDCDCD',
        fontSize: 15,
        //fontWeight: 'bold',
        //textShadowColor: '#C0C0C0',
        //textShadowRadius: 2,
        //textShadowOffset: { width: 2, height: 2 },
    },
    font_grey_center: {
        color: '#CDCDCD',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    font_grey_bold: {
        color: '#CDCDCD',
        fontSize: 15,
        fontWeight: 'bold',
    },
    font_orange: {
        color: '#F5802A',
        fontSize: 20,
    },
    font_underline: {
        color: '#CDCDCD',
        fontSize: 20,
        textDecorationLine: "underline"
    },
    arrow_style: {
        height: 20,
        width:20
    }
});
