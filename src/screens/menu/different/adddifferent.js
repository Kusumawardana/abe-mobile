import * as React from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    PermissionsAndroid, Alert, Modal, ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Button,
    Body,
    Footer, FooterTab,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Subtitle,
    Title,
} from 'native-base';
import styles from '../../../styles/liststyle';
import ActionSheet from 'react-native-actions-sheet';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {createRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import action from '../../../components/function';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

const actionSheetRef = createRef();
const actionSheetRef2 = createRef();

export default function addDifferentScreen({ navigation }) {
    const [filePath, setFilePath] = useState({});
    const [filePath2, setFilePath2] = useState({});
    const [judul, setJudul] = React.useState('');
    const [user, setUser] = React.useState('');
    const [deskripsi, setDeskripsi] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = async () => {
        const users = await AsyncStorage.getItem("users");
        setUser(users);
    };

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
    const chooseFile2 = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
        };
        launchImageLibrary(options, (response2) => {
            actionSheetRef2.current?.setModalVisible(false);
            console.log('Response = ', response2);

            if (response2.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response2.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response2.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response2.errorCode == 'others') {
                alert(response2.errorMessage);
                return;
            }
            console.log('base64 -> ', response2.base64);
            console.log('uri -> ', response2.uri);
            console.log('width -> ', response2.width);
            console.log('height -> ', response2.height);
            console.log('fileSize -> ', response2.fileSize);
            console.log('type -> ', response2.type);
            console.log('fileName -> ', response2.fileName);
            console.log('allFile -> ', response2);
            setFilePath2(response2);
        });
    };
    const captureImage2 = async (type) => {
        actionSheetRef2.current?.setModalVisible(false);
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
                setFilePath2(response);

            });
        }
    };
    const sendData = () =>{
        if (judul.length <= 0 || deskripsi.length <= 0){
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
            data.append('id_user', user);
            data.append('file1', {
                uri: filePath.uri,
                type: 'image/jpeg',
                name: filePath.fileName,
            });
            data.append('file2', {
                uri: filePath2.uri,
                type: 'image/jpeg',
                name: filePath2.fileName,
            });
            action(API_KEY.DIFFERENTCREATE,data,'POST')
                .then(value => {
                    console.log('nilai upload:',value.data)
                    if (value.data.status == 'Success'){
                        Alert.alert(
                            value.data.status,
                            value.data.message,
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                        navigation.navigate('Different')
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
                    <Title style={{color:'white'}}>Perbedaan</Title>
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
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <View style={{padding: 20}}>
                        <Text style={{alignSelf:'center',fontSize: 20,marginBottom: 10}}>Ilustrasi</Text>
                        {
                            filePath.uri != null
                                ?
                                <TouchableOpacity>
                                    <Image
                                        source={{uri: filePath.uri}}
                                        style={{width: 100,height: 100,alignSelf:'center',borderRadius: 5}}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={{borderWidth: 2,height: 100,width: 100,alignSelf: 'center',borderRadius: 15,borderColor: 'grey',backgroundColor:'#cfd8dc',alignItems:'center'}}
                                >
                                </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                actionSheetRef.current?.setModalVisible();
                            }}
                            style={{alignItems:'center',margin: 15,backgroundColor: color.GradientSecond,padding: 10,width: 100,alignSelf:'center',borderRadius: 5}}
                        >
                            <Text style={{color:'white',textAlign:'center',alignSelf: 'stretch'}}>Tambahkan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 20}}>
                        <Text style={{alignSelf:'center',fontSize: 20,marginBottom: 10}}>Realita</Text>
                        {
                            filePath2.uri != null
                                ?
                                <TouchableOpacity>
                                    <Image
                                        source={{uri: filePath2.uri}}
                                        style={{width: 100,height: 100,alignSelf:'center',borderRadius: 5}}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={{borderWidth: 2,height: 100,width: 100,alignSelf: 'center',borderRadius: 15,borderColor: 'grey',backgroundColor:'#cfd8dc',alignItems:'center'}}
                                >
                                </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                actionSheetRef2.current?.setModalVisible();
                            }}
                            style={{alignItems:'center',margin: 15,backgroundColor: color.GradientSecond,padding: 10,width: 100,alignSelf:'center',borderRadius: 5}}
                        >
                            <Text style={{color:'white',textAlign:'center',alignSelf: 'stretch'}}>Tambahkan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <ActionSheet
                        gestureEnabled={true}
                        ref={actionSheetRef}>
                        <View
                            style={{height: responsiveHeight(25),padding: 20}}
                        >
                            <Text>Pilihan Untuk Ilustrasi</Text>
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
                    <ActionSheet
                        gestureEnabled={true}
                        ref={actionSheetRef2}>
                        <View
                            style={{height: responsiveHeight(25),padding: 20}}
                        >
                            <Text>Pilihan Untuk Realita</Text>
                            <List>
                                <ListItem
                                    button
                                    onPress={() => captureImage2('photo')}
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
                                    onPress={() => chooseFile2('photo')}
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
                <FooterTab
                    style={{backgroundColor: color.GradientSecond}}
                >
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
