import * as React from 'react';
import {View, Text, StatusBar, StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button,Body, Header, Icon, Left, Right, Subtitle, Title,Item,Input} from 'native-base';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import action from '../../../../components/function';
import {SafeAreaView} from 'react-native-safe-area-context';
import actionget from '../../../../components/get';
const color = require('../../../../routes/color')
const API_KEY = require('../../../../routes/api');

export default function AddPerkembanganAnakScreen({ navigation,route }) {
    const [judul, setJudul] = React.useState('')
    const [deskripsi, setDeskripsi] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [isLoading, setisLoading] = React.useState(true)
    const [user, setUser] = React.useState('')
    React.useEffect(() => {
        const asyncFetch = async () => {
            const users = await AsyncStorage.getItem("users");
            if (users){
                first(users)
            }
        };
        const first = (id) =>{
            if (id){
                actionget(API_KEY.PROFILE + id)
                    .then(value => {
                        console.log('nilai profile:',value.data.data.id_type);
                        setUser(value.data.data.id_type)
                        setisLoading(false);
                    })
            }
        }
        asyncFetch();
    }, []);

    const process = () =>{
        const data = new FormData();
        data.append('judul', judul);
        data.append('deskripsi', deskripsi);
        data.append('id_terapis', user);
        data.append('id_anak', route.params.data);

        action(API_KEY.DEVELOPMENTCREATE,data,'POST')
            .then(value => {
                console.log('nilai:',value)
                if (value.data.status == 'Success'){
                    Alert.alert(
                        value.data.status,
                        value.data.message,
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
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

    return (
        <View style={{flex: 1,backgroundColor:color.Primary,marginTop:(Platform.OS == 'ios') ? 0 : 20}}>
            <Header style={{backgroundColor:color.Gradientfirst}} transparent>
                <StatusBar backgroundColor={color.Gradientfirst} barStyle={'light-content'} />
                <Left>
                    <Button transparent  onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>Perkembangan</Title>
                    <Subtitle style={{color:'white'}}>Tambah</Subtitle>
                </Body>
                <Right />
            </Header>
            <View style={{backgroundColor: color.ViewPrimary,borderTopRightRadius: 30,borderTopLeftRadius: 30,paddingTop: 20,flex: 1}}>
                <View style={{padding: 10}}>
                    <Item style={{borderColor: 'white',backgroundColor:color.TextInputPrimary,width: responsiveScreenWidth(70),paddingHorizontal: 20,borderRadius: 10,alignSelf:'center'}}>
                        <Input
                            placeholder={'Judul'}
                            onChangeText={text => setJudul(text)}
                            value={judul}
                        />
                    </Item>
                    <View style={{marginTop: 10}}/>
                    <Item style={{borderColor: 'white',backgroundColor:color.TextInputPrimary,width: responsiveScreenWidth(70),paddingHorizontal: 20,borderRadius: 10,alignSelf:'center'}}>
                        <Input
                            style={{height: 200}}
                            onChangeText={text => setDeskripsi(text)}
                            value={deskripsi}
                            multiline = {true}
                            numberOfLines = {4}
                            placeholder={'Deskripsi'}
                        />
                    </Item>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={process}
                    >
                        <Text style={{color:'white',fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor: color.ButtonPrimary,
        padding: 10,
        width: responsiveScreenWidth(70),
        borderRadius: 5,
        alignItems:'center',
        marginTop: 10,
        alignSelf:'center'
    },
});
