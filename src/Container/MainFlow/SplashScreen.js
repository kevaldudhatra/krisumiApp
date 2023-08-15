import React from 'react';
import {Colors, Images, Fonts} from '../../Theme/Index';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function SplashScreen() {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.appNameImage} source={Images.appName}></Image>
      <TouchableOpacity
        onPress={() => {
          Actions.replace('root');
        }}>
        <View style={styles.subContainer}>
          <Text style={styles.loginText}>Proceed to Login</Text>
          <View style={styles.loginButton}>
            <Image style={styles.loginIcon} source={Images.forwardIcon}></Image>
          </View>
        </View>
      </TouchableOpacity>
      <Image
        style={{
          flex: 1,
          alignSelf: 'center',
          position: 'absolute',
          height: '40%',
          width: '90%',
          top: 0,
          resizeMode: 'cover',
        }}
        source={Images.splashTopBackground}></Image>
      <Image
        style={{
          flex: 1,
          alignSelf: 'center',
          height: '30%',
          width: '80%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          resizeMode: 'cover',
        }}
        source={Images.splashBottomBackground}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  appNameImage: {
    height: '20%',
    width: '65%',
    alignSelf: 'center',
    marginBottom: '5%',
    resizeMode: 'contain',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginText: {
    fontSize: 18,
    marginRight: 10,
    color: Colors.black,
    alignSelf: 'center',
    fontFamily: Fonts.RobotoMedium,
  },
  loginButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightOrange,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: Colors.arrowColor,
  },
});
