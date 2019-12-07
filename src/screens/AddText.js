
/*
 * className: AddText
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 23th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import GridView from "react-native-easy-grid-view";
var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class AddText extends Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        let headerTitle = 'Add Text';
        let headerStyle = {
            backgroundColor: '#0366d6',
        };
        let headerTintColor = '#fff';
        let headerTitleStyle = {
            fontWeight: 'bold',
        };
        let headerRight = (
            <TouchableOpacity  onPress={()=>{params.onApplyText();}}>
                <Icon name='done' type='material' color='white' size={24}></Icon>
            </TouchableOpacity>
        );

        return { headerTitle, headerStyle, headerTintColor, headerTitleStyle, headerRight}
    }

    constructor(props){
        super(props);
        this.state = {
           text: '',
           cards: ds.cloneWithCells([
                                    "Sansation-Bold",
                                    "Roboto-BlackItalic",
                                     "Windsong",
                                     "MontserratAlternates-Black",
                                     "Sofia-Regular",
                                     "MontserratAlternates-BlackItalic"
                                    ], 2),
           cellWidth:0,
           cellHeight: 0,
           textFont: ''
        };
    }

    _onApplyText() {
        let text = this.state.text;
        console.log("font-color", this.props.navigation.getParam('fontColor'));
        setTimeout(()=> {
            this.props.navigation.navigate("CoverEditor", {addedtext :text, fontcolor: this.props.navigation.getParam('fontColor')?this.props.navigation.getParam('fontColor'):'#000000', textfont: this.state.textFont});
        }, 500);
    }

    componentDidMount() {
        this.props.navigation.setParams({onApplyText: this._onApplyText.bind(this)});
    }

    setFont(param) {
        this.setState({textFont: param});
    }
    _renderCell(cell) {
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
                                        height: 80,
                                        borderRadius: 5,
                                        borderColor: '#0366d6',
                                        borderWidth: 2,
                                        padding: 20}}
                                source={cell}
                                onPress={()=> {this.setFont(cell)}}
                                >
                <Text style={[styles.TextStyle, {fontFamily:cell}]}>Hello World</Text>
            </TouchableOpacity>
        </View>
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerInput}>
                    <View style={styles.input}>
                        <TextInput  
                                    placeholder="Type Text"
                                    maxLength={20}
                                    onChangeText = {(text)=> this.setState({text})}>
                            <Text style={{color: this.props.navigation.getParam('fontColor')?this.props.navigation.getParam('fontColor'):"black",
                                             fontFamily: this.state.textFont,
                                             fontSize: 24, 
                                             alignContent: "center"}}>
                                {this.state.text}
                            </Text>
                        </TextInput>
                    </View>
                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate("FontColorPicker")}} style={styles.apply}>
                        <Icon name='color-lens' type='material' size={36} color='#0366d6'  />
                    </TouchableOpacity>
                </View>
                <GridView  dataSource={this.state.cards}
                            spacing={8}
                            style={{padding: 15, marginTop: 20}}
                            renderCell={this._renderCell.bind(this)}
                />
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
    },
    headerInput: {
        flex: 1,
        margin: 15,
        marginRight: 0,
        flexDirection: 'row'
    },
    card:{
        
    },
    input: {
        height: 60,
        width: '90%',
        borderColor: '#0366d6',
        borderWidth: 1,
    },
    apply:{
        height: 40
    },
    TextStyle:{
        fontSize : 25,
        textAlign: 'center',
        color: '#0366d6'
    },

    
});