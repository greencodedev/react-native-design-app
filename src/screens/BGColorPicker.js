
/*
 * className: BGColorPicker
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Slider,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import store from '../store/index';
import { setBGColor } from '../actions/index';
export default class BGColorPicker extends Component {
    
    static navigationOptions = {
        title: 'Background Color',
        headerStyle: {
            backgroundColor: '#0366d6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(...args){
        super(...args);
        this.state = {
           color: toHsv('red')
        };
        this.onApply = this.onApply.bind(this);
    }

    onColorChange(color) {
        this.setState({color});
    }

    render() {
        return (
            <View style={{flex: 1, padding: 30}}>
                <ColorPicker
                    // oldColor='purple'
                    color={this.state.color}
                    onColorChange={this.onColorChange.bind(this)}
                    // onColorSelected={color => alert(`Color selected: ${color}`)}
                    onColorSelected={color=> this.onApply(color)}
                    // onOldColorSelected={color => alert(`Old color selected: ${color}`)}
                    style={{flex: 1}}
                />
            </View>
        )
    }
    onApply(param) {
        // store.dispatch(setBGColor(param));
        this.props.navigation.navigate('CoverEditor', {bgColor: param});
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    
});