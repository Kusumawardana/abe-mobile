import React, {useState, useEffect} from 'react';
import {View, StatusBar, TouchableOpacity, ScrollView, Image, FlatList, Platform, RefreshControl} from 'react-native';
import {Body, Header, Icon, Left, Right, Subtitle, Title, Button, Text, Card, CardItem} from "native-base";
import action from "../../../components/function";
import {responsiveScreenWidth} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import {SafeAreaView} from 'react-native-safe-area-context';
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');

export default function shareScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('Kirim');
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        asyncFetch()
    }, []);

    const asyncFetch = async () => {
        const users = await  AsyncStorage.getItem("users")
        if (users){
            setUser(users)
            getDataSend(users)
        }
    };
    const getDataSend = (user) =>{
        setLoading(true);
        setDataSource([]);
        const url = API_KEY.SHAREDSEND + user
        console.log(url)
        actionget(url)
            .then(value => {
                console.log('nilai get kirim:', value.data.data)
                setDataSource(value.data.data);
                setLoading(false)
            })
    }

    const getDataReceive = (user) =>{
        setLoading(true);
        const url = API_KEY.SHAREDRECEIVE + user
        console.log(url)
        actionget(url)
            .then(value => {
                console.log('nilai get diterima:', value.data.data)
                setDataSource(value.data.data);
                setLoading(false)
            })
    }
    const getFunction = (value) => {
        if (value == 'Kirim'){
            setStatus(value)
            getDataSend(user)
        }else {
            setStatus(value)
            getDataReceive(user)
        }
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataSource([])
        getFunction(status)
        setRefreshing(false);
    }, []);
    const getItem = (item) =>{
        console.log('nilai item:',item);
        navigation.navigate('ShareDetail', {data: item});
    }

    const ItemView = ({item}) => {
        return(
            <TouchableOpacity
                style={{alignSelf:'center',margin: 10}}
                onPress={()=> getItem(item)}
            >
                <Card style={{width: responsiveScreenWidth(40),marginBottom: 20}}>
                    <CardItem cardBody>
                        <Image
                            source={{uri: item.attachment_flashcard}}
                            style={{height: 100, width: null, flex: 1}}
                        />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{item.nama_flashcard}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 0,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar  backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Di Bagikan</Title>
                    <Subtitle style={{color:'white'}}>Content Yang Dibagikan</Subtitle>
                </Body>
                <Right />
            </Header>
            <ScrollView style={{padding: 15}} horizontal={true}>
                <TouchableOpacity
                    onPress={()=> getFunction('Terima')}
                    style={{backgroundColor:'#e0e0e0',padding: 10,borderRadius: 20,paddingHorizontal: 20,height: 40}}
                >
                    <Text style={{color: (status == 'Terima')? 'green' : 'grey'}}>Diterima</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> getFunction('Kirim')}
                    style={{backgroundColor:  '#e0e0e0' ,padding: 10,borderRadius: 20,paddingHorizontal: 20,marginHorizontal: 20,height: 40}}
                >
                    <Text style={{color: (status == 'Kirim')? 'green' : 'grey'}}>Kirimkan</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={{padding: 10,paddingLeft: 20}}>
                <Text style={{fontSize:25,fontWeight: 'bold'}}>{status}</Text>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={dataSource}
                    numColumns={2}
                    style={{alignSelf:'center'}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                />
            </View>
        </View>
    );
}
