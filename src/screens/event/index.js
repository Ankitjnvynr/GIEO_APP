import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
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
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import {
  getAllEvent,
  getEventPlace,
  getEventType,
  getMyEvent,
  setMySelectedEvent,
  targetChantData,
} from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';
import CustomModal from './components/CustomModal';
import { EventRowMemo } from './components/EventRow';

const windowWidth = Dimensions.get('window').width;


const EventPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const allEventData = useSelector(state => state.EventReducer.allEventData);
  const eventtypeData = useSelector(state => state.EventReducer.eventTypeData);
  const accessToken = useSelector(state => state.AuthReducer.accessToken);
  // console.log('accessToken:::',accessToken);
  const eventPlaceData = useSelector(
    state => state.EventReducer.eventPlaceData,
  );
  const [EventData, setEventData] = useState([]);

  const [selectedItem, setselectedItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [eventType, seteventType] = useState(eventtypeData[0]?.name);
  const [showModalEventTyope, setShowModalEventTyope] = useState(false);

  const [placeType, setplaceType] = useState(eventPlaceData[0]?.name);
  const [showModalPlaceType, setshowModalPlaceType] = useState(false);
  const myEventData = useSelector(state => state.EventReducer.myEvent);
  const [editLoder, setEditLoder] = useState(false)
  const { Translation, isLoading, getFormatedString } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemFromList, setSelectedItemFromList] = useState({});

  const [data, setData] = useState([
    { name: Translation.all_event, id: 1 },
    { name: Translation.my_events, id: 2 },
  ])
  const profileDetail = useSelector(state => state.AppReducers.getTargetpledge);

  useEffect(() => {
    setselectedItem(data[0].name)
    dispatch(targetChantData());
    dispatch(getAllEvent());
    dispatch(getEventType());
    dispatch(getEventPlace());
    dispatch(getMyEvent());
  }, []);


  useEffect(() => {
    setEventData(allEventData);
  }, [allEventData]);

  const handleModalVisible = () => {
    setShowModal(true);
  };

  const filterEvent = item => {
    let newData = allEventData?.filter(val => item === val.event_type);
    setEventData(newData);
  };

  const handleSelectedItem = item => {
    setselectedItem(item.name);
    if (item.id == 1) {
      setEventData(allEventData);
    } else if ((item.id = 2)) {
      setEventData(myEventData);
    }
    setShowModal(false);
  };

  const handleEventTypeFunction = item => {
    seteventType(item.name);
    filterEvent(item.name);
    setShowModalEventTyope(false);
  };

  const handlePlacetypeFunction = item => {
    setplaceType(item.name);
    filterEvent(item.name);
    let newData = allEventData?.filter(val => item.name == val.place_type);
    setEventData(newData);
    setshowModalPlaceType(false);
  };



  useEffect(() => {
    setEditLoder(true)
    if (myEventData != null && EventData != null && EventData.length > 1) {
      setTimeout(() => {
        setEditLoder(false)
      }, 1000)

    }
    setEditLoder(false)
  }, [myEventData, placeType, eventType]);



  const handleFilter = (input) => {
    const text = input.toLowerCase()
    var filteredData = EventData.filter((item, i) => {
      if (item.event_type == null || item.event_type == undefined && item?.event_type?.includes(text)) {
        return
      }
      const event_type = item.event_type.toLowerCase()
      return event_type?.includes(text)
    })
    if (text == '') {
      setEventData(allEventData)
    } else {
      setEventData(filteredData)
    }
  }


  const validateCurrentUser = (phone, email) => {
    if (profileDetail && profileDetail?.length > 0) {
      return profileDetail[0]?.phone?.includes(phone) || profileDetail[0]?.email?.includes(email)
    } else {
      return false
    }
  }

  const onEventPress = item => {
    setModalVisible(true);
    setSelectedItemFromList(item);
    dispatch(setMySelectedEvent(item)) // using data in MyChantsHistory
  };



  const handleDetailsPage = item => {
    setModalVisible(false);
    navigation.navigate('details', { data: item, isCurrentUser: validateCurrentUser(item?.phone, item?.email) });
  };

  const onPencilClick = () => {
    setModalVisible(!modalVisible)
    navigation.navigate('form', { data: selectedItemFromList })
  }

  const renderItem = ({ item, index }) => {
    return (
      <EventRowMemo
        item={item}
        index={index}
        navigation={navigation}
        onEventPress={onEventPress}
        validateCurrentUser={validateCurrentUser}
      />
    );
  };

  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  

      <View style={{ flex: 1,backgroundColor:colors.white }}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        {editLoder ? <ActivityIndicator size={'large'} /> : null}
        <View style={styles.container}>
          <View style={styles.firstRowStyle}>
            <Text style={styles.eventText}>{Translation.events}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('form')}
              style={styles.addGroupBtn}>
              <Text style={styles.addText}>{Translation.add_group_or_event}</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.btnContainersss}>
            <TouchableOpacity
              style={styles.eventBtn}
              onPress={() => handleModalVisible()}>
              <Text numberOfLines={1} style={styles.btnTextall}>
                {selectedItem ? selectedItem : Translation.all_event}
              </Text>
              <Icon name="down" color='#4d4c4a' size={10} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.eventBtn}
              onPress={() => setShowModalEventTyope(true)}>
              <Text maxLength={2} numberOfLines={1} style={styles.btnTextall}>
                {' '}
                {eventType ? eventType : Translation.event_type}
              </Text>
              <Icon name="down" color='#4d4c4a' size={10} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.eventBtn}
              onPress={() => setshowModalPlaceType(true)}>
              <Text numberOfLines={1} style={styles.btnTextall}>
                {' '}
                {placeType ? placeType : Translation.place_type}
              </Text>
              <Icon name="down" color='#4d4c4a' size={10} />
            </TouchableOpacity>
          </View>

          <CustomModal
            data={data}
            selectedItem={selectedItem}
            setselectedItem={setselectedItem}
            showModal={showModal}
            setShowModal={setShowModal}
            handleSelectedItem={handleSelectedItem}
          />
          <CustomModal
            data={eventtypeData}
            selectedItem={eventType}
            setselectedItem={seteventType}
            showModal={showModalEventTyope}
            setShowModal={setShowModalEventTyope}
            handleSelectedItem={handleEventTypeFunction}
          />
          <CustomModal
            data={eventPlaceData}
            selectedItem={placeType}
            setselectedItem={setplaceType}
            showModal={showModalPlaceType}
            setShowModal={setshowModalPlaceType}
            handleSelectedItem={handlePlacetypeFunction}
            title={Translation.select_place_type}
          />
          <View style={styles.textContainer}>
            <TextInput
              placeholder={Translation.find_event}
              onChangeText={handleFilter}
              autoCapitalize="none"
              clearButtonMode="always"
              autoCorrect={false}
              placeholderTextColor={'black'}
              style={{ color: '#111211', flex: 1 }}
            >
            </TextInput>
            <IconF name="search" size={25} color='gray' />
          </View>

          <Text style={styles.textShowingHeadingData}>
            {getFormatedString(Translation.shwoing_out_of_events, {
              eventCount: EventData.length,
              allEvent: EventData.length
            })}
          </Text>

        </View>
        <FlatList
          data={EventData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
          ListFooterComponent={() => {
            return <View style={{ height: 330 }} />;
          }}
          // removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <IconV name="cross" color='brown' size={25} />
              </Pressable>

              <Text style={[styles.txtItem, { marginBottom: 25 }]}>
                {selectedItemFromList?.event_type}
              </Text>

              <View style={styles.fistRow}>
                <Text style={styles.itemHeading}>{Translation.event_id}:{selectedItemFromList?.id}</Text>
                {validateCurrentUser(selectedItemFromList?.phone, selectedItemFromList?.email) ? (
                  <TouchableOpacity style={styles.editIcon} onPress={() => onPencilClick()}>
                    <IconV name="pencil" color='#149103' size={20} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View>
                <Text style={styles.itemHeading}>{Translation.address}:</Text>
                <View style={{ width: '60%' }}>
                  <Text style={styles.textDetails}>
                    {selectedItemFromList?.address}
                  </Text>
                  <Text style={styles.textDetails}>{selectedItemFromList?.country_id}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => handleDetailsPage(selectedItemFromList)}
                  style={{ ...styles.btn, width: 100 }}>
                  <Text style={{ ...styles.textDetails, color: '#fff' }}>
                    {Translation.details}
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text style={{ ...styles.itemHeading, alignSelf: 'flex-end' }}>
                    {Translation.organizer}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <IconV name="old-phone" size={20} color='gray' style={{ marginRight: 5 }} />
                    <Text style={styles.textDetails}>
                      {selectedItemFromList?.organizer}
                    </Text>
                  </View>
                </View>
              </View>
              {validateCurrentUser(selectedItemFromList?.phone, selectedItemFromList?.email) ? (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('MyChantsHistory')
                  }}
                  style={{ ...styles.btn, width: 130, marginTop: 20 }}>
                  <Text style={{ ...styles.textDetails, color: '#fff' }}>
                    {Translation.submission_list}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default EventPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fffdfa'
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
    color: 'black'
  },
  addText: {
    color: 'white',
  },
  eventBtn: {
    width: windowWidth / 3.3,
    paddingHorizontal: 5,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#faf6f0',
    shadowColor: "#526cff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
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
  textContainer: {
    borderWidth: 1,
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
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
    textAlign: 'center'
  },
  flatlistContaner: {
    marginTop: 10,
    height: '100%',
  },
  itemcontainer: {
    height: 80,
    backgroundColor: 'lightgrey',
    marginTop: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 15,
    width: '92%',
    shadowColor: '#000',
    paddingHorizontal: 20,
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
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    top: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  fistRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtItem: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black',
  },
  itemHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textDetails: {
    fontSize: 12,
    color: 'black',
  },
  btn: {
    backgroundColor: 'brown',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  editIcon: {
    padding: 5,
  }
});

