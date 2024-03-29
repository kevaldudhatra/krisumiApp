import React, { useState, useEffect } from "react";
import { Colors, Fonts, Images, ScreenName, Constant } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { getToken, getBookingDetails } from "../Action/actions";
import Loader from "../../Component/Loader";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";

export default function BookingScreen() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const renderMainItem = (item) => {
    return (
      <>
        <Text
          style={styles.subTitleText}
        >{`Customer Code : ${item.item.customerCode}`}</Text>
        <View style={styles.subContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleContainerText}>{item.item.project}</Text>
          </View>

          <View
            style={{
              alignSelf: "center",
              flex: 1,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Image
              style={styles.projectImageView}
              resizeMode="cover"
              source={Images.projectImg1}
            ></Image>
          </View>

          <Text style={styles.discriptionText}>
            {item.item.project == "Waterfall Residences"
              ? "Waterfall Residences has been designed based on the Japanese style of art and architecture to provide enduring value to the residents."
              : item.item.project == "Waterfall Suites"
              ? "Inspired by the serene SHIRAITO WATERFALL, the design of Waterfall Suites weaves in elements of stream, thread and calmness of water into the facade."
              : null}
          </Text>

          <View style={styles.boxContainer}>
            <View style={styles.boxSubContainer}>
              <Text style={styles.boxTitleText}>Project Type</Text>
              <Text style={styles.boxSubTitleText}>Residential</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.boxSubContainer}>
              <Text style={styles.boxTitleText}>Unit Type</Text>
              <Text style={styles.boxSubTitleText}>{item.item.unitType}</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.boxSubContainer}>
              <Text style={styles.boxTitleText}>Unit No</Text>
              <Text style={styles.boxSubTitleText}>{item.item.unitNumber}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              Actions.push(ScreenName.BookingDetailScreen, {
                bookingDate: item.item.bookingDate,
                allotmentDate: item.item.allotmentDate,
                agreementDate: item.item.agreementDate,
                paymentPlan: item.item.paymentPlan,
                paymentSource: item.item.paymentSource,
                bankOrFinanceInstitutionName:
                  item.item.bankOrFinanceInstitutionName,
                loanAmount: item.item.loanAmount,
              });
            }}
          >
            <View style={styles.viewContainer}>
              <Text style={styles.viewText}>View</Text>
              <View style={styles.viewButton}>
                <Image
                  style={styles.viewIcon}
                  source={Images.forwardIcon}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  async function getBookingDetailsAPI() {
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
      const newResponse = await getBookingDetails({
        tokenId: response.data.tokenId,
        customerCode: Constant.commonConstant.currentUserCustomerCode,
        bookingId: Constant.commonConstant.currentUserBookingId,
      });
      if (
        newResponse &&
        newResponse.status === Constant.apiResponse.success &&
        newResponse.data[0].status == Constant.apiResponse.status
      ) {
        setIsLoading(false);
        setUserData(newResponse.data[0].message);
      } else {
        setIsLoading(false);
        setUserData([]);
      }
    } else {
      setIsLoading(false);
      Constant.errorHandle(response);
    }
  }

  useEffect(() => {
    getBookingDetailsAPI();
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

            <Text
              style={styles.titleText}
            >{`Booked Units : ${userData[0]?.unitNumber}`}</Text>

            {userData.length > 0 ? (
              <FlatList
                data={userData}
                bounces={false}
                renderItem={(item) => renderMainItem(item)}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={true}
                scrollEnabled={true}
                keyExtractor={(item, index) => String(index)}
              />
            ) : (
              <Text style={styles.noBookingText}>
                No Booking Details Available
              </Text>
            )}

            <Image
              style={styles.topImage}
              source={Images.topBackgroung}
            ></Image>
          </View>

          <Image
            style={styles.bottomImage}
            source={Images.bottomBackgroung}
          ></Image>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  noBookingText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
    marginTop: "50%",
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
  subContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
    marginBottom: 50,
  },
  titleContainer: {
    height: 50,
    justifyContent: "center",
    backgroundColor: Colors.lightOrange,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainerText: {
    fontSize: 18,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.arrowColor,
    alignSelf: "flex-start",
  },
  projectImageView: {
    width: Dimensions.get("window").width - 60,
    height: 150,
    borderRadius: 10,
  },
  discriptionText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
    textAlign: "center",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.65,
    marginBottom: 20,
  },
  boxContainer: {
    height: 65,
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  boxSubContainer: {
    flex: 1,
    height: 65,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  verticalDivider: {
    height: 65,
    width: 1,
    backgroundColor: Colors.borderColor,
    marginHorizontal: 10,
  },
  boxTitleText: {
    fontFamily: Fonts.RobotoMedium,
    fontSize: 14,
    color: Colors.black,
  },
  boxSubTitleText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 13,
    color: Colors.goldColorText,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 15,
  },
  viewText: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    alignSelf: "center",
  },
  viewButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightOrange,
    justifyContent: "center",
  },
  viewIcon: {
    height: 12,
    width: 12,
    alignSelf: "center",
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
