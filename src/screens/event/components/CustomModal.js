import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../../../utills.js/translation-hook';
import { colors } from '../../../helper/colors';

const CustomModal = ({
  handleSelectedItem,
  selectedItem,
  setselectedItem,
  showModal,
  setShowModal,
  data,
  title
}) => {
  const { Translation } = useTranslation()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}>


      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle, { color: colors.black, fontSize: 18 }]}>{title ? title : Translation.select_event_type} </Text>

          <View style={{ marginTop: 20 }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              ListFooterComponent={() => <View style={{ height: 200 }} />}
              ListEmptyComponent={() => {
                return <ActivityIndicator size={'small'} color={'blue'} />;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectedItem(item)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ width: "90%", alignSelf: 'flex-start' }}>
                      <Text style={styles.modalText}>{item.name}</Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <FIcon
                        name="check-circle"
                        size={20}
                        color={
                          item.name == selectedItem ? 'green' : 'orange'
                        }
                      />
                    </View>

                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Pressable
            style={[styles.buttonClose]}
            onPress={() => setShowModal(!showModal)}>
            <Text style={[styles.textStyle, { fontSize: 18 }]}>{Translation.close} </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
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
    padding: 10,
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
    bottom: 30,
    right: 20,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 7,
    elevation: 5,
    zIndex: 10
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
    alignSelf: 'flex-start'
  },
});
