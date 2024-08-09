import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import mask from '../../../assets/images/Mask.png';
import logo from '../../../assets/images/Logo.png';
import { colors } from '../../helper/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { handleLanguageListUpdate } from '../../redux/actions';

const SplashScreen = () => {
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleLanguageListUpdate({ callback: handleCallback, id: accessToken })); // For me
  }, [])

  const handleCallback = async (data,id) => {
    if (data?.status == 1) {
      await AsyncStorage.setItem(data?.name, JSON.stringify(''))
    }else if (id) {
      await AsyncStorage.setItem(data?.name, JSON.stringify(id))
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }} >
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ImageBackground
          resizeMode={'stretch'}
          source={mask}
          style={styles.imageContainer}>
          <Image
            source={logo}
            style={{
              height: 250,
              width: 250,
              marginTop: 100,
              alignSelf: 'center',
            }}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
