import React, {useState, useEffect,createRef} from 'react';
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
    Alert,
    Platform,
} from 'react-native';
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {
    Icon,
    Item,
    Input,
    Header,
    Left,
    Body,
    Title,
    Right,
    Button,
    Footer,
    FooterTab,
    List,
    ListItem
} from 'native-base';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../../../styles/detailstyle";
import ActionSheet from "react-native-actions-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import Tts from 'react-native-tts';
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const actionSheetRef = createRef();

export default function myContentDetailScreen({route, navigation }) {
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
    const deleteItem = (id) =>{
        const url = API_KEY.MYFLASHCARDDELETE + id
        actionget(url)
            .then(value => {
                if (value.data == 'sukses'){
                    alert('data berhasil di hapus');
                    navigation.navigate('MyContent')
                }else {
                    alert('data gagal di hapus');
                }
            })
    }
    const option = (id) =>{
        Alert.alert(
            "Peringatan",
            'apakah anda Yakin ingin Menghapus Gambar ini ?',
            [
                {
                    text: "Iya",
                    onPress: () => deleteItem(id)
                },
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={{flex: 1}}>
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
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity
                            onPress={()=> speak(route.params.data.judul)}
                            style={{backgroundColor:'#e0e0e0',alignItems:'center',justifyContent:'center',borderRadius: 10,width: 50,height: 50}}
                        >
                            <Icon name='volume-down' type="FontAwesome" style={{color:'green',fontSize: 30}} />
                        </TouchableOpacity>
                        <View style={{width: 20}} />
                        <TouchableOpacity
                            onPress={()=> option(route.params.data.id)}
                            style={{backgroundColor:'#e0e0e0',alignItems:'center',justifyContent:'center',borderRadius: 10,width: 50,height: 50}}
                        >
                            <Icon name='trash' type="FontAwesome" style={{color:'#F64E60',fontSize: 30}} />
                        </TouchableOpacity>
                    </View>


                    <View style={{marginTop: 20}}>
                        <Text>
                            {route.params.data.deskripsi}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <Footer
                style={{backgroundColor: color.GradientSecond}}
            >
                <FooterTab
                    style={{backgroundColor:color.GradientSecond}}
                >
                    <Button
                        full
                        // onPress={() => navigation.navigate('ShareMyContent')}
                        onPress={() => navigation.navigate('ShareMyContent', {data: route.params.data})}
                    >
                        <Text style={{color:'white',fontWeight:'bold'}}>Bagikan</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
    );
}


