import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";

const React = require("react-native");
import {Dimensions} from "react-native";
const color = require('../routes/color')

const { StyleSheet } = React;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
    cover:{
        marginTop: responsiveHeight(5),
        flexDirection:'row',
        justifyContent:'space-between',
        width: responsiveScreenWidth(85),
        alignSelf:'center'
    },
    coveralign:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    iconprimary:{
        color:'white',
        fontSize: 20
    },
    cover2:{
        flexDirection:'row',
        justifyContent:'space-between',
        width: responsiveScreenWidth(85),
        marginTop: 30,
        alignSelf:'center'
    },
    cover2title:{
        fontSize: 25,
        color:'white'
    },
    cover2status:{
        fontSize: 20,
        marginTop: 5,
        color:'white'
    },
    cover2profile:{
        width: responsiveScreenWidth(10),
        height: responsiveHeight(7),
        resizeMode:'contain'
    },
    card:{
        backgroundColor:'white',
        position:'absolute',
        alignSelf:'center',
        alignItems:'center',
        marginTop: responsiveScreenHeight(23),
        padding: responsiveHeight(2),
        borderRadius: 10,
        zIndex:2
    },
    menuicon:{
        alignItems:'center',
        margin: 5,
        width: responsiveScreenWidth(20),
        height: responsiveHeight(13)
    },
    menuimage:{
        width: responsiveScreenWidth(10),
        height: responsiveHeight(7),
        resizeMode:'contain',
        marginBottom: responsiveHeight(2)
    },
    menutitle:{
        fontSize: 11,
        textAlign:'center'
    },
    shadow:{
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

}
