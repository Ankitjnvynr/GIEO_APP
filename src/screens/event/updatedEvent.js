import { Dimensions, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../helper/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import moment from 'moment';
import HeaderPage from '../../Components/header';
import { navigationRef } from '../../../App';
import { getMyEvent } from '../../redux/actions';
import Loader from '../../Components/Loader';
import { useTranslation } from '../../utills.js/translation-hook';
const windowWidth = Dimensions.get('window').width;
const UpdatedEvent = () => {
  const dispatch = useDispatch()
  const currentEvent = useSelector(state => state.EventReducer.locationUpdated);
  const { Translation, isLoading } = useTranslation()

  const handleOnpress = () => {
    dispatch(getMyEvent())
    navigationRef.navigate("myEvent")
  }

  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
    <View style={{ flex: 1,backgroundColor:colors.white }} >
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />

      <TouchableOpacity onPress={() => handleOnpress()} style={{ justifyContent: 'center:', alignContent: 'center', alignSelf: 'center', marginTop: 20 }}>
        <Text style={{ color: 'red', textDecorationLine: 'underline', }}>{Translation.my_events}</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.iconContianer}
        onPress={() => handleOnpress()}
      >
        <View style={{ width: '90%' }}>
          <View style={styles.singleItem}>
            <IconV name="globe" size={18} color={"black"} />
            <Text numberOfLines={2} style={styles.textStyle}>
              {currentEvent.event_type}
            </Text>
          </View>
          <View style={styles.itemlistcontainer}>
            <View style={styles.oneItem}>
              <Icon name="calendar" size={15} color={"black"} />
              <Text style={{ ...styles.textStyle, fontSize: 14 }}>
                {moment(currentEvent?.create_at).format('DD-MMM-YYYY')}
              </Text>
            </View>
            <View style={styles.oneItem}>
              <IconE name="location" size={15} color={"black"} />
              <Text style={{ ...styles.textStyle, fontSize: 14 }}>
                {currentEvent.place_type}
              </Text>
            </View>
            <View style={{ ...styles.oneItem }}>
              <IconF name="users" size={15} color={"black"} />
              <Text style={{ ...styles.textStyle, fontSize: 14 }}>
                {currentEvent.participants}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Icon name="right" color={colors.black} size={25} />
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default UpdatedEvent

const styles = StyleSheet.create({
  iconContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#faebd4',
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#526cff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  singleItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },

  oneItem: {
    width: windowWidth / 3,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  locatoionText: {
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },

  textHeader: {
    top: -11,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    width: 100,
    left: 20,
  },
  textINput: {
    marginLeft: 15,
  },
  firstTextinput: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  secondList: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'lightgrey',
    height: 60,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  haderStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  firstBlock: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  calenderStyle: {
    marginTop: 20,
    width: '47%',
  },
  calenderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: 'brown',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  saveText: {
    color: 'white',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft:5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  itemlistcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})