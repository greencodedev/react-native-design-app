/*
 * className: PhoneCover
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,ScrollView } from 'react-native';

export default class PhoneCover extends Component {
    static navigationOptions = {
      title: 'Phone Cover',
      headerStyle: {
        backgroundColor: '#0366d6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
    constructor(props){
      super(props);
      this.state = { 
        models: []
      }
    }

    componentDidMount(){
      this.getMake();
    }

    async getMake() {
      let url = "http://165.22.179.40:81/api/v1/makes";
      fetch(url, {
        headers: {
          "Access-Key": "mlkjhgfdsazxcvbnmlkjhgffdsaqwrio",
          "Authorization": "Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo",
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(res=>{ this.setState({ models: res.data }); });
    }
    
    render() {
      return (
        <View style={styles.container}>
          <ScrollView>
          {
            this.state.models.map((item)=>(
              <TouchableOpacity key={item.id} onPress = {()=>{ this.onPressSelect(item.id)}}>
                <View style={styles.item}>
                    <Text style = {{color: 'white', fontSize: 25}}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
          </ScrollView>
        </View>
      );
    }
  
    onPressSelect(param) {
        this.props.navigation.navigate('SelectModel', {
          phone: param,
        });
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    item: {
      justifyContent: 'center',
      marginTop: 15,
      backgroundColor: '#0366d6', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 5,
      width: 350,
      height: 100
    }
  });