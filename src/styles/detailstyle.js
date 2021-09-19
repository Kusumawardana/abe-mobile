import {responsiveFontSize, responsiveHeight, responsiveScreenWidth} from "react-native-responsive-dimensions";

const React = require("react-native");
import {Dimensions} from "react-native";
const color = require('../../src/routes/color')

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
        height: windowHeight / 2,
        padding: 10,
        paddingHorizontal: 20
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
    invisiblebutton:{
        backgroundColor:'rgba(52, 52, 52, 0.3)',
        justifyContent:'center',borderRadius: 20
    },
    maininput:{
        marginLeft: 10
    },
    background:{
        height: windowHeight / 2,
        resizeMode: "cover",
    },
    subtitle:{
        color:'grey',
        fontWeight:'bold',

    }
}
