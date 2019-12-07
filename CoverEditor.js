import React, { Component } from 'react';
import { View,Dimensions, Text, 
        StyleSheet, Image,  Alert, 
        TouchableOpacity, CameraRoll } from 'react-native';

import { Icon, Tooltip } from 'react-native-elements';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import ImagePicker from 'react-native-image-picker';
import Gestures from 'react-native-easy-gestures';
import Mask from "react-native-mask";
import ViewShot from "react-native-view-shot";
import store from '../store/index';
const options = {
  title: 'Add Image',
  takePhotButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose photo from gallary',
  maxWidth: 500,
};

const { width, height } = Dimensions.get('window');
export default class CoverEditor extends Component {
    static navigationOptions = ({navigation}) => {
      const { params = {}} = navigation.state;
        let title = 'Cover Editor';
        let headerStyle = {
            backgroundColor: '#0366d6',
        };
        let headerTintColor = '#fff';
        let headerTitleStyle = {
            fontWeight: 'bold',
        };
        let headerRight = (
          <TouchableOpacity onPress={()=>{params.onPublish();}} style={{paddingRight: 15}}>
            <Icon name="eye" type="font-awesome" color="white" size={24} />
          </TouchableOpacity>
        );

        return {title, headerStyle, headerTintColor, headerTitleStyle, headerRight}
    }

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
          bgColor: 'white',
          addedText: [],
          addedColor: [],
          addedFont:[],
          isText: false,
          temp_text: '',
          temp_sticker: '',
          stickers: [],
          phoneModel: ''
        }

        this.props.navigation.setParams({onPublish: this._onPublish.bind(this)});
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
        // this.save();
      }
    }

    _onPublish(){
      // this.refs.comp_image.capture().then(uri => {
      //   this.setState({test_image: uri});
      //   console.log("test image", this.state.test_image);
      // });
      // setTimeout(()=> {
      //   CameraRoll.saveToCameraRoll(this.state.test_image, "photo");
      // }, 1000)
      
      // Alert.alert('Publish successfully',
      //             'Do you want to see published item?',
      //             [
      //               {text: 'OK', onPress: ()=> this.onSelectBGImage()},
      //               {text: 'Cancel'}
      //             ],
      //             {cancelable: false}
      // );
      this.props.navigation.navigate("Cart");
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
      this.props.navigation.navigate("AddBGImage");
    }

    deleteItem(ele) {
      let index = ele.index;
      if(index > -1){
        this.state.avatarSource[index] = '';
      }
      this.forceUpdate();
    }

    deleteSticker(ele) {
      let index = ele.index;
      if(index > -1){
        this.state.stickers[index] = '';
      }
      this.forceUpdate();
    }

    deleteText(ele) {
      let index = ele.index;
      if(index > -1){
        this.state.addedText[index] = '';
      }
      this.forceUpdate();
    }

    componentDidMount(){
      let phoneModel = this.props.navigation.getParam("phoneModel").file_url;
      this.setState({
        phoneModel: "http://165.22.179.40:81/media/" + phoneModel
      })
      
    }

    componentWillReceiveProps(){
      this.setState({isText: false});
      
    }
    componentDidUpdate(){
      let textKey = this.props.navigation.getParam('addedtext');
      let fontColor = this.props.navigation.getParam('fontcolor');
      let fontfamily = this.props.navigation.getParam('textfont');
      let sticker = this.props.navigation.getParam('sticker');

      if(sticker && this.state.isText == false && this.state.temp_sticker != sticker){
        this.setState({isText: true});
        this.setState({
          stickers: [...this.state.stickers, sticker]
        });
        this.setState({temp_sticker: sticker});
      }

      if(textKey && this.state.isText == false && this.state.temp_text != textKey){
        this.setState({isText: true});
        this.setState({
          addedText: [...this.state.addedText, textKey],
          addedColor: [...this.state.addedColor, fontColor],
          addedFont: [...this.state.addedFont, fontfamily]
        });
        this.setState({temp_text: textKey});
      }
    }

    render() {
      let categoriedImage = this.props.navigation.getParam("category");
        return (
            <View style={styles.container}>
                <View style={styles.editor}>
                  <Mask shape={'rounded'} >
                    <ViewShot ref="comp_image" options={{format: 'jpg', quality: 1}}>
                      <View style={[styles.bgImageWrapper, {backgroundColor: this.props.navigation.getParam('bgColor')}]}>
                          <Gestures  rotatable={true} scalable={{min: 0.1, max: 10}} >
                            <Image source={{uri: "http://165.22.179.40:81/media/" + categoriedImage}} style={styles.bgImage} />
                          </Gestures>
                      </View>
                      {
                        this.state.addedText.map((ele, index) => (
                          <View key={index} style={{position:'absolute', top: height * .4, width: width}}>
                            <Gestures>
                              <TouchableOpacity onLongPress={()=>
                                Alert.alert('Delete this text?',
                                'Do you want to delete this item?',
                                [
                                  {text: 'OK', onPress: ()=> this.deleteText({index})},
                                  {text: 'Cancel'}
                                ],
                                {cancelable: false}
                                )
                              }>
                                <Text style={[{fontSize: 36}, {color: this.state.addedColor[index], fontFamily: this.state.addedFont[index]}]}>
                                    {this.state.addedText[index]}
                                </Text>
                              </TouchableOpacity>
                            </Gestures>
                          </View>
                        ))
                      }
                      {
                        this.state.avatarSource.map((ele,index) => (
                            <View key={index} style={styles.generatedPic}>
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
                                        <Image source={this.state.avatarSource[index]} style={styles.indi_pic} />
                                      </TouchableOpacity>      
                                </Gestures>
                                <Tooltip></Tooltip>
                            </View>
                        ))
                      }
                      {
                        this.state.stickers.map((ele, index)=> (
                          <View key={index} style={styles.generatedPic}>
                            <Gestures rotatable={true} scalable={{min: 0.1, max: 10}}>
                              <TouchableOpacity onLongPress={()=>
                                Alert.alert('Delete sticker?',
                                'Do you want to delete this sticker?',
                                [
                                  {text: 'OK', onPress:()=>this.deleteSticker({index})},
                                  {text: 'Cancel'}
                                ],
                                {cancelable: false}
                                )
                              }>
                                <Image source={{uri: "http://165.22.179.40:81/media/" + this.state.stickers[index]}} style={styles.indi_pic} />
                              </TouchableOpacity>
                            </Gestures>
                          </View>
                        ))
                      }
                      <View pointerEvents="none">
                        <View style={{width: width* .4, height: height* .5, alignItems: 'center', justifyContent: 'center'}}>
                          <Image style={{width: width * .4, height: height * .5, }} source={{uri: this.state.phoneModel}} />
                        </View>
                      </View>
                    </ViewShot>
                  </Mask>
                  <View style={{paddingTop: 30, width: width * .8, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Please add high resolution image to
                    </Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      get high clearity phone cover
                    </Text>
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
      width: width * .6,
      height: height * .7
    },
    generatedPic: {
      position:'absolute',
      top: height * .4,
      width: width * .5
    },
    indi_pic: {
      width: 100,
      height: 100
    }
   
  });