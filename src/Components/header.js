import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import user from '../../assets/images/user.png';
import logo from '../../assets/images/Logo.png';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { targetChantData } from '../redux/actions';
import { useTranslation } from '../utills.js/translation-hook';
// import useTranslation from 'react-i18next';

const HeaderPage = ({containerStyle}) => {
  // const {t} =  useTranslation()
  const { Translation } = useTranslation()

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  useEffect(() => {
    dispatch(targetChantData());
  }, []);
  return (
    <View style={[styles.headerContainer,containerStyle]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeStack')}
        style={{ left: 10 }}>
        <Image
          source={logo}
          style={{ height: 55, width: 55, left: 0, borderRadius: 100 }}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={{ ...styles.textStyle, fontSize: 22,flex:1, color: 'white' }}>
          {Translation.geeta_jeevan_geet}
        </Text>
        <Text
          style={{
            ...styles.textStyle,
            fontSize: 12,
            color: 'black',
            fontWeight: 'bold',
            flex:1
          }}>
          {Translation.eighteen_verse_gita_recitation_campaign}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('setting')}
        style={{
          height: 55,
          width: 55,
          right: 0,
          borderRadius: 100,
          backgroundColor: 'white',
          right: 10,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',

        }}
      >
        {datapledge[0]?.name == null || datapledge[0]?.name == '' ? (
          <Image
            source={user}
            style={{ height: 55, width: 55, right: 0, borderRadius: 100 }}
          />
        ) : (
          <View
          >
            <Text style={{ fontSize: 18, color: 'black' }}>{datapledge[0]?.name[0]}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingVertical:5

  },
  textContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex:1
  },
  textStyle: {
    alignSelf: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    marginTop: 18,
    fontSize: 22,
  },
});
