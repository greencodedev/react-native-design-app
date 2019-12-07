
/*
 * className: SelectModel
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView  } from 'react-native';
import GridView from "react-native-easy-grid-view";
// import Spinner from 'react-native-loading-spinner-overlay';
var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class SelectModel extends Component {
    static navigationOptions = {
        title: 'Select Model',
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
            phone: '',
            // models: ds.cloneWithCells(["model1", "model2", "model3", "model4", "model5", "model6","model7", "model8", "model9", "model10"], 2),
            cellWidth:0,
            cellHeight: 0,
            loading: false,
            models: []
        };
    }

    componentWillMount(){
        setTimeout(()=> {
            this.setTimePassed();
        }, 500);
    }

    setTimePassed(){
        this.setState({loading: true});
    }

    componentDidMount() {
        let make = this.props.navigation.getParam('phone');
        this.getModels(make);
    }

    async getModels(param) {
        let url = "http://165.22.179.40:81/api/v1/models/?parent=";
        fetch(url+param, {
            headers: {
                "Access-Key": "mlkjhgfdsazxcvbnmlkjhgffdsaqwrio",
                "Authorization": "Bearer M5CxAtOMAJ3hXLLKVzIybTLpcceMvo",
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res=>{ this.setState({ models: res.data }); });
    }

    _renderCell(cell) {
        const { navigation } = this.props;
        const phone = navigation.getParam('phone');
        return <View  onLayout={event => {
          var width = event.nativeEvent.layout.width;
         if(this.state.cellWidth!=width){
         this.setState({cellWidth:width})
         }
         if(this.state.cellHeight!=width){
         this.setState({cellHeight:width})
         }
        }}>
            <TouchableOpacity style={{  width:this.state.cellWidth,
                                        height:this.state.cellHeight,
                                        alignItems: 'center',
                                        justifyContent:'center',
                                        height: 100,
                                        borderRadius: 10,
                                        borderColor: '#0366d6',
                                        borderWidth: 2,
                                        padding: 20}}
                                source={cell}
                                onPress={()=> this.onSelectModel(cell)}
                                >
                <Text style={styles.TextStyle}>{phone} {cell}</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        // var models = ["model1", "model2", "model3", "model4", "model5", "model6","model7", "model8", "model9", "model10"];
        // const phone = this.props.navigation.getParam('phone');
            return (
                <ScrollView style={styles.container}>
                    {/* <Spinner 
                        visible={!this.state.loading}
                    /> */}
                    {/* <GridView dataSource={this.state.models}
                                spacing={8}
                                style={{padding: 15, marginTop: 20}}
                                renderCell={this._renderCell.bind(this)}
                    /> */}
                    {
                        this.state.models.map((item)=> (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.cover1}
                                onPress={()=> {this.onSelectModel(item)}} >
                                    <Text style={styles.TextStyle}>
                                       { item.title }
                                    </Text>
                            </TouchableOpacity>
                        ))
                    }
                 </ScrollView>
            );
    }

    onSelectModel(item){
        console.log("item=>", item);
        this.props.navigation.navigate('PhoneCase', {model:item});
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    item: {
      backgroundColor: '#0366d6', 
      width: 250,
      height: 100,
      fontSize: 25,
      color: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center'
    },
    TextStyle:{
        fontSize : 25,
        textAlign: 'center',
        color: '#0366d6'
    },
    cover: {
        marginTop: 10,
        height: 100,
        borderRadius: 20,
        borderColor: '#0366d6',
        borderWidth: 2,
        padding: 20,
        alignItems: 'center'
    },
    cover1: {
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#0366d6',
        padding: 20,
        marginTop: 3,
        borderBottomWidth: 1
    }
  });