
/*
 * className: FontColorPicker
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';

export default class FontColorPicker extends Component {
    
    static navigationOptions = {
        title: 'Font Color',
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
        this.setState({color})
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
        this.props.navigation.navigate('AddText', {fontColor: param});
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    
});