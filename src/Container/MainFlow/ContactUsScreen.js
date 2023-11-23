import React, { useState } from "react";
import { Colors, Fonts, Images, Constant } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addContactUsRequest } from "../Action/actions";
import { showAlert } from "../../Functions/Alerts";
import Loader from "../../Component/Loader";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export default function ContactUsScreen() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [yourMessage, setYourMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function contactUsAPI() {
    setIsLoading(true);
    const response = await addContactUsRequest({
      user_email: email,
      user_name: name,
      user_phone: phoneNo,
      user_message: yourMessage,
    });
    if (
      response &&
      response.status === Constant.apiResponse.success &&
      response.data.status == true
    ) {
      setIsLoading(false);
      setName("");
      setPhoneNo("");
      setEmail("");
      setYourMessage("");
      showAlert(response.data.message);
    } else {
      setIsLoading(false);
      setName("");
      setPhoneNo("");
      setEmail("");
      setYourMessage("");
      Constant.errorHandle(response);
    }
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Loader isLoading={isLoading}></Loader>

          <View style={styles.mainContainer}>
            <View style={styles.contactHeader}>
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
              <Text style={styles.contactHeaderText}>Contact Us</Text>
              <View style={styles.blankButton}></View>
            </View>

            <Text style={styles.lineOneText}>Corporate Office</Text>
            <Text style={styles.lineTwoText}>Krisumi Sales Lounge</Text>
            <Text style={styles.lineThreeText}>
              Waterfall Residences, Sector 36A, Gurugram 122004, Haryana
            </Text>
            <View style={styles.lineFourContainer}>
              <View
                style={{
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  marginRight: 20,
                }}
              >
                <Image
                  style={styles.lineFourIcon}
                  source={Images.smallPhoneIcon}
                ></Image>
                <Text style={styles.lineFourText}>+91 9513270083</Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  style={styles.lineFourIcon}
                  source={Images.smallMailIcon}
                ></Image>
                <Text style={styles.lineFourText}>info@krisumi.com</Text>
              </View>
            </View>

            <View style={styles.dividerLine}></View>

            <Text style={styles.mainItemText}>For Any Enquiries</Text>

            <Text style={styles.textInputHeaderText}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
              placeholder="Enter Your Name"
              keyboardType="default"
            />

            <Text style={styles.textInputHeaderText}>Phone No</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setPhoneNo(text);
              }}
              value={phoneNo}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
              placeholder="+91"
              keyboardType="numeric"
            />

            <Text style={styles.textInputHeaderText}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
              placeholderTextColor={Colors.borderColor}
              placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
              placeholder="Enter Your Email"
              keyboardType="email-address"
            />

            <Text style={styles.textInputHeaderText}>Your Message</Text>
            <View style={styles.yourMessageInput}>
              <TextInput
                style={{ color: Colors.black }}
                onChangeText={(text) => {
                  setYourMessage(text);
                }}
                value={yourMessage}
                placeholderTextColor={Colors.borderColor}
                placeholderStyle={{ fontFamily: Fonts.DMSansRegular }}
                multiline={true}
                placeholder="Enter Your Message"
                keyboardType="default"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (
                  name == "" ||
                  phoneNo == "" ||
                  email == "" ||
                  yourMessage == ""
                ) {
                  showAlert("Oops!\nRequired fields are missing.");
                } else {
                  contactUsAPI();
                }
              }}
            >
              <View style={styles.contactButton}>
                <Text style={styles.contactButtonText}>Generate A Ticket</Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={styles.lineFourIcon}
                source={Images.darkWhatsappIcon}
              ></Image>
              <Text style={styles.bottmLineText}>Chat on Whatsapp</Text>
            </View>

            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                marginBottom: 25,
              }}
            >
              <Image
                style={styles.lineFourIcon}
                source={Images.darkPhoneIcon}
              ></Image>
              <Text style={styles.bottmLineText}>Call Us</Text>
            </View>
          </View>

          <Image
            style={styles.bottomImage}
            source={Images.bottomBackgroung}
          ></Image>

          <Image style={styles.topImage} source={Images.topBackgroung}></Image>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
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
  contactHeaderText: {
    fontSize: 19,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
  },
  blankButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  lineOneText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  lineTwoText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  lineThreeText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.borderColor,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  lineFourContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 15,
    alignItems: "center",
  },
  lineFourIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginRight: 5,
    alignSelf: "center",
  },
  lineFourText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
    alignSelf: "flex-start",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderColor,
    marginBottom: 15,
  },
  mainItemText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  textInputHeaderText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  textInput: {
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    paddingHorizontal: 30,
    marginBottom: 20,
    color: Colors.black,
    borderColor: Colors.borderColor,
  },
  yourMessageInput: {
    height: 145,
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: Colors.borderColor,
  },
  contactButton: {
    height: 70,
    backgroundColor: Colors.lightOrange,
    borderRadius: 35,
    marginTop: 25,
    marginBottom: 15,
    alignContent: "center",
    justifyContent: "center",
  },
  contactButtonText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.arrowColor,
    alignSelf: "center",
  },
  bottmLineText: {
    fontSize: 16,
    fontFamily: Fonts.DMSansRegular,
    color: Colors.black,
    alignSelf: "flex-start",
    textDecorationLine: "underline",
  },
  topImage: {
    position: "absolute",
    top: -25,
    right: 5,
    height: 130,
    width: 50,
    resizeMode: "contain",
  },
  bottomImage: {
    height: 150,
    width: "75%",
    resizeMode: "cover",
  },
});
