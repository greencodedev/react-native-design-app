/*
 * className: CheckOut
 * Author   : ChengXin
 * Created  : Aug 14th 2019
 * Updated  : Aug 16th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Slider,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
} from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import RadioButton from 'radio-button-react-native';

export default class CheckOut extends Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {}} = navigation.state;
          let title = 'Checkout';
          let headerStyle = {
              backgroundColor: 'grey',
          };
          let headerTintColor = '#fff';
          let headerTitleStyle = {
              fontWeight: 'bold',
          };
          let headerRight = (
            <TouchableOpacity onPress={()=>{params.onPublish();}} style={{paddingRight: 15}}>
              <Icon name="shopping-cart" type="font-awesome" color="white" size={24} />
              <Badge badgeStyle={styles.badge} textStyle={styles.badgeText} status="warning" value="2" containerStyle={{ position: 'absolute', top: 2, right: 4}} />
            </TouchableOpacity>
          );
  
          return {title, headerStyle, headerTintColor, headerTitleStyle, headerRight}
    }

    constructor(props){
        super(props);
        this.state = {
          value: 0,
          storeName: 'Triveni Bail',
          storeNumber: '+91 9023568988',
          storeAddress: "B-109 / 124, Ansa Indl Estate, Saki Vihar Road, Sakinaka, Andheri (west), Mumbai. Maharashtra. 40007."
        };
    }

    onstatusChange(value) {
      this.setState({ value:value });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.deliveryView}>
                  <Text style={styles.deliveryText}>
                    Delivery To
                  </Text>
                  <View style={ styles.deliveryOpt }>
                      <View style={{ width: '50%' }}>
                        <RadioButton style={{ alignContent:'stretch' }} currentValue={this.state.value} value={0} innerCircleColor='grey' onPress={this.onstatusChange.bind(this)}>
                          <Text>Customer</Text>
                        </RadioButton>
                      </View>
                      <View style={{ width: '50%' }}>
                        <RadioButton style={{ alignContent:'stretch' }} currentValue={this.state.value} value={1} innerCircleColor='grey' onPress={this.onstatusChange.bind(this)}>
                          <Text>Store</Text>
                        </RadioButton>
                      </View>
                  </View>
                </View>
                <View style={ styles.shippingView }>
                  <Text style={ styles.deliveryText }>
                    Shipping Address
                  </Text>
                  <View>
                    <Text style={styles.lblText}>Store Name</Text>
                    <TextInput  style={styles.inputText} 
                                onChangeText={(text)=> this.setState({storeName: text})} 
                                value={this.state.storeName}
                    />
                  </View>
                  <View>
                    <Text style={styles.lblText}>Store Number</Text>
                    <TextInput  style={styles.inputText} 
                                onChangeText={(text)=> this.setState({storeNumber: text})} 
                                value={this.state.storeNumber}
                    />
                  </View>
                  <View style={{ paddingBottom: 20 }}>
                    <Text style={styles.lblText}>Store Address</Text>
                    <Text>
                      { this.state.storeAddress }
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.lblText}>
                    Return Policy
                  </Text>
                  <View style={{ position: 'absolute', right: 0 }}>
                    <TouchableOpacity onPress={()=>alert("Return Policy")}>
                      <Icon name="info-circle" type="font-awesome" color="grey" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
                    <View style={{backgroundColor: 'grey', borderRadius: 30, height: 50,width: '60%', alignItems: 'center',justifyContent: 'center'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("CheckOut")}>
                            <Text style={{color: 'white'}}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    deliveryView: {
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
    },
    deliveryText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingBottom: 10,
      paddingTop: 10
    },
    deliveryOpt: {
      flexDirection: 'row', 
      width: '100%',
      paddingBottom: 20
    },
    shippingView: {
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      paddingTop:20
    },
    inputText: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 1
    },
    lblText: {
      fontSize: 18,
      textAlign: 'left',
      paddingBottom: 5,
      paddingTop: 5
    },
    badge: {
      borderRadius: 9,
      height: 13,
      minWidth: 0,
      width: 13
    },
    badgeText: {
      fontSize: 10,
      paddingHorizontal: 0
    }
});