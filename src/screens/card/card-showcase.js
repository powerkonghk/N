import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
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
  Right,
  Body
} from "native-base";
import { FlatList, ActivityIndicator, View  } from 'react-native';
import styles from "./styles";
import Moment from 'moment';


const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");

const url = "http://52.76.36.184:9090";

const path = "/CIT-1.0/rest/landing/news/";
class NHCardShowcase extends Component {

  constructor(props){
    super(props);
    const navParams = this.props.navigation.state.params;
    this.datas = [];
    this.state ={ 
      isLoading: true, 
      newsId: navParams.id,
   
    }
    console.log(navParams);

    console.log('###'+url+path+this.state.newsId);
  }

  componentDidMount(){
    return fetch(url+path+this.state.newsId)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('>>>>>>>'+JSON.stringify(responseJson.news[0]));
        this.setState({
          isLoading: false,
          datas: responseJson.news[0],          
   
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    Moment.locale('en');
    var dt = this.state.datas.postDtm;


    return (

      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Card Showcase</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>{this.state.datas.title}</Text>
                  
                  
                  <Text note>
                  {Moment(dt).format('HH:mm d MMM YYYY')}
                  </Text>
                  
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={cardImage}
                />
                <Text>
                  {this.state.datas.content}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon name="logo-github" />
                  <Text>{this.state.datas.id} </Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default NHCardShowcase;
