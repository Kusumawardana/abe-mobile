import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/screens/splashscreen";
import HomeScreen from "./src/screens/homescreen";
import {AuthContext} from "./src/screens/utils";
import SignInScreen from "./src/screens/signinscreen";
import SettingScreen from "./src/screens/setting/settingscreen";
import ProfileScreen from "./src/screens/setting/profilescreen";
import AboutScreen from "./src/screens/setting/aboutscreen";
import FeedbackScreen from "./src/screens/setting/feedbackscreen";
import NewsScreen from "./src/screens/menu/news/newsscreen";
import NewsDetailScreen from "./src/screens/menu/news/detailScreen";
import AnnouncementScreen from "./src/screens/menu/announcement/announcementscreen";
import AnnouncementDetailScreen from "./src/screens/menu/announcement/detailScreen";
import ContentTypeScreen from './src/screens/menu/content/contenttypescreen';
import ContentScreen from "./src/screens/menu/content/contentscreen";
import ContentDetailScreen from './src/screens/menu/content/contentdetailscreen';
import OrtuPerkembanganScreen from './src/screens/menu/orangtua/perkembangan/perkembangan';
import PerkembanganListScreen from "./src/screens/menu/orangtua/perkembangan/perkembanganlist";
import PerkembanganDetailScreen from "./src/screens/menu/orangtua/perkembangan/detailperkembangan";
import myContentScreen from "./src/screens/menu/mycontent/mycontent";
import addMyContentScreen from "./src/screens/menu/mycontent/addmycontent";
import MyContentDetailScreen from "./src/screens/menu/mycontent/mycontentdetail";
import shareMyContentScreen from "./src/screens/menu/mycontent/sharemycontent";
import shareScreen from "./src/screens/menu/share/share";
import SameScreen from "./src/screens/menu/same/same";
import DifferentScreen from "./src/screens/menu/different/different";
import PerkembanganAnakScreen from "./src/screens/menu/terapis/perkembangan/perkemangananak";
import PerkembanganAnakListScreen from "./src/screens/menu/terapis/perkembangan/perkembangananaklist";
import AddPerkembanganAnakScreen from './src/screens/menu/terapis/perkembangan/addperkembangananak';
import DetailPerkembanganAnakScreen from './src/screens/menu/terapis/perkembangan/detailperkembangananak';
import addDifferentScreen from './src/screens/menu/different/adddifferent';
import DifferentDetailScreen from './src/screens/menu/different/detail';
import ShareDetailScreen from './src/screens/menu/share/detail';
import NotificationScreen from './src/screens/menu/notification/notification';

const StackAuth = createStackNavigator();

function AuthStack() {
  return (
      <StackAuth.Navigator>
        <StackAuth.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}  />
      </StackAuth.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            if (action.token){
              AsyncStorage.setItem('userToken',action.token)
            }
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            };
          case 'SIGN_OUT':
            AsyncStorage.removeItem('userToken')
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
        }
      },
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
      () => ({
        signIn: async data => {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
          dispatch({ type: 'SIGN_IN', token: 'login' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token

          dispatch({ type: 'SIGN_IN', token: 'login' });
        },
      }),
      []
  );

  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer >
          <Stack.Navigator screenOption={{headerShown: false}} headerMode="none">
            {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}  />
            ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                    name="SignIn"
                    component={AuthStack}
                    options={{

                      // When logging out, a pop animation feels intuitive
                      animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                      headerShown: false
                    }}
                />
            ) : (
                <Stack.Screen name="Home" component={Menu} options={{headerShown: false}} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
}
function Menu() {
  return(
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Menu" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="Setting" component={Setting} options={{headerShown: false}} />
        <Stack.Screen name="News" component={NewsScreen} options={{headerShown: false}} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="Announcement" component={AnnouncementScreen} options={{headerShown: false}} />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="ContentType" component={ContentTypeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Content" component={ContentScreen} options={{headerShown: false}} />
        <Stack.Screen name="ContentDetail" component={ContentDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="OrtuPerkembangan" component={OrtuPerkembanganScreen} options={{headerShown: false}} />
        <Stack.Screen name="PerkembanganList" component={PerkembanganListScreen} options={{headerShown: false}} />
        <Stack.Screen name="PerkembanganDetail" component={PerkembanganDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="MyContent" component={myContentScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddMyContent" component={addMyContentScreen} options={{headerShown: false}} />
        <Stack.Screen name="MyContentDetail" component={MyContentDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="ShareMyContent" component={shareMyContentScreen} options={{headerShown: false}} />
        <Stack.Screen name="Share" component={shareScreen} options={{headerShown: false}} />
          <Stack.Screen name="ShareDetail" component={ShareDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="Different" component={DifferentScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddDifferent" component={addDifferentScreen} options={{headerShown: false}} />
        <Stack.Screen name="DetailDifferent" component={DifferentDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="Same" component={SameScreen} options={{headerShown: false}} />
        <Stack.Screen name="TerapisPerkembangan" component={PerkembanganAnakScreen} options={{headerShown: false}} />
        <Stack.Screen name="TerapisPerkembanganList" component={PerkembanganAnakListScreen} options={{headerShown: false}} />
        <Stack.Screen name="TerapisAddPerkembangan" component={AddPerkembanganAnakScreen} options={{headerShown: false}} />
        <Stack.Screen name="TerapisDetailPerkembangan" component={DetailPerkembanganAnakScreen} options={{headerShown: false}} />
        <Stack.Screen name="NotificationList" component={NotificationScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  );
}
function Setting() {
  return(
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Setting" component={SettingScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown: false}} />
      </Stack.Navigator>
  )
}
