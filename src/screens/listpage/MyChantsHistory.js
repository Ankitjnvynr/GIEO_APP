import { useIsFocused } from '@react-navigation/native';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,SafeAreaView
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import { chantHistory, setMyChantsList, setPreviousChant } from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import Constants from '../../utills.js/Constants';

const MyChantsHistory = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { Translation, isLoading } = useTranslation()

  const dispatch = useDispatch();
  const monthlyData = useSelector(
    state => state.AppReducers.getCurrentCountData,
  );
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  const mySelectedEvent = useSelector(state => state.AppReducers.mySelectedEvent);
  const chantsHistoryList = useSelector(state => state.AppReducers.myChantsList);

  useEffect(() => {
    if (isFocused) {
      if (mySelectedEvent) {
        handleMyChantHistory()
      }
    }
  }, [isFocused]);

  const handleChantCountEdit = (val) => {
    dispatch(setPreviousChant(val))
    navigation.navigate("MyChantsCount")
  }

  const handleMyChantHistory = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${Constants.BASE_URL}events-history/${mySelectedEvent?.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        dispatch(setMyChantsList(res?.data))
      })
      .catch(error => console.log('error', error));
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0,
        }}>
        <View
          style={{
            borderWidth: 1,
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            borderTopWidth: 0,
            borderRightWidth: 0,
            height: 46,
            borderColor: '#F7941C',
          }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
              color: colors.black,
              marginLeft: 10,
            }}>
            {item?.date ? item?.date : moment(item?.create_at).format('DD-MMM-YYYY')}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderTopWidth: 0,
            width: '60%',
            justifyContent: 'space-around',
            alignContent: 'center',
            alignItems: 'center',
            height: 46,
            borderColor: '#F7941C',
            flexDirection: 'row',
            paddingHorizontal: 10,

          }}>
          <Text
            style={{ fontSize: 18, marginTop: 10, color: colors.black, flex: 1, textAlign: 'center' }}>
            {item.count}
          </Text>
          <EIcon
            name="pencil"
            style={{
              color: colors.black,
              fontSize: 18,
              left: 0,
            }}
            onPress={() => handleChantCountEdit(item)}
          />
        </View>
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

        <TouchableOpacity
          style={styles.userNameContainer}
          onPress={() => navigation.navigate('register')}>
          <Text style={styles.userText}>
            {' '}
            {datapledge[0]?.name == null || datapledge[0]?.name == ''
              ? Translation.name
              : datapledge[0]?.name}
          </Text>

          <AIcon
            name={'caretdown'}
            size={12}
            style={{ marginLeft: 10, color: colors.black }}
          />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            color: colors.black,
            marginTop: 20,
          }}>
          {Translation.submissions_list}
        </Text>

        <View style={{ paddingHorizontal: 30, borderRadius: 10, marginBottom: 100 }}>
          <FlatList
            data={chantsHistoryList}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: 100,
              marginBottom: 100

            }}
            style={{ paddingHorizontal: 0, marginTop: 20, borderWidth: 0 }}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0,
                  }}>
                  <View
                    style={{
                      borderTopLeftRadius: 10,
                      borderWidth: 1,
                      borderRightWidth: 0,
                      width: '40%',
                      height: 46,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderColor: '#F7941C',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.black,
                      }}>
                      {Translation.date}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      width: '60%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: 46,
                      borderColor: '#F7941C',
                      borderTopRightRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.black,
                        marginLeft: 20,
                      }}>
                      {Translation.count}
                    </Text>
                  </View>

                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0,
                    paddingBottom: 100,
                    marginBottom: 50,

                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      width: '40%',
                      height: 46,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderColor: '#F7941C',
                      borderBottomLeftRadius: 10,
                      borderRightWidth: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.black,
                      }}>
                      {Translation.old_counts}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      width: '60%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      height: 46,
                      borderBottomRightRadius: 10,
                      borderColor: '#F7941C',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: colors.black,
                        marginLeft: 20,
                      }}>
                      {monthlyData?.life_time_count}
                    </Text>
                  </View>

                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyChantsHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white

  },
  backContainer: {
    height: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    
  },

  userNameContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15,
    padding: 8,
    minWidth: "50%",
  },

  userText: {
    fontSize: 23,

    color: colors.black,

    fontWeight: '500',
  },
  insideContainer: {
    height: 70,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  numberText: {
    fontSize: 18,
    color: colors.black,
  },
  currentText: {
    fontSize: 12,
    color: colors.black,
  },
});
