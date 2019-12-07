
/*
 * className: CustomedCategory
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView } from 'react-native';

export default class CustomedCategory extends Component {
    static navigationOptions = {
        title: 'Select category',
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
    }

    enterEditor() {
        this.props.navigation.navigate('CoverEditor');
    }

    render() {
        var categories = [ "category1", "category2", "category3", "category4", "category5", "category6","category7", "category8", "category9", "category10","category11", "category12", "category13", "category14", "category15"];
        return (
            <ScrollView>
            {
               categories.map((item) => (
                  <TouchableOpacity
                     key = {item}
                     style = {styles.cover}
                     onPress = {() => this.enterEditor()}>
                     <Text style = {styles.text}>
                        {item}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </ScrollView>
          );
    }


}


const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: "#FFFFFF"  
    },  
    cover: {
        padding: 10,
        marginTop: 3,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#0366d6',
        borderBottomWidth: 1

     },
     text: {
        color: '#0366d6',
        fontSize: 25
     }
}); 