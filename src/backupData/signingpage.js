import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import lord from '../../../assets/images/lord.jpeg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import HeaderPage from '../../Components/header';
import logo from '../../../assets/images/Logo.png';
import Google from '../../../assets/images/google.png';
import facebook from '../../../assets/images/facebook.png';

const LoginPage = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  // const [password, setPassword] = useState('');
  // const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View style={{paddingHorizontal: 23}}>
      <View style={{alignItems: 'center', marginTop: 30}}>
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

      <Text style={styles.loginText}>Login to your account</Text>

      <View style={{alignItems: 'center'}}>
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={onChangeText}
          placeholderTextColor={'#808080'}
          value={text}
          inputMode="numeric"
          maxLength={10}
          placeholder={'Enter phone number'}
        />
        {/* <TextInput
            style={styles.TextInputStyle}
            onChangeText={setPassword}
            placeholderTextColor={'#808080'}
            value={password}
            placeholder={'Username/email'}
            secureTextEntry={isPasswordSecure}
          /> */}
        {/* <TouchableOpacity
            style={{alignSelf: 'flex-end', top: -60, right: 35}}
            onPress={() => {
              isPasswordSecure
                ? setIsPasswordSecure(false)
                : setIsPasswordSecure(true);
            }}>
            <MaterialCommunityIcons
              name={isPasswordSecure ? 'eye-off' : 'eye'}
              size={28}
              color={'#B8B3B3'}
            />
          </TouchableOpacity> */}
      </View>
      {/* <Text style={{alignSelf: 'flex-end', top: -15, fontSize: 16}}>
          Forgot Password?
        </Text> */}

      <TouchableOpacity
        onPress={() => navigation.navigate('otp')}
        style={styles.touchableStyle}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 28}}>
          Submit
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 30,
          fontWeight: '400',
        }}>
        OR
      </Text>
      <Text style={{alignSelf: 'center', fontSize: 16}}>Login with</Text>

      <TouchableOpacity
        style={{
          borderRadius: 2,
          alignItems: 'center',

          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'center',
        }}>
        <Image source={Google} style={{height: 50, width: 50}} />
        <Image
          source={facebook}
          style={{height: 50, width: 50, marginLeft: 10}}
        />
      </TouchableOpacity>
      <Text style={{alignSelf: 'center', marginTop: 10}}>
        Don't have an account{' '}
        <Text style={{color: '#F7941C', textDecorationLine: 'underline'}}>
          Register Here
        </Text>
      </Text>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#944A45',
  },
  TextInputStyle: {
    height: 69,
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
    height: 69,
    width: '100%',
    // margin: 12,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    backgroundColor: '#F7941C',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
