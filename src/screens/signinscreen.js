import * as React from 'react';
import { AuthContext } from "./utils";
import { Button, TextInput, View, StyleSheet, Image, Text, TouchableOpacity, StatusBar, ScrollView, Dimensions, Platform, Alert, ActivityIndicator, SafeAreaView } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { Icon, Item, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../styles/signinstyle";
import AsyncStorage from '@react-native-async-storage/async-storage';

import action from "../components/function";
import OneSignal from "react-native-onesignal";
const color = require('../routes/color')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const API_KEY = require('../routes/api');

export default function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [unvisible, setunvisible] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [idDevice, setIdDevice] = React.useState('');

    React.useEffect(() => {
        OneSignal.setAppId("ff9ceaf5-eb89-4769-b887-cebb20219544");
        OneSignal.addSubscriptionObserver( async () => {
            await OneSignal.getDeviceState().then((deviceState) => {
                setIdDevice(deviceState.userId);
                console.log(deviceState);
                if(deviceState.userId) {
                    setLoading(false);
                }
            });
        });
        device();
        return () => {
            OneSignal.clearSubscriptionObservers();
        }
    }, []);

    const device = async () =>{
        const deviceState = await OneSignal.getDeviceState();
        console.log('nilai device login:',deviceState);
        setIdDevice(deviceState.userId);
        if(deviceState.userId) {
            setLoading(false);
        }
    }

    const Process = async () => {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        data.append('device', idDevice);
        console.log(idDevice);
        action(API_KEY.LOGIN, data, 'POST')
            .then(value => {
                console.log('nilai:', value.data)
                if (value.data.status == 'Success') {
                    const jsonValue = JSON.stringify(value.data.data.id)
                    AsyncStorage.setItem('users', jsonValue)
                    signIn({ username, password })
                } else {
                    Alert.alert(
                        value.data.status,
                        value.data.message,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }
            })
    }

    const hide = () => {
        if (unvisible == true) {
            setunvisible(false)
        } else if (unvisible == false) {
            setunvisible(true)
        }
    }

    const { signIn } = React.useContext(AuthContext);

    if (loading){
        return(
            <SafeAreaView style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={'large'} color={'lime'}/>
            </SafeAreaView>
        )
    }

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: '#30e584' }}>
            <StatusBar translucent backgroundColor={color.Primary} barStyle={'light-content'} />
            <View
                style={styles.top}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/images/logos2.png')}
                />
                <Text style={styles.title}>ABE</Text>
                <Text>Aplikasi Terapi Untuk Anak Autisme</Text>
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.buttonout}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
                <View style={{ marginTop: responsiveHeight(2) }} />
                <Item style={styles.textfield}>
                    <Icon active name='user-o' type="FontAwesome" style={styles.texticon} />
                    <Input
                        placeholder='Username'
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                </Item>
                <View style={{ marginTop: responsiveHeight(2) }} />
                <Item style={styles.textfield}>
                    <Icon active name='lock' type="Feather" style={styles.texticon} />
                    <Input
                        placeholder='Password'
                        secureTextEntry={unvisible}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />

                    <TouchableOpacity
                        onPress={hide}
                    >
                        {
                            unvisible == true ?
                                <Icon active name='eye-slash' type="FontAwesome" style={styles.texticon} />
                                :
                                <Icon active name='eye' type="FontAwesome" style={styles.texticon} />
                        }
                    </TouchableOpacity>
                </Item>
                <View style={{ marginTop: responsiveHeight(2) }} />
                <TouchableOpacity>
                    <Text>Lupa Password ?</Text>
                </TouchableOpacity>
                <View
                    style={{ marginTop: responsiveHeight(2) }}
                />
                <TouchableOpacity
                    disabled={ !idDevice }
                    style={styles.button}
                    onPress={Process}
                >
                    <Text style={{ color: 'white' }}>Sign In</Text>
                </TouchableOpacity>
                <View style={styles.bottomView} >
                    <Text style={styles.textStyle}>Yayasan Bali Permata Hati</Text>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}


