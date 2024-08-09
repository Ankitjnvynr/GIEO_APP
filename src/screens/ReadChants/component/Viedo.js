import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View, SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoData } from '../../../redux/actions';
import Constants from '../../../utills.js/Constants';

const VideoScreen = () => {
  const dispatch = useDispatch();
  const videoData = useSelector(state => state.AppReducers.videoData);
  const [videoId, setVideoId] = useState('')
  const [videoList, setVideoList] = useState([])
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  useEffect(() => {
    dispatch(getVideoData());
  }, []);
  const handleOnPressVideo = (el) => {
    setVideoId(el)
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+accessToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Constants.BASE_URL}app-settings`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        const videoList = res.data.find((item) => item.type == 'app_setting_video_links')
        const videos = JSON.parse(videoList.value)

        let newVideoList = []
        videos.map((item) => {
          newVideoList.push({
            videoUrl: item
          })
        })
        newVideoList.length > 0 ? setVideoId(newVideoList[0]) : null
        setVideoList(newVideoList)
      })
      .catch(error => console.log('error', error));
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressVideo(item)} style={{
        width: '100%', marginTop: 10, borderWidth: 2,
        borderColor: item.videoUrl == videoId.videoUrl ? "red" : 'white'
      }}>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: `${Constants.YOUTUBE_THUMBNAIL_URL}${item.videoUrl}/0.jpg` }}
          style={styles.thumnailstyle}>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, }} >
      <View style={{ marginTop: 20, paddingHorizontal: 20, flex: 1 }}>
        <View style={{ flex: .5 }}>
          <WebView
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            androidLayerType='hardware'
            mixedContentMode='always'

            domStorageEnabled={true}
            androidHardwareAccelerationDisabled={false}
            source={{ uri: 'https://www.youtube.com/embed/' + `${videoId.videoUrl}` }}
          />

        </View>
        <View style={{ flex: 0.7, marginTop: 20 }}>
          <FlatList
            data={videoList}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  thumnailstyle: {
    height: 130,
    width: '100%',
  },
  backgroundVideo: {
    height: 200,
    width: '100%',
    borderWidth: 1,
  },
});
