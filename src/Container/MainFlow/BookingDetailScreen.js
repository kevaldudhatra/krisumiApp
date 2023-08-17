import React from "react";
import { Colors, Fonts, Images } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function BookingDetailScreen() {
  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.bookingHeader}>
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
            <Text style={styles.bookingHeaderText}>Booking Detail</Text>
            <View style={styles.blankButton}></View>
          </View>

          <Text style={styles.titleText}>Booked Units</Text>

          <Text style={styles.subTitleText}>
            Booking Code : WFR/TB/3F/UN502
          </Text>

          <Image style={styles.topImage} source={Images.topBackgroung}></Image>
        </View>

        <Image
          style={styles.bottomImage}
          source={Images.bottomBackgroung}
        ></Image>
      </View>
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
  bookingHeader: {
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
  bookingHeaderText: {
    fontSize: 20,
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
  titleText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
    alignSelf: "flex-start",
    marginBottom: 10,
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
