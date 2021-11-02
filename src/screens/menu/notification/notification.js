import * as React from 'react';
import { View, Text, Platform, StatusBar, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Body, Header, Icon, Left, Right, Subtitle, Title } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import actionget from '../../../components/get';
import moment from 'moment';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

export default function NotificationScreen({ navigation }) {
    const [notifications, setNotifications] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [isListEnd, setIsListEnd] = React.useState(false);
    const [isRefresh, setIsRefresh] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const fetch = async () => {
        const users = await AsyncStorage.getItem("users")
        if (users) {
            setUser(users)
            getNotifications(users)
        }
    }

    const getNotifications = async (users = null) => {
        if (!loading && !isListEnd) {
            setLoading(true);
            const url = API_KEY.NOTIFICATION + (users || user) + '?page=' + page;
            actionget(url)
                .then(res => {
                    console.log(res.data.data);
                    setNotifications(notifications.concat(res.data.data.data));
                    if (res.data.data.next_page_url) {
                        setLoading(false);  
                        setPage(page + 1);
                    } else {
                        setIsListEnd(true);
                        setLoading(false);
                    }
                });
        }
    }

    const renderFooter = () => {
        return (
            <View>
                {loading ? (
                    <ActivityIndicator
                        color="green"
                        style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    };

    const handleRefresh = React.useCallback(() => {
        setIsRefresh(true);
        setNotifications([])
        setPage(1)
        setIsListEnd(false)
        fetch();
        setIsRefresh(false);
    }, []);

    const renderNotif = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10, flexDirection: 'row' }}
            >
                <View
                    style={{ backgroundColor: '#FEE2E4', padding: 10, marginRight: 20, borderRadius: 10 }}
                >
                    <Icon ios='notifications' android="notifications" type={'Ionicons'} style={{ fontSize: 20, color: '#F64E60' }} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.judul}</Text>
                    <Text style={{ color: 'grey' }}>{moment(item.created_at).fromNow()}</Text>
                </View>
            </TouchableOpacity>
        );
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
            <View>
                <FlatList
                    style={{width: '100%', marginBottom: 60}}
                    data={notifications}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={handleRefresh}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderNotif}
                    ListFooterComponent={renderFooter}
                    onEndReached={fetch}
                    onEndReachedThreshold={0.1}
                />
                {/* <TouchableOpacity
                    style={{ backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10, flexDirection: 'row' }}
                >
                    <View
                        style={{ backgroundColor: '#FEE2E4', padding: 10, marginRight: 20, borderRadius: 10 }}
                    >
                        <Icon ios='notifications' android="notifications" type={'Ionicons'} style={{ fontSize: 20, color: '#F64E60' }} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Judul</Text>
                        <Text style={{ color: 'grey' }}>3 monts ago</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}
