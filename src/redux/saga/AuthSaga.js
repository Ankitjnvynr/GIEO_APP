import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, put, takeLatest } from 'redux-saga/effects';
import { navigationRef } from '../../../App';
import { useNotificaiton } from '../../Notifications/AuthNotifications';
import * as actions from '../actionTypes';
import { GetRecord, SocialLogin, fetchRecord } from '../axios';
import Constants from '../../utills.js/Constants';
import { setIsLoading } from '../actions';

const GetEmailOtpRequest = function* (data) {
  yield put(setIsLoading(true))
  try {
    let postData = {
      email: data.payload,
    };
    const requesUrl =
      `${Constants.BASE_URL}auth/signup-email-send-otp`;
    const response = yield call(GetRecord, requesUrl, postData);

    if (response != null && response.status == 200) {
      yield put({
        type: actions.STORE_EMAIL_RESPONSE,
        payload: response?.data?.data,
      });
      navigationRef.navigate('emailOtp');
    }
    yield put(setIsLoading(false))
  } catch (error) {
    alert('Network Error');
    yield put(setIsLoading(false))
  }
};

const GetEmailOtpVerify = function* (data) {
  yield put(setIsLoading(true))
  try {
    const postData = { id: data.payload.id, otp: data.payload.otp };
    const requestUrl =
      `${Constants.BASE_URL}auth/signup-verify-otp`;
    const res = yield call(GetRecord, requestUrl, postData);
    if (res != null && res.status == 200) {
      let token = res?.data?.data;
      yield AsyncStorage.setItem('token', JSON.stringify(token?.access_token));
      yield put({ type: actions.EMAIL_LOGIN_SUCCESS, payload: true });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
  }
};

const fetchCountryCode = function* () {
  yield put(setIsLoading(true))
  try {
    const requestUrl =
      `${Constants.BASE_URL}get-all-countries-list`;
    const res = yield call(fetchRecord, requestUrl);
    if (res.data != null && res.data.status == 200) {
      yield put({ type: actions.GET_COUNTRY_CODE_SUCCESS, payload: res?.data });
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
  }
};

const GetPhoneOtp = function* (data) {
  const { displayNotification } = useNotificaiton();
  yield put(setIsLoading(true))
  try {
    let postData = { phone: data.payload };

    let requestUrl =
      `${Constants.BASE_URL}auth/signup-phone-send-otp`;
    let res = yield call(GetRecord, requestUrl, postData);
    if (res?.data != null) {
      let otpdata = res.data.data.otp;
      yield put({
        type: actions.GET_PHONE_OTP_SUCCESS,
        payload: res?.data?.data,
      });
      displayNotification('OTP', otpdata + '');
      yield put({ type: actions.SHOW_LOADING, payload: false });
      navigationRef.navigate('otp');
    } else {
      yield put({ type: actions.SHOW_LOADING, payload: false });
      alert('Something went wrong Please try again');
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
  }
};

const getPhoneNumberVerify = function* (data) {
  yield put(setIsLoading(true))
  try {
    let requestUrl =
      `${Constants.BASE_URL}auth/signup-verify-otp`;
    let postData = {
      otp: data.payload.otp,
      id: data.payload.id,
    };
    const res = yield call(GetRecord, requestUrl, postData);
    if (res !== null && res.status == 200) {
      let tokenData = res?.data?.data?.access_token;
      yield AsyncStorage.setItem('token', JSON.stringify(tokenData));
      yield put({ type: actions.PHONE_OTP_VERIFY_SUCCESS, payload: true });
    } else if (res.status == 201 && res.data.status === 'error') {
      alert('Enter correct Otp');
    }
    yield put(setIsLoading(false))
  } catch (error) {
    yield put(setIsLoading(false))
  }
};


const handleSocialLogin = function* (data) {
  yield put(setIsLoading(true))
  try {
    let postData = data.payload

    let requestUrl =
      `${Constants.BASE_URL}auth/social-login`;

    let res = yield call(SocialLogin, requestUrl, postData);
    if (res?.data != null) {
      yield put({
        type: actions.GET_PHONE_OTP_SUCCESS,
        payload: res?.data?.data,
      });

      let tokenData = res?.data?.data?.access_token;
      yield AsyncStorage.setItem('token', JSON.stringify(tokenData));
      yield put({ type: actions.PHONE_OTP_VERIFY_SUCCESS, payload: true });

    } else {
      alert('Something went wrong Please try again');
    }
    yield put(setIsLoading(false))
  } catch (error) {
    console.log("ERROR: ", error);
    yield put(setIsLoading(false))
  }
};


const AuthSaga = [
  takeLatest(actions.GET_EMAIL_OTP, GetEmailOtpRequest),
  takeLatest(actions.GET_EMAIL_OTP_VERIFY, GetEmailOtpVerify),
  takeLatest(actions.GET_COUNTRY_CODE, fetchCountryCode),
  takeLatest(actions.GET_PHONE_OTP, GetPhoneOtp),
  takeLatest(actions.GET_PHONE_OTP_VERIFY, getPhoneNumberVerify),
  takeLatest(actions.SOCIAL_LOGIN, handleSocialLogin),

];

export default AuthSaga;
