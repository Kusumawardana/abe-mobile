import React, {useState, useEffect,createRef} from 'react';
import {View, StatusBar, ScrollView, PermissionsAndroid, Alert, ActivityIndicator, Platform} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title,Text,Subtitle,Footer,FooterTab,Form,Picker} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import styles from "../../../styles/liststyle";
import {responsiveWidth} from "react-native-responsive-dimensions";
import action from "../../../components/function";
import {SafeAreaView} from 'react-native-safe-area-context';
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');


export default function shareMyContentScreen({ route,navigation }) {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataSource2, setDataSource2] = useState([]);
    const [user, setUser] = useState('');
    const [jenis, setJenis] = useState('');
    const [pengguna, setPengguna] = useState('');
    const [selectedValue, setSelectedValue] = useState("java");


    React.useEffect(() => {
        asyncFetch()
        console.log('nilai gambar:',route.params.data)

    }, []);

    const asyncFetch = async () => {
        const users = await  AsyncStorage.getItem("users")
        if (users){
            setUser(users)
            getData(users)
        }
    };
    const getData = (user) =>{
        setLoading(true);
        const url = API_KEY.USERTYPE + user
        actionget(url)
            .then(value => {
                console.log('nilai get:', value.data.data)
                setDataSource(value.data.data);
                setLoading(false)
            })
    }
    const type = (id) =>{
        setJenis(id)
        setLoading(true);
        const url = API_KEY.USER + user + '/' + id
        actionget(url)
            .then(value => {
                console.log('nilai get2:', value.data.data)
                setDataSource2(value.data.data);
                setLoading(false)
            })
    }
    const sendData = () =>{
        // alert(route.params.data.id)
        if (jenis.length <= 0 || pengguna.length <= 0){
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
            const data = new FormData();
            data.append('id_flashcard', route.params.data.id);
            data.append('id_penerima', pengguna);
            data.append('id_pengirim', user);

            action(API_KEY.SHAREDCREATE,data,'POST')
                .then(value => {
                    if (value.data.status == 'Success'){
                        Alert.alert(
                            value.data.status,
                            value.data.message,
                            [
                                { text: "OK", onPress: () => navigation.navigate('MyContent') }
                            ],
                            { cancelable: false }
                        );

                    }else {
                        Alert.alert(
                            'ERROR',
                            'Sepertinya terjadi kesalahan di Server',
                            [
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ],
                            { cancelable: false }
                        );
                    }
                })
        }
    }

    const onValueChange=(item)=>{
        alert(item);
    }
    return (
        <View style={{ flex: 1,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Flashcard</Title>
                    <Subtitle style={{color:'white'}}>Bagikan Data</Subtitle>
                </Body>
                <Right />
            </Header>
            <ScrollView style={{padding: 20}}>
                <Form>
                    <Text style={{fontWeight:'bold'}}>Jenis Pengguna</Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="Jenis Pengguna"
                        iosIcon={<Icon name="arrow-down" type={'SimpleLineIcons'} style={{ color: "#007aff", fontSize: 25 }} />}
                        style={{ width: 200,backgroundColor:'#e0e0e0',margin: 5 }}
                        selectedValue={jenis}
                        onValueChange={(itemValue, itemIndex) => type(itemValue)}
                    >
                        {dataSource.map((item, key)=>(
                            <Picker.Item label={item.nama} value={item.id} key={key} />)
                        )}
                    </Picker>
                    <Text style={{fontWeight:'bold'}}>Penerima</Text>
                    {
                        jenis.length == 0
                            ? null
                             :
                            <Picker
                                mode="dropdown"
                                iosHeader="Pengguna"
                                iosIcon={<Icon name="arrow-down" type={'SimpleLineIcons'} style={{ color: "#007aff", fontSize: 25 }} />}
                                style={{ width: 200,backgroundColor:'#e0e0e0',margin: 5 }}
                                selectedValue={pengguna}
                                onValueChange={(itemValue, itemIndex) => setPengguna(itemValue)}
                            >
                                {dataSource2.map((item, key)=>(
                                    <Picker.Item label={item.nama} value={item.id} key={key} />)
                                )}
                            </Picker>
                    }
                </Form>
            </ScrollView>
            <Footer
                style={{backgroundColor: color.GradientSecond}}
            >
                <FooterTab
                    style={{backgroundColor:color.GradientSecond}}
                >
                    <Button
                        full
                        onPress={sendData}
                    >
                        <Text style={{color:'white',fontWeight:'bold'}}>Kirim</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
    );
}
