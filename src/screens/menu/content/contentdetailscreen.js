import * as React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Dimensions,
    ImageBackground,
    Platform,
} from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {Icon, Item, Input, Header, Left, Body, Title, Right,Button} from 'native-base';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../../../styles/detailstyle";
import Tts from 'react-native-tts';

const color = require('../../../routes/color')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ContentDetailScreen({route, navigation }) {

    React.useEffect(() => {
        Tts.setDefaultLanguage('id-ID');
    }, []);
    const speak = (item) =>{
        if(Platform.OS == 'ios'){
            Tts.speak(item);
        }else {
            Tts.speak(item);
        }
    }
    return (
        <ScrollView>
            <ImageBackground
                style={styles.background}
                source={{uri: route.params.data.attachment}}
            >
                <Header transparent >
                    <StatusBar translucent  backgroundColor={'transparent'} barStyle={'light-content'} />
                    <Left>
                        <Button style={styles.invisiblebutton}  onPress={() => navigation.goBack()}>
                            <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Flashcard</Title>
                    </Body>
                    <Right />
                </Header>
            </ImageBackground>
            <View style={styles.bottomview}>
                <Text style={styles.title}>{route.params.data.judul}</Text>
                <Text style={styles.subtitle}>{moment(route.params.data.created_at).format("MMMM Do YYYY")}{" "}</Text>
                <View style={{marginTop: 20}} />
                <TouchableOpacity
                    onPress={()=> speak(route.params.data.judul)}
                    style={{backgroundColor:'#e0e0e0',alignItems:'center',justifyContent:'center',borderRadius: 10,width: 50,height: 50}}
                >
                    <Icon name='volume-down' type="FontAwesome" style={{color:'green',fontSize: 30}} />
                </TouchableOpacity>
                <View style={{marginTop: 20}}>
                    <Text>
                        {route.params.data.deskripsi}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}


