import * as React from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {AuthContext} from './utils';
const color = require('../routes/color');
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SplashScreen() {
    return (
        <SafeAreaView style={{backgroundColor:color.Primary,alignItems:'center',justifyContent:'center',flex: 1}}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <Image
                style={{width: responsiveScreenWidth(15), height: responsiveHeight(12), resizeMode:'contain'}}
                source={require('../assets/images/logos2.png')}
            />
            <Text style={{fontSize:responsiveFontSize(3)}}>ABE</Text>
        </SafeAreaView>
    );
}
