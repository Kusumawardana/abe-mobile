import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Platform,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator, RefreshControl,
    Alert
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Body, Header, Icon, Left, Right, Title, Button, Subtitle, Card, CardItem, Fab} from 'native-base';
import styles from "../../../styles/liststyle";
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actionget from '../../../components/get';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

export default function DifferentScreen({ navigation }) {
    const [status, setStatus] = useState('Anda');
    const [dataSource, setDataSource] = useState([]);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        onRefresh()
    }, [isFocused]);

    const asyncFetch = async () => {
        const users = await  AsyncStorage.getItem("users")
        if (users){
            setUser(users)
            if (status == 'Yayasan'){
                getDataAdmin(users)
            }else {
                getDataMy(users)
            }
        }
    };
    const getDataMy = (user) =>{
        setLoading(true);
        setDataSource([]);
        const url = API_KEY.DIFFERENTMY + user
        console.log(url)
        actionget(url)
            .then(value => {
                console.log('nilai get saya:', value.data.data)
                setDataSource(value.data.data);
                setLoading(false)
            })
    }
    const getDataAdmin = (user) =>{
        setLoading(true);
        setDataSource([]);
        const url = API_KEY.DIFFERENTADMIN + user
        console.log(url)
        actionget(url)
            .then(value => {
                console.log('nilai get admin:', value.data.data)
                setDataSource(value.data.data);
                setLoading(false)
            })
    }

    const getFunction = (value) => {
        if (value == 'Yayasan'){
            setStatus(value);
            getDataAdmin(user);
        }else {
            setStatus(value);
            getDataMy(user);
        }
    }
    const renderFooter = () => {
        return (
            <View>
                {loading ? (
                    <ActivityIndicator
                        color="green"
                        style={{margin: 15}} />
                ) : null}
            </View>
        );
    };
    const option = (item) =>{
        if (status != 'Yayasan'){
            Alert.alert(
                "Peringatan",
                "Apakah Anda Yakin ingin Menghapus data ini ?",
                [
                    {
                        text: "Batal",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Iya", onPress: () => DeleteItem(item.id) }
                ],
                { cancelable: false }
            );
        }
    }
    const DeleteItem = (item) =>{
        setLoading(true);
        const url = API_KEY.DIFFERENTDELETE + item
        actionget(url)
            .then(value => {
                if (value.data == 'sukses'){
                    alert('data berhasil di hapus');
                    onRefresh();
                }else {
                    alert('data gagal di hapus');
                }
            })
    }
    const ItemView = ({item}) => {
        return(
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailDifferent', {data: item, status})}
                onLongPress={()=> option(item)}
                style={{flex: 0,flexDirection:'row',backgroundColor:'white',width:'100%',borderRadius: 15,padding: 10,marginBottom: 15}}
            >
                <Image
                    style={{width: 80, height: 80,resizeMode:'contain'}}
                    source={{
                        uri: item.attachment1,
                    }}
                />
                <Text style={{alignSelf:'center',marginLeft: 20,fontSize: 20}}>{item.judul}</Text>
            </TouchableOpacity>
        )
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataSource([])
        asyncFetch()
        setRefreshing(false);
    }, []);
    const getItem = (item) => {

    }
    return (
        <View style={{ flex: 1,marginTop:(Platform.OS == 'ios') ? 0 : 20 }}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Perbedaan</Title>
                    <Subtitle style={{color:'white'}}>Gambar</Subtitle>
                </Body>
                <Right />
            </Header>
            <View style={{margin: 20,backgroundColor:'white',flexDirection:'row',padding: 10,borderRadius: 5,elevation: 1}}>
                <Icon active name='warning' type={'Ionicons'} />
                <Text style={{alignItems:'center',marginLeft: 10,marginTop: 5}}>Gambar-Gambar dan Ilustrasi dengan Aslinya</Text>
            </View>
            <View>
                <ScrollView  style={{padding: 15}} horizontal={true}>
                    <TouchableOpacity
                        onPress={()=> getFunction('Anda')}
                        style={{backgroundColor:'#e0e0e0',padding: 10,borderRadius: 20,paddingHorizontal: 20,height: 40}}
                    >
                        <Text style={{color: (status == 'Anda')? 'green' : 'grey'}}>Anda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> getFunction('Yayasan')}
                        style={{backgroundColor:  '#e0e0e0' ,padding: 10,borderRadius: 20,paddingHorizontal: 20,marginHorizontal: 20,height: 40}}
                    >
                        <Text style={{color: (status == 'Yayasan')? 'green' : 'grey'}}>Yayasan</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{padding: 10}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={dataSource}
                    // style={{alignSelf:'center'}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    ListFooterComponent={renderFooter}
                />
            </View>
            {
                status != 'Anda'
                ? null
                    :
                    <Fab
                        containerStyle={{ }}
                        style={{ backgroundColor: 'green' }}
                        position="bottomRight"
                        onPress={() => navigation.navigate('AddDifferent')}

                    >
                        <Icon name="plus" type={'AntDesign'} />
                    </Fab>
            }
        </View>
    );
}
