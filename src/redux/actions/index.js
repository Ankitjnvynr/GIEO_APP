import * as ActionTypes from '../actionTypes';

export const EmailOtpRequest = payload => {
  // console.log("show email action",payload)
  return {
    type: ActionTypes.GET_EMAIL_OTP,
    payload,
  };
};
export const EmailOtpVerify = payload => {
  // console.log("show verify actons",payload)
  return {
    type: ActionTypes.GET_EMAIL_OTP_VERIFY,
    payload,
  };
};

export const ShowLoading = () => {
  return {
    type: ActionTypes.SHOW_LOADING,
    payload,
  };
};

export const HideLoading = () => {
  return {
    type: ActionTypes.HIDE_LOADIND,
    payload,
  };
};

export const Logout = payload => {
  return {
    type: ActionTypes.LOGOUT,
    payload,
  };
};

export const getCountryCode = payload => {
  return {
    type: ActionTypes.GET_COUNTRY_CODE,
    payload,
  };
};

export const getPhoneOtp = payload => {
  // console.log('show payload action phone number', payload);
  return {
    type: ActionTypes.GET_PHONE_OTP,
    payload,
  };
};

export const getPhoneOtpVerify = payload => {
  // console.log('show payload action phone number');
  return {
    type: ActionTypes.GET_PHONE_OTP_VERIFY,
    payload,
  };
};

export const requestPhoneData = payload => {
  // console.log('show data reques acction', payload);
  return {
    type: ActionTypes.STORE_REQUEST_PHONE_DATA,
    payload,
  };
};

export const STORETOKEN = payload => {
  // console.log('show action access token', payload);
  return {
    type: ActionTypes.STORE_ACCESS_TOKEN,
    payload,
  };
};

export const setPledge = payload => {
  // console.log('show pledge count action', payload);
  return {
    type: ActionTypes.TARGET_COUNT_PLEDGE,
    payload,
  };
};

export const getHomeData = payload => {
  return {
    type: ActionTypes.GET_HOME_PAGE_DATA,
    payload,
  };
};

export const setcoditionalStatus = payload => {
  // console.log('show action access token', payload);
  return {
    type: ActionTypes.SET_PLEDGE_STATUS_CONDITION,
    payload,
  };
};

export const chantUpdatecount = payload => {
  // console.log('show count number reducer ', payload);
  return {
    type: ActionTypes.CHANT_COUNT_UPDATE,
    payload,
  };
};

export const chantHistory = payload => {
  return {
    type: ActionTypes.CHANT_HISTORY,
    payload,
  };
};

export const getPdfData = payload => {
  return {
    type: ActionTypes.GET_PDF_DATA,
    payload,
  };
};

export const getVideoData = payload => {
  return {
    type: ActionTypes.VIDEO_DATA_GET,
    payload,
  };
};

export const languageList = payload => {
  return {
    type: ActionTypes.LANGUAGE_LIST,
    payload,
  };
};

export const targetChantData = payload => {
  return {
    type: ActionTypes.TARGET_CHANT_DATA,
    payload,
  };
};

export const getcurrentcountStatus = payload => {
  return {
    type: ActionTypes.CURRENT_COUNT_STATUS,
    payload,
  };
};

export const getAllpdfData = payload => {
  return {
    type: ActionTypes.PDF_DATA_GET,
    payload,
  };
};

export const saveLangCode = payload => {
  // console.log(payload, '-->>>> Inside FUnc');
  return {
    type: ActionTypes.GET_LANG_CODE,
    payload,
  };
};

export const registerMethod = payload => {
  // console.log(payload, 'reg register details dta ',payload);
  return {
    type: ActionTypes.REGISTER_DETAILS,
    payload,
  };
};
export const liveChants = payload => {
  // console.log(payload, '-->>>LIVE');
  return {
    type: ActionTypes.GET_lIVE_CHANTS,
    payload,
  };
};
export const getCountryName = payload => {
  // console.log(payload, '-->>>country');
  return {
    type: ActionTypes.COUTRY_NAME_LIST,
    payload,
  };
};
export const getStateName = payload => {
  // console.log(payload, '-->>>state');
  return {
    type: ActionTypes.COUTRY_STATE_NAME,
    payload,
  };
};


export const getTranslations = payload => {
  // console.log(payload, '-->>>translation');
  return {
    type: ActionTypes.GET_LANGUAGE_TRANSLATION,
    payload,
  };
};

export const getAllEvent = payload=>{
  return{
    type:ActionTypes.GET_ALL_EVENT,
    payload,
  }
}
export const getEventType = payload=>{
  return{
    type:ActionTypes.GET_EVENT_TYPE,
    payload,
  }
}
export const getEventPlace = payload=>{
  return{
    type:ActionTypes.GET_EVENT_PLACE,
    payload,
  }
}

export const searchEvent = payload=>{
  return{
    type:ActionTypes.GET_SEARCH_EVENT,
    payload,
  }
}
export const createEvent = payload=>{
  return{
    type:ActionTypes.CREATE_EVENT,
    payload,
  }
}

export const getMyEvent = payload=>{
  return{
    type:ActionTypes.GET_MY_EVENT,
    payload,
  }
}

export const updateMyEvent = payload=>{
  return{
    type:ActionTypes.UPDATE_MY_EVENT,
    payload,
  }
}

export const updateLocation = payload=>{
  return{
    type:ActionTypes.UPDATE_LOCATION,
    payload,
  }
}
export const subscribeEvent = payload=>{
  
  return{
    type:ActionTypes.SUBSCRIBE_EVENT,
    payload,
  }
}

export const eventConfirmation = payload=>{
  
  return{
    type:ActionTypes.EVENT_CONFERMATION_IMAGE,
    payload,
  }
}

export const setPreviousChant = payload=>{
  return{
    type:ActionTypes.SET_PREVIOUS_CHENT,
    payload,
  }
}

export const setIsLoading = payload=>{
  return{
    type:ActionTypes.SET_IS_LOADING,
    payload,
  }
}


export const handleSocialLoginAction = payload => {
  return {
    type: ActionTypes.SOCIAL_LOGIN,
    payload,
  };
};


export const setMySelectedEvent = payload=>{
  return{
    type:ActionTypes.SET_MY_SELECTED_EVENT,
    payload,
  }
}

export const setMyChantsList = payload=>{
  return{
    type:ActionTypes.SET_MY_CHANTS_LIST,
    payload,
  }
}

export const setHomePageHtmlUrl = payload=>{
  return{
    type:ActionTypes.HOME_PAGE_HTML_URL,
    payload,
  }
}


export const handleLanguageListUpdate = payload=>{
  return{
    type:ActionTypes.LANGUAGE_LIST_UPDATE,
    payload,
  }
}

export const languageUpdateSuccess = payload => {
  // console.log('show action access token', payload);
  return {
    type: ActionTypes.STORE_ACCESS_TOKEN,
    payload,
  };
};

export const languageUpdateSuccess1 = payload => {
  // console.log('show action access token', payload);
  return {
    type: ActionTypes.STORE_ACCESS_TOKEN1,
    payload,
  };
};