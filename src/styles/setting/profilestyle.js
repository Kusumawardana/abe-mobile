import {responsiveFontSize, responsiveHeight, responsiveScreenWidth} from "react-native-responsive-dimensions";

const React = require("react-native");
import {Dimensions} from "react-native";
const color = require('../../routes/color')

const { StyleSheet } = React;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
    tinyLogo:{
        width: responsiveScreenWidth(15),
        height: responsiveHeight(12),
        resizeMode:'contain'
    },
    cover:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    bottomview:{
        backgroundColor:color.ViewPrimary,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingHorizontal: 40
    },
    title:{
        fontWeight: 'bold',
        fontSize: 28,
        color:'gray'
    },
    coverinput:{
        marginTop: 10
    },
    titleinput:{
        fontSize: 20,
        fontWeight:'bold',
        color:'gray'
    },
    maininput:{
        marginLeft: 10}
}
