/*
 * className: App
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import {createStackNavigator,createAppContainer} from 'react-navigation';
import PhoneCover from './src/PhoneCover';
import SelectModel from './src/SelectModel';
import CustomedCategory from './src/CustomedCategory';
import CoverEditor from './src/CoverEditor';
import BGColorPicker from './src/BGColorPicker';
import AddText from './src/AddText';
import SelectSticker from './src/SelectSticker';
import PhoneCase from './src/PhoneCase';
import {YellowBox} from 'react-native';

//import all the screens we are going to switch 
const App = createStackNavigator({
    PhoneCover: { screen: PhoneCover }, 
    SelectModel: { screen: SelectModel }, 
    CustomedCategory: { screen: CustomedCategory },
    CoverEditor: {screen: CoverEditor},
    BGColorPicker: {screen: BGColorPicker},
    AddText: {screen: AddText},
    SelectSticker: {screen: SelectSticker},
    PhoneCase: {screen: PhoneCase}
  },
  {
    initialRouteName: 'PhoneCover',
  }
);
//Version 3+ changes are here. 
//In version 2+ createAppContainer was default container 
//but in version 3+ you have to export it manually
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);

YellowBox.ignoreWarnings(['Setting a timer', '']);