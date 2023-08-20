import React, { useState } from "react";
import { Colors, Fonts, Images, ScreenName } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [showModel, setShowModel] = useState(false);
  const [image, setImage] = useState(null);

  function imagePickerOption() {
    return (
      <View style={styles.modelView}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            setShowModel(false);
            onPressGallery();
          }}
        >
          <View style={styles.galleryAndCameraView}>
            <Image
              style={styles.galleryAndCameraIcon}
              source={Images.galleryIcon}
            ></Image>
            <Text style={styles.galleryAndCameraText}>Gallery</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => {
            setShowModel(false);
            onPressCamera();
          }}
        >
          <View style={styles.galleryAndCameraView}>
            <Image
              style={styles.galleryAndCameraIcon}
              source={Images.cameraIcon}
            ></Image>
            <Text style={styles.galleryAndCameraText}>Camera</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  async function onPressGallery() {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });
    if (result.didCancel) {
      setImage(null);
    } else {
      setImage(result.assets[0].uri);
    }
  }

  async function onPressCamera() {
    const result = await launchCamera({
      mediaType: "photo",
      selectionLimit: 1,
    });
    if (result.didCancel) {
      setImage(null);
    } else {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
      >
        <View style={styles.mainContainer}>
          <Image style={styles.appNameImage} source={Images.appName}></Image>

          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={{
                uri:
                  image == null
                    ? "https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    : image,
              }}
            ></Image>
            <TouchableOpacity
              onPress={() => {
                setShowModel(true);
              }}
            >
              <View style={styles.addPicture}>
                <Image
                  style={styles.addPictureIcon}
                  source={Images.editIcon}
                ></Image>
              </View>
            </TouchableOpacity>
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
      </ScrollView>
      {showModel === true ? imagePickerOption() : null}
    </>
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
  modelView: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.lightOrange,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  galleryAndCameraView: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  galleryAndCameraIcon: {
    height: 40,
    width: 40,
    tintColor: Colors.arrowColor,
    alignSelf: "center",
    marginBottom: 5,
  },
  galleryAndCameraText: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.arrowColor,
    alignSelf: "center",
  },
});
