import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import { FlatList, ActivityIndicator, View  } from 'react-native';

import styles from "./styles";

const url = "http://52.76.36.184:9090/CIT-1.0/rest/landing/news/latest";

/*
const datas = [
  "Simon Mignolet",
  "Nathaniel Clyne",
  "Dejan Lovren",
  "Mama Sakho",
  "Alberto Moreno",
  "Emre Can",
  "Joe Allen",
  "Phil Coutinho"
];
*/

class NHBasicList extends Component {

  constructor(props){
    super(props);
    //datas = getLatestNews();
    this.state ={ isLoading: true}
    this.datas = [{"id":"5ab35ce44cdfec000a957e3f","title":"HA IT Strategy 1535","content":"1535 to know the latest update of IT Transformation? Want to learn more about the transformation experiences worldwide? Want to have YOUR say on the transformation journey? This is the site for you! ","caption":"1535 to know the latest update of IT Transformation?","hospitals":["PMH"],"postDtm":1521732900000}]
  }

  componentDidMount(){
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('>>>>>>>'+JSON.stringify(responseJson));
        this.setState({
          isLoading: false,
          datas: responseJson.news,          
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
    console.log('+++++++++++++++++++'+JSON.stringify(this.state.datas));
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Basic List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={this.state.datas}
            renderRow={data =>
              <ListItem>
                <Left>
                  <Text>
                    {data.title}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHBasicList;
