import React, {useState, useEffect,createRef} from 'react';
import {
    View,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    RefreshControl,
    ScrollView,
    PermissionsAndroid,
    Alert,
    Platform, Modal,
} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title,Text,List,Item,ListItem,Input,Subtitle,Fab,Form,Label,Footer,FooterTab} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import styles from "../../../styles/liststyle";
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');
import OneSignal from 'react-native-onesignal';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import ActionSheet from "react-native-actions-sheet";
import action from "../../../components/function";

import {SafeAreaView} from 'react-native-safe-area-context';

const actionSheetRef = createRef();

export default function addMyContentScreen({ navigation }) {
    const [filePath, setFilePath] = useState({});
    const [judul, setJudul] = React.useState('');
    const [user, setUser] = React.useState('');
    const [deskripsi, setDeskripsi] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        const asyncFetch = async () => {
            const users = await AsyncStorage.getItem("users");
            setUser(users);
        };
        asyncFetch();
    }, []);

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const captureImage = async (type) => {
        actionSheetRef.current?.setModalVisible(false);
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                console.log('allFile -> ', response);
                setFilePath(response);

            });
        }
    };
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
        };
        launchImageLibrary(options, (response) => {
            actionSheetRef.current?.setModalVisible(false);
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            console.log('allFile -> ', response);
            setFilePath(response);
        });
    };
    const sendData = () =>{
        if (judul.length <= 0 || deskripsi.length <= 0 ){
            Alert.alert(
                "Peringatan",
                "Harap Melengkapi data terlebih dahulu",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }else {
            setModalVisible(true)
            const data = new FormData();
            data.append('judul', judul);
            data.append('deskripsi', deskripsi);
            data.append('id_jenis', 1);
            data.append('id_user', user);
            data.append('file', {
                uri: filePath.uri,
                type: 'image/jpeg',
                name: 'photos.jpg',
            });
            action(API_KEY.MYFLASHCARDCREATE,data,'POST')
                .then(value => {
                    if (value.data.status == 'Success'){
                        Alert.alert(
                            value.data.status,
                            value.data.message,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                        navigation.navigate('MyContent')
                        setModalVisible(false)
                    }else {
                        setModalVisible(false)
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

    }
    return (
        <View style={{ flex: 1,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{backgroundColor:'rgba(52, 52, 52, 0.3)',flex: 1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',width: 100,height: 100,borderRadius: 20,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size="large" color={'green'} />
                    </View>
                </View>
            </Modal>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Flashcard</Title>
                    <Subtitle style={{color:'white'}}>Tambah Data</Subtitle>
                </Body>
                <Right />
            </Header>
            <ScrollView style={{padding: 20}}>
                <Form>
                    <Item floatingLabel>
                        <Label>Judul</Label>
                        <Input
                            onChangeText={text => setJudul(text)}
                            value={judul}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Deskripsi</Label>
                        <Input
                            onChangeText={text => setDeskripsi(text)}
                            value={deskripsi}
                        />
                    </Item>
                </Form>
                <View style={{padding: 20}}>
                    {
                        filePath.uri != null
                            ?
                            <TouchableOpacity>
                                <Image
                                    source={{uri: filePath.uri}}
                                    style={{width: 200,height: 200,alignSelf:'center',borderRadius: 5}}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{borderWidth: 2,height: 200,width: 200,alignSelf: 'center',borderRadius: 15,borderColor: 'grey',backgroundColor:'#cfd8dc',alignItems:'center'}}
                            >
                            </TouchableOpacity>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            actionSheetRef.current?.setModalVisible();
                        }}
                        style={{alignItems:'center',margin: 15,backgroundColor: color.GradientSecond,padding: 10,width: 200,alignSelf:'center',borderRadius: 5}}
                    >
                        <Text style={{color:'white'}}>Tambahkan Gambar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <ActionSheet
                        gestureEnabled={true}
                        ref={actionSheetRef}>
                        <View
                            style={{height: responsiveHeight(25),padding: 20}}
                        >
                            <Text>Pilihan</Text>
                            <List>
                                <ListItem
                                    button
                                    onPress={() => captureImage('photo')}
                                >
                                    <Left>
                                        <Text>Camera</Text>
                                    </Left>
                                    <Right>
                                        <Icon ios={'arrow-forward-ios'} android={'arrow-forward'} type={'MaterialIcons'} />
                                    </Right>
                                </ListItem>
                                <ListItem
                                    button
                                    onPress={() => chooseFile('photo')}
                                >
                                    <Left>
                                        <Text>Penyimpanan Foto</Text>
                                    </Left>
                                    <Right>
                                        <Icon ios={'arrow-forward-ios'} android={'arrow-forward'} type={'MaterialIcons'} />
                                    </Right>
                                </ListItem>
                            </List>
                        </View>
                    </ActionSheet>
                </View>
            </ScrollView>
            <Footer
                style={{backgroundColor: color.GradientSecond}}
            >
                <FooterTab>
                    <Button
                        full
                        onPress={sendData}
                    >
                        <Text style={{color:'white',fontWeight:'bold'}}>Kirimkan</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
    );
}
