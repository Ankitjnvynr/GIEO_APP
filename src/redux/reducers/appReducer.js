import * as actions from '../actionTypes';

const initialState = {
  pledgeData: '',
  homePageData: '',
  chantHistory: '',
  pdfData: '',
  videoData: '',
  getTargetpledge: '',
  getCurrentCountData: '',
  pdfList: '',
  languageList: '',
  selectedLangCode: { "code": "en", "id": 1, "name": "English" },
  liveDataChants: '',
  countryNamelistData: '',
  countryStateListData: "",
  translationData: "",
  previousChent: null,
  isLoading: false,
  mySelectedEvent: {},
  myChantsList: [],
  homePageHtmlUrl: '',
};

const AppReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLEDGE_DATA:
      // console.log('show pledge data reducers', action.payload);
      return {
        ...state,
        pledgeData: action.payload,
      };
    case actions.HOME_DATA:
      // console.log('show home page data red', action.payload);
      return {
        ...state,
        homePageData: action.payload,
      };
    case actions.STORE_CHANT_HISTORY:
      // console.log('show chant history data reducer', action.payload);
      return {
        ...state,
        chantHistory: action.payload,
      };
    case actions.PDF_DATA_SUCCESS:
      // console.log('show chant pdf reducers', action.payload);
      return {
        ...state,
        pdfData: action.payload,
      };
    case actions.VIDEO_DATA_SUCCESS:
      // console.log('show chant video reducers', action.payload);
      return {
        ...state,
        videoData: action.payload,
      };
    case actions.TARGET_CHANT_DATA_SUCCESS:
      // console.log('show chant video reducers', action.payload);
      return {
        ...state,
        getTargetpledge: action.payload,
      };
    case actions.CURRENT_COUNT_STATUS_SUCCESS:
      // console.log('show chant COUNT STATUS DATA', action.payload);
      return {
        ...state,
        getCurrentCountData: action.payload,
      };
    case actions.SAVE_PDF_DATA:
      // console.log('show chant COUNT STATUS DATA', action.payload);
      return {
        ...state,
        pdfList: action.payload,
      };
    case actions.LANGUAGE_LIST_SUCCESS:
      // console.log(action.payload, '----------------');
      return {
        ...state,
        languageList: action.payload,
      };
    case actions.GET_LANG_CODE:
      // console.log(action.payload, '-->>>>> Lang COde');
      return {
        ...state,
        selectedLangCode: action.payload,
      };
    case actions.lIVE_CHANTS_SUCCESS:
      // console.log(action.payload, '-->>>>> LIVE DATA');
      return {
        ...state,
        liveDataChants: action.payload,
      };
    case actions.COUTRY_NAME_LIST_SUCCESS:
      // console.log('country name reducer',action.payload);
      return {
        ...state,
        countryNamelistData: action.payload,
      };
    case actions.COUTRY_STATE_NAME_SUCCESS:
      // console.log('country state list reducer',action.payload);
      return {
        ...state,
        countryStateListData: action.payload,
      };
    case actions.GET_LANGUAGE_TRANSLATION_SUCCESS:
      // console.log('country TRANSLATION reducer',action.payload);
      return {
        ...state,
        translationData: action.payload,
      };
    case actions.SET_PREVIOUS_CHENT:
      // console.log('SET_PREVIOUS_CHENT reducer',action.payload);
      return {
        ...state,
        previousChent: action.payload,
      };
    case actions.SET_IS_LOADING:
      // console.log('SET_IS_LOADING reducer',action.payload);
      return {
        ...state,
        isLoading: action.payload,
      };
    case actions.SET_MY_SELECTED_EVENT:
      // console.log('SET_IS_LOADING reducer',action.payload);
      return {
        ...state,
        mySelectedEvent: action.payload,
      };
    case actions.SET_MY_CHANTS_LIST:
      // console.log('SET_IS_LOADING reducer',action.payload);
      return {
        ...state,
        myChantsList: action.payload,
      };
    case actions.HOME_PAGE_HTML_URL:
      // console.log('SET_IS_LOADING reducer',action.payload);
      return {
        ...state,
        homePageHtmlUrl: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default AppReducers;
