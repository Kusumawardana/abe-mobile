import * as React from 'react';
import {View, Text, Platform, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button,Body, Header, Icon, Left, Right, Subtitle, Title} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

export default function NotificationScreen({ navigation }) {
    return (
        <View style={{ flex: 1,marginTop:(Platform.OS == 'ios') ? 0 : 20 }}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Notifikasi</Title>
                </Body>
                <Right />
            </Header>
            <View>
                <TouchableOpacity
                    style={{backgroundColor:'white',margin: 10,padding: 10,borderRadius: 10,flexDirection:'row'}}
                >
                    <View
                        style={{backgroundColor:'#FEE2E4',padding: 10,marginRight: 20,borderRadius: 10}}
                    >
                        <Icon ios='notifications' android="notifications" type={'Ionicons'} style={{fontSize: 20, color: '#F64E60'}}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold'}}>Judul</Text>
                        <Text style={{color:'grey'}}>3 monts ago</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
