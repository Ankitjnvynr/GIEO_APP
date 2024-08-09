import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, SafeAreaView
} from 'react-native';

import React, { useEffect } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';

import EIcon from 'react-native-vector-icons/Entypo';

import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../../App';
import HeaderPage from '../../Components/header';
import {
  chantHistory,
  chantUpdatecount,
  getcurrentcountStatus,
  handleLanguageListUpdate,
  liveChants,
  setPreviousChant,
  targetChantData,
} from '../../redux/actions';
import { colors } from '../../helper/colors';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';
import Constants from '../../utills.js/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChantCount = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { Translation, handleLoader, isLoading } = useTranslation()

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [todaysDate, setTodaysDate] = React.useState(moment().format('DD MMM'));
  const [number, setNumber] = React.useState(0);
  const [disable, setDisable] = React.useState(true);

  const monthlyData = useSelector(
    state => state.AppReducers.getCurrentCountData,
  );
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  const liveChantsData = useSelector(state => state.AppReducers.liveDataChants);
  const previousChent = useSelector(state => state.AppReducers.previousChent);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);

  useEffect(() => {
    dispatch(handleLanguageListUpdate({ callback: handleCallback, id: accessToken })); // For me

    if (isFocused && previousChent != null) {
      const created_date = moment(previousChent?.create_at).format('DD MMM');
      setTodaysDate(created_date);
      setNumber(parseInt(previousChent.count));
    } else {
      setNumber(0);
      dispatch(setPreviousChant(null));
    }
  }, [isFocused])

  const handleCallback = async (data) => {
    if (data?.status==1) {
      await AsyncStorage.setItem(data?.name, JSON.stringify(''))
    }
  }

  useEffect(() => {
    handleUpdateChants()
  }, []);

  const handleUpdateChants = () => {
    dispatch(targetChantData());
    dispatch(chantHistory());
    dispatch(getcurrentcountStatus());
    dispatch(liveChants());
  }

  const updateMyChants = () => {
    if (previousChent?.count) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + accessToken);

      var raw = JSON.stringify({
        "id": previousChent?.id,
        "count": number
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      handleLoader(true)
      // console.log(requestOptions);
      fetch(`${Constants.BASE_URL}events-history/update`, requestOptions)
        .then(response => response.text())
        .then(result => {
          handleLoader(false)
          dispatch(setPreviousChant(null))
          navigation.navigate('MyChantsHistory')
        })
        .catch(error => {
          handleLoader(false)
          console.log('error', error)
        });
    }
    setDisable(true);
  };

  const handleOnpress = () => {
    if (route?.params?.chantType == 'my') {
      updateMyChants()
      return
    }
    if (previousChent?.count) {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + accessToken);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      handleLoader(true)
      fetch(`${Constants.BASE_URL}user/reads-update?id=${previousChent.id}&count=${number}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          handleLoader(false)
          setModalVisible(true);
          handleUpdateChants()
          dispatch(setPreviousChant(null))
        })
        .catch(error => {
          handleLoader(false)
          // console.log('error', error)
        });
    } else {
      dispatch(chantUpdatecount(number));
      setModalVisible(true);
    }
    setDisable(true);
    dispatch(getcurrentcountStatus());
  };

  // const dateIncrement = () => {
  //   let _newDate = moment(todaysDate, 'DD MMMM')
  //     .add(1, 'day')
  //     .format('DD MMMM');
  //   setTodaysDate(_newDate);
  //   setNumber(0);
  //   dispatch(setPreviousChant(null));
  // };

  // const dateDecrement = () => {
  //   let _newDate = moment(todaysDate, 'DD MMMM')
  //     .subtract(1, 'day')
  //     .format('DD MMMM');
  //   setTodaysDate(_newDate);
  //   setNumber(0);
  //   dispatch(setPreviousChant(null));
  // };

  const NumberDecreament = () => {
    setNumber(number - 1);
    setDisable(false);
  };

  const NumberIncreament = () => {
    setNumber(number + 1);
    setDisable(false);
  };

  const updateChents = (chents) => {
    const chent = parseInt(chents)
    setNumber(chent > 0 ? chent : 0);
    setDisable(false);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }} >

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />

        <ScrollView >
          <TouchableOpacity
            onPress={() => navigationRef.navigate('event')}
            style={styles.eventstyle}>
            <Text style={{ color: 'white', fontSize: 21 }}>
              {Translation.events_and_groups}
            </Text>
          </TouchableOpacity>
          <Text style={styles.chantsTitle}>{Translation.total_chants}</Text>

          <View style={styles.contContainer}>
            <Text style={styles.numberText}>
              {liveChantsData.total_app_count}
            </Text>
          </View>

          {!datapledge ? (
            <ActivityIndicator size={'small'} color={'orange'} />
          ) : null}

          <TouchableOpacity
            style={styles.userNameContainer}
            onPress={() => navigation.navigate('register')}>
            <Text style={styles.userText}>
              {datapledge[0]?.name == null || datapledge[0]?.name == ''
                ? Translation.name
                : datapledge[0]?.name}
            </Text>

            <Icon
              name={'caretdown'}
              size={10}
              style={{ marginLeft: 10, color: colors.black }}
            />
          </TouchableOpacity>

          <View style={styles.textContainerstyle}>
            <Text style={styles.YourChantStyle}>{Translation.your_chants}:</Text>

            <View style={styles.btncountcontaiiner}>
              <Text style={styles.normalStyle}>
                {Translation.total_chants}:{monthlyData?.life_time_count}
              </Text>
            </View>

            <View style={{ ...styles.btncountcontaiiner, marginTop: 10 }}>
              <Text style={styles.normalStyle}>
                {Translation.current_week_progress}:{monthlyData?.weekly_count}
              </Text>
            </View>

            <View style={{ ...styles.btncountcontaiiner, marginTop: 10 }}>
              <Text style={styles.normalStyle}>
                {Translation.current_month_progress}:{monthlyData?.month_count}
              </Text>
            </View>
          </View>

          <View style={styles.monthContainer}>
            {/* <TouchableOpacity onPress={() => dateDecrement()}>
            <FIcon
              name="arrow-left-circle"
              size={25}
              style={{ ...styles.iconStyle }}
            />
          </TouchableOpacity> */}

            <View style={styles.monthContentStyle}>
              <Text
                numberOfLines={1}
                style={{ fontWeight: 'bold', color: '#434343' }}>
                {todaysDate}
              </Text>
            </View>

            <View>
              {/* <TouchableOpacity onPress={() => dateIncrement()}>
              <FIcon
                name="arrow-right-circle"
                size={25}
                style={{ ...styles.iconStyle }}
              />
            </TouchableOpacity> */}
            </View>
          </View>

          <View
            style={{
              ...styles.btncountcontaiiner,
              alignSelf: 'center',
              backgroundColor: '#EFEFEF',
            }}>
            <Text style={styles.countToday}>
              {Translation.today}:{monthlyData?.today_count}
            </Text>
          </View>

          <View style={styles.countercontainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                NumberDecreament();
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
                onChangeText={updateChents}
                keyboardType='number-pad'
                placeholder={Translation.mantra}
                style={{ color: colors.black, fontWeight: '600', fontSize: 22, textAlign: 'center', alignSelf: 'center', minWidth: 10 }}
                placeholderTextColor={colors.placeholder}
                maxLength={previousChent?.count?4:3}
                value={number ? number.toString() : ''}
                numberOfLines={1}
              />
            </View>

            <TouchableOpacity
              style={{ ...styles.iconContainer, borderColor: 'green' }}
              onPress={() => {
                NumberIncreament();
              }}>
              <EIcon name={'plus'} size={30} style={styles.iconstyle} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={disable}
            onPress={() => handleOnpress()}
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
            onPress={() => navigation.navigate('listpage')}
            style={{
              ...styles.btnContainer,
              width: '50%',
              marginTop: 20,
              backgroundColor: colors.black,
            }}>
            <Text style={styles.textSubmit}>{Translation.submission_list}</Text>
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
                    navigation.navigate('listpage')
                  }}>
                  <Text style={styles.textStyle}>{Translation.ok}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ChantCount;

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

  countercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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

  Bigcountercontainer: {
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
