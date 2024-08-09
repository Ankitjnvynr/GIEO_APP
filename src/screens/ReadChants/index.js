import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { SceneMap, TabView } from 'react-native-tab-view';
import HeaderPage from '../../Components/header';
import ReadPdfScreen from './component/ReadPdf';
import VideoScreen from './component/Viedo';
import { useDispatch } from 'react-redux';
import { getAllpdfData, getVideoData } from '../../redux/actions';
import { colors } from '../../helper/colors';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';

const ReadChantPage = () => {
  const { Translation ,isLoading} = useTranslation()
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoData());
    dispatch(getAllpdfData());
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: Translation.read },
    { key: 'second', title: Translation.video },
  ]);
  const renderScene = SceneMap({
    first: ReadPdfScreen,
    second: VideoScreen,
  });
  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              key={i.toString()}
              style={{
                ...styles.tabItem,
                backgroundColor: index == i ? '#EF4136' : colors.white,
                borderRadius: 9,
              }}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  opacity,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      <View style={styles.container}>
      {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        <View style={{ flex: 1, marginTop: 10 }}>
          <TabView
            style={{ flex: 1 }}
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReadChantPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:colors.white 
  },
  tabBar: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    height: 55,
  },
  tabItem: {
    alignItems: 'center',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  customTabcontainer: {
    flexDirection: 'row',
  },
  textHeading: {
    color: colors.black
  }
});
