import * as React from 'react';
import {Image, StatusBar, Text, View, Platform, TouchableOpacity, Alert} from "react-native";
import {AuthContext} from "../utils";
import { Container, Header, Left, Body, Right, Title,Button,Icon,List,ListItem } from 'native-base';
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import actionget from "../../components/get";
import {SafeAreaView} from 'react-native-safe-area-context';
const color = require('../../routes/color')
const API_KEY = require('../../routes/api');

export default function SettingScreen({ navigation }) {
    const { signOut } = React.useContext(AuthContext);

    const Process = () =>{
        actionget(API_KEY.LOGOUT + user)
            .then(value => {
                if (value.data.status == 'Success'){
                    AsyncStorage.clear()
                    signOut()
                }else {
                    Alert.alert(
                        "Peringatan",
                        "Sepertinya Sedang Terjadi Kesalahan Mohon Tunggu Sebentar",
                        [
                            {
                                text: "Batal",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log('')  }
                        ],
                        { cancelable: false }
                    )
                }
            })
    }

    const [user, setUser] = React.useState('')
    React.useEffect(() => {
        const asyncFetch = async () => {
            const users = await AsyncStorage.getItem("users");
            if (users) {
                setUser(users);
            }
        };
        asyncFetch();
    }, []);
    return (
        <View style={{marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Header style={{backgroundColor:color.GradientSecond}}>
                <StatusBar backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Pengaturan</Title>
                </Body>
                <Right />
            </Header>
            <List>
                <ListItem
                    icon
                    button
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Left>
                        <Button style={{ backgroundColor: "#E1F0FE" }}>
                            <Icon active name="person" type={'Ionicons'} style={{color:'#369AFE'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Profile</Text>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
                <ListItem
                    icon
                    button
                    onPress={() => navigation.navigate('About')}
                >
                    <Left>
                        <Button style={{ backgroundColor: "#C9F7F4" }}>
                            <Icon active name="info" type={'Entypo'} style={{color:'#19C5BD'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Tentang Aplikasi</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward-ios" type={'MaterialIcons'} />
                    </Right>
                </ListItem>
                <ListItem
                    icon
                    button
                    onPress={() => navigation.navigate('Feedback')}
                >
                    <Left>
                        <Button style={{ backgroundColor: "#FEF4DD" }}>
                            <Icon active name="feed" type={'FontAwesome'} style={{color:'#FFA800'}} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Feedback</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward-ios" type={'MaterialIcons'} />
                    </Right>
                </ListItem>
                <ListItem
                    button
                    icon
                    onPress={()=>
                        Alert.alert(
                            "Peringatan",
                            "Apakah Anda Yakin Ingin Logout ?",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: (Process)  }
                            ],
                            { cancelable: false }
                        )

                    }
                >
                    <Left>
                        <Button style={{ backgroundColor: "#FEE2E4" }}>
                            <Icon active name="logout" style={{color:'#F64E60'}} type={'MaterialIcons'} />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Logout</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward-ios" type={'MaterialIcons'} />
                    </Right>
                </ListItem>
            </List>
        </View>
    );
}
