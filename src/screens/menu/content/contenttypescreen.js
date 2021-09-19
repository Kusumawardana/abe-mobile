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
import {Body, Button, Header, Icon, Left, Right, Title,Text,Card,CardItem,Item,Input,Subtitle} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../../components/get";
import styles from "../../../styles/liststyle";
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth
} from "react-native-responsive-dimensions";
import {SafeAreaView} from 'react-native-safe-area-context';


export default function ContentTypeScreen({ navigation,route }) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [arrayholder,setArrayholder] = useState([])
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5);
  const [user, setUser] = useState('');
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState('');


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
  const searchData = (text) =>  {
    setSearch(text)
    setIsListEnd(true)
    setLoading(true)
    setFrom(0)
    const url = API_KEY.CATEGORYFLASHCARD  + user + '/' + text
    actionget(url)
    .then(value => {
        console.log(`kusuma`);
        setDataSource(value.data.data)
        setLoading(false)
        setIsListEnd(false)

    })
}
  const getData = (user) =>{
      setLoading(true);
      const url = API_KEY.CATEGORYFLASHCARD  + user + '/' + search
      actionget(url)
          .then(value => {
              console.log('nilai get:', value.data.data)
              if (value.data.data.length > 0){
                  setFrom(from + 5);
                  setDataSource(value.data.data);
                  setLoading(false)
              } else {
                  setIsListEnd(true)
                  setLoading(false)
              }
          })
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

    const getItem = (item) => {
      console.log('nilai: tipe',item);
      navigation.navigate('Content', {data: item});
    };

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setDataSource([])
      setFrom(0)
      setIsListEnd(false)
      asyncFetch();
      setRefreshing(false);
    }, []);

    const ItemView = ({item}) => {
      return (
          <TouchableOpacity style={{alignSelf:'center',margin: 10}} onPress={()=> getItem(item)}>
              <Card style={{width: responsiveScreenWidth(40),marginBottom: 20}}>
                  <CardItem cardBody>
                      <Image
                          source={{uri: item.attachment}}
                          style={{height: 100, width: null, flex: 1}}
                      />
                  </CardItem>
                  <CardItem>
                      <Body>
                        <Text>{item.nama}</Text>
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
            <Title style={{color:'white'}}>Flashcard</Title>
            <Subtitle style={{color:'white'}}>Kategori</Subtitle>
          </Body>
          <Right />
        </Header>
        <View style={{paddingHorizontal: 20}}>
          <View style={[styles.warnwall,{marginTop: 20}]}>
          <Icon active name='warning' type={'Ionicons'} style={styles.icon} />
            <Text style={styles.warntext}>Flashcard Pada Menu Ini Merupakan Flashcard resmi yang di sediakan oleh yayasan</Text>
          </View>
        </View>
        <FlatList
          style={{alignSelf:'center'}}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        }
          data={dataSource}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
        />
      </View>
    );
  }
