import * as React from 'react';
import {
    View,
    Text,
    StatusBar,
    Platform,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    RefreshControl, Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button, Body, Header, Icon, Left, Right, Subtitle, Title, Item, Input} from 'native-base';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actionget from '../../../../components/get';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import action from '../../../../components/function';
const color = require('../../../../routes/color')
const API_KEY = require('../../../../routes/api');

export default function DetailPerkembanganAnakScreen({ navigation,route }) {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [arrayholder,setArrayholder] =useState([])
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(5);
    const [user, setUser] = useState('');
    const [isListEnd, setIsListEnd] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [deskripsi, setDeskripsi] = React.useState('')

    React.useEffect(() => {
        asyncFetch()
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
        const url = API_KEY.RESPONS + user + '/' + route.params.data.id
        actionget(url)
            .then(value => {
                setDataSource(value.data.data)
                setLoading(false);
            })
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataSource([])
        asyncFetch();
        setRefreshing(false);
    }, []);
    const deletedItem = (id) =>{
        setLoading(true);
        const url = API_KEY.RESPONSDELETEORTU + user + '/' + id
        actionget(url)
            .then(value => {
                if (value.data.status == 'Success'){
                    Alert.alert(
                        value.data.status,
                        value.data.message,
                        [
                            { text: "OK", onPress: () => onRefresh() }
                        ],
                        { cancelable: false }
                    );

                }else {
                    Alert.alert(
                        value.data.status,
                        value.data.message,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                }
                setLoading(false);
            })
    }
    const deleted = (item) =>{
        let length = dataSource.length;
        if (item.id == dataSource[length - 1]['id']){
            Alert.alert(
                'Peringatan',
                'Apakah Anda Yakin Untuk Hapus Respon ini ?',
                [
                    { text: "Hapus", onPress: () => deletedItem(item.id) },
                    { text: "Batal", onPress: () => console.log('batal') }
                ],
                { cancelable: false }
            );
        }else {
            console.log('hanya dapat menghapus data paling baru')
        }
    }

    const ItemView = ({item}) => {
        return (
            <View>
                {
                    item.id_terapis == 0
                        ?
                        <TouchableOpacity
                            style={{backgroundColor:'#e0e0e0',maxWidth: responsiveScreenWidth(50),minWidth:responsiveScreenWidth(10),padding: 10,margin: 10,borderBottomLeftRadius: 10,borderTopRightRadius: 10}}
                            onLongPress={()=> deleted(item)}
                        >
                            <Text>{item.deskripsi}</Text>
                            <Text style={{color:'grey',marginTop: 10}}>{item.orangtua.nama_orangtua}</Text>

                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{backgroundColor: color.Gradientfirst,maxWidth: responsiveScreenWidth(50),minWidth: responsiveScreenWidth(20),padding: 10,margin: 10,borderTopLeftRadius: 10,borderBottomRightRadius: 10,alignSelf:'flex-end'}}
                        >
                            <Text>{item.deskripsi}</Text>
                            <Text style={{color:'grey',marginTop: 10,fontSize: 12}}>

                                {item.terapis.nama_terapis}
                            </Text>
                        </TouchableOpacity>
                }
            </View>
        );
    };

    const renderFooter = () => {
        return (
            // Footer View with Loader
            <View style={{alignItems:'center'}}>
                {loading ? (
                    <ActivityIndicator
                        color="black"
                        style={{margin: 15}} />
                ) : null}
            </View>
        );
    };

    const process = () =>{
        if (deskripsi.length == 0){
            alert('Harap isi Data Terlebih dahulu')
        }else {
            const data = new FormData();
            data.append('deskripsi', deskripsi);
            data.append('id_user', user);
            data.append('id_perkembangan', route.params.data.id);

            action(API_KEY.RESPONSCREATEORTU,data,'POST')
                .then(value => {
                    console.log('nilai:',value.data)
                    if (value.data.status == 'Success'){
                        Alert.alert(
                            value.data.status,
                            value.data.message,
                            [
                                { text: "OK", onPress: () => onRefresh() }
                            ],
                            { cancelable: false }
                        );

                    }else {
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
        <View style={{flex: 1,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Perkembangan</Title>
                    <Subtitle style={{color:'white'}}>Detail</Subtitle>
                </Body>
                <Right />
            </Header>
            <View style={{backgroundColor:'white',padding:20}}>
                <Text style={{fontWeight:'bold',fontSize: 20}}>Terapis</Text>
                <Text style={{fontWeight:'bold',fontSize: 15,marginLeft: 5}}>{route.params.data.terapis.nama_terapis}</Text>
                <Text>
                    {route.params.data.deskripsi}
                </Text>
            </View>

            <View style={{flex: 1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                    data={dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListFooterComponent={renderFooter}
                />
            </View>
            <View style={{paddingBottom: 20,padding: 10,backgroundColor:'white'}}>
                <Item>
                    <Input
                        placeholder='Tulis Sesuatu...'
                        onChangeText={text => setDeskripsi(text)}
                        value={deskripsi}
                        multiline = {true}
                        // numberOfLines = {4}
                    />
                    <Button
                        onPress={process}
                    >
                        <Icon active name='send' />
                    </Button>
                </Item>
            </View>
        </View>
    );
}
