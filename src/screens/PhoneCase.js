
/*
 * className: PhoneCase
 * Author   : ChengXin
 * Created  : July 15th 2019
 * Updated  : July 15th 2019
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  TextInput
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const firstIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f'
  }
  

  const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 15
    }
    switch (position) {
      case 0: {
        iconConfig.name = 'shopping-cart'
        break
      }
      case 1: {
        iconConfig.name = 'location-on'
        break
      }
      case 2: {
        iconConfig.name = 'assessment'
        break
      }
      default: {
        break
      }
    }
    console.log('icon=>', iconConfig);
    return iconConfig
  }
export default class PhoneCase extends Component {
    
    static navigationOptions = {
        title: 'Phone Case',
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
           currentStep: 0,
           model:null
        }
    }

    selectCase = (index,param) => {
        console.log('index', index);
       console.log('param',param);
    }

    renderStepIndicator(param) {
        // <MaterialIcon {...getStepIndicatorIconConfig(param)} />
        <MaterialIcon name="shopping-cart" color='#ff0000' size={15} />
    }

    onStepPress = position =>{
        console.log('position', position);
        this.setState({ currentStep: position });
    }

    componentDidMount(){
        let temp = this.props.navigation.getParam("model");
        this.setState({
            model: temp
        });
    }

    render() {
        var models = [{value: "model1"}, {value: "model2"}, {value: "model3"}];
        var phones = [{value: "SAMSUNG"}, {value: "iPhone"}, {value: "NOKIA"}];
        var cases = [{value: "CB"}, {value: "5DM"}, {value: "TP"}, {value: "3D"}];
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                <StepIndicator
                    customStyles={firstIndicatorStyles}
                    stepCount={3}
                    currentPosition={this.state.currentStep}
                    renderLabel={this.renderLabel}
                    renderStepIndicator={this.renderStepIndicator}
                    onPress={this.onStepPress}
                />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Phone Case</Text>
                    <Dropdown  data={cases} labelExtractor={this.selectCase(0)} />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Make</Text>
                    <Dropdown data={phones} labelExtractor={this.selectCase} />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Model</Text>
                    <Dropdown data={models} labelExtractor={this.selectCase} />
                </View>
                <View style={styles.buttonCover}>
                    <View style={[styles.button1, styles.button]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CustomedCategory', { phoneModel: this.state.model})}}>
                            <Text style={{color: 'white'}}>Select From Catalogue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.button2, styles.button]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CoverEditor', { phoneModel: this.state.model})}}>
                            <Text >Create Custom</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    box: {
        borderColor: 'lightgrey',
        borderRadius: 1,
        borderWidth: 1
    },
    input: {
        marginBottom: 25
    },
    buttonCover: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 40,
        height: 60
    },
    button1: {
        backgroundColor: 'grey',
        borderRadius: 40,
        width: '55%'
    },
    button2:{
        width: '45%'
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
    },


    
});

