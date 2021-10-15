import * as React from 'react';
import {TextInput, View,StyleSheet,Image,Text,TouchableOpacity,StatusBar,ScrollView,Dimensions,Platform} from "react-native";
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {Icon, Item, Input, Header, Left, Body, Title, Right,Button} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../../styles/setting/profilestyle";
import {SafeAreaView} from 'react-native-safe-area-context';

const color = require('../../routes/color')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AboutScreen({ navigation }) {
    return (
        <View style={{flex: 1,backgroundColor:color.Primary,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <View style={{backgroundColor:color.Primary,flex: 1}}>
                <Header style={{backgroundColor:color.Gradientfirst}} transparent>
                    <StatusBar backgroundColor={color.Gradientfirst} barStyle={'light-content'} />
                    <Left>
                        <Button transparent  onPress={() => navigation.goBack()}>
                            <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Tentang Aplikasi</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.cover}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/logos2.png')}
                    />
                    <Text style={{fontSize: responsiveFontSize(2),fontWeight: 'bold'}}>ABE</Text>
                </View>
            </View>
            <View style={styles.bottomview}>
                <Text style={styles.title}>Tentang ABE</Text>
                <Text>Version: 1.0</Text>
                <View style={{marginTop: 20}} />
                <View>
                    <Text style={{textAlign:'justify'}}>
                        ABE Merupakan Aplikasi yang memungkinkan pengguna
                        untuk melakukan terapi pada anak autisme dalam membantu anak autisme untuk mengemukakan keinginannya
                        supaya nantinya dapat mempermudah terapis maupun orang tua anak untuk melakukan  terapis dengan menggunakan metode pecs (Picture Exchange Communication System)
                    </Text>
                </View>
            </View>
        </View>
    );
}


