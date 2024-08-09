import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import React, { useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../assets/images/Logo.png';
import facebook from '../../../assets/images/facebook.png';
import Google from '../../../assets/images/google.png';
import Loader from '../../Components/Loader';
import {
  getPhoneOtp,
  handleSocialLoginAction,
  requestPhoneData
} from '../../redux/actions';
import { loder } from '../../redux/reducers/selectors/userSelector';
import { useTranslation } from '../../utills.js/translation-hook';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { colors } from '../../helper/colors';

const LoginPage = ({ navigation }) => {
  const { Translation, isLoading } = useTranslation()
  const selectedLang = useSelector(state => state.AppReducers.selectedLangCode);

  const [text, onChangeText] = React.useState('');
  const dispatch = useDispatch();
  const loding = useSelector(loder);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '219115132027-803rl40f31j6d6j0vbpd0tm35j6hlspi.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, [])


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const data = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        phone: "",
        profile: userInfo.user.photo,
        loginType: "google"
      }
      dispatch(handleSocialLoginAction(data))

    } catch (error) {
      alert(':::: ' + JSON.stringify(error))
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // call once facebook developer account activated and live 
  const onSigniInFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    // console.log('facebook::::', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    // console.log('facebook:::::', data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(facebookCredential);
  }



  const handleRequestOtp = () => {
    let data = `+91${text}`;
    if (data.length <= 3) {
      alert('Please enter phone number');
    } else if (data.length < 13) {
      alert('Please enter proper number');
    } else {
      dispatch(getPhoneOtp(data));
      dispatch(requestPhoneData(data));
    }
  };

  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      {isLoading ?
        <Loader /> : null
      }
      <View style={{ paddingHorizontal: 23,backgroundColor:colors.white,flex:1 }}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image
            style={{
              width: 176,
              height: 176,
              borderRadius: 100,
              resizeMode: 'contain',
            }}
            source={logo}
          />
        </View>

        <Text style={styles.loginText}>{Translation.login_to_your_account}</Text>
        {loding ? <ActivityIndicator size={'large'} color={'red'} /> : null}

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={onChangeText}
            placeholderTextColor={'#808080'}
            value={text}
            inputMode="numeric"
            maxLength={10}
            placeholder={Translation.enter_phone_number}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleRequestOtp()}
          style={styles.touchableStyle}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 28 }}>
            {Translation.login_submit}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 30,
            fontWeight: '400',
            color: '#6D6D6D',
          }}>
          {Translation.side}
        </Text>
        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#808080' }}>
          {Translation.login_with}
        </Text>


        <TouchableOpacity
          onPress={() => signIn()}
          style={[styles.touchableStyle, { flexDirection: 'row', alignSelf: 'center', backgroundColor: '#faf6f0' }]}
        >
          <Image source={Google} style={{ height: 30, width: 30 }} />
          <Text style={{ alignSelf: 'center', fontSize: 16, marginLeft: 5, color: '#808080' }}>
            {Translation.sign_in_with_google}
          </Text>
        </TouchableOpacity>

        {/* <Text style={{ alignSelf: 'center', marginTop: 10, color: '#808080' }}>
          {Translation.do_not_have_an_account}{' '}
          <Text style={{ color: '#F7941C', textDecorationLine: 'underline' }}>
            {Translation.register_here}
          </Text>
        </Text> */}
      </View>

    </SafeAreaView>

  );
};

export default LoginPage;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#944A45',
  },
  TextInputStyle: {
    height: 55,
    width: '100%',
    // margin: 12,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    color: 'black',
  },

  touchableStyle: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#F7941C',
    shadowColor: "#F7941C",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
