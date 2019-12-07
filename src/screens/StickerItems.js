
/*
 * className: StickerItems
 * Author   : ChengXin
 * Created  : Aug 18th 2019
 * Updated  : Aug 24th 2019
*/
import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions  } from 'react-native';
import GridLayout from 'react-native-layout-grid';
// import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get('window');

export default class StickerItems extends Component {
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
            items: []
        };
    }

    componentDidMount() {
        let sticker = this.props.navigation.getParam('category');
        this.getStickers(sticker);
    }

    async getStickers(param) {
        let url = "http://165.22.179.40:81/api/v1/catalogs/?category_id=";
        fetch(url+param, {
            headers: {
                "Access-Key": "mlkjhgfdsazxcvbnmlkjhgffdsaqwrio",
                "Authorization": "Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo",
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res=>{ this.setState({ items: res.data }); });
    }

    renderItem = (item) => (
        <TouchableOpacity onPress={()=> { this.onSelect(item.file_url) }}>
            <View style={{height: height*.1, width:width*.2, padding: 2}}>
                <Image style={{height: '80%', width: '80%'}} source={{uri: "http://165.22.179.40:81/media/" + item.file_url}} />
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{flex:1}}>
                    <GridLayout
                        items={this.state.items}
                        itemsPerRow={4}
                        renderItem={this.renderItem}
                    />
                </View>
            </ScrollView>
        )
    }

    onSelect(param){
        this.props.navigation.navigate('CoverEditor', {
            sticker: param
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    flex: {
        flex: 1
    }
  });