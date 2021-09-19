import * as React from 'react';
import {View, Text, StatusBar, ScrollView, FlatList, RefreshControl, ActivityIndicator, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Body, Button, Header, Icon, Left, Right, Title, Subtitle, Item, Input, ListItem} from "native-base";
import styles from "../../../../styles/liststyle";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../../components/get";
import {SafeAreaView} from 'react-native-safe-area-context';
const color = require('../../../../routes/color');
const API_KEY = require('../../../../routes/api');

export default function PerkembanganAnakScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [arrayholder,setArrayholder] =useState([])
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(5);
    const [user, setUser] = useState('');
    const [isListEnd, setIsListEnd] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        console.log('list end', isListEnd);
        console.log('loading', loading);
        asyncFetch()
    }, []);

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
    }, []);

    const getData = (user) =>{
        if (!loading && !isListEnd){
            console.log('getData');
            console.log('dari:', from);
            console.log('sampai:', to);

            setLoading(true);
            const url = API_KEY.CHILDRENSALL + from + '/' + to + '/' + user + '/' + search
            actionget(url)
                .then(value => {
                    console.log('nilai get:', value.data.data)
                    if (value.data.data.length > 0){
                        setFrom(from + 5);
                        setDataSource(dataSource.concat(value.data.data));
                        setLoading(false)
                    } else {
                        setIsListEnd(true)
                        setLoading(false)
                    }
                })
        }
    }
    const searchData = (text) =>  {
        console.log('nilai pencarian:',text)
        setSearch(text)
        setIsListEnd(true)
        setLoading(true);
        setFrom(0)
        const url = API_KEY.CHILDRENSALL + from + '/' + to + '/' + user + '/' + text
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

    const getItem = (item) => {
        navigation.navigate('TerapisPerkembanganList', {data: item});
    };

    const ItemView = ({item}) => {
        return (
            <ListItem
                icon
                button
                onPress={()=> getItem(item)}
            >
                <Left>
                    <Button style={{ backgroundColor: "#8FDCF6" }}>
                        <Icon active name="person" type={'Ionicons'} style={{color:'#29C5FA'}} />
                    </Button>
                </Left>
                <Body>
                    <Text>{item.nama_anak}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-forward-ios" type={'MaterialIcons'} />
                </Right>
            </ListItem>
        );
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
                    <Title style={{color:'white'}}>Perkembangan</Title>
                    <Subtitle style={{color:'white'}}>Anak</Subtitle>
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
                    />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                ListFooterComponent={renderFooter}
                onEndReached={asyncFetch}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}
