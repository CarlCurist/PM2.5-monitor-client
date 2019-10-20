import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right
} from "native-base";
import styles from "./styles";

const logo = require("../../assets/logo.png");
const cardImage = require("../../assets/drawer-cover.png");

class DataCard extends Component {
  render() {
    return (
        <Content padder>
          <Card style={styles.mb}>
            <CardItem>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>11h ago</Text>
                </Body>
                <Text>NativeBas12e</Text>
              </Left>

            </CardItem>

            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}
                source={cardImage}
              />
            </CardItem>
              {/** 
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>4923 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>89 Comments</Text>
                </Button>
              </Body>

            </CardItem>
            */}
          </Card>
                
        </Content>
    );
  }
}

export default DataCard;
