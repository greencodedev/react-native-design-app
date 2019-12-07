
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
           text: ''
        };
    }

    onApplyText(param) {
        Alert.alert(param);
    }


    render() {
        var models = [{value: "model1"}, {value: "model2"}, {value: "model3"}];
        var phones = [{value: "SAMSUNG"}, {value: "iPhone"}, {value: "NOKIA"}];
        var cases = [{value: "CB"}, {value: "5DM"}, {value: "TP"}, {value: "3D"}];
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <ProgressSteps borderWidth = {2} disabledStepIconColor='grey' progressBarColor='grey'>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 1!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 2!</Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 3!</Text>
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Phone Case</Text>
                    <Dropdown  data={cases}/>
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Make</Text>
                    <Dropdown data={phones} />
                </View>
                <View style={styles.input}>
                    <Text style={styles.text}>Model</Text>
                    <Dropdown data={models} />
                </View>
                <View style={styles.buttonCover}>
                    <View style={[styles.button1, styles.button]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CustomedCategory')}}>
                            <Text style={{color: 'white'}}>Select From Catalogue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.button2, styles.button]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CoverEditor')}}>
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