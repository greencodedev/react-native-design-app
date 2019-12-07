import React, { Component } from 'react';
import { View,Dimensions, Text, StyleSheet, Image,  requireNativeComponent,  Alert, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import ImagePicker from 'react-native-image-picker';
import Gestures from 'react-native-easy-gestures';
import Mask from "react-native-mask";
const RNCMaskedView = requireNativeComponent('RNCMaskedView');
const options = {
  title: 'Add Image',
  takePhotButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose photo from gallary',
  maxWidth: 500,
};

const { width, height } = Dimensions.get('window');

export default class CoverEditor extends Component {
    static navigationOptions = {
        title: 'Cover Editor',
        headerStyle: {
            backgroundColor: '#0366d6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    tabs = [
        {
          key: 'image',
          icon: 'photo',
          label: 'Add Image',
          type: 'material',
          barColor: '#0366d6',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'text',
          icon: 'title',
          label: 'Add Text',
          type: 'material',
          barColor: '#0366d6',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'sticker',
          icon: 'face',
          label: 'Sticker',
          type: 'material',
          barColor: '#0366d6',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'bgcolor',
          icon: 'color-lens',
          label: 'BG Color',
          type: 'material',
          barColor: '#0366d6',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'bgimage',
          icon: 'image',
          label: 'BG Image',
          type: 'material',
          barColor: '#0366d6',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ];
    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )
     
    renderTab = ({ tab, isActive }) => (
    <FullTab
        isActive={isActive}
        key={tab.key}
        label={tab.label}
        renderIcon={this.renderIcon(tab.icon)}
    />
    )
    constructor(props){
        super(props);
        this.state = {
          avatarSource: [],
          activeTab: 'image',
          bgSource:null,
          bgColor: 'white',
          flagDel: false,
          selectedImg: -1,
        }
    }


    handleTabPress = (newTab) => {
      this.setState({activeTab: newTab.key});
      if(newTab.key == 'image'){
        this.onSelectAddImage();
      }else if(newTab.key == 'bgcolor'){
        this.props.navigation.navigate('BGColorPicker');
      }else if(newTab.key == 'sticker'){
        this.props.navigation.navigate('SelectSticker');
      }else if(newTab.key == 'bgimage'){
        this.onSelectBGImage();
      }else if(newTab.key == 'text'){
        this.props.navigation.navigate('AddText');
      }
    }

    onSelectAddImage=() => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: [...this.state.avatarSource, source],
          });
        }
      });
    }

    onSelectBGImage = () => {
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            bgSource: source,
          });
        }
      });
    }

    deleteItem(ele) {
      let index = ele.index;
      console.log(index);
      if(index > -1){
        this.state.avatarSource.splice(index, 1);
        this.setState({flagDel: true, selectedImg: ele});
      }
      this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.editor}>
                  {/* <View>
                    <Mask shape={'rounded'}>
                        <View style={{ width: width * .6, height: height * .7,backgroundColor: this.props.navigation.getParam('bgColor'),shadowColor: 'yellow',
                              shadowOffset: {height: 10, width: 10},
                              shadowRadius: 20,
                              shadowOpacity: .5 }}  >
                        </View>
                    </Mask>
                  </View> */}
                  
                  <View style={{backgroundColor: this.props.navigation.getParam('bgColor'),position: 'absolute', top: 0, left: 0,}}>
                      <Gestures  rotatable={true} scalable={{min: 0.1, max: 10}} >
                        <Image source={this.state.bgSource} style={styles.bgImage} />
                      </Gestures>
                  </View>
                  {
                    this.state.avatarSource.map((ele,index) => (
                        <View key={index} style={{position:'absolute', top: height * .5, left: width * .5}}>
                            <Gestures  rotatable={true} scalable={{min: 0.1, max: 10}}>
                                  <TouchableOpacity onLongPress={()=>
                                        Alert.alert('Delete item?',
                                        'Do you want to delete this item?',
                                        [
                                          {text: 'OK', onPress:()=>this.deleteItem({index})},
                                          {text: 'Cancel'}
                                        ],
                                        {cancelable: false}
                                        )}
                                      >
                                    <Image source={this.state.avatarSource[index]} style={(this.state.flagDel && index == this.state.selectedImg)? {position:'absolute', left: -10000} : {width: 100, height: 100}} />
                                  </TouchableOpacity>          
                            </Gestures>
                        </View>
                    ))
                  }
                  <View pointerEvents="none" style={{}}>
                    <Image style={{ width: '80%', height: '80%', borderRadius: 30, borderColor: 'rgba(255,255,255,0.5)', borderWidth: 20}}  source={require('./../assets/apple/a1.png')} />
                  </View>
                </View>
                <BottomNavigation
                  activeTab={this.state.activeTab}
                  onTabPress={this.handleTabPress}
                  renderTab={this.renderTab}
                  tabs={this.tabs}
                />
            </View>
          );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'stretch',
      
    },
    editor: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bgImageWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    bgImage: {
      width: 500,
      height: 1000,
      shadowColor: 'yellow',
      // shadowOffset: '10',
      shadowRadius: 30,
      shadowOpacity: .5
    },

    // border:{
    //   flexGrow: 1,
    //   height: null,
    //   width: null,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderWidth: 20,
    //   borderColor: 'rgba(255,255,255,0.5)',
    // }
   
  });