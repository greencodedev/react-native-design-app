/*
 * className: App
 * Author   : ChengXin
 * Created  : July 4th 2019
 * Updated  : July 7th 2019
*/

import {createStackNavigator,createAppContainer} from 'react-navigation';
import PhoneCover from './src/screens/PhoneCover';
import SelectModel from './src/screens/SelectModel';
import CustomedCategory from './src/screens/CustomedCategory';
import CoverEditor from './src/screens/CoverEditor';
import BGColorPicker from './src/screens/BGColorPicker';
import FontColorPicker from './src/screens/FontColorPicker';
import AddText from './src/screens/AddText';
import SelectSticker from './src/screens/SelectSticker';
import StickerItems from './src/screens/StickerItems';
import PhoneCase from './src/screens/PhoneCase';
import AddBGImage from './src/screens/AddBGImage';
import CartScreen from './src/cart/CartScreen';
import CheckOut from './src/cart/CheckOut';
import { YellowBox } from 'react-native';

//import all the screens we are going to switch 
const App = createStackNavigator({
    PhoneCover: { screen: PhoneCover }, 
    SelectModel: { screen: SelectModel }, 
    CustomedCategory: { screen: CustomedCategory },
    CoverEditor: {screen: CoverEditor},
    BGColorPicker: {screen: BGColorPicker},
    AddText: {screen: AddText},
    SelectSticker: {screen: SelectSticker},
    StickerItems: {screen: StickerItems},
    PhoneCase: {screen: PhoneCase},
    AddBGImage: {screen: AddBGImage},
    FontColorPicker: {screen: FontColorPicker},
    Cart: { screen: CartScreen },
    CheckOut: { screen: CheckOut }
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