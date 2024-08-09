import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Pdf from 'react-native-pdf';
import FIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../helper/colors';
import { getPdfData, languageList } from '../../../redux/actions';
import Constants from '../../../utills.js/Constants';
import { useTranslation } from '../../../utills.js/translation-hook';

const ReadPdfScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const { Translation,isLoading } = useTranslation()
  const [selected, setSelected] = useState({
    id: 17,
    title: 'App PDF Setting',
    short_content: '21',
    file_short_content:
      `${Constants.READ_PDF_URL}/public/uploads/all/21/Single-Page-Setting-English.pdf`,
    content: null,
    lang: 'en',
    create_at: '2023-07-18T12:47:47.000000Z',
    updated_at: '2023-07-20T09:22:33.000000Z',
  });
  const pdfList = useSelector(state => state.AppReducers.pdfList);
  const completeList = useSelector(state => state.AppReducers.languageList);

  const previousValue = useRef(null);
  const [scaleByFinger, setscaleByFinger] = useState(0)

  useEffect(() => {
    previousValue.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    dispatch(languageList());
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPdfData());
  }, []);

  const handleOnpressLanguage = _item => {
    let _data = {}
    _data = pdfList[0].translations.find(item => item.lang == _item.code);
    if (_data.file_short_content) {
      setSelected(_data);
      setModalVisible(false);
    } else {
      _data = pdfList[0].translations.find(item => item.lang == 'en');
      setSelected(_data);
      setModalVisible(false);
    }
  };

  const handleOnpress = () => {
    setModalVisible(true);
  };

  const [zoom, setZoom] = useState(1);
  const zoomIncrease = () => {
    if (scaleByFinger > 0) {
      setZoom(scaleByFinger + 0.1);
      setscaleByFinger(0)
    } else {
      setZoom(zoom + 0.1);
    }
  };

  const zoomdecrease = () => {
    if (scaleByFinger > 0) {
      setZoom(scaleByFinger - 0.1);
      setscaleByFinger(0)
    } else {
      setZoom(zoom - 0.1);
    }
  };

  const renderActivityIndicator = () => {
    return (
      <View style={{ borderRadius: 100, backgroundColor: colors.white }} >
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            alignSelf: 'center',
            position: 'absolute',
            top: 20
          }}>
          {Math.floor(downloadProgress * 100)}{'%'}
        </Text>
        <ActivityIndicator color={colors.orange} size={60} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
          
      {
        previousValue.current >= currentPage ?
          <View style={styles.monthContainer}>
            <TouchableOpacity onPress={zoomdecrease}>
              <FIcon
                name="minus-circle"
                size={40}
                style={{ ...styles.iconStyle }}
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.monthContentStyle}
                onPress={() => handleOnpress()}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {Translation.select_language}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  alignSelf: 'center',
                  marginTop: 2,
                }}>
                {currentPage}/{totalPage}
              </Text>
            </View>
            <TouchableOpacity onPress={zoomIncrease}>
              <FIcon name="plus-circle" size={40} style={{ ...styles.iconStyle }} />
            </TouchableOpacity>
          </View> : null}

      <Pdf
        trustAllCerts={false}
        source={{
          uri: selected?.file_short_content,
        }}
        page={1}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage(page);
        }}
        fitPolicy={Dimensions.get('window').width}
        scale={zoom}
        renderActivityIndicator={renderActivityIndicator}
        onLoadProgress={percentage => {
          setDownloadProgress(percentage)
        }}
        onScaleChanged={(scale) => {
          setscaleByFinger(scale)
        }}
        onLoadComplete={numberOfPages => {
          setTotalPage(numberOfPages);
        }}
        onError={error => console.log('show error', error)}
        onPressLink={link => Linking.openURL(link)}
        spacing={10}
        style={{
          height: Dimensions.get('window').height - 190,
          width: Dimensions.get('window').width,
        }}
      />

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
            <Text style={[styles.textStyle, { fontSize: 22 }]}>{Translation.select_language}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>{Translation.cancel}</Text>
            </Pressable>
            <View style={{ flex: 1, paddingBottom: 5 }}>
              <FlatList
                data={completeList}
                keyExtractor={item => item.id}
                ListFooterComponent={() => <View style={{ height: 200 }} />}
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
                      <Icon
                        name="check-circle"
                        size={20}
                        color={
                          'orange'
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
    </SafeAreaView>
  );
};

export default ReadPdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  iconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: '#BB6646',
    opacity: 0.7,
  },
  monthContentStyle: {
    minWidth: "40%",
    borderWidth: 2,
    fontWeight: 'bold',
    height: 53,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'orange',

  },
  container: {
    flex: 1,
  },
  submitstyle: {
    marginTop: 20,
    backgroundColor: '#F7941C',
    width: '85%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    color: 'black',
  },
  currentText: {
    fontSize: 12,
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
  button: {
    padding: 10,
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
  countBtn: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 100,
  },
});