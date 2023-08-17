import React, { useState } from "react";
import { Colors, Fonts, Images } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";

export default function BookingDetailScreen() {
  const [tabIndex, setTabIndex] = useState(1);

  const tabData = [
    {
      id: 1,
      tabName: "Booking Detail"
    },
    {
      id: 2,
      tabName: "Unit Summary"
    },
    {
      id: 3,
      tabName: "Payment History"
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 55, backgroundColor: item.id == tabIndex ? Colors.lightOrange : Colors.white, paddingHorizontal: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: "center" }}>
        <TouchableOpacity onPress={() => {
          setTabIndex(item.id);
        }}>
          <Text style={{
            fontSize: 14,
            fontFamily: Fonts.RobotoMedium,
            color: item.id == tabIndex ? Colors.arrowColor : Colors.black,
            alignSelf: "center",
          }}>{item.tabName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

          {tabIndex != 2 && <Text style={styles.titleText}>Waterfall Residencess</Text>}

          <Text style={styles.subTitleText}>
            Booking Code : WFR/TB/3F/UN502
          </Text>

          <FlatList
            paddingTop={15}
            showsHorizontalScrollIndicator={false}
            data={tabData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />

          <View style={{ height: 1, backgroundColor: Colors.black }}></View>

          {tabIndex == 1 ? <Text style={styles.reportDateText}></Text> : <Text style={styles.reportDateText}>
            Report Generated On - 23/10/2021
          </Text>}

          <View>
            {tabIndex == 1 ? <View style={styles.mainBoxContainer}>
              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Booking Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>23/10/2021</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Allotment Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>10/11/2021</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Agreement Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>23/10/2022</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Payment Plan</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>{`Possession Link\nPlan (20:80)`}</Text>
                </View>
              </View>
            </View> : tabIndex == 2 ? <View style={styles.mainBoxContainer}>
              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Project Type</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>3LDK</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Unit Type</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>3 BHK</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Unit No</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>UN502</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Area sq.ft</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>1,800 sq.ft.</Text>
                </View>
              </View>
            </View> : tabIndex == 3 ? <View style={styles.mainBoxContainer}>
              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Payment Mode</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>Cash</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Pay Amount</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>12 Lakh</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Pending Payment</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>88 Lakh</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Payment Plan</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>{`Possession Link\nPlan (20:80)`}</Text>
                </View>
              </View>
            </View> : <View style={styles.mainBoxContainer}>
              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Booking Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>23/10/2021</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Allotment Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>10/11/2021</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Agreement Date</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>23/10/2022</Text>
                </View>
              </View>
              <View style={styles.horizontalDivider}></View>

              <View style={styles.mainBoxSection}>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText1}>Payment Plan</Text>
                </View>
                <View style={styles.verticalDivider}></View>
                <View style={styles.subBoxContainer}>
                  <Text style={styles.boxText2}>{`Possession Link\nPlan (20:80)`}</Text>
                </View>
              </View>
            </View>}
          </View>

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
  reportDateText: {
    fontSize: 15,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
    alignSelf: "flex-start",
    marginVertical: 15,
  },
  mainBoxContainer: { height: 243, backgroundColor: Colors.backgroundColor, borderColor: Colors.borderColor, borderWidth: 1, borderRadius: 10 },
  mainBoxSection: { height: 60, width: Dimensions.get('window').width - 40, flexDirection: "row", justifyContent: "flex-start" },
  subBoxContainer: { flex: 0.5, height: 60, justifyContent: "center", paddingHorizontal: 20 },
  boxText1: { alignSelf: "flex-start", fontSize: 14, fontFamily: Fonts.RobotoMedium, color: Colors.black },
  boxText2: { alignSelf: "flex-start", fontSize: 14, fontFamily: Fonts.RobotoMedium, color: Colors.goldColorText },
  verticalDivider: { height: 60, width: 1, backgroundColor: Colors.borderColor },
  horizontalDivider: { height: 1, backgroundColor: Colors.borderColor },
  topImage: {
    position: "absolute",
    top: -25,
    right: 5,
    height: 130,
    width: 50,
    resizeMode: "contain",
  },
  bottomImage: {
    flex: 0.85,
    height: 215,
    resizeMode: "cover",
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
