import * as actions from '../actionTypes';

const initialState = {
  emailOtp: '',
  authToken: null,
  isSignedIn: false,
  loadingVisible: false,
  emailRes: '',
  emailVerifyRes: '',
  countryCode: '',
  phoneOtpResponse: '',
  requestOtpData: '',
  accessToken: '',
  accessToken1: '',
  pledgeStatusWWWW: '',
  myEvent: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        emailOtp: action.payload,
      };
    case actions.EMAIL_LOGIN_SUCCESS:
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case actions.LOGOUT:
      // console.log('reducer', action.payload);
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case actions.SHOW_LOADING:
      return {
        ...state,
        loadingVisible: action.payload,
      };
    case actions.HIDE_LOADIND:
      // console.log("show status loader",action.payload)
      return {
        ...state,
        loadingVisible: action.payload,
      };
    case actions.STORE_EMAIL_RESPONSE:
      // console.log("show email response",action.payload)
      return {
        emailRes: action.payload,
      };
    case actions.GET_COUNTRY_CODE_SUCCESS:
      // console.log("show from reducer",action.payload)
      return {
        ...state,
        countryCode: action.payload,
      };
    case actions.GET_PHONE_OTP_SUCCESS:
      // console.log('show otp data reducers==-=>', action.payload);
      return {
        ...state,
        phoneOtpResponse: action.payload,
      };
    case actions.PHONE_OTP_VERIFY_SUCCESS:
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case actions.STORE_REQUEST_PHONE_DATA:
      // console.log('show reducer request data', action.payload);
      return {
        ...state,
        requestOtpData: action.payload,
      };
    case actions.STORE_ACCESS_TOKEN:
      // console.log('shw tken form reducer', action.payload);
      return {
        ...state,
        accessToken: action.payload,
      };
    case actions.STORE_ACCESS_TOKEN1:
      // console.log('shw tken form reducer', action.payload);
      return {
        ...state,
        accessToken1: action.payload,
      };
    case actions.SET_PLEDGE_STATUS_CONDITION:
      // console.log('shw tken form reducer ST-========>', action?.payload);
      return {
        ...state,
        pledgeStatusWWWW: action.payload,
      };


    default: {
      return state;
    }
  }
};

export default AuthReducer;
