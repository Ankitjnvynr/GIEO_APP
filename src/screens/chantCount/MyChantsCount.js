import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import React, { useEffect, useState } from 'react';


import EIcon from 'react-native-vector-icons/Entypo';

import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import {
  chantHistory,
  getcurrentcountStatus,
  liveChants,
  setPreviousChant,
  targetChantData
} from '../../redux/actions';
import Constants from '../../utills.js/Constants';
import { useTranslation } from '../../utills.js/translation-hook';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MyChantsCount = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { Translation, handleLoader, isLoading } = useTranslation()
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState(0);
  const [modalPickerVisible, setModalPickerVisible] = useState(false);
  const [localImage, setLocalImage] = useState('');
  const [localImagePath, setLocalImagePath] = useState('');

  const previousChant = useSelector(state => state.AppReducers.previousChent);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  useEffect(() => {
    if (isFocused && previousChant != null) {
      setNumber(parseInt(previousChant.count));
    } else {
      setNumber(0);
      dispatch(setPreviousChant(null));
    }
  }, [isFocused])



  useEffect(() => {
    // handleUpdateChants()
  }, []);

  const handleUpdateChants = () => {
    dispatch(targetChantData());
    dispatch(chantHistory());
    dispatch(getcurrentcountStatus());
    dispatch(liveChants());
  }

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
      setModalPickerVisible(false);
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
      setModalPickerVisible(false);
    } catch (error) {
      // console.log('show error', error);
    }
  };


  const onSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var formData = new FormData();
    formData.append("id", previousChant?.id);
    formData.append("count", number);
    formData.append('photo', {
      uri: localImagePath.uri,
      name: localImagePath.fileName,
      type: localImagePath.type,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };
    handleLoader(true)
    fetch(`${Constants.BASE_URL}events-history/update`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        handleLoader(false)
        dispatch(setPreviousChant(null))
        navigation.navigate('MyChantsHistory')
      })
      .catch(error => {
        handleLoader(false)
        console.log('error', error)
      });

  };


  const numberDecrement = () => {
    setNumber(number - 1);
  };

  const NumberIncrement = () => {
    setNumber(number + 1);
  };

  const updateChants = (chants) => {
    const chant = parseInt(chants)
    setNumber(chant > 0 ? chant : 0);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }} >

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }} >
          {localImage ?
            <Image source={{ uri: localImage }} style={styles.bigImageContainer} />
            : null}
          <View style={styles.counterContainer}>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                numberDecrement();
              }}
              disabled={number == 0}>
              <EIcon name={'minus'} size={30} style={styles.iconstyle} />
            </TouchableOpacity>

            <View
              style={{
                height: 170,
                width: 170,
                marginVertical: 10,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 5,
                borderColor: colors.orange,
                borderRadius: 100,
              }}>
              <TextInput
                onChangeText={updateChants}
                keyboardType='number-pad'
                placeholder={Translation.mantra}
                style={{ color: colors.black, fontWeight: '600', fontSize: 22, textAlign: 'center', alignSelf: 'center', minWidth: 10 }}
                placeholderTextColor={colors.placeholder}
                maxLength={10}
                value={number ? number.toString() : ''}
                numberOfLines={1}
              />
            </View>

            <TouchableOpacity
              style={{ ...styles.iconContainer, borderColor: 'green' }}
              onPress={() => {
                NumberIncrement();
              }}>
              <EIcon name={'plus'} size={30} style={styles.iconstyle} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => onSubmit()}
            style={{
              ...styles.btncountcontaiiner,
              alignSelf: 'center',
              borderRadius: 10,
              height: 42,
              borderWidth: 1,
              borderColor: '#E5CE004F',
            }}>
            <Text style={[styles.textSubmit, { fontSize: 20 }]}>
              {Translation.submit}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalPickerVisible(true)}
            style={{
              ...styles.btncountcontaiiner,
              alignSelf: 'center',
              borderRadius: 10,
              height: 42,
              borderWidth: 1,
              borderColor: '#E5CE004F',
            }}>
            <Text style={[styles.textSubmit, { fontSize: 20 }]}>
              {Translation.add_event_banner}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.modalText}>{Translation.chant_count}</Text>
                <Text style={styles.modalText}>{Translation.update}</Text>
                <Text style={styles.modalText}>{Translation.successfully}</Text>
                <Text style={styles.modalText}>[{number}]</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    setNumber(0);
                    navigation.navigate('MyChantsHistory')
                  }}>
                  <Text style={styles.textStyle}>{Translation.ok}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPickerVisible}
          onRequestClose={() => setModalPickerVisible(!modalPickerVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={() => setModalPickerVisible(!modalPickerVisible)}>
                <Text style={styles.textStyle}>───── </Text>
              </Pressable>
              <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                  onPress={() => handleCamera()}
                  style={styles.cameraContainer}>
                  <Icon name="camera" size={30} style={styles.iconStyle} />
                  <Text style={styles.titleText}>{Translation.add_pictures_from_camera}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleGallery()}
                  style={{ ...styles.cameraContainer, marginTop: ms(15) }}>
                  <FA5 name="images" size={30} style={styles.iconStyle} />
                  <Text style={styles.titleText}>{Translation.add_pictures_from_gallery}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setModalPickerVisible(!modalPickerVisible)}
                style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 10, right: 10 }}>
                <Text style={[styles.titleText, { color: colors.orange, fontSize: 20, fontWeight: '600' }]}>{Translation.close}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default MyChantsCount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btncountcontaiiner: {
    backgroundColor: 'darkorange',
    width: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginTop: 5,
    height: 34,
  },
  titleText: {
    padding: 10,
    color: colors.black,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'orange',
  },

  textContainer: {
    display: 'flex',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
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
  titleStyle: {
    alignSelf: 'center',
    marginTop: 18,
    fontSize: 22,
    color: 'white',
  },

  chantsTitle: {
    marginTop: 15,
    alignSelf: 'center',
    fontSize: 22,
    color: colors.black,
    fontWeight: 'bold',
  },

  contContainer: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
    width: '80%',
    marginTop: 10,
    borderRadius: 25,
    height: 39,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },

  numberText: {
    alignSelf: 'center',
    color: colors.black,
  },

  userNameContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15,
    minWidth: '50%',
  },

  userText: {
    fontSize: 23,
    color: colors.black,
    fontWeight: '500',
  },

  textContainerstyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  YourChantStyle: {
    fontSize: 30,
    color: colors.black,
    fontWeight: '500',
    marginTop: 19,
    marginBottom: 10
  },

  normalStyle: {
    color: colors.black,
  },

  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 120,
  },

  monthContentStyle: {
    borderWidth: 5,
    fontWeight: 'bold',
    height: 60,
    paddingHorizontal: 10,
    minWidth: '40%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'orange',
    margin: 20,
  },

  iconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: '#BB6646',
  },

  countToday: {
    alignSelf: 'center',
    color: '#434343',
  },

  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  bigImageContainer: {
    borderRadius: 20,
    height: ms(176),
    width: '95%',
    overflow: 'hidden', // Make sure the content within the container respects the border radius
    borderColor: colors.white,
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'red',
    borderRadius: 100,
  },

  BigcounterContainer: {
    height: 170,
    width: 170,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 100,
    margin: 20,
    borderColor: 'orange',
  },

  iconstyle: {
    fontWeight: 'bold',
    color: colors.black,
  },

  countTextNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.black,
  },

  btnContainer: {
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
  },

  textSubmit: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    height: 250,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orange',
  },
  textStyle: {
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  cameraContainer: {
    flexDirection: 'row',
    height: ms(40),
    borderRadius: ms(10),
    alignContent: 'center',
    alignItems: 'center',
    marginTop: ms(30),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    color: '#434343',
  },
  eventstyle: {
    backgroundColor: '#434343',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: '80%'
  },
});
