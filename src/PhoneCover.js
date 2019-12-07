/*
 * className: PhoneCover
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class PhoneCover extends Component {
    static navigationOptions = {
      title: 'Phone Cover',
      //Sets Header text of Status Bar
      headerStyle: {
        backgroundColor: '#0366d6',
        //Sets Header color
      },
      headerTintColor: '#fff',
      //Sets Header text color
      headerTitleStyle: {
        fontWeight: 'bold',

        //Sets Header text style
      },
    };
    constructor(props){
      super(props);
      this.state = { model: ''}
    }
    
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress = {()=>{ this.onPressSelect('iPhone')}}>
                  <View style={styles.item}
                         >
                      <Text style = {{color: 'white', fontSize: 25}}>iPhone</Text>
                  </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>{ this.onPressSelect('SAMSUNG')}}>
                  <View style={styles.item}
                         >
                      <Text style = {{color: 'white', fontSize: 25}}>SAMSUNG</Text>
                  </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=>{ this.onPressSelect('NOKIA')}}>
                  <View  style={styles.item}>
                      <Text style = {{color: 'white', fontSize: 25}}>NOKIA</Text>
                  </View>
          </TouchableOpacity>

        </View>
      );
    }
  
    onPressSelect(param) {
        this.props.navigation.navigate('SelectModel', {
          phone: param,
        });
    }
    // this.setState({model: param});
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    main: {
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    item: {
      justifyContent: 'center',
      marginBottom: 25,
      backgroundColor: '#0366d6', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 15,
      width: 250,
      height: 100
    }
  });