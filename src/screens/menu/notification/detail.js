import * as React from 'react';
import { View, Text, Platform, StatusBar, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Body, Header, Icon, Left, Right, Subtitle, Title } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actionget from '../../../components/get';
import moment from 'moment';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

export default function NotificationDetailScreen({ navigation, route }) {
    const [notification, setNotification] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const fetch = async () => {
        // console.log("Fetch");
        const users = await AsyncStorage.getItem("users")
        if (users) {
            setUser(users)
            await getDetail(users);
        }
    }

    const getDetail = async (users = null) => {
        setLoading(true);
        const url = API_KEY.NOTIFICATION + route.params.id + '/' + (users || user);
        console.log(url);
        actionget(url)
            .then(res => {
                setLoading(false);
                setNotification(res.data.data);
            })
            .catch(err => { setLoading(false); console.log(err.response) });
    }

    React.useEffect(() => {
        fetch();
    }, []);

    return (
        <View style={{ flex: 1, marginTop: (Platform.OS == 'ios') ? 0 : 20 }}>
            <Header style={{ backgroundColor: color.GradientSecond }}>
                <StatusBar backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: 'white' }}>Notifikasi</Title>
                </Body>
                <Right />
            </Header>
            <View style={{ padding: 20 }}>
                {
                    loading ?
                        (
                            <ActivityIndicator
                                color="green"
                                style={{ margin: 15 }} />
                        ) : (
                            <>
                                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{notification?.judul}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 20 }}>{moment(notification.created_at).fromNow()}</Text>
                                <Text style={{ fontSize: 16 }}>{notification?.deskripsi}</Text>
                            </>
                        )
                }

            </View>
        </View>
    );
}
