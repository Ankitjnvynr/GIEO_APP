import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HeaderPage from '../../Components/header';
import Loader from '../../Components/Loader';
import { useTranslation } from '../../utills.js/translation-hook';
import DeviceInfo from 'react-native-device-info';
import { colors } from '../../helper/colors';

const HelpScreen = () => {
  const { Translation, isLoading } = useTranslation()


  return (
     <SafeAreaView style={{ flex: 1,backgroundColor:colors.orange }} >  
      <View style={styles.container}>
        {isLoading ?
          <Loader /> : null
        }
        <HeaderPage />
        <Text style={styles.title}>{Translation.help} </Text>
        <Text style={{ ...styles.title, fontSize: 16 }}>{Translation.version_information} </Text>
        <View>
          <View
            style={{ ...styles.graph1line, marginTop: 20, borderBottomWidth: 0 }}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
                {Translation.host}
              </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{Translation.host_value}</Text>
            </View>
          </View>
          <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>{Translation.os} </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{Platform.OS} </Text>
            </View>
          </View>
          <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
                {Translation.os_version}
              </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{DeviceInfo.getVersion()}</Text>
            </View>
          </View>
          <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
                {Translation.app_version}
              </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{DeviceInfo.getReadableVersion()}</Text>
            </View>
          </View>
          <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
                {Translation.setting_version}
              </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{'51.20.03'}</Text>
            </View>
          </View>
          <View style={styles.graph1line}>
            <View style={styles.graphinside}>
              <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
                {Translation.page_version}
              </Text>
            </View>
            <View style={styles.graphinside}>
              <Text style={styles.graphText}>{"5web/p.12.3.4.5"}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#EF4136',
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 40,
            borderRadius: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>
            {Translation.report_issues_or_feedback}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  title: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 30,
  },
  graph1line: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F7941C',
    borderRightWidth: 0,
    // width: '100%',
    //
  },
  graphinside: {
    width: 140,
    borderRightWidth: 1,
    // borderWidth: 2,
    borderColor: 'orange',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
  },
  graphText: {
    fontSize: 16,
    color: 'black',
    left: 5,
  },
});
