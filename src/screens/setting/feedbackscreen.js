import * as React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Dimensions,
    Platform,
    Alert
} from "react-native";
import {responsiveFontSize,responsiveHeight,responsiveScreenWidth} from "react-native-responsive-dimensions";
import {Icon, Item, Input, Header, Left, Body, Title, Right,Button,Form,Label} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import action from "../../components/function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView} from 'react-native-safe-area-context';

const color = require('../../routes/color')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const API_KEY = require('../../routes/api');

export default function FeedbackScreen({ navigation }) {
    const [judul, setJudul] = React.useState('')
    const [deskripsi, setDeskripsi] = React.useState('')
    const [isLoading, setisLoading] = React.useState(true)

    const process = () =>{
        const data = new FormData();
        data.append('judul', judul);
        data.append('deskripsi', deskripsi);
        data.append('id_user', user);

        action(API_KEY.FEEDBACK,data,'POST')
            .then(value => {
                console.log('nilai:',value.data)
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
    const [user, setUser] = React.useState('')
    React.useEffect(() => {
        const asyncFetch = async () => {
            const users = await AsyncStorage.getItem("users");
            setUser(users);
        };
        asyncFetch();
    }, []);


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
                    <Title style={{color:'white'}}>Feedback</Title>
                </Body>
                <Right />
            </Header>
            <View style={{backgroundColor: color.ViewPrimary,borderTopRightRadius: 30,borderTopLeftRadius: 30,paddingTop: 20,flex: 1}}>
                <View style={{backgroundColor:'white',padding: 10,borderRadius: 15, width: responsiveScreenWidth(70),marginBottom: 20,flexDirection:'row',justifyContent:'space-between',alignSelf:'center'}}>
                    <View>
                        <Icon name='info' type={'Entypo'} style={{fontSize: 20,color:color.GradientSecond}} />
                    </View>
                    <View >
                        <Text style={{color:color.GradientSecond}}>Silahkan Ajukan Keluhan Mengenai Aplikasi</Text>
                    </View>
                </View>
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


