import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import logo from '../../../assets/images/Logo.png';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountryName,
  getStateName,
  registerMethod,
  targetChantData,
} from '../../redux/actions';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../helper/colors';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';

const Register = ({ navigation }) => {
  const { Translation, isLoading } = useTranslation()

  const [name, setname] = useState('');
  const [age, setage] = useState('');
  const [selectedGender, setGender] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModal, setCountryModal] = useState(false);
  const [stateModata, setstateModata] = useState(false);
  const [countryName, setcountryName] = useState('');
  const [email, setEmail] = useState('');
  const countryRespose = useSelector(
    state => state.AppReducers.countryNamelistData,
  );
  const countryStateLIstData = useSelector(
    state => state.AppReducers.countryStateListData,
  );
  const [selectedState, setselectedState] = useState(null);
  let countryNameData = countryName?.name;
  let stateNameData = selectedState?.name;
  const [dataset, setData] = useState([
    {
      id: 1,
      gender: Translation?.male,
    },
    {
      id: 2,
      gender: Translation?.female,
    },
  ]);

  const profileData = useSelector(state => state.AppReducers.getTargetpledge);
  useEffect(() => {
    if (profileData != null) {
      if (profileData[0].name !== '' && profileData[0].name !== null) {
        setname(profileData[0].name);
      }
      if (profileData[0].age !== '' && profileData[0].age !== null) {
        setage(profileData[0].age);
      }
      if (profileData[0].email !== '' && profileData[0].email !== null) {
        setEmail(profileData[0].email);
      }
      if (profileData[0].gender !== '' && profileData[0].gender !== null) {
        setGender(profileData[0].gender);
      }
    }
  }, [profileData]);
  
  useEffect(() => {
    dispatch(getCountryName());
    dispatch(getStateName());
  }, []);

  const handleGenderSElect = item => {
    setGender(item.gender);
    setModalVisible(false);
  };

  const dispatch = useDispatch();
  const handleOnpress = () => {
    let data = {
      name,
      age,
      selectedGender,
      countryNameData,
      stateNameData,
      email,
    };
    dispatch(registerMethod(data));
    dispatch(targetChantData());
  };

  const handleOnpressCountry = item => {
    setcountryName(item);
    setCountryModal(false);
  };

  const handlestateFuction = () => {
    setstateModata(true);
    if (countryName) {
      dispatch(getStateName(countryName.id));
    } else {
      alert('please select country');
    }
  };

  const handleselectState = item => {
    setselectedState(item);
    setstateModata(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.orange }} >
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: colors.white }}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Image
            style={{
              width: 148,
              height: 148,
              borderRadius: 100,
              resizeMode: 'contain',
            }}
            source={logo}
          />
        </View>

        <Text style={styles.loginText}>{Translation.login_to_your_account}</Text>
        <View>
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setname}
            placeholderTextColor={'#808080'}
            value={name}
            placeholder={Translation.Enter_your_Name}
          />

          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setage}
            placeholderTextColor={'#808080'}
            value={age}
            placeholder={Translation.enter_age}
          />
          <TextInput
            style={styles.TextInputStyle}
            onChangeText={setEmail}
            placeholderTextColor={'#808080'}
            value={email ? email.includes('@') ? email : null : null}
            placeholder={Translation.email}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              ...styles.TextInputStyle,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={{ color: colors.black }}>
              {selectedGender != ''
                ? selectedGender != null
                  ? selectedGender
                  : Translation.Select_gender
                : Translation.Select_gender}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCountryModal(true)}
            style={{
              ...styles.TextInputStyle,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={{ color: colors.black }}>
              {countryName.name ? countryName.name : Translation.country_name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={countryName.name ? false : true}
            onPress={() => handlestateFuction()}
            style={{
              ...styles.TextInputStyle,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text style={{ color: colors.black }}>
              {selectedState?.name ? selectedState?.name : Translation.state}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleOnpress()}
          style={styles.touchableStyle}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 28 }}>
            {Translation.submit}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              width: '100%',
              alignContent: 'center',
              paddingHorizontal: 20,
              alignSelf: 'center',
              backgroundColor: '#00000088',
              flex: 1,
              justifyContent: 'center',
            }}>
            <FlatList
              data={dataset}
              keyExtractor={item => item.id}
              contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 320,
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleGenderSElect(item)}
                    style={{
                      height: 50,
                      width: '100%',
                      backgroundColor: 'white',
                      borderWidth: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Text style={{ color: 'black' }}>{item.gender}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={countryModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setCountryModal(!countryModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCountryModal(!countryModal)}>
                <Text style={styles.textStyle}>{Translation.cancel}</Text>
              </Pressable>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={countryRespose}
                  keyExtractor={item => item.id}
                  ListFooterComponent={() => <View style={{ height: 200 }} />}
                  ListEmptyComponent={() => {
                    return <ActivityIndicator size={'small'} color={'blue'} />;
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handleOnpressCountry(item)}
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
                            item.name == countryName.name ? 'green' : 'orange'
                          }
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={stateModata}
          onRequestClose={() => {
            setstateModata(!stateModata);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setstateModata(!stateModata)}>
                <Text style={styles.textStyle}>{Translation.close}</Text>
              </Pressable>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={countryStateLIstData}
                  keyExtractor={item => item.id}
                  ListFooterComponent={() => <View style={{ height: 200 }} />}
                  ListEmptyComponent={() => {
                    return <ActivityIndicator size={'small'} color={'blue'} />;
                  }}
                  renderItem={({ item }) => {
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
                            item.name == selectedState?.name ? 'green' : 'orange'
                          }
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>

  );
};

export default Register;

const styles = StyleSheet.create({
  loginText: {
    fontSize: 23,
    fontWeight: '400',
    alignSelf: 'center',
    color: '#944A45',
  },
  TextInputStyle: {
    height: 69,
    width: '100%',
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    color: 'black',
  },
  touchableStyle: {
    height: 69,
    width: '100%',
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    borderColor: '#ECE1B8',
    backgroundColor: '#F7941C',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});
