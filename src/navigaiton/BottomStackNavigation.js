import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Octicons';
import ReadChantPage from '../screens/ReadChants';
import ChantCount from '../screens/chantCount';
import HomeScreen from '../screens/homeScreen';
import { useTranslation } from '../utills.js/translation-hook';

const Tab = createBottomTabNavigator();

function BottomTabnavigator() {
const {Translation}=useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: Translation.home,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'pink' : 'white',
              }}>
              <EIcon name="home" size={26} color={'red'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chant"
        component={ChantCount}
        options={{
          headerShown: false,
          title: Translation.mantra,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'white' : 'white',
              }}>
             <Image source={require('../../assets/images/Shankh.png')} style={{height:60,width:60,bottom:20}} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="read"
        component={ReadChantPage}
        options={{
          headerShown: false,
          title: Translation.reading,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'pink' : 'white',
              }}>
              <FA5 name="book-open" size={26} color={'red'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabnavigator;
const styles = StyleSheet.create({
  bottomIconTopBar: {
    borderTopWidth: 3,
    height: '85%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
});
