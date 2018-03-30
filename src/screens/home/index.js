import React, { Component } from "react";
import { ImageBackground, View, StatusBar, AlertIOS } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import { TouchableHighlight } from 'react-native'
import TouchID from 'react-native-touch-id'
import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

const optionalConfigObject = {
  title: "Authentication Required",
  color: "#e00606"
}

class Home extends Component {

  _pressHandler() {
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        AlertIOS.alert('Authenticated Successfully');
        this.props.navigation.navigate("DrawerOpen");
      })
      .catch(error => {
        console.log(error);
        AlertIOS.alert('Authentication Failed');
      });
  }

  render() {

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>CallMyIT</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>Hospital Authority ITO All rights reserved</H3>
            <View style={{ marginTop: 8 }} >

              <TouchableHighlight navigation={this.props.navigation} onPress={this._pressHandler}>

                <Text>
                  Authenticate with Touch ID
                  </Text>

              </TouchableHighlight>

            </View>
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={this._pressHandler}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
