import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { useHomeHooks } from '../../utills.js/hooke/home-hooks';
import { useTranslation } from '../../utills.js/translation-hook';
import { colors } from '../../helper/colors';

const windowWidth = Dimensions.get('window').width - 70;
const HomeScreen = () => {
  const { Translation, isLoading, handleGetHomeData, homePageData, saveHtmlUrlAction } =
    useHomeHooks();
  const { handleDefaultLanguage } = useTranslation()
  const selectedLang = useSelector(state => state.AppReducers.selectedLangCode);
  const sourceHtml = useSelector(state => state.AppReducers.homePageHtmlUrl);

  useEffect(() => {
    handleGetHomeData();
  }, []);


  useEffect(() => {
    const updateHtmlContent = async () => {
      const curLang = await handleDefaultLanguage()
      if (homePageData?.data?.length > 0) {
        const currentUrl = homePageData?.data[0]?.translations.find((item) => item.lang == curLang.code)
        saveHtmlUrlAction(currentUrl?.content) 
      }
    }
    updateHtmlContent()
  }, [homePageData, selectedLang])

  const IndicatorLoadingView = () => {
    return (
      <ActivityIndicator
        color="#3235fd"
        size="large"
        style={styles.IndicatorStyle}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <Loader /> : null}
      <HeaderPage />
      <WebView
        originWhitelist={['*']}
        source={{ html: sourceHtml }}
        style={{ ...StyleSheet.absoluteFill }}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        androidLayerType='hardware'
        mixedContentMode='always'
        domStorageEnabled={true}
        androidHardwareAccelerationDisabled={false}
        scalesPageToFit={false}
        renderLoading={IndicatorLoadingView}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.orange
  },
  IndicatorStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

  },
});
