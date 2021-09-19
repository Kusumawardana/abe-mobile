import {responsiveFontSize, responsiveHeight, responsiveScreenWidth} from "react-native-responsive-dimensions";

const React = require("react-native");
import {Dimensions} from "react-native";
const color = require('../../src/routes/color')

const { StyleSheet } = React;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    item: {
        backgroundColor:'#F7F7F7',
        borderRadius: 30
    },
    item2: {
        backgroundColor:'#E8E8E8',
        borderRadius: 30
    },
    
    icon: {
        color:'gray',
        marginLeft: 20
    },
    warntext:{
        maxWidth: responsiveScreenWidth(80),
        marginLeft: 10
    },
    warnwall:{
        backgroundColor:'white',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        marginBottom: 20
    }
    
}
