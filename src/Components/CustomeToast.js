import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../helper/colors';

const CustomeToast = ({ msg }) => {
  return (
    <View style={{
      position: 'absolute', top: 400, alignSelf: 'center', backgroundColor: colors.orange, padding: 10,
      borderRadius: 30, elevation: 5,zIndex:10
    }}>
      <Text style={{ color: '#f2faf4', fontWeight: '600', fontSize: 16 }} >{msg} </Text>
    </View>
  );
};

export default CustomeToast;
