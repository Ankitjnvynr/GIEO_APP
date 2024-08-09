import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { isDate } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { setPledge, setcoditionalStatus, targetChantData } from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import PledgRow from '../../Components/PledgRow';

const SankalpScreen = () => {
  const { Translation, isLoading, getFormatedString } = useTranslation()
  const pledgeDataStore = useSelector(state => state.AppReducers.getTargetpledge);
  const [targetDate, setTargetDate] = useState('')

  const [dailyCount, setSailyCount] = useState(0)
  const [weekCountNummber, setWeekCountNummber] = useState(0)
  const [monthCountNumber, setMonthCountNumber] = useState(0)

  const [count, setCount] = React.useState('0000');
  const dispatch = useDispatch();
  const inputRef = useRef();


  const handleOnsubmit = async () => {
    inputRef.current.clear();
    dispatch(setcoditionalStatus(true));
    dispatch(setPledge(count));
    await AsyncStorage.setItem('pledge', JSON.stringify(count));
    setCount(0);
  };

  useEffect(() => {
    dispatch(targetChantData());
  }, []);


  useEffect(() => {
    if (pledgeDataStore != null && pledgeDataStore.length > 0) {
      const default_count = pledgeDataStore[0].default_count
      const target_count = pledgeDataStore[0].target_count
      const count = target_count ? target_count : default_count
      const target_date = pledgeDataStore[0].target_date
      setCount(count);
      setTargetDate(target_date)
    } else {
      setCount(0);
    }
  }, [pledgeDataStore])

  const handleOnPress = async () => {
    await AsyncStorage.setItem('pledge', JSON.stringify(5265));
    dispatch(setcoditionalStatus(true));
  }

  useEffect(() => {
    handleTargetDate(targetDate,count)
  }, [targetDate,count])


  const handleTargetDate = (target_date,count) => {
    let currentDateData = moment(new Date(), 'DD-MM-YYYY');
    let targetDate = moment(target_date, 'DD-MM-YYYY');
    let noOfDays = targetDate.diff(currentDateData, 'days');

    let dailyCount = count / noOfDays
    let weekCountNummber = dailyCount * 7
    let monthCountNumber = dailyCount * 30

    setSailyCount(dailyCount)
    setWeekCountNummber(weekCountNummber)
    setMonthCountNumber(monthCountNumber)
  }

  return (
    <SafeAreaView style={styles.container} >
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      <View style={[styles.container, { paddingHorizontal: 20 }]}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} >
          <Text style={styles.myPledge}>{Translation.my_pledge} </Text>
          <Text style={[styles.desctext, { textAlign: 'justify' }]}>
            {Translation.my_pledge_description}
          </Text>
          <Text style={{ ...styles.desctext, fontWeight: 'bold', }}>
            {getFormatedString(Translation.by_geeta_jayanti, {
              target_date: targetDate
            })}
          </Text>
          <Text style={{ ...styles.desctext, fontWeight: 'bold', color: '#F7941C' }}>
            {Translation.ashtadash_shloki_geeta_path}
          </Text>
          <Text style={{ ...styles.desctext, fontWeight: 'bold' }}>
            {Translation.resolve_to}
          </Text>
          <View style={styles.textInputStyleContainer}>
            <TextInput
              placeholder={'0000'}
              onChangeText={setCount}
              ref={inputRef}
              style={styles.textInputStyle}
              inputMode="numeric"
              maxLength={5}
              placeholderTextColor={'#808080'}
              autoFocus={true}
            />
          </View>
          <Text style={styles.chalisaText}>
            {Translation.fixed_number}
          </Text>

          <PledgRow
            containerStyle={{ marginTop: 20, borderTopRightRadius: 5, borderTopLeftRadius: 5, }}
            count={Math.round(dailyCount) < 1 ? 1 : Math.round(dailyCount)}
            title={Translation.daily}
          />

          <PledgRow
            containerStyle={{ borderTopWidth: 0 }}
            count={Math.round(weekCountNummber)}
            title={Translation.weekly}
          />

          <PledgRow
            containerStyle={{ borderTopWidth: 0 }}
            count={Math.round(monthCountNumber)}
            title={Translation.monthly}
          />

          <PledgRow
            containerStyle={{ borderTopWidth: 0, borderBottomRightRadius: 5, borderBottomLeftRadius: 5 }}
            count={Math.round(count)}
            title={Translation.total}
          />

          <View style={{ paddingHorizontal: 30 }}>
            <TouchableOpacity
              onPress={() => handleOnsubmit()}
              style={styles.submitContainer}>
              <Text style={styles.submittext}>
                {Translation.surrender}
              </Text>
            </TouchableOpacity>

            <View style={styles.withoutPledge}>
              <Text style={{ fontSize: 10, color: 'black', alignSelf: 'center' }}>{Translation.note}:</Text>
              <Text style={{ fontSize: 10, color: 'black' }}>
                {Translation.note_description}
              </Text>
            </View>

            <TouchableOpacity onPress={() => handleOnPress()}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'orange',
                  textDecorationLine: 'underline',
                  textDecorationColor: 'orange'
                }}>
                {Translation.enter_without_resolution}
              </Text>

            </TouchableOpacity>
          </View>
          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SankalpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myPledge: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30,
  },
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  desctext: {
    fontSize: 19,
    fontWeight: '400',
    color: 'black',
    marginTop: 20,
  },
  textInputStyleContainer: {
    width: 130,
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 50,
  },
  textInputStyle: {
    fontSize: 19,
    color: 'black',
  },
  chalisaText: {
    fontSize: 30,
    color: 'orange',
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 20,
  },
  pledgeDate: {
    fontSize: 17,
    color: 'black',
    alignSelf: 'center',
    marginTop: 10,
  },

  submitContainer: {
    paddingHorizontal: '30%',
    height: 45,
    backgroundColor: '#F7941C',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    shadowOffset: 10,
    shadowColor: '#E5CE004F',
    shadowOpacity: 0.3,
  },
  submittext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  withoutPledge: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  lastText: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    color: '#F7941C',
  },
});
