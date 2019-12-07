
/*
 * className: SelectSticker
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 11th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
export default class SelectSticker extends Component {
    
    static navigationOptions = {
        title: 'Select Sticker',
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
        var stickers = [ "sticker1", "sticker2", "sticker3", "sticker4", "sticker5", "sticker6","sticker7", "sticker8", "sticker9", "sticker10","sticker11", "sticker12", "sticker13", "sticker14", "sticker15"];
        return (

            <ScrollView style={styles.container}>
            {
                stickers.map((item) => (
                    <TouchableOpacity 
                        key={item}
                        style={styles.sticker}
                        onPress ={()=> Alert.alert(item)} >
                            <Text style={styles.text}>
                                {item}
                            </Text>
                    </TouchableOpacity>
                ))   
            }
            </ScrollView>
        )
    }
    onApply(param) {
        this.props.navigation.navigate('CoverEditor', {bgColor: param});
    }
}


const styles = StyleSheet.create({
    sticker: {
        padding: 10,
        marginTop: 3,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#0366d6',
        borderWidth: 1
    },
    text: {
        color: '#0366d6',
        fontSize: 25
    }

    
});