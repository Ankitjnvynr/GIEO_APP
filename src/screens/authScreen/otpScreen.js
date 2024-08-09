import React, { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../../App';
import logo from '../../../assets/images/Logo.png';
import { getPhoneOtpVerify } from '../../redux/actions';
import {
  phoneOtp,
  requestedOtpData,
} from '../../redux/reducers/selectors/userSelector';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';
import { colors } from '../../helper/colors';

const OtpScreen = () => {
  const otpInput = useRef(null);
  const [otp, setOtp] = useState(null);
  const data = useSelector(phoneOtp);
  const { Translation, isLoading } = useTranslation()

  const dispatch = useDispatch();
  const previousRequestedOtpData = useSelector(requestedOtpData);
  // console.log('show previousRequestedOtpData', previousRequestedOtpData);

  let phoneOtpdata = useSelector(phoneOtp);
  // console.log('show screen otp data id', otpInput);
  let res = {
    otp: otp,
    id: phoneOtpdata?.user_id,
  };
  // console.log(' show otp data-=-=====?>', res);

  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    return clearTimeout(counter);
  }, [counter]);

  const handleOnSubmit = () => {
    if (res.otp === null) {
      alert('please enter otp');
    } else if (res.otp?.length < 6) {
      alert('please enter proper otp');
    } else {
      dispatch(getPhoneOtpVerify(res));
    }
  };


  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  

      <View style={{ flex: 1,backgroundColor:colors.white }} >
        {isLoading ?
          <Loader /> : null
        }
        <View style={{ alignItems: 'center', marginTop: 10 }}>
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
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#000',
              textAlign: 'center',
              marginTop: 15,
            }}>
            {Translation.otp}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <OTPTextView
            handleTextChange={value => setOtp(value)}
            inputCount={6}
            keyboardType="numeric"
          />
          <Text style={{ textAlign: 'right', marginRight: '4%', color: '#808080' }}>
            {Translation.otp_sent} {counter}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleOnSubmit()}
          style={{
            justifyContent: 'center',
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: '#F86F03',
            marginHorizontal: '20%',
            marginTop: '5%',
            height: 40,
          }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
            {Translation.verify}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigationRef.navigate('login')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            {Translation.go_back}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default OtpScreen;
const styles = StyleSheet.create({});
