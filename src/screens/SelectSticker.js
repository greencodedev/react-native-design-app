
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
  View,
  Image,
  Text
} from 'react-native';
import GridLayout from 'react-native-layout-grid';

export default class SelectSticker extends Component {
    
    static navigationOptions = {
        title: 'Select Sticker Category',
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
           stickers: [],
           loaded: false,
           length: 0,
           height: 0,
           width: 0,
        };
    }

    async getStickerList() {
        let url = "http://165.22.179.40:81/api/v1/categories/?category_type=sticker";
        fetch(url,{
            headers: {
                'Access-Key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
          .then(res=>{ 
                this.setState({stickers: res.data, loaded: true, length: res.data.length }); 
            });
        Image.getSize(this.state.stickers[0], (width, height) => {this.setState({width: width, height: height})});
    }

    componentDidMount() {
        this.getStickerList();
    }

    onSelectCategory(param){
        this.props.navigation.navigate("StickerItems", {
            category: param
        });
    }

    renderItem = (item) => (
        <TouchableOpacity onPress={()=> { this.onSelectCategory(item.id) }}>
            <Image style={{height: this.state.height, width: this.state.width, padding: 50}} source={{uri: "http://165.22.179.40:81/media/" + item.file_url}} />
        </TouchableOpacity>
    );

    render() {
        console.log("stickers=>", this.state.stickers);
        return(
            <ScrollView style={styles.container}>
                <View style={{flex:1}}>
                    <GridLayout
                        items={this.state.stickers}
                        itemsPerRow={this.state.length}
                        renderItem={this.renderItem}
                    />
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    text: {
        color: '#0366d6',
        fontSize: 25
    },
    flex: {
        flex: 1
    }
});