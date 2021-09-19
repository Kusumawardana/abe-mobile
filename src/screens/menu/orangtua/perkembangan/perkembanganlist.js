import React, {useState, useEffect} from 'react';
import {
    View,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    RefreshControl,
    Platform,
} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title,Text,List,ListItem,Item,Input,Subtitle} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../../components/get";
import styles from "../../../../styles/liststyle";
import {SafeAreaView} from 'react-native-safe-area-context';
const color = require('../../../../routes/color')
const API_KEY = require('../../../../routes/api');

export default function PerkembanganListScreen({route, navigation }) {
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
        console.log('nilai pindahan:',route.params.data)
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
        if (!loading && !isListEnd){
            console.log('getData');
            console.log('dari:', from);
            console.log('sampai:', to);
            setLoading(true);
            const url = API_KEY.DEVELOPMENT + from + '/' + to + '/' + user + '/'+ route.params.data.id_anak +'/' + search
            console.log(url)
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
        setSearch(text)
        setIsListEnd(true)
        setLoading(true);
        setFrom(0)
        const url = API_KEY.DEVELOPMENT + from + '/' + to + '/' + user + '/'+ route.params.data.id_anak +'/' + text
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
    const getItem = (item) => {
        navigation.navigate('PerkembanganDetail', {data: item});
    };
      const ItemView = ({item}) => {
        return (
            <List>
                <ListItem
                    thumbnail
                    button
                    onPress={()=> getItem(item)}
                >
                <Body>
                    <Text>{item.judul}</Text>
                    <Text note numberOfLines={1}>{item.terapis.nama_terapis}</Text>
                </Body>
            </ListItem>
        </List>
        );
      };
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataSource([])
        setFrom(0)
          setSearch('')
        setIsListEnd(false)
        asyncFetch();
        setRefreshing(false);
      }, []);
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
                <Subtitle style={{color:'white'}}>Daftar Perkembangan</Subtitle>
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
