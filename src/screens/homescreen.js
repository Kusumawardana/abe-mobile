import * as React from 'react';
import {Text, View, StyleSheet, StatusBar,Image,FlatList,TouchableOpacity,ActivityIndicator,Alert,Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
const color = require('../routes/color');
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";
import styles from '../styles/homestyle';
import actionget from "../components/get";
import API_KEY from  "../routes/api";
import {SafeAreaView} from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';


export default function HomeScreen({ navigation }) {
    const [status, setStatus] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [loadmore, setLoadmore] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [temp, setTemp] = React.useState('')
    const [terapis, setTerapis] = React.useState([
        { index: '1',name: require('../assets/images/berita.png'),title:'Berita'},
        { index: '2',name: require('../assets/images/pengumuman.png'),title:'Pengumuman'},
        { index: '3',name: require('../assets/images/abc.png'),title:'Konten'},
        { index: '9',name: require('../assets/images/perkembangan.png'),title:'Perkembangan'},
        { index: '5',name: require('../assets/images/puzzle-piece.png'),title:'Konten Anda'},
        { index: '6',name: require('../assets/images/share.png'),title:'Bagikan Gambar'},
        { index: '7',name: require('../assets/images/difference.png'),title:'Bedakan Gambar'},
        { index: '8',name: require('../assets/images/sort.png'),title:'Mengurutkan Gambar'},
    ]);
    const [orangtua, setOrangtua] = React.useState([
        { index: '1',name: require('../assets/images/berita.png'),title:'Berita'},
        { index: '2',name: require('../assets/images/pengumuman.png'),title:'Pengumuman'},
        { index: '3',name: require('../assets/images/abc.png'),title:'Konten'},
        { index: '4',name: require('../assets/images/perkembangan.png'),title:'Perkembangan'},
        { index: '5',name: require('../assets/images/puzzle-piece.png'),title:'Konten Anda'},
        { index: '6',name: require('../assets/images/share.png'),title:'Bagikan Gambar'},
        { index: '7',name: require('../assets/images/difference.png'),title:'Bedakan Gambar'},

        { index: '8',name: require('../assets/images/sort.png'),title:'Mengurutkan Gambar'},
    ]);

    const passing = (data) =>{
        if (data == 1){
            navigation.navigate('News')
        }else if (data == 2){
            navigation.navigate('Announcement')
        }else if (data == 3){
            navigation.navigate('ContentType')
        }else if(data == 4){
            navigation.navigate('OrtuPerkembangan')
        } else if(data == 5){
            navigation.navigate('MyContent')
        } else if(data == 6){
            navigation.navigate('Share')
        } else if (data == 7){
            navigation.navigate('Different')
        } else if (data == 8){
            navigation.navigate('Same')
        } else if (data == 9){
            navigation.navigate('TerapisPerkembangan')
        }
    }
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
                        console.log(value.data.data);
                        setUser(value.data.data)
                        setLoading(false);
                    })
            }
        }
        OneSignal.setAppId("ff9ceaf5-eb89-4769-b887-cebb20219544");
        if (Platform.OS == 'ios'){
            OneSignal.setLogLevel(6, 0);
            OneSignal.setRequiresUserPrivacyConsent(false);
        }

        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        });
        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();
            const button1 = {
                text: "Tutup",
                onPress: () => { notifReceivedEvent.complete(); },
                style: "cancel"
            };
            // const button2 = { text: "Tutup", onPress: () => { notifReceivedEvent.complete(notif); }};

            Alert.alert(notifReceivedEvent.getNotification().title, notifReceivedEvent.getNotification().body, [ button1], { cancelable: true });
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
        });
        OneSignal.setInAppMessageClickHandler(event => {
            console.log("OneSignal IAM clicked:", event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            console.log("OneSignal: email subscription changed: ", event);
        });
        OneSignal.addSubscriptionObserver(event => {
            console.log("OneSignal: subscription changed:", event);
            // this.setState({ isSubscribed: event.to.isSubscribed})
        });
        OneSignal.addPermissionObserver(event => {
            console.log("OneSignal: permission changed:", event);
        });
        device();
        asyncFetch();
    }, []);

    const device = async () =>{
        const deviceState = await OneSignal.getDeviceState();
        console.log('nilai device:',deviceState.userId);
    }

    if (loading == true){
        return(
            <SafeAreaView style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={'large'} color={'lime'}/>
            </SafeAreaView>
        )
    }else {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
                {/*<StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />*/}
                <LinearGradient
                    colors={[color.Gradientfirst, color.GradientSecond]}
                    start={{x: 0.0, y: 0.1}} end={{x: 0.2, y: 1.0}}
                    style={{flex: 1}}
                >
                    <View style={styles.cover}>
                        <View style={{width: responsiveScreenWidth(5)}} />
                        <View style={styles.coveralign}>
                            <TouchableOpacity
                                onPress={()=>navigation.navigate('NotificationList')}
                            >
                                <Icon name='bell' type={'FontAwesome'} style={styles.iconprimary}  />
                            </TouchableOpacity>
                            <View style={{width: responsiveScreenWidth(5)}}/>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Setting')}
                            >
                                <Icon name='gear' type={'FontAwesome'} style={styles.iconprimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cover2}>
                        <View>
                            <Text style={styles.cover2title}>{user.nama}</Text>
                            <Text style={styles.cover2status}>{user.jenispengguna.nama}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=> navigation.navigate('Profile')}
                        >
                            <Image
                                source={require('../assets/images/user.png')}
                                style={styles.cover2profile}
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={[styles.card,styles.shadow]}>
                    <FlatList
                        data={
                            user.jenispengguna.nama == 'orang tua'
                            ? orangtua
                                : user.jenispengguna.nama == 'terapis'
                                ? terapis
                                : null
                        }
                        scrollEnabled={false}
                        numColumns={3}
                        keyExtractor={(item, index) => item.index}
                        renderItem={({item, index}) =>
                            <TouchableOpacity
                                onPress={() => passing(item.index)}
                                style={styles.menuicon}
                            >
                                <Image
                                    source={item.name}
                                    style={styles.menuimage}
                                />
                                <Text style={styles.menutitle} >{item.title}</Text>
                            </TouchableOpacity>
                        }
                    />
                    <View>

                    </View>
                </View>
                <View style={{flex: 2,zIndex: 1}} />
            </View>
        )
    }
}
