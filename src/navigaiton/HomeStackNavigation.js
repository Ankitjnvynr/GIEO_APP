// In App.js in a new project

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useSelector } from 'react-redux';
import EventPage from '../screens/event';
import DetailEvent from '../screens/event/DetailEvent';
import MyEvent from '../screens/event/MyEvent';
import UpdatedEvent from '../screens/event/updatedEvent';
import EventForm from '../screens/forms';
import HelpScreen from '../screens/help/inex';
import ListPageScreen from '../screens/listpage';
import LocationForm from '../screens/locationForm';
import Register from '../screens/resisterpage';
import SankalpScreen from '../screens/sankalp.js/index.js';
import SettingScreen from '../screens/setting';
import UpdatePledge from '../screens/updatePledge';
import BottomTabnavigator from './BottomStackNavigation';
import MyChantsHistory from '../screens/listpage/MyChantsHistory';
import MyChantsCount from '../screens/chantCount/MyChantsCount';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigation() {
  const [pledgeStatus, setpledgeStatus] = React.useState(true);

  let resss = useSelector(state => state.AuthReducer);

  React.useEffect(() => {
    asyncFunction();
  }, [resss]);

  const asyncFunction = async () => {
    const data = await AsyncStorage.getItem('pledge');
    let res = await JSON.parse(data);
    setpledgeStatus(res);
  };

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {pledgeStatus == null || pledgeStatus == '' ? (
        <HomeStack.Screen name="sankalp" component={SankalpScreen} />
      ) : (
        <>
          <HomeStack.Screen name="HomeStack" component={BottomTabnavigator} />
          <HomeStack.Screen name="listpage" component={ListPageScreen} />
          <HomeStack.Screen name="setting" component={SettingScreen} />
          <HomeStack.Screen name="help" component={HelpScreen} />
          <HomeStack.Screen name="update" component={UpdatePledge} />
          <HomeStack.Screen name="register" component={Register} />
          <HomeStack.Screen name="event" component={EventPage} />
          <HomeStack.Screen name="details" component={DetailEvent} />
          <HomeStack.Screen name="form" component={EventForm} />
          <HomeStack.Screen name="formPlace" component={LocationForm} />
          <HomeStack.Screen name="myEvent" component={MyEvent} />
          <HomeStack.Screen name="updatedEvent" component={UpdatedEvent} />
          <HomeStack.Screen name="MyChantsHistory" component={MyChantsHistory} />
          <HomeStack.Screen name="MyChantsCount" component={MyChantsCount} />

        </>
      )}
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
