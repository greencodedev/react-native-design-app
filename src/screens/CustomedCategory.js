
/*
 * className: CustomedCategory
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView, Image } from 'react-native';

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
        this.state = {
            categories: [],
            model: null
        }
    }

    componentDidMount() {
        let temp = this.props.navigation.getParam("phoneModel");
        this.setState({
            model: temp
        });
        this.getCategory();
    }

    async getCategory(){
        let url = "http://165.22.179.40:81/api/v1/categories/?category_type=catalog";
        fetch(url, {
            headers: {
                "Access-Key": "mlkjhgfdsazxcvbnmlkjhgffdsaqwrio",
                "Authorization": "Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo",
                "Content-Type": "application/json" 
            }
        }).then(res => res.json()).then(res=>{ this.setState({ categories: res.data }); });
    }

    enterEditor(param) {
        let url = "http://165.22.179.40:81/media/" + param;
        Image.getSize(url, (width, height) => {
            this.props.navigation.navigate('CoverEditor', {
                category: param,    
                phoneModel: this.state.model,
                bgWidth: width,
                bgHeight: height
            });
        })
    }

    render() {
        return (
            <ScrollView>
            {
               this.state.categories.map((item) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.cover}
                     onPress = {() => this.enterEditor(item.file_url)}>
                     <Text style = {styles.text}>
                        {item.title}
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