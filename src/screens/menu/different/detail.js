import * as React from 'react';
import { View, Text, Platform, StatusBar, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Body, Header, Icon, Left, Right, Title, Subtitle } from 'native-base';
import Tts from 'react-native-tts';
import { ScrollView } from 'react-native-gesture-handler';
const color = require('../../../routes/color');
const API_KEY = require('../../../routes/api');

export default function DifferentDetailScreen({ navigation, route }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisible2, setModalVisible2] = React.useState(false);

    React.useEffect(() => {
        Tts.setDefaultLanguage('id-ID');
        console.log(route.params)
    }, []);
    const speak = (item) => {
        Tts.speak(item);
    }
    return (
        <View style={{ flex: 1, marginTop: (Platform.OS == 'ios') ? 0 : 20 }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.3)', flex: 1 }}>
                    <View style={{ backgroundColor: 'transparent', margin: 20, flex: 1, marginTop: 100 }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                            style={{ width: '100%', height: 300, resizeMode: 'cover' }}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: color.Gradientfirst, marginTop: 10, alignItems: 'center', borderRadius: 5, padding: 10, }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: 'white' }}>Tutup </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible2(!modalVisible2);
                }}
            >
                <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.3)', flex: 1 }}>
                    <View style={{ backgroundColor: 'transparent', margin: 20, flex: 1, marginTop: 100 }}>
                        <Text>asdasdasdasdadasdad</Text>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                            style={{ width: '100%', height: 300, resizeMode: 'cover', backgroundColor: '#000' }}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: color.Gradientfirst, marginTop: 10, alignItems: 'center', borderRadius: 5, padding: 10, }}
                            onPress={() => setModalVisible2(false)}
                        >
                            <Text style={{ color: 'white' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Header style={{ backgroundColor: color.GradientSecond, borderWidth: 0, borderColor: color.GradientSecond }} noShadow>
                <StatusBar backgroundColor={color.GradientSecond} barStyle={'light-content'} />
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon ios={'arrow-back-ios'} android={'arrow-back'} type={'MaterialIcons'} style={{ color: 'white' }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: 'white' }}>Perbedaan</Title>
                    <Subtitle style={{ color: 'white' }}>Detail Gambar</Subtitle>
                </Body>
                <Right />
            </Header>
            <ScrollView>
                <View style={{ backgroundColor: color.GradientSecond, padding: 10 }}>
                    <View style={{ padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 50, backgroundColor: '#000' }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                            >
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                                    style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 5 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => setModalVisible2(true)}
                                onPress={() => setModalVisible2(true)}
                            >
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                                    style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 5 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => speak(route.params.data.judul)}
                            style={{ backgroundColor: '#e0e0e0', width: 80, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}
                        >
                            <Icon name='volume-down' type="FontAwesome" style={{ color: 'green', fontSize: 40 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>{route.params.data.judul}</Text>
                </View>
                <View style={{ marginTop: 10, padding: 20 }}>
                    <Text>{route.params.data.deskripsi}</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                        style={{ maxWidth: 700, width: (Dimensions.get('screen').width / 2), maxHeight: 700, height: (Dimensions.get('screen').width / 2), alignSelf: 'center', borderRadius: 5, marginBottom: 20 }}
                    />
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80' }}
                        style={{ maxWidth: 700, width: (Dimensions.get('screen').width / 2), maxHeight: 700, height: (Dimensions.get('screen').width / 2), alignSelf: 'center', borderRadius: 5, marginBottom: 20 }}
                    />
                    <View style={{ maxWidth: 700, width: (Dimensions.get('screen').width / 2), alignSelf: 'center', flexDirection: 'row', marginBottom: 20 }}>

                        <TouchableOpacity
                            onPress={() => speak(route.params.data.judul)}
                            style={{ backgroundColor: '#10B981', flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: 10, color: '#FFF' }}
                        >
                            <Text style={{ color: '#FFF' }}>Benar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => speak(route.params.data.judul)}
                            style={{ backgroundColor: '#EF4444', flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: '#FFF' }}
                        >
                            <Text style={{ color: '#FFF' }}>Salah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
