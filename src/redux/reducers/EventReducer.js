import * as actions from '../actionTypes';

const initialState = {
  allEventData: '',
  eventTypeData: '',
  eventPlaceData: '',
  eventLoading: '',
  currentEvent: "",
  myEvent: "",
  locationUpdated: "",
  subscribeEventResponse: ''
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_EVENT_SUCCESS:
      // console.log('show all event reducer', action.payload);
      return {
        ...state,
        allEventData: action.payload,
      };
    case actions.GET_EVENT_TYPE_SUCCESS:
      // console.log('GET_EVENT_TYPE_SUCCESS', action.payload);
      return {
        ...state,
        eventTypeData: action.payload,
      };
    case actions.GET_EVENT_PLACE_SUCCESS:
      // console.log('GET_EVENT_PLACE_SUCCESS', action.payload);
      return {
        ...state,
        eventPlaceData: action.payload,
      };
    case actions.LODER:
      // console.log('GET_EVENT_PLACE_SUCCESS', action.payload);
      return {
        ...state,
        eventLoading: action.payload,
      };
    case actions.GET_MY_EVENT_SUCCESS:
      // console.log('shw tken form reducer ST-========>', action?.payload);
      return {
        ...state,
        myEvent: action.payload,
      };
    case actions.CREATE_EVENT_SUCCESS:
      // console.log('shw tken form reducer ST-========>', action?.payload);
      return {
        ...state,
        currentEvent: action.payload,
      };
    case actions.UPDATE_LOCATION_SUCCESS:
      // console.log('shw tken form reducer ST-========>', action?.payload);
      return {
        ...state,
        locationUpdated: action.payload,
      };
    case actions.SUBSCRIBE_EVENT_SUCCESS:
      // console.log('shw tken form reducer ST-========>', action?.payload);
      return {
        ...state,
        subscribeEventResponse: action.payload,
      };
    default: {
      return state;
    }
  }
};
export default EventReducer;
