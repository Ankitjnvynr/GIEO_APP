import {createSelector} from 'reselect';
import AuthReducer from '../Authreducer';

export const AuthSelector = state => state.AuthReducer;
export const emailResponse = createSelector(
  AuthSelector,
  user => user.emailRes,
);
export const sigingStatus = createSelector(
  AuthSelector,
  user => user.isSignedIn,
);
export const loder = createSelector(AuthSelector, user => user.loadingVisible);
export const countryCodeNumber = createSelector(
  AuthSelector,
  user => user.countryCode,
);
export const phoneOtp = createSelector(
  AuthSelector,
  user => user.phoneOtpResponse,
);
export const requestedOtpData = createSelector(
  AuthSelector,
  user => user.requestOtpData,
);
export const tokenDataAxios = createSelector(
  AuthReducer,
  user => user.accessToken,
);

export const statusOfPledge = createSelector(
  AuthReducer,
  user => user.pledgeStatusWWWW,
);
