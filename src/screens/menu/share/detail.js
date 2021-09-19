import * as React from 'react';
import {
    View,
    Text,
    Platform,
    Alert,
    ScrollView,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tts from 'react-native-tts';
import actionget from '../../../components/get';
import styles from '../../../styles/detailstyle';
import {Button,Body, Footer, FooterTab, Header, Icon, Left, Right, Title} from 'native-base';
import moment from 'moment';
const color = require('../../../routes/color')
const API_KEY = require('../../../routes/api');

export default function ShareDetailScreen({ navigation,route }) {
    const [penerima, setPenerima] = React.useState('');
    const [pengirim, setPengirim] = React.useState('');

    React.useEffect(() => {
        Tts.setDefaultLanguage('id-ID');
        console.log('nilai route:',route.params.data)
        setPenerima(route.params.data.nama_penerima)
        setPengirim(route.params.data.nama_pengirim)

    }, []);
    const speak = (item) =>{
        if(Platform.OS == 'ios'){
            Tts.speak(item);
        }else {
            Tts.speak(item);
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <ImageBackground
                    style={styles.background}
                    source={{uri: route.params.data.attachment_flashcard}}
                >
                    <Header transparent >
                        <StatusBar translucent  backgroundColor={'transparent'} barStyle={'light-content'} />
                        <Left>
                            <Button style={styles.invisiblebutton}  onPress={() => navigation.goBack()}>
                                <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{color:'white'}} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'white'}}>Flashcard</Title>
                        </Body>
                        <Right />
                    </Header>
                </ImageBackground>
                <View style={styles.bottomview}>
                    <Text style={styles.title}>{route.params.data.nama_flashcard}</Text>
                    <Text style={styles.subtitle}>{moment(route.params.data.created_at).format("MMMM Do YYYY")}{" "}</Text>
                    <View style={{marginTop: 20}} />
                    {
                        penerima != null
                            ? <Text style={styles.subtitle}>Penerima:{penerima}</Text>
                            : null
                    }
                    {
                        pengirim != null
                            ? <Text style={styles.subtitle}>Pengirim:{pengirim}</Text>
                            : null
                    }

                    <Text style={styles.subtitle}>
                    </Text>
                    <View style={{marginTop: 20}} />

                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity
                            onPress={()=> speak(route.params.data.judul)}
                            style={{backgroundColor:'#e0e0e0',alignItems:'center',justifyContent:'center',borderRadius: 10,width: 50,height: 50}}
                        >
                            <Icon name='volume-down' type="FontAwesome" style={{color:'green',fontSize: 30}} />
                        </TouchableOpacity>
                        <View style={{width: 20}} />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text>
                            {route.params.data.deskripsi_flashcard}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
