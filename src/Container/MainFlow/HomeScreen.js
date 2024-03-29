import React, { useEffect, useState } from "react";
import { Colors, Fonts, Images, ScreenName, Constant } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { getToken, getCustomerDetails } from "../Action/actions";
import Loader from "../../Component/Loader";
import { showAlert } from "../../Functions/Alerts";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

export default function HomeScreen() {
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [project, setProject] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserDetailsAPI() {
    setIsLoading(true);
    const response = await getToken(
      Constant.commonConstant.email,
      Constant.commonConstant.password
    );
    if (
      response &&
      response.status === Constant.apiResponse.success &&
      response.data.status == Constant.apiResponse.status
    ) {
      const newResponse = await getCustomerDetails({
        tokenId: response.data.tokenId,
        phoneNumber: Constant.commonConstant.currentUserPassword,
        emailId: Constant.commonConstant.currentUseremail,
      });
      if (
        newResponse &&
        newResponse.status === Constant.apiResponse.success &&
        newResponse.data[0].status == Constant.apiResponse.status
      ) {
        setIsLoading(false);
        setName(newResponse.data[0].message[0].customerName);
        setNumber(newResponse.data[0].message[0].phoneNumber);
        setEmail(newResponse.data[0].message[0].emailId);
        setProject(newResponse.data[0].message[0].project);
        Constant.commonConstant.currentUserBookingId =
          newResponse.data[0].message[0].bookingId;
        Constant.commonConstant.currentUserCustomerCode =
          newResponse.data[0].message[0].customerCode;
      } else {
        setIsLoading(false);
        setName(null);
        setNumber(null);
        setEmail(null);
        setProject(null);
        Constant.commonConstant.currentUserBookingId = null;
        Constant.commonConstant.currentUserCustomerCode = null;
      }
    } else {
      setIsLoading(false);
      setName(null);
      setNumber(null);
      setEmail(null);
      setProject(null);
      Constant.commonConstant.currentUserBookingId = null;
      Constant.commonConstant.currentUserCustomerCode = null;
      Constant.errorHandle(response);
    }
  }

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

  useEffect(() => {
    getUserDetailsAPI();
  }, []);

  return (
    <>
      {isLoading == true ? (
        <Loader isLoading={isLoading}></Loader>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
        >
          <View style={styles.mainContainer}>
            <Image style={styles.appNameImage} source={Images.appName}></Image>

            <View style={styles.profilePictureContainer}>
              <Image
                style={styles.profilePicture}
                source={image == null ? Images.appLogo : { uri: image }}
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

            <Text style={styles.userName}>
              {name === null ? "Nitin Kumar Bhatia" : name}
            </Text>

            <Text style={styles.userPhoneNumber}>
              {number === null ? "9876543210" : number}
            </Text>

            <Text style={styles.userEmail}>{email === null ? "" : email}</Text>

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

            <TouchableOpacity
              onPress={() => {
                if (project == "Waterfall Residences") {
                  Linking.openURL(
                    "https://krisumi.com/project/waterfall-residences/#construct"
                  ).catch(() => {
                    showAlert("Oops!\nCan't open this URL.");
                  });
                } else if (project == "Waterfall Suites") {
                  Linking.openURL(
                    "https://krisumi.com/project/waterfall-suites/#construct"
                  ).catch(() => {
                    showAlert("Oops!\nCan't open this URL.");
                  });
                }
              }}
            >
              <View style={styles.itemMainContainer}>
                <View style={styles.itemSubContainer}>
                  <Text style={styles.itemText}>Construction Update</Text>
                  <Image
                    style={styles.itemIcon}
                    source={Images.homeIcon}
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Actions.push(ScreenName.ContactUsScreen);
              }}
            >
              <View style={styles.itemMainContainer}>
                <View style={styles.itemSubContainer}>
                  <Text style={styles.itemText}>Get In Touch</Text>
                  <Image
                    style={styles.itemIcon}
                    source={Images.mailIcon}
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Constant.commonConstant.currentUserPassword = null;
                Constant.commonConstant.currentUseremail = null;
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

            <Image
              style={styles.topImage}
              source={Images.topBackgroung}
            ></Image>
          </View>

          <View style={styles.bottomContainer}>
            <Image
              style={styles.bottomImage}
              source={Images.bottomBackgroung}
            ></Image>
            <View style={styles.bottomSubContainer}>
              <TouchableOpacity
                onPress={() => {
                  let url = `https://api.whatsapp.com/send?phone=9289086396`;
                  Linking.openURL(url)
                    .then((data) => {
                      console.log("WhatsApp Opened", data);
                    })
                    .catch((e) => {
                      console.log("WhatsApp Error", e);
                    });
                }}
              >
                <Image
                  style={styles.whatsAppIcon}
                  source={Images.whatsAppIcon}
                ></Image>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  let number = "";
                  if (Platform.OS === "ios") {
                    number = "telprompt:${+919289086396}";
                  } else {
                    number = "tel:${+919289086396}";
                  }
                  Linking.openURL(number);
                }}
              >
                <Image
                  style={styles.phoneIcon}
                  source={Images.phoneIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
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
  },
  userEmail: {
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
