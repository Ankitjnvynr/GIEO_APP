import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import logo from '../../../assets/images/Logo.png';

import React, {useEffect, useRef, useState} from 'react';

const OtpScreen = ({navigation}) => {
  const [name, setname] = useState('');
  const [contact, setcontact] = useState('second');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <View style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Image
          style={{
            width: 148,
            height: 148,
            borderRadius: 100,
            resizeMode: 'contain',
          }}
          source={logo}
        />
      </View>

      <Text style={styles.loginText}>Login to your account</Text>
      <View>
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setname}
          placeholderTextColor={'#808080'}
          value={name}
          placeholder={'Your Name'}
        />
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setcontact}
          placeholderTextColor={'#808080'}
          value={contact}
          placeholder={'Contact no'}
        />
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setEmail}
          placeholderTextColor={'#808080'}
          value={email}
          placeholder={'Enter email'}
        />
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={setpassword}
          placeholderTextColor={'#808080'}
          value={password}
          placeholder={'Enter passwork'}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touchableStyle}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 28}}>
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 23,
    fontWeight: '400',
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
