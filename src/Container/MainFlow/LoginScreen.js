import React, { useState } from "react";
import { Colors, Fonts, Images, ScreenName } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <View style={styles.loginHeader}>
            <TouchableOpacity
              onPress={() => {
                Actions.pop();
              }}
            >
              <View style={styles.backButton}>
                <Image
                  style={styles.backIcon}
                  source={Images.backwardIcon}
                ></Image>
              </View>
            </TouchableOpacity>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.blankButton}></View>
          </View>
          <Image style={styles.appNameImage} source={Images.appName}></Image>
          <Text style={styles.emailText}>Email</Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
            placeholderTextColor={Colors.borderColor}
            placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
            placeholder="Enter Your Email"
            keyboardType="email-address"
          />
          <Text style={styles.passwordText}>Password</Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
            placeholderTextColor={Colors.borderColor}
            placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
            placeholder="Enter Your Password"
            keyboardType="default"
          />
          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.HomeScreen);
            }}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.RaiseTicketScreen);
            }}
          >
            <View style={styles.bottomText}>
              <Text style={styles.changePasswordText}>Change Password?</Text>
              <Text style={styles.raiseTicketText}>Raise A Ticket</Text>
            </View>
          </TouchableOpacity>
          <Image style={styles.topImage} source={Images.topBackgroung}></Image>
        </View>
      </TouchableWithoutFeedback>
      <Image
        style={styles.bottomImage}
        source={Images.bottomBackgroung}
      ></Image>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  loginHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightOrange,
    justifyContent: "center",
  },
  backIcon: {
    height: 15,
    width: 15,
    alignSelf: "center",
    tintColor: Colors.arrowColor,
  },
  loginText: {
    fontSize: 20,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: Fonts.RobotoMedium,
  },
  blankButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  appNameImage: {
    height: 80,
    alignSelf: "center",
    marginBottom: "15%",
    marginTop: "10%",
    resizeMode: "contain",
  },
  topImage: {
    position: "absolute",
    top: -5,
    right: 5,
    height: 225,
    width: 50,
    resizeMode: "contain",
  },
  bottomImage: {
    height: 150,
    width: "75%",
    resizeMode: "cover",
    alignSelf: "flex-start",
  },
  emailText: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 10,
    fontFamily: Fonts.RobotoMedium,
  },
  emailInput: {
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 30,
    borderColor: Colors.borderColor,
  },
  passwordText: {
    fontSize: 16,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 15,
    fontFamily: Fonts.RobotoMedium,
  },
  loginButton: {
    height: 70,
    backgroundColor: Colors.lightOrange,
    borderRadius: 35,
    marginTop: 25,
    alignContent: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.arrowColor,
    alignSelf: "center",
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
  changePasswordText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
    marginRight: 5,
  },
  raiseTicketText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
    alignSelf: "center",
  },
});
