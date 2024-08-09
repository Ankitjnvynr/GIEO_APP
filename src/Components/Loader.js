import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../helper/colors';
const { width, height } = Dimensions.get('window')
const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centerStyle} >
        <ActivityIndicator size={50} color={colors.orange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex:100,
    position: 'absolute',
    width,
    height,
    backgroundColor: '#0006',
    elevation: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  centerStyle:{
    backgroundColor:colors.white,
    padding:5,
    borderRadius:100
  }
})
export default Loader;
