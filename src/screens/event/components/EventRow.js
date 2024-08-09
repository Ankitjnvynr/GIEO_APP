import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import moment from 'moment'
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/Feather';
import { colors } from '../../../helper/colors';

const EventRow = ({ navigation, item, index, validateCurrentUser, onEventPress }) => {
    return (
        <TouchableOpacity
            style={styles.iconContianer}
            onPress={() => onEventPress(item)}
        >
            <View style={{ flex: 1 }}>
                <View style={[styles.oneItem,]}>
                    <IconV name="globe" color='#4d4c4a' size={18} />
                    <Text numberOfLines={2} style={[styles.textStyle, { marginLeft: 5 }]}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.itemlistcontainer}>
                    <View style={[styles.oneItem, {}]}>
                        <Icon name="calendar" color='#4d4c4a' size={15} />
                        <Text style={{ ...styles.textStyle, fontSize: 14, marginLeft: 5 }}>
                            {moment(item?.create_at).format('DD-MMM-YYYY')}
                        </Text>
                    </View>
                    <View style={[styles.oneItem, {}]}>
                        <IconE name="location" color='#4d4c4a' size={15} />
                        <Text style={{ ...styles.textStyle, fontSize: 14 }}>
                            {item.place_type}
                        </Text>
                    </View>
                    <View style={{ ...styles.oneItem, marginRight: 10, marginLeft: 5 }}>
                        <IconF name="users" color='#4d4c4a' size={15} />
                        <Text style={{ ...styles.textStyle, fontSize: 14, marginLeft: 5 }}>
                            {item.participants}
                        </Text>
                    </View>
                </View>
            </View>
            {
                validateCurrentUser(item?.phone, item?.email) ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate('form', { data: item, isCurrentUser: validateCurrentUser(item?.phone, item?.email) })}
                        style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <IconF name="edit" color='orange' size={25} />

                    </TouchableOpacity> : <Icon name="right" color='#4d4c4a' size={25} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconContianer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#faf6f0',
        marginTop: 10,
        paddingHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 15,

        shadowColor: "#526cff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    oneItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemlistcontainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
})

export const EventRowMemo = memo(EventRow)