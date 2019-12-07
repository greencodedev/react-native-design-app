
/*
 * className: AddBGImage
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

export default class AddBGImage extends Component {
    
    static navigationOptions = {
        title: 'Select Background Image',
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
           bgImages: [],
           temp_width: 0,
           temp_height: 0
        };
    }


    async getBGImages() {
        let url = "http://165.22.179.40:81/api/v1/backgrounds";
        fetch(url,{
            headers: {
                'Access-Key': 'mlkjhgfdsazxcvbnmlkjhgffdsaqwrio',
                'Authorization': 'Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
          .then(res=>{ 
                this.setState({bgImages: res.data }); 
            });
    }

    componentDidMount() {
        this.getBGImages();
    }

    onSelect(param){
        let url = "http://165.22.179.40:81/media/" + param;
        Image.getSize(url, (width, height) => {
            this.props.navigation.navigate('CoverEditor', { category: param, bgWidth: width, bgHeight: height });
        });
    }

    renderItem = (item) => (
          <TouchableOpacity onPress={()=> { this.onSelect(item.file_url) }}>
              <Image style={{height: 300, padding: 15}} source={{uri: "http://165.22.179.40:81/media/" + item.file_url}} />
          </TouchableOpacity>
    );

    render() {
        console.log("background image =>", this.state.bgImages);
        return(
            <ScrollView style={styles.container}>
              <View style={{flex: 1}}>
                <GridLayout 
                    items={this.state.bgImages}
                    itemsPerRow={1}
                    renderItem={this.renderItem}
                />
              </View>
            </ScrollView>
        )
    }

    onApply(param) {
        this.props.navigation.navigate('CoverEditor', {bgColor: param});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    text: {
        color: '#0366d6',
        fontSize: 25
    },
    flex: {
        flex: 1
    }
});