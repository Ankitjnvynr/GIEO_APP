import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/Fontisto';
import IonicIcon from 'react-native-vector-icons/Ionicons';

const CustomCountrySelector = ({
  data,
  setModalVisible,
  modalVisible,
  setSelectedItem,
  selectedItem,
  title
}) => {

  const [searchText, setSearchText] = useState('');

  const handleItemSelect = item => {
    setSelectedItem(item);
    setSearchText('');
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              ...styles.centeredView,
              marginTop: 320,
            }}>
            <View
              style={{
                ...styles.modalView,
                height: 390,
              }}>
              <TouchableOpacity
                style={styles.lineStyle}
                onPress={() => setModalVisible(false)}
              />
              <View style={styles.countryNameContener}>
                <Text style={styles.countryNamestyles}>{title} </Text>
                <Icon
                  name="cross"
                  size={20}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View style={styles.searchContainer}>
                <EvilIcon name="search" size={15} />
                <TextInput
                  placeholder="Search your country"
                  clearButtonMode="always"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={'grey'}
                  onChangeText={value => setSearchText(value)}
                  value={searchText}
                  style={styles.textInputStyle}
                // autoCapitalize={false}
                />
              </View>
              {data && (
                <FlatList
                  data={data}
                  keyExtractor={item => item.i}
                  renderItem={({ item }) => {
                    // alert('run');
                    if (searchText === '') {
                      return (
                        <TouchableOpacity
                          onPress={() => handleItemSelect(item)}
                          style={styles.itemContainer}>
                          <Text style={styles.countryNameText}>
                            {item.name}
                          </Text>
                          <IonicIcon
                            name={
                              item.name == selectedItem.name
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={20}
                            color={'pink'}
                          />
                        </TouchableOpacity>
                      );
                    }
                    if (
                      item.name
                        .toLocaleLowerCase()
                        .includes(searchText.toLocaleLowerCase())
                    ) {
                      // console.log('show data item', item);
                      return (
                        <TouchableOpacity
                          onPress={() => handleItemSelect(item)}
                          style={styles.itemContainer}>
                          <Text style={styles.countryNameText}>
                            {item.name}
                          </Text>
                          <IonicIcon
                            name={
                              item.name == selectedItem.name
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={20}
                            color={'pink'}
                          />
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              )}
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CustomCountrySelector;

const styles = StyleSheet.create({
  container: {
    // flex:1
    paddingHorizontal: 20,
  },
  lineStyle: {
    borderBottomWidth: 2,
    alignSelf: 'center',
    width: '20%',
  },
  countryNameContener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  countryNamestyles: {
    fontWeight: 'bold',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 35,
    marginTop: 10,
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    opacity: 0.4,
  },
  textInputStyle: {
    fontSize: 12,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // marginTop: 560,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRadius: 20,
    padding: 10,

    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
    // marginBottom: 15,
    textAlign: 'center',
  },
  countryNameText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  itemContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// <Modal visible={modalVisible} animationType="slide"

// presentationStyle={"formSheet"}
// >
//   <View style={styles.centeredView}>
//     <Button title="Close Modal" onPress={() => setModalVisible(false)} />
//     <FlatList
//       data={countryCodeData}
//       keyExtractor={item => item.name.toString()}
//       renderItem={({item}) => (
//         <TouchableOpacity onPress={() => handleItemSelect(item)}>
//           <Text>{item.name}</Text>
//         </TouchableOpacity>
//       )}
//     />
//   </View>
// </Modal>
