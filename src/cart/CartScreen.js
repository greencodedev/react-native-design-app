
/*
 * className: CartScreen
 * Author   : ChengXin
 * Created  : Aug 13th 2019
 * Updated  : Aug 14th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import { Icon, Card } from 'react-native-elements';
export default class CartScreen extends Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {}} = navigation.state;
          let title = 'Cart';
          let headerStyle = {
              backgroundColor: 'grey',
          };
          let headerTintColor = '#fff';
          let headerTitleStyle = {
              fontWeight: 'bold',
          };
          let headerRight = (
            <TouchableOpacity onPress={()=>{params.onPublish();}} style={{paddingRight: 15}}>
              <Icon name="shopping-cart" type="font-awesome" color="white" size={24} />
            </TouchableOpacity>
          );
  
          return {title, headerStyle, headerTintColor, headerTitleStyle, headerRight}
      }
  
      tabs = [
          {
            key: 'home',
            icon: 'home',
            label: 'Home',
            type: 'font-awesome',
            barColor: '#0366d6',
            pressColor: 'rgba(255, 255, 255, 0.16)'
          },
          {
            key: 'cart',
            icon: 'shopping-cart',
            label: 'Cart',
            type: 'font-awesome',
            barColor: '#0366d6',
            pressColor: 'rgba(255, 255, 255, 0.16)'
          },
          {
            key: 'account',
            icon: 'user',
            label: 'My Account',
            type: 'font-awesome',
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

    constructor(...args){
        super(...args);
        this.state = {
           activeTab: 'cart',
           phoneList: [],
        };
        this.onApply = this.onApply.bind(this);
    }


    handleTabPress = (newTab) => {
        this.setState({activeTab: newTab.key});
        if(newTab.key == 'home'){
          this.props.navigation.navigate("PhoneCover");
        }else if(newTab.key == 'cart'){
            this.props.navigation.navigate("Cart");
        }else if(newTab.key == 'account'){
          alert("my account");
        }
    }

    componentDidMount() {
        let data = [{
            title: 'Galaxy Note 5 5DM Phone Case',
            subtitle: 'Teracell Skin - transparent',
            avatar: ''
        },
        {
            title: 'Galaxy Note 3 3DM Phone Case',
            subtitle: 'Teracell Skin - transparent',
            avatar: ''
        }];
        this.setState({phoneList: data});
    }

    render() {
        console.log("wahha===>", this.state.phoneList);
        return(
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                { this.state.phoneList.map((ele)=> {
                    return(
                        <Card>
                            <View style={styles.item}>
                                <View style={{width: '20%'}}>
                                    <Image style={styles.avatarImage} source={require('./../../assets/apple/a2.png')} />
                                </View>
                                <View style={styles.itemTexts}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{ele.title}</Text>
                                    <Text>{ele.subtitle}</Text>
                                </View>
                                <View style={styles.closeButton}>
                                    <TouchableOpacity>
                                        <Icon name="times" type="font-awesome" color="black" size={ 12 } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    );
                })
                }
                    <View style={styles.addItemView}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("PhoneCover")}>
                            <Text style={styles.addItemText}>
                                Add another item
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginTop: 150}}>
                        <View style={{backgroundColor: 'grey', borderRadius: 30, height: 50,width: '60%', alignItems: 'center',justifyContent: 'center'}}>
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate("CheckOut")}>
                                <Text style={{color: 'white'}}>Proceed To Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <BottomNavigation
                    activeTab={this.state.activeTab}
                    onTabPress={this.handleTabPress}
                    renderTab={this.renderTab}
                    tabs={this.tabs}
                />
            </View>
        )
    }
    onApply(param) {
        // store.dispatch(setBGColor(param));
        this.props.navigation.navigate('CoverEditor', {bgColor: param});
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    avatarImage: {
        height: 100,
        width: 50,
    },
    item: {
        flexDirection: "row",
        flex: 1,
    },
    itemTexts: {
        width: '60%',
    },
    closeButton: {
        width: '20%',
        alignItems: 'flex-end'
    },
    addItemText: {
        textDecorationLine: 'underline',
    },
    addItemView: {
        paddingRight: 20,
        alignItems: 'flex-end',
        paddingTop: 10,
    }
    
});