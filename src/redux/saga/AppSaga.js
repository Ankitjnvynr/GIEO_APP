import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import { navigationRef } from '../../../App';
import Constants from '../../utills.js/Constants';
import * as actions from '../actionTypes';
import { languageUpdateSuccess, languageUpdateSuccess1, setIsLoading, setLanguageListUpdate } from '../actions';
import {
  fetchRecord,
  fetchRecordWithoutToken,
  postApi,
  registerApi
} from '../axios';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configureStore from '../store';

const PledgeSagaFunction = function* (data) {
  try {
    let requestUrl =
      `${Constants.BASE_URL}change-traget-count`;
    let postData = {
      count: data,
    };
    yield put(setIsLoading(true))
    const res = yield call(postApi, requestUrl, postData);
    yield put(setIsLoading(false))
    if (res.data.data != null) {
      yield put({ type: actions.PLEDGE_DATA, payload: res.data.data });
    }
  } catch (error) {
  }
};

const UpdateChant = function* (data) {
  try {
    let requestUrl =
      `${Constants.BASE_URL}user/reads-update`;

    let postData = {
      count: data,
    };
    yield put(setIsLoading(true))
    const res = yield call(postApi, requestUrl, postData);
    yield put(setIsLoading(false))

  } catch (error) {
  }
};

const getHomePageData = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}pages/20`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecordWithoutToken, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({ type: actions.HOME_DATA, payload: res.data });
    }
  } catch (error) {
  }
};

const chantHistoryapi = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}user/reads-get/`;
    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      const sortedData = res.data?.data?.reverse()
      yield put({ type: actions.STORE_CHANT_HISTORY, payload: sortedData });
    }

  } catch (error) {
  }
};

const getPdfSaga = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}pages/1`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({ type: actions.PDF_DATA_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
  }
};

const getVideoData = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}pages/25`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    // console.log('Video::::::::::::::',res.data);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({ type: actions.VIDEO_DATA_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
  }
};

const getLanguageList = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}show-all-language`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({ type: actions.LANGUAGE_LIST_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
  }
};

const getTargetPledgeData = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}profile-details`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {

      yield put({
        type: actions.TARGET_CHANT_DATA_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const getCurrenCountData = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}show-current-chants-count`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({
        type: actions.CURRENT_COUNT_STATUS_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const getAllpdfDataSaga = function* () {
  try {
    let requestUrl =
      `${Constants.BASE_URL}pages/1`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecordWithoutToken, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({
        type: actions.SAVE_PDF_DATA,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const reisterDetailSaga = function* (data) {
  let _data = {
    name: data.payload.name,
    age: data.payload.age,
    gender: data.payload.selectedGender,
    state: data.payload.stateNameData,
    country: data.payload.countryNameData,
    email: data.payload.email
  };
  try {
    let requestUrl =
      `${Constants.BASE_URL}profile-update`;
    yield put(setIsLoading(true))
    const res = yield call(registerApi, requestUrl, _data);
    yield put(setIsLoading(false))

    if (res.data != null) {
      yield put({
        type: actions.SAVE_PDF_DATA,
        payload: res.data.data,
      });
      yield put({ type: actions.TARGET_CHANT_DATA })
      Alert.alert("profile updated successfully")
      navigationRef.navigate("chant")
    }
  } catch (error) {
    Alert.alert("This email is already taken")
  }
};

const getliveDatasaga = function* () {

  try {
    let requestUrl =
      `${Constants.BASE_URL}show-current-chants-count`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({
        type: actions.lIVE_CHANTS_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const getCountryNameSaga = function* () {

  try {
    let requestUrl =
      `${Constants.BASE_URL}get-all-countries-list`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({
        type: actions.COUTRY_NAME_LIST_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const getCountryStateSaga = function* (payload) {

  try {
    let requestUrl = `${Constants.BASE_URL}get-all-state-list/${payload.payload}`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    if (res.data != null) {
      yield put({
        type: actions.COUTRY_STATE_NAME_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
  }
};

const getTranslationsSaga = function* ({ payload }) {
  try {
    let requestUrl = `${Constants.BASE_URL}translation-get/${payload.langCode}`;

    yield put(setIsLoading(true))
    const res = yield call(fetchRecord, requestUrl);
    yield put(setIsLoading(false))
    // console.log('??????????',res?.data);
    if (res.data != null) {
      var result = {};
      const translations = res?.data?.data

      translations.map((item, index) => {
        result[translations[index].key] = translations[index].value;
      })

      yield put({
        type: actions.GET_LANGUAGE_TRANSLATION_SUCCESS,
        payload: result,
      });
    }
  } catch (error) {
    console.log('ERROR: ', error);
    yield put(setIsLoading(false))
  }
};

const getUpdatedLanguage = function* ({ payload }) {
  const store = configureStore();
  let dataset = store.getState();
  let token = yield dataset.AuthReducer.accessToken;
  let token1 = yield dataset.AuthReducer.accessToken1;

  try {
    let config = {
      method: 'get',
      url: Constants.SCRIPT_URL,
    };

    const res = yield axios.request(config)
    if (res?.data?.data[0]?.status == 1) {
      yield put(setIsLoading(true))
      if (token) {
        yield put(languageUpdateSuccess1(token))
        yield put(languageUpdateSuccess(''))
      }
      payload.callback(res?.data?.data[0])
    } else if (res?.data?.data[0]?.status == 2) {
      if (token1) {
        payload.callback(res?.data?.data[0],token1)
        yield put(languageUpdateSuccess(token1))
        yield put(languageUpdateSuccess1(''))
      }
    }
  } catch (error) {
  }
};

const AppSaga = [
  takeLatest(actions.TARGET_COUNT_PLEDGE, PledgeSagaFunction),
  takeLatest(actions.GET_HOME_PAGE_DATA, getHomePageData),
  takeLatest(actions.CHANT_COUNT_UPDATE, UpdateChant),
  takeLatest(actions.CHANT_HISTORY, chantHistoryapi),
  takeLatest(actions.GET_PDF_DATA, getPdfSaga),
  takeLatest(actions.VIDEO_DATA_GET, getVideoData),
  takeLatest(actions.LANGUAGE_LIST, getLanguageList),
  takeLatest(actions.TARGET_CHANT_DATA, getTargetPledgeData),
  takeLatest(actions.CURRENT_COUNT_STATUS, getCurrenCountData),
  takeLatest(actions.PDF_DATA_GET, getAllpdfDataSaga),
  takeLatest(actions.REGISTER_DETAILS, reisterDetailSaga),
  takeLatest(actions.GET_lIVE_CHANTS, getliveDatasaga),
  takeLatest(actions.COUTRY_NAME_LIST, getCountryNameSaga),
  takeLatest(actions.COUTRY_STATE_NAME, getCountryStateSaga),
  takeLatest(actions.GET_LANGUAGE_TRANSLATION, getTranslationsSaga),
  takeLatest(actions.LANGUAGE_LIST_UPDATE, getUpdatedLanguage),

];

export default AppSaga;
