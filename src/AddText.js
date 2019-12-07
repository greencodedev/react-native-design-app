
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
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
export default class AddText extends Component {
    
    static navigationOptions = {
        title: 'Add Text',
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
           text: ''
        };
    }

    onApplyText(param) {
        Alert.alert(param);
    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                            placeholder="Type Text"
                            maxLength={20}
                            onChangeText = {(text)=> this.setState({text})} />
                <TouchableOpacity onPress={()=> this.onApplyText(this.state.text)} style={styles.apply}>
                    <Icon name='done' type='material' size={36} color='#0366d6'  />
                </TouchableOpacity>
            </View>
        )
    }
    onApply(param) {
        this.props.navigation.navigate('CoverEditor', {bgColor: param});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginRight: 0,
        flexDirection: 'row'
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: '#0366d6',
        borderWidth: 1
    },
    apply:{
        width: '10%'
    }

    
});