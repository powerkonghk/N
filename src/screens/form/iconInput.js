import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Item,
  Input,
  Form,
  Text,
  H3
} from "native-base";
import styles from "./styles";
import 'intl';
import 'intl/locale-data/jsonp/en';

function formatNumber(input){
  var formatter = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits:2 });
  return formatter.format(input);
}

function PMT(rate, nper, pv, fv, type) {
  console.log('rate:'+rate);

  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv)/nper;
  
  var pvif = Math.pow(1 + rate, nper);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= (1 + rate);
  };

  return pmt;
}

class IconInput extends Component {

  constructor(props){
    super(props);
    this.state = {
      amount: '4750000',
      year:'30',
      interest:'2.15',
      installment:'0.4',
      result:'0',
      stressTest:'0',
    }
    //this.updateAmount = this.updateAmount.bind(this);
    handleAmount = (text) => {
      this.setState({ amount: text })
   }
    
   handleInterest = (text) => {
    this.setState({ interest: text })
 }
 handleInstallment = (text) => {
  this.setState({ installment: text })
}
handleYear = (text) => {
  this.setState({ year: text })
}
  }
/*
  updateAmount(e){
    this.setState({
      amount : e,
    })
  }*/

  render() {

    var interest = this.state.interest;
    var stressInterest = eval(interest) + 3;

    console.log('interest:'+interest);
    console.log('st interest:'+stressInterest);


    this.state.result = PMT(interest/100/12, 12*this.state.year, -(this.state.amount * (1-this.state.installment)), null, null);
    this.state.stressTest = PMT(stressInterest/100/12, 12*this.state.year, -(this.state.amount * (1-this.state.installment)), null, null);
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Mortgage Calculator</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Form>
            <Item>
              <Icon active name="home" />
              <Input placeholder="Amount" keyboardType="numeric" value={this.state.amount} onChangeText={handleAmount}/>
            </Item>
            <Item>
            <Icon active name="pie" />
              <Input placeholder="Installment"  value={this.state.installment}  onChangeText={handleInstallment}/>
              
            </Item>
            <Item>
            <Icon active name="pulse" />
              <Input placeholder="Interest"  value={this.state.interest}  onChangeText={handleInterest}/>
              
            </Item>
            <Item>
            <Icon active name="speedometer" />
              <Input placeholder="Year"  value={this.state.year} onChangeText={handleYear}/>
              
            </Item>
          </Form>
          <H3><Text>Amount:{formatNumber(this.state.amount)}</Text></H3>
          <H3><Text>Monthly Payment:{formatNumber(this.state.result)}</Text></H3>
          <H3><Text>First Installment:{formatNumber(this.state.amount * this.state.installment)}</Text></H3>
          <H3><Text>Income req:{formatNumber(this.state.result * 2)}</Text></H3>

          <H3><Text>Monthly Payment(ST):{formatNumber(this.state.stressTest)}</Text></H3>
          <H3><Text>Income req(ST):{formatNumber(this.state.stressTest * 10/6)}</Text></H3>
        </Content>
      </Container>
    );
  }
}

export default IconInput;
