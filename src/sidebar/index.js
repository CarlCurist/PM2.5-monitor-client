import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,Thumbnail,
} from "native-base";
import styles from "./style";

const drawerCover = require("../../assets/drawer-cover.png");
const drawerImage = require("../../assets/logo-kitchen-sink.png");
const userThumbnail = require("../../assets/user.jpg");
const datas = [
  {
    name: "Home Screen",
    route: "Home",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "Me",
    route: "Login",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Sensor",
    route: "Scan",
    icon: "easel",
    bg: "#477EEA",
  },
  {
    name: "View Detail Data",
    route: "Detail",
    icon: "search",
    bg: "#29783B"
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          {/*<Image square style={styles.drawerImage} source={drawerImage} /> */}
          <Thumbnail large style={styles.userThumbnailStyle} source={userThumbnail} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route, { typeOfData: 0 })}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
