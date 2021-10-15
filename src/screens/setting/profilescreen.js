import * as React from 'react';
import {TextInput, View,StyleSheet,Image,Text,TouchableOpacity,StatusBar,ScrollView,Dimensions,Platform,ActivityIndicator} from "react-native";
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {Icon, Item, Input, Header, Left, Body, Title, Right,Button} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from "../../styles/setting/profilestyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../components/get";
import API_KEY from "../../routes/api";
import {SafeAreaView} from 'react-native-safe-area-context';

const color = require('../../routes/color')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProfileScreen({ navigation }) {
    const [status, setStatus] = React.useState('')
    const [isLoading, setisLoading] = React.useState(true)
    const [user, setUser] = React.useState('')
    const [type, setType] = React.useState('')

    React.useEffect(() => {
        const asyncFetch = async () => {
            const users = await AsyncStorage.getItem("users");
            if (users){
                first(users)
            }
        };
        const first = (id) =>{
            if (id){
                actionget(API_KEY.PROFILE + id)
                    .then(value => {
                        console.log(value.data.data.type[0]);
                        setUser(value.data.data)
                        setType(value.data.data.type[0])
                        setisLoading(false);
                    })
            }
        }
        asyncFetch();
    }, []);
    return (
        <View style={{flex: 1,backgroundColor:color.Primary}}>
            <View style={{backgroundColor:color.Primary,flex: 1}}>
                <Header style={{backgroundColor:color.Gradientfirst}} transparent>
                    <StatusBar backgroundColor={color.Gradientfirst} barStyle={'light-content'} />
                    <Left>
                        <Button transparent  onPress={() => navigation.goBack()}>
                            <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Profile</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.cover}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/user.png')}
                    />
                </View>
            </View>
            <View style={styles.bottomview}>
                <Text style={styles.title}>Data Profile</Text>
                <View style={{marginTop: 20}} />
                <ScrollView>
                    {
                        isLoading == true
                            ?
                            <View>
                                <ActivityIndicator color={'lime'} size={'large'} />
                            </View>
                            :
                            <View>
                                <View style={styles.coverinput}>
                                    <Text style={styles.titleinput}>Nama:</Text>
                                    <Text style={styles.maininput}>{user.nama}</Text>
                                </View>
                                <View style={styles.coverinput}>
                                    <Text style={styles.titleinput}>Nama Pengguna:</Text>
                                    <Text style={styles.maininput}>{user.nama_user}</Text>
                                </View>
                                <View style={styles.coverinput}>
                                    <Text style={styles.titleinput}>Status:</Text>
                                    <Text style={styles.maininput}>{user.jenispengguna.nama}</Text>
                                </View>
                                <View style={styles.coverinput}>
                                    <Text style={styles.titleinput}>alamat:</Text>
                                    <Text style={styles.maininput}>{type.alamat}</Text>
                                </View>
                                <View style={styles.coverinput}>
                                    <Text style={styles.titleinput}>Telpon:</Text>
                                    <Text style={styles.maininput}>{type.telp}</Text>
                                </View>
                            </View>
                    }
                    <View  style={{marginBottom: 20}}/>
                </ScrollView>
            </View>
        </View>
    );
}


