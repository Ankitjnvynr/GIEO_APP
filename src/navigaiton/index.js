// In App.js in a new project

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../App';
import { Logout, STORETOKEN } from '../redux/actions';
import { sigingStatus } from '../redux/reducers/selectors/userSelector';
import AuthStackNavigation from './AuthStackNavigation';
import HomeStackNavigation from './HomeStackNavigation';

function InitialNavigation() {
  const [token, setToken] = useState(null);
  const siginResponse = useSelector(sigingStatus);

  useEffect(() => {
    asyncFunction();
  }, [!siginResponse]);

  const asyncFunction = async () => {
    const data = await AsyncStorage.getItem('token');
    let res = await JSON.parse(data);
    setToken(res);
    dispatch(STORETOKEN(res));
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    asyncResponse();
  }, []);

  const asyncResponse = async () => {
    try {
      const res = await AsyncStorage.getItem('token');
      if (res != null) {
        dispatch(Logout(true));
      }
    } catch (error) {
      // console.log('show error from app file', error);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <HomeStackNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
}

export default InitialNavigation;
