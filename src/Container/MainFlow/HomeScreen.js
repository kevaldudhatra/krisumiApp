import React, { useState, useCallback } from "react";
import { Colors, Fonts, Images, ScreenName } from "../../Theme/Index";
import ImagePicker from "react-native-image-picker";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen() {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  function ImagePickerModal({
    isVisible,
    onClose,
    onImageLibraryPress,
    onCameraPress,
  }) {
    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={styles.modal}
      >
        <SafeAreaView style={styles.buttons}>
          <Pressable style={styles.button} onPress={onImageLibraryPress}>
            <Image style={styles.buttonIcon} source={Images.forwardIcon} />
            <Text style={styles.buttonText}>Library</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onCameraPress}>
            <Image style={styles.buttonIcon} source={Images.forwardIcon} />
            <Text style={styles.buttonText}>Camera</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          backgroundColor: Colors.white,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <View style={styles.mainContainer}>
          <Image style={styles.appNameImage} source={Images.appName}></Image>

          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              }}
            ></Image>
            <View style={styles.addPicture}>
              <Image
                style={styles.addPictureIcon}
                source={Images.editIcon}
              ></Image>
            </View>
          </View>

          <Text style={styles.userName}>Nitin Kumar Bhatia</Text>

          <Text style={styles.userPhoneNumber}>9876543210</Text>

          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.BookingScreen);
            }}
          >
            <View style={styles.itemMainContainer}>
              <View style={styles.itemSubContainer}>
                <Text style={styles.itemText}>Booking Detail</Text>
                <Image
                  style={styles.itemIcon}
                  source={Images.eventIcon}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.itemMainContainer}>
            <View style={styles.itemSubContainer}>
              <Text style={styles.itemText}>Construction Update</Text>
              <Image style={styles.itemIcon} source={Images.homeIcon}></Image>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.ContactUsScreen);
            }}
          >
            <View style={styles.itemMainContainer}>
              <View style={styles.itemSubContainer}>
                <Text style={styles.itemText}>Get In Touch</Text>
                <Image style={styles.itemIcon} source={Images.mailIcon}></Image>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.LoginScreen);
            }}
          >
            <View style={styles.subContainer}>
              <Text style={styles.logoutText}>Logout</Text>
              <View style={styles.logoutButton}>
                <Image
                  style={styles.logoutIcon}
                  source={Images.forwardIcon}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>

          <Image style={styles.topImage} source={Images.topBackgroung}></Image>

          {/* <ImagePickerModal
            isVisible={visible}
            onClose={() => setVisible(false)}
            onImageLibraryPress={onImageLibraryPress}
            onCameraPress={onCameraPress}
          /> */}
        </View>

        <View style={styles.bottomContainer}>
          <Image
            style={styles.bottomImage}
            source={Images.bottomBackgroung}
          ></Image>
          <View style={styles.bottomSubContainer}>
            <Image
              style={styles.whatsAppIcon}
              source={Images.whatsAppIcon}
            ></Image>
            <Image style={styles.phoneIcon} source={Images.phoneIcon}></Image>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    paddingTop: 35,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  appNameImage: {
    height: 100,
    alignSelf: "center",
    marginBottom: "5%",
    resizeMode: "contain",
  },
  profilePictureContainer: {
    marginBottom: 10,
    alignSelf: "center",
  },
  profilePicture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  addPicture: {
    position: "absolute",
    right: 10,
    bottom: 0,
    alignSelf: "center",
    justifyContent: "center",
  },
  addPictureIcon: {
    height: 25,
    width: 25,
    alignSelf: "center",
  },
  userName: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
  },
  userPhoneNumber: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.goldColorText,
    alignSelf: "center",
    marginBottom: 15,
  },
  itemMainContainer: {
    height: 70,
    borderRadius: 35,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  itemSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  itemText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
  },
  itemIcon: {
    height: 22,
    width: 22,
    alignSelf: "center",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 10,
  },
  logoutText: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
  },
  logoutButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightOrange,
    justifyContent: "center",
  },
  logoutIcon: {
    height: 15,
    width: 15,
    alignSelf: "center",
  },
  modal: {
    height: "20%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttons: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    flexDirection: "column",
  },
  buttonIcon: {
    height: "12%",
    width: "12%",
    tintColor: Colors.black,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.black,
    alignSelf: "center",
  },
  bottomImage: {
    flex: 0.85,
    height: 215,
    resizeMode: "cover",
  },
  topImage: {
    position: "absolute",
    top: -5,
    right: 5,
    height: 225,
    width: 50,
    resizeMode: "contain",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomSubContainer: {
    flex: 0.15,
    backgroundColor: Colors.white,
    justifyContent: "center",
    flexDirection: "column",
  },
  whatsAppIcon: { height: 35, width: 35, marginBottom: 15 },
  phoneIcon: { height: 35, width: 35 },
});
