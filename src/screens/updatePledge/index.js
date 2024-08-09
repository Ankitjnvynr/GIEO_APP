import moment from 'moment';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../../App';
import HeaderPage from '../../Components/header';
import {
  setPledge,
  targetChantData
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';
import { colors } from '../../helper/colors';

const UpdatePledge = () => {
  const { Translation, isLoading, getFormatedString } = useTranslation()

  const [count, setCount] = React.useState('');
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  const targetCountDAta = datapledge[0]?.target_count;
  const target_date = datapledge[0].target_date

  const dispatch = useDispatch();
  const handleOnsubmit = () => {
    dispatch(setPledge(count));
    navigationRef.navigate('setting');
  };

  useEffect(() => {
    setCount(targetCountDAta);
    if (datapledge != null && datapledge.length > 0) {
      const default_count = datapledge[0].default_count
      const target_count = datapledge[0].target_count
      const count = target_count ? target_count : default_count
      setCount(count);
    } else {
      setCount(0);
    }
  }, [datapledge]);

  useEffect(() => {
    dispatch(targetChantData());
  }, []);

  let currentDateData = moment(new Date(), 'DD-MM-YYYY');
  let targetDate = moment(target_date, 'DD-MM-YYYY');
  let noOfDays = targetDate.diff(currentDateData, 'days');

  let dailyCount = count / noOfDays
  let monthCountNumber = dailyCount * 30
  let weekCountNummber = dailyCount * 7

  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      <View style={styles.container}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        {datapledge ? (
          <ScrollView>
            <Text style={styles.myPledge}>{Translation.my_pledge} </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.desctext}>
                {Translation.my_pledge_description}
              </Text>
            </View>
            <Text style={{ ...styles.desctext, marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
              {getFormatedString(Translation.by_geeta_jayanti, {
                target_date: target_date
              })}
            </Text>
            <Text style={{ ...styles.desctext, marginTop: 10, fontWeight: 'bold', fontSize: 22, color: '#F7941C' }}>
              {Translation.ashtadash_shloki_geeta_path}
            </Text>
            <Text style={{ ...styles.desctext, marginTop: 10, fontWeight: 'bold', fontSize: 18 }}>
              {Translation.resolve_to}
            </Text>
            <View style={styles.textInputStyleContainer}>
              <TextInput
                placeholder={'00000'}
                onChangeText={setCount}
                value={String(count)}
                style={styles.textInputStyle}
                inputMode="numeric"
                maxLength={5}
                placeholderTextColor={'#808080'}

              />
            </View>
            <Text style={styles.chalisaText}>
              {Translation.fixed_number}
            </Text>


            <View
              style={{ ...styles.graph1line, marginTop: 20, borderBottomWidth: 0 }}>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>{Translation.daily}</Text>
              </View>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>
                  {Math.round(dailyCount) < 1 ? 1 : Math.round(dailyCount)}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>{Translation.weekly} </Text>
              </View>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>
                  {Math.round(weekCountNummber)}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>{Translation.monthly}</Text>
              </View>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>
                  {' '}
                  {Math.round(monthCountNumber)}
                </Text>
              </View>
            </View>
            <View style={styles.graph1line}>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>{Translation.total}</Text>
              </View>
              <View style={styles.graphinside}>
                <Text style={styles.graphText}>{count ? count : '0000'}</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
              <TouchableOpacity
                onPress={() => handleOnsubmit()}
                style={styles.submitContainer}>
                <Text style={styles.submittext}> {Translation.surrender}</Text>
              </TouchableOpacity>
              <View style={styles.withoutPledge}>
                <Text style={{ fontSize: 12, color: 'black' }}>{Translation.note}:</Text>
                <Text style={{ fontSize: 12, color: 'black' }}>
                  {Translation.note_description}
                </Text>
              </View>
            </View>
            <View style={{ height: 60 }} />
          </ScrollView>
        ) : (
          <ActivityIndicator size={'large'} color={'red'} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UpdatePledge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
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
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
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
    textAlign: 'center'
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
  graph1line: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F7941C',
    borderRightWidth: 0,
    //
  },
  graphinside: {
    width: 140,
    borderRightWidth: 1,
    borderColor: 'orange',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  graphText: {
    fontSize: 16,
    color: 'black',
  },
  submitContainer: {
    width: '100%',
    height: 45,
    backgroundColor: '#F7941C',
    alignSelf: 'center',
    alignContent: 'center',
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
    paddingHorizontal: 10,
    width: '90%',
  },
  lastText: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
    color: '#F7941C',
  },
});
