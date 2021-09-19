import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, ScrollView, FlatList, TouchableOpacity, Image,ActivityIndicator,RefreshControl,Platform,StyleSheet} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title,Item,Input,Container,Card,CardItem,Thumbnail} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
const color = require('../../../routes/color')
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import styles from "../../../styles/liststyle";
const API_KEY = require('../../../routes/api');

export default function AnnouncementScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [arrayholder,setArrayholder] =useState([])
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(10);
    const [user, setUser] = useState('');
    const [isListEnd, setIsListEnd] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        console.log('list end', isListEnd);
        console.log('loading', loading);
        asyncFetch()
    }, []);

    const searchData = (text) =>  {
        setSearch(text)
        setIsListEnd(true)
        setLoading(true);
        setFrom(0)
        const url = API_KEY.ANNOUNCEMENT + from + '/' + to + '/' + user + '/' + text
        actionget(url)
        .then(value => {
            setIsListEnd(true)
            if(text.length == 0){
                setFrom(5)
                setIsListEnd(false)
            }
            console.log(value.data.data)
            setDataSource(value.data.data)
            setLoading(false)


        })
    }
    const asyncFetch = async () => {
        const users = await  AsyncStorage.getItem("users")
        if (users){
            setUser(users)
            getData(users)
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataSource([])
        setFrom(0)
        setIsListEnd(false)
        asyncFetch();
        setRefreshing(false);
        setSearch('');
    }, []);

    const getData = (user) =>{
        if (!loading && !isListEnd){
            console.log('getData');
            console.log('dari:', from);
            console.log('sampai:', to);

            setLoading(true);
            const url = API_KEY.ANNOUNCEMENT + from + '/' + to + '/' + user + '/' + search
            actionget(url)
                .then(value => {
                    console.log('nilai get:', value.data.data)
                    if (value.data.data.length > 0){
                        setFrom(from + 10);
                        setDataSource(dataSource.concat(value.data.data));
                        setLoading(false)
                    } else {
                        setIsListEnd(true)
                        setLoading(false)
                    }
                })
        }
    }

    const getItem = (item) => {
        console.log(item);
        navigation.navigate('AnnouncementDetail', {data: item});
    };

    const renderFooter = () => {
        return (
            // Footer View with Loader
            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator
                        color="black"
                        style={{margin: 15}} />
                ) : null}
            </View>
        );
    };

    const ItemView = ({item}) => {
        return (
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=> getItem(item)}>
                <Card style={{width: responsiveScreenWidth(90),marginBottom: 20}}>
                    <CardItem cardBody>
                        <Image
                            source={{uri: item.attachment}}
                            style={{height: 200, width: null, flex: 1}}
                        />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button transparent>
                                <Text>{item.judul}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    };

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
                    <Title style={{color:'white'}}>pengumuman</Title>
                </Body>
                <Right />
            </Header>
            <View style={{padding: 20}}>
                <Item style={styles.item}>
                    <Icon active name='search' type={'Fontawesome'} style={styles.icon} />
                    <Input
                        placeholder='Cari'
                        onChangeText={(text) => searchData(text)}
                        value={search}
                    />
                </Item>
            </View>
            <FlatList
                data={dataSource}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                ListFooterComponent={renderFooter}
                onEndReached={asyncFetch}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}


