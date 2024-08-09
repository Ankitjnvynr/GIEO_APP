import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderPage from '../../Components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from '../../../App';
import {
  Logout,
  languageList
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import Loader from '../../Components/Loader';
import { colors } from '../../helper/colors';


const SettingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const langList = useSelector(state => state.AppReducers.languageList);

  const [languageListData, setlanguageList] = useState([])
  const { handleUpdateLanuage, selectedLang, handleSelectedLanguage, isLoading, Translation, handleDefaultLanguage } = useTranslation()


  const handleOnpressLanguage = data => {
    handleUpdateLanuage({ langCode: data.code })
    filterLanguageSelection(languageListData, data)
    setModalVisible(false);
    handleSelectedLanguage(data)
  };

  const filterLanguageSelection = (lngList, data) => {
    let newData = []
    if (langList.length > 0) {
      lngList.map((item) => {
        if (item.id == data.id) {
          newData.push({ ...item, isSelected: true })
        } else {
          newData.push({ ...item, isSelected: false })
        }
        setlanguageList(newData)
      })
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(Logout(false));
    } catch (error) {
    }
  };

  const landleLastSelection = async (langList) => {
    const lang = await AsyncStorage.getItem('currentLang')
    const lastSelection = JSON.parse(lang)
    filterLanguageSelection(langList, lastSelection)
  }

  useEffect(() => {
    setlanguageList(langList)
    landleLastSelection(langList)
  }, [langList])


  useEffect(() => {
    dispatch(languageList());
  }, []);

  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      <View style={styles.container}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('update');
          }}
          style={styles.onecontainer}>
          <View style={styles.textCotaier}>
            <Text style={styles.texstyle}>{Translation.my_pledge}</Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.onecontainer}>
          <View style={styles.textCotaier}>
            <Text style={styles.texstyle}>{Translation.select_language} {selectedLang.name}</Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigationRef.navigate('help')}
          style={styles.onecontainer}>
          <View style={styles.textCotaier}>
            <Text style={styles.texstyle}>{Translation.help}</Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigationRef.navigate("event")} style={styles.onecontainer}>
          <View style={styles.textCotaier}>
            <Text style={styles.texstyle}>{Translation.event_and_group}</Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </TouchableOpacity>
        {/* <View style={styles.onecontainer}>
          <View style={styles.textCotaier}>
            <Text style={styles.texstyle}>{Translation.promotional_material}</Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </View> */}
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ ...styles.onecontainer, borderBottomWidth: 0.5 }}>
          <View style={styles.textCotaier}>
            <Text
              style={{
                ...styles.texstyle,
                textDecorationLine: 'underline',
                color: 'blue',
              }}>
              {Translation.log_out}
            </Text>
          </View>
          <View style={styles.iconStylecontainer}>
            <Icon name={'right'} size={10} color={'orange'} />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.textStyle, { fontSize: 26, }]}>{Translation.select_language} </Text>
              {/* Close button */}


              <View style={{ flex: 1 }}>
                <FlatList
                  data={languageListData}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={() => {
                    return (
                      <ActivityIndicator size={'small'} color={'blue'} />
                    )
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handleOnpressLanguage(item)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: 20,
                        }}>
                        <View>
                          <Text style={styles.modalText}>{item.name}</Text>
                        </View>
                        <FIcon
                          name="check-circle"
                          size={20}
                          color={
                            item.isSelected
                              ? 'green'
                              : 'lightgray'
                          }
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>{Translation.close} </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  backContainer: {
    height: 35,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  texttitle: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  onecontainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    height: 40,
  },
  textCotaier: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    left: 20,
  },
  iconStylecontainer: {
    width: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  texstyle: {
    fontSize: 18,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '93%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 20,
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

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'orange',
    alignSelf: 'center',
    right: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 7,
    elevation: 5,
    zIndex: 10
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 22,
    color: '#434343',
  },
  eventstyle: {
    backgroundColor: '#434343',
    width: 240,
    height: 53,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

