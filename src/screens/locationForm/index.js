import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import Icont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from '../../Components/header';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import CustomPicker from '../../Components/CustomPicker';
import Loader from '../../Components/Loader';
import { colors } from '../../helper/colors';
import {
  getCountryName,
  getEventPlace,
  getStateName,
  updateLocation
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';

const windowWidth = Dimensions.get('window').width;


const LocationForm = ({ route }) => {
  const eventPlacetype = useSelector(
    state => state.EventReducer.eventPlaceData,
  );

  const [name, setName] = useState('');
  const [pin, setpin] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectIconOne, setSelectIconOne] = useState(null);
  const [selectIcontwo, setSelectIcontwo] = useState(null);
  const [countryModal, setCountryModal] = useState(false);
  const [selectedState, setselectedState] = useState(null);
  const [stateModata, setstateModata] = useState(false);
  const [country, setCountry] = useState(null);
  const [cityName, setcityName] = useState('');
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  const currentEvent = useSelector(state => state.EventReducer.currentEvent);
  const countryRespose = useSelector(
    state => state.AppReducers.countryNamelistData,
  );

  const [countrylistData, setcountrylistData] = useState(countryRespose);
  const { Translation, isLoading } = useTranslation()

  const newItem = { id: 0, name: 'select' };

  useEffect(() => {
    if (eventPlacetype[0].name != 'select') {
      eventPlacetype.unshift(newItem);
    }
  }, [eventPlacetype]);

  const handlefirstCheckBox = () => {
    setSelectIconOne('1');
    setSelectIcontwo('0');
  };
  useEffect(() => {
    dispatch(getCountryName());
    // dispatch(getStateName())
  }, []);
  const handleSecondCheckBox = () => {
    setSelectIcontwo('1');
    setSelectIconOne('0');
  };
  const countryStateLIstData = useSelector(
    state => state.AppReducers.countryStateListData,
  );

  useEffect(() => {
    dispatch(getEventPlace());
  }, []);

  const handleOnpressCountry = item => {
    setCountry(item);
    setCountryModal(false);
  };

  const handlestateFuction = () => {
    setstateModata(true);
    if (country) {
      dispatch(getStateName(country.id));
    } else {
      alert('please select country');
    }
  };

  let data = {
    place_name: name,
    place_type: selectedValue?.id,
    pincode: pin,
    CountryState: selectedState?.id,
    is_public_place: selectIconOne,
    country_id: country?.id,
    state_id: selectedState?.id,
    city: cityName,
    address: address,
    id: currentEvent?.id,
  };

  //edited data

  let editedData = {
    place_type: selectedValue,
    pin: pin,
    CountryState: selectedState?.name,
    public_event: selectIconOne,
    country: country?.name,
    address: address,
    city: cityName,
    // id: item?.ID,
  };

  const handleONsubmit = () => {
    setCheck(true);

    if (name == '' && name == null) {
      Alert.alert('Please Enter Place Name');
    } else if (pin == '' && pin == null) {
      Alert.alert('Please Enter Pin');
    } else if (address == '' && address == null) {
      Alert.alert('Please Enter address');
    } else if (selectedValue == null) {
      Alert.alert('Please Enter Place Type');
    } else if (country == null) {
      Alert.alert('Please select country');
    } else if (selectedState == null) {
      Alert.alert('Please select state');
    } else if (cityName == '' && cityName == null) {
      Alert.alert('Please Enter cityName');
    } else {
      // if (route?.params.Editable) {
      //   dispatch(updateMyEvent(editedData));
      // } else {

      dispatch(updateLocation(data));
      // }
    }
  };

  const handleselectState = item => {
    setselectedState(item);
    setstateModata(false);
  };

  const [searchText, setSearchText] = useState('');
  const [searchStateText, setSearchStateText] = useState('');
  const [placeTypeModal, setPlaceTypeModal] = useState(false)


  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.iconContianer}>
            <View style={{ width: '90%' }}>
              <View style={styles.singleItem}>
                <IconV name="globe" size={18} color={colors.black} />
                <Text numberOfLines={2} style={[styles.textStyle, { marginLeft: 5 }]}>
                  {currentEvent.event_type}
                </Text>
              </View>
              <View style={styles.itemlistcontainer}>
                <View style={styles.oneItem}>
                  <Icon name="calendar" size={15} color={colors.black} />
                  <Text style={{ ...styles.textStyle, fontSize: 14, marginLeft: 5 }}>
                    {moment(currentEvent?.create_at).format('DD-MMM-YYYY')}
                  </Text>
                </View>
                <View style={styles.oneItem}>
                  <IconE name="location" size={15} color={colors.black} />
                  <Text style={{ ...styles.textStyle, fontSize: 14, marginLeft: 5 }}>
                    {currentEvent.place_type}
                  </Text>
                </View>
                <View style={{ ...styles.oneItem }}>
                  <IconF name="users" size={15} color={colors.black} />
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
          <View>
            <Text style={styles.locatoionText}>{Translation.location}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ ...styles.textHeader, width: ms(93) }}>
              <Text style={styles.haderStyle}>{Translation.place_name}</Text>
            </View>
            <View style={styles.firstTextinput}>
              <TextInput
                placeholder={Translation.please_enter_name}
                onChangeText={setName}
                value={name}
                placeholderTextColor={colors.black}
                style={styles.textINput}
              />
            </View>
          </View>
          {check && name == '' && (
            <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
          )}

          <View style={{ marginTop: 20 }}>
            <View style={{ ...styles.textHeader, width: ms(100) }}>
              <Text style={styles.haderStyle}>{Translation.place_type}</Text>
            </View>
            <View style={styles.firstTextinput}>
              <CustomPicker
                label="select value"
                data={eventPlacetype}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                modalVisible={placeTypeModal}
                setModelVisibility={()=>setPlaceTypeModal(!placeTypeModal)}
                onClose={()=>setPlaceTypeModal(!placeTypeModal)}
              
                heading ={Translation.select_place_type} 
              />
            </View>
          </View>
          {check && selectedValue == null && (
            <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
          )}

          <View style={{ marginTop: 20 }}>
            <View style={{ ...styles.textHeader, width: ms(148) }}>
              <Text style={styles.haderStyle}>{Translation.list_as_public_event}</Text>
            </View>
            <View style={styles.secondList}>
              <TouchableOpacity
                onPress={() => handlefirstCheckBox()}
                style={styles.firstBlock}>
                <Icont
                  name={
                    selectIconOne == '1' ? 'circle-slice-8' : 'circle-outline'
                  }
                  size={24}
                  color={selectIconOne == '1' ? 'blue' : colors.black}
                />
                <Text style={{ marginLeft: 5, fontSize: 18, color: colors.black }}>
                  {Translation.yes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSecondCheckBox()}
                style={styles.firstBlock}>
                <Icont
                  name={
                    selectIcontwo == '1' ? 'circle-slice-8' : 'circle-outline'
                  }
                  size={24}
                  color={selectIcontwo == '1' ? 'blue' : colors.black}
                />
                <Text style={{ marginLeft: 5, fontSize: 18, color: colors.black }}>
                  {Translation.no}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {check && selectIconOne == null && (
            <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
          )}

          <View style={styles.calenderContainer}>
            <TouchableOpacity
              style={styles.calenderStyle}
              onPress={() => setCountryModal(true)}>
              <View style={{ ...styles.textHeader, width: ms(64) }}>
                <Text style={styles.haderStyle}>{Translation.country}</Text>
              </View>
              <View style={styles.firstTextinput}>
                <Text style={{ alignSelf: 'center', fontSize: 16, color: colors.black }}>
                  {country ? country.name : Translation.select_country}
                </Text>
              </View>
              {check && country == null && (
                <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.calenderStyle}
            //   onPress={()=>setShowModal(true)}
            >
              <View style={{ ...styles.textHeader, width: ms(73) }}>
                <Text style={styles.haderStyle}>{Translation.pin_code}</Text>
              </View>
              <View style={styles.firstTextinput}>
                <TextInput
                  placeholder={Translation.please_enter_pin}
                  placeholderTextColor={colors.black}
                  onChangeText={setpin}
                  value={pin}
                  keyboardType="numeric"
                  maxLength={6}
                  style={styles.textINput}
                />
              </View>
              {check && pin == null && (
                <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ ...styles.textHeader, width: ms(68) }}>
              <Text style={styles.haderStyle}>{Translation.address}</Text>
            </View>
            <View style={styles.firstTextinput}>
              <TextInput
                placeholder={Translation.please_enter_address}
                onChangeText={setAddress}
                value={address}
                placeholderTextColor={colors.black}
                style={styles.textINput}
              />
            </View>
          </View>
          {check && address == '' && (
            <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
          )}

          <View style={styles.calenderContainer}>
            <TouchableOpacity
              style={styles.calenderStyle}
            >
              <View style={{ ...styles.textHeader, width: ms(37) }}>
                <Text style={styles.haderStyle}>{Translation.city}</Text>
              </View>
              <View style={styles.firstTextinput}>
                <TextInput
                  placeholder={Translation.please_enter_city}
                  onChangeText={setcityName}
                  value={cityName}
                  placeholderTextColor={colors.black}
                  style={styles.textINput}
                />
              </View>
              {check && cityName == '' && (
                <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.calenderStyle}
              onPress={() => handlestateFuction()}>
              <View style={{ ...styles.textHeader, width: ms(47) }}>
                <Text style={styles.haderStyle}>{Translation.state}</Text>
              </View>
              <View style={styles.firstTextinput}>
                <Text style={{ alignSelf: 'center', fontSize: 16, color: colors.black }}>
                  {selectedState ? selectedState.name : Translation.select_state}
                </Text>
              </View>
              {check && selectedState == null && (
                <Text style={{ color: 'red', left: 10 }}>{Translation.field__s_required}</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => handleONsubmit()}>
            <Text style={styles.saveText}>{Translation.save_and_continue}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={countryModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setCountryModal(!countryModal);
            }}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => setCountryModal(!countryModal)}>
              <Text style={[styles.textStyle, { color: colors.white, fontWeight: '600', fontSize: 18 }]}>{Translation.close} </Text>
            </Pressable>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.textStyle, { fontWeight: '600', fontSize: 18 }]}>{Translation.select_country} </Text>

                <View style={styles.searchStyle}>
                  <TextInput
                    placeholder={Translation.search_text}
                    onChangeText={value => setSearchText(value)}
                    autoCapitalize="none"
                    clearButtonMode="always"
                    autoCorrect={false}
                    placeholderTextColor={'gray'}
                    style={{ color: '#111211', flex: 1 }}></TextInput>
                  <IconF name="search" size={25} color="gray" />
                </View>
                <View style={{ marginTop: 20 }}>
                  <FlatList
                    data={countrylistData}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 200 }} />}
                    ListEmptyComponent={() => {
                      return <ActivityIndicator size={'small'} color={'blue'} />;
                    }}
                    renderItem={({ item }) => {
                      if (searchText === '') {
                        return (
                          <View>
                            <TouchableOpacity
                              onPress={() => handleOnpressCountry(item)}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View>
                                <Text style={styles.modalText}>{item?.name}</Text>
                              </View>
                              <FIcon
                                name="check-circle"
                                size={20}
                                color={
                                  item.name == country?.name ? 'green' : 'orange'
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      }
                      if (
                        item.name
                          .toLocaleLowerCase()
                          .includes(searchText.toLocaleLowerCase())
                      ) {
                        return (
                          <View>
                            <TouchableOpacity
                              onPress={() => handleOnpressCountry(item)}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View>
                                <Text style={styles.modalText}>{item?.name}</Text>
                              </View>
                              <FIcon
                                name="check-circle"
                                size={20}
                                color={
                                  item.name == country?.name ? 'green' : 'orange'
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {/* state modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={stateModata}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setstateModata(!stateModata);
            }}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => setstateModata(!stateModata)}>
              <Text style={[styles.textStyle, { color: colors.white, fontWeight: '600', fontSize: 18 }]}>{Translation.close} </Text>
            </Pressable>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.textStyle, { fontWeight: '600', fontSize: 18 }]}>{Translation.select_state} </Text>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setstateModata(!stateModata)}>
                  <Text style={styles.textStyle}>{Translation.close}</Text>
                </Pressable>
                <View style={styles.searchStyle}>
                  <TextInput
                    placeholder={Translation.search_text}
                    onChangeText={value => setSearchStateText(value)}
                    autoCapitalize="none"
                    clearButtonMode="always"
                    autoCorrect={false}
                    placeholderTextColor={'gray'}
                    style={{ color: '#111211', flex: 1 }}></TextInput>
                  <IconF name="search" size={25} color="gray" />
                </View>
                <View style={{ marginTop: 20 }}>
                  <FlatList
                    data={countryStateLIstData}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 200 }} />}
                    ListEmptyComponent={() => {
                      return <ActivityIndicator size={'small'} color={'blue'} />;
                    }}
                    renderItem={({ item }) => {
                      if (searchStateText === '') {
                        return (
                          <TouchableOpacity
                            onPress={() => handleselectState(item)}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}>
                            <View>
                              <Text style={styles.modalText}>{item.name}</Text>
                            </View>
                            <FIcon
                              name="check-circle"
                              size={20}
                              color={
                                item.name == selectedState?.name
                                  ? 'green'
                                  : 'orange'
                              }
                            />
                          </TouchableOpacity>
                        );
                      }
                      if (item.name
                        .toLocaleLowerCase()
                        .includes(searchStateText.toLocaleLowerCase())) {
                        return (
                          <TouchableOpacity
                            onPress={() => handleselectState(item)}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}>
                            <View>
                              <Text style={styles.modalText}>{item.name}</Text>
                            </View>
                            <FIcon
                              name="check-circle"
                              size={20}
                              color={
                                item.name == selectedState?.name
                                  ? 'green'
                                  : 'orange'
                              }
                            />
                          </TouchableOpacity>
                        );
                      }

                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: '100%',
  },
  firstRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addGroupBtn: {
    backgroundColor: colors.orange,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  eventText: {
    fontSize: 24,
  },
  addText: {
    color: 'white',
  },
  eventBtn: {
    // borderWidth: 1,
    width: windowWidth / 3.3,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 38,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
  },
  btnContainersss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTextall: {
    fontSize: 14,
    color: colors.black,
    width: 80,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textContainer: {
    borderWidth: 1,
    width: '75%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 42,
  },
  serchContainer: {
    borderWidth: 1,
    width: '23%',
    height: 39,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown',
  },
  searchText: {
    color: colors.white,
  },
  textShowingHeadingData: {
    marginTop: 10,
    color: colors.black,
    fontSize: 16,
  },
  flatlistContaner: {
    marginTop: 10,
    height: '100%',
    // marginBottom:500
  },
  itemcontainer: {
    // borderWidth: 1,
    height: 80,
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },
  textStyle: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemlistcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
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
    color: colors.black,
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
    color: colors.black,
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
    // paddingHorizontal:10
  },
  haderStyle: {
    // color: colors.black,
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    // elevation:2
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
    marginBottom: 50
  },
  saveText: {
    color: 'white',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
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
    backgroundColor: 'orange',
    alignSelf: 'center',
    right: 10,
    position: 'absolute',
    bottom: 60,
    right: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 7,
    elevation: 5,
    zIndex: 10
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.black,
  },
  searchStyle: {
    borderWidth: 1,
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});
