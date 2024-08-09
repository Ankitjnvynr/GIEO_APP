import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Modal,
  PixelRatio,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Share from 'react-native-share';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconW from 'react-native-vector-icons/FontAwesome';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CustomeToast from '../../Components/CustomeToast';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import { getAllEvent, setIsLoading, subscribeEvent } from '../../redux/actions';
import Constants from '../../utills.js/Constants';
import { useTranslation } from '../../utills.js/translation-hook';
import { useIsFocused } from '@react-navigation/native';

const DetailEvent = ({ navigation, route }) => {
  const { Translation, isLoading } = useTranslation()
  const isFocused = useIsFocused();

  // let item = route.params.data;
  const [item, setItem] = useState(route.params.data)
  const isCurrentUser = route.params.isCurrentUser
  const url = item?.banner;
  const message = item?.short_content;
  const title = Translation.shared_by + ': ' + item?.organizer + "Instructions: " + item?.content;
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [localImage, setLocalImage] = useState('');
  const [localImagePath, setLocalImagePath] = useState('');

  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const [galleryList, setGalleryList] = useState([])
  const handleImagePick = () => {
    setModalVisible(true);
  };
  const subscribeResponse = useSelector(
    state => state.EventReducer.subscribeEventResponse,
  );
  const [subscription, setSubscription] = useState(item?.subscriptions);

  useEffect(() => {
    if (subscribeResponse.id == item?.id) {
      setSubscription(subscribeResponse.subscriptions);
    }
  }, [subscribeResponse]);

  const onPressWhatsApp = async () => {
    const options = {
      title: title,
      message: title,
      url: url,
      social: Share.Social.WHATSAPP,
    };
    console.log(options);
    handleShare(options);
  };

  const onPressFacebook = async () => {
    const options = {
      title: title,
      message: message,
      url: url,
      social: Share.Social.FACEBOOK,
    };
    handleShare(options);
  };

  const onPressTwitter = async () => {
    const options = {
      title: title,
      message: message,
      url: url,
      social: Share.Social.TWITTER,
    };
    handleShare(options);
  };

  const handleShare = options => {
    Share.open(options)
      .then(res => {
        // console.log('::::::::', res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const onPressCopy = () => { 
    const data = `${title}: ${url}`;
    Clipboard.setString(data);
    setIsCopied(true);
  };

  const handleSubscrible = val => {
    dispatch(subscribeEvent(val));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, [isCopied]);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const handleCamera = async () => {
    try {
      let result = await launchCamera(options);
      let newData = result?.assets[0].uri;
      setLocalImage(newData);
      setLocalImagePath(result?.assets[0])
      setModalVisible(false);
    } catch (error) {
      // console.log('show error', error);
    }
  };

  const handleGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      let newData = result?.assets[0].uri;
      setLocalImage(newData);
      setLocalImagePath(result?.assets[0])
      setModalVisible(false);
    } catch (error) {
      // console.log('show error', error);
    }
  };


  const onAddEventBanner = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var formData = new FormData();
    formData.append('banner', {
      uri: localImagePath.uri,
      name: localImagePath.fileName,
      type: localImagePath.type,
    });

    formData.append("id", item?.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
    };
    dispatch(setIsLoading(true))
    fetch(`${Constants.BASE_URL}events-store-banner`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        setItem(res.data)
        handleClearData()
        dispatch(setIsLoading(false))
      })
      .catch(error => {
        dispatch(setIsLoading(false))
        console.log('error', error)
      });

  };

  const handleClearData = () => {
    setLocalImage(null);
    dispatch(getAllEvent());
  };

  useEffect(() => {
    handleGalleryAPI()
    handleClearData()
  }, [isFocused])

  const handleGalleryAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    dispatch(setIsLoading(true))
    fetch(`${Constants.BASE_URL}events-gallery/${item?.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        setGalleryList(res?.data)
        dispatch(setIsLoading(false))
      })
      .catch(error => {
        dispatch(setIsLoading(false))
        console.log('error', error)
      });
  }



  const renderItemGallery = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.6} style={{ flex: 1, marginTop: 10, alignItems: "center" }} >
        <Image source={{ uri: item.photo }} style={{
          height: PixelRatio.getPixelSizeForLayoutSize(80),
          width: PixelRatio.getPixelSizeForLayoutSize(110),
          borderRadius: 10
        }} />

        <Text style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#0007',
          width: PixelRatio.getPixelSizeForLayoutSize(110),
          borderBottomRightRadius: 9,
          borderBottomLeftRadius: 9,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '600'
        }}>{Translation.event_date}{':'} {moment(item?.create_at).format('ddd-mm-yy')} </Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }} >

      <View style={styles.contaier}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        {isCopied ? <CustomeToast msg={Translation.clipboard_to_copied} /> : null}



        <View style={{ paddingTop: 5 }} />
        <FlatList
          data={galleryList}
          ListHeaderComponent={() => {
            return (
              <>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={styles.idstyle}>{Translation.event_id + ':'}{item?.id}</Text>
                  <View style={styles.singleItem}>
                    <IconV color="gray" name="globe" size={24} />
                    <Text style={styles.textstyle}>{item?.event_type}</Text>
                  </View>

                  <View style={styles.locationstyle}>
                    <View style={styles.oneItem}>
                      <Icon name="calendar" color="gray" size={25} />
                      <Text style={{ ...styles.textstyle, fontSize: 14 }}>
                        {moment(item?.create_at).format('ddd-mm-yy')}
                      </Text>
                    </View>
                    <View style={styles.oneItem}>
                      <IconE name="location" size={25} color={colors.black} />
                      <Text style={{ ...styles.textstyle, fontSize: 14 }}>{item?.city}</Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      ...styles.textstyle,
                      fontSize: 17,
                      marginLeft: 0,
                      marginTop: 10,
                    }}>
                    {item?.content}
                  </Text>
                  <Text
                    style={{
                      ...styles.textstyle,
                      fontSize: 14,
                      marginLeft: 0,
                      marginTop: 10,
                      fontWeight: '400',
                    }}>
                    {item?.instraction}
                  </Text>
                  {
                    item?.banner ?
                      <Image source={{ uri: item?.banner }} style={styles.bigImageContainer} />
                      : null
                  }

                  <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>
                    {Translation.subscrptions + ":"}{item?.subscriptions}
                  </Text>
                  <View style={styles.addressStyle}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, color: 'black' }}>
                        {Translation.address + ':'}
                      </Text>
                      <Text
                        style={{
                          ...styles.textstyle,
                          fontSize: 14,
                          marginLeft: 0,
                          marginTop: 10,
                          fontWeight: '400',
                        }}>
                        {`${item?.address}, ${item?.country_id}, ${item?.phone_visible == 'Yes' ? item?.place_name : ''}, ${item?.pincode}`}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                        }}>
                        {Translation.organizer + ':'}
                      </Text>
                      <Text
                        style={{
                          ...styles.textstyle,
                          fontSize: 14,
                          marginLeft: 0,
                          marginTop: 10,
                          fontWeight: '400',
                        }}>
                        {item?.organizer}{'\n'}{item?.phone_visible == 'Yes' ? item?.phone : ''}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{ fontSize: 18, color: 'black' }}>{Translation.share + ':'}</Text>
                  <IconW
                    onPress={() => {
                      onPressWhatsApp();
                    }}
                    name="whatsapp"
                    color="#189633"
                    size={30}
                  />
                  <IconV
                    onPress={() => {
                      onPressFacebook();
                    }}
                    name="facebook"
                    color="#1b32a1"
                    size={30}
                  />
                  <Icon
                    onPress={() => {
                      onPressTwitter();
                    }}
                    name="twitter"
                    color="#119af5"
                    size={30}
                  />
                  <IconIonic
                    onPress={() => {
                      onPressCopy();
                    }}
                    name="copy-outline"
                    color="gray"
                    size={30}
                  />
                  <TouchableOpacity
                    style={styles.subscribecontainer}
                    onPress={() => handleSubscrible(item?.id)}>
                    <Text style={{ color: 'white' }}>
                      {subscription == '1' ? Translation.subscribed : Translation.subscribe}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                  {isCurrentUser ? (
                    <TouchableOpacity
                      style={styles.confirmationContainer}
                      onPress={() => handleImagePick()}>
                      <Text style={styles.confirmbtn}>{Translation.add_event_banner}</Text>
                    </TouchableOpacity>
                  ) : null}

                  {isCurrentUser ? (
                    <TouchableOpacity
                      style={styles.confirmationContainer}
                      onPress={() => navigation.navigate('MyChantsHistory')}>
                      <Text style={styles.confirmbtn}>{Translation.submission_list}</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
                {localImage ? (
                  <>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image source={{ uri: localImage }} style={styles.bigImageContainer} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ ...styles.confirmationContainer, alignSelf: 'center' }}
                      onPress={() => onAddEventBanner()}>
                      <Text style={styles.confirmbtn}>{Translation.submit_image} </Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </>
            )
          }}
          renderItem={renderItemGallery}
          keyExtractor={(item) => item.photo}
          contentContainerStyle={{ paddingBottom: 100, }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>───── </Text>
              </Pressable>
              <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => handleCamera()}
                  style={styles.cameracontainer}>
                  <Icon name="camera" size={30} style={styles.iconStyle} />
                  <Text style={styles.titleText}>{Translation.add_pictures_from_camera}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleGallery()}
                  style={{ ...styles.cameracontainer, marginTop: ms(15) }}>
                  <FA5 name="images" size={30} style={styles.iconStyle} />
                  <Text style={styles.titleText}>{Translation.add_pictures_from_gallery}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: colors.white
  },
  idstyle: {
    color: colors.black,
    marginTop: 10,
  },
  textDetails: {
    fontSize: 12,
    color: 'black',
  },
  singleItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  oneItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  locationstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },
  addressStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  subscribecontainer: {
    backgroundColor: 'brown',
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    // marginTop: 20,
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
    flex: 1
  },
  confirmbtn: {
    color: colors.white,
  },
  textConainer: {
    marginTop: ms(20),
  },
  niceText: {
    color: colors.white,
    fontSize: ms(10),
  },
  addBesttext: {
    color: colors.white,
    fontSize: ms(16),
    marginTop: ms(5),
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: ms(30),
  },
  bigImageContainer: {
    borderRadius: 20,
    height: ms(186),
    width: '95%',
    overflow: 'hidden', // Make sure the content within the container respects the border radius
    borderColor: colors.white,
    marginTop: 10,
    alignSelf: 'center'
  },

  arrowContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    //
    backgroundColor: colors.white,
    height: ms(35),
    width: '20%',
    borderRadius: 40,
    marginTop: ms(200),
  },
  cameracontainer: {
    flexDirection: 'row',
    height: ms(40),
    borderRadius: ms(10),
    alignContent: 'center',
    alignItems: 'center',
    marginTop: ms(30),
  },
  titleText: {
    padding: 10,
    color: colors.black,
  },
  iconStyle: {
    marginRight: ms(20),
    color: colors.black,
  },
  modalView: {
    backgroundColor: 'white',

    width: '100%',
    height: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    width: '100%',
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.pink,
  },
  buttonClose: {
    backgroundColor: colors.blue,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textstyle: {

    fontSize: 16,

    color: colors.black,

    marginLeft: 5,

    fontWeight: 'bold',

  },
});
