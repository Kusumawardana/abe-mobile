import {responsiveFontSize, responsiveHeight, responsiveScreenWidth} from "react-native-responsive-dimensions";

const React = require("react-native");
import {Dimensions} from "react-native";
const color = require('../routes/color')

const { StyleSheet } = React;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
    tinyLogo: {
        width: responsiveScreenWidth(15),
        height: responsiveHeight(12),
        resizeMode:'contain'
    },
    texticon:{
        color: 'gray'
    },
    textfield:{
        width:responsiveScreenWidth(65),
        borderRadius: 5,
        backgroundColor: color.TextInputPrimary,
        paddingHorizontal: 10,
        borderColor: 'white'
    },
    bottom:{
        backgroundColor: color.ViewPrimary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        alignItems: 'center',
        height: windowHeight / 2
    },
    top:{
        backgroundColor: color.Primary,
        alignItems:'center',
        justifyContent:'center',
        height: windowHeight / 2

    },
    button:{
        backgroundColor: color.ButtonPrimary,
        padding: 10,
        width: responsiveScreenWidth(65),
        borderRadius: 5,
        alignItems:'center',
    },
    bottomView:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    buttonout:{
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    textStyle:{
        color: 'black',
    },
    title:{
        fontWeight:'bold',
        fontSize: responsiveFontSize(3)
    }
}
