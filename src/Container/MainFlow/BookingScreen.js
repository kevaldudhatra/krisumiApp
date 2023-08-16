import React, { useEffect, useState, useRef } from "react";
import { Colors, Fonts, Images } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function BookingScreen() {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const data = [
    {
      id: 1,
      url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
    },
    {
      id: 2,
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Image
        style={{
          height: 110,
          borderRadius: 10,
          marginHorizontal: 10,
          marginTop: 10,
          resizeMode: "cover",
        }}
        source={{ uri: item.url }}
      ></Image>
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

          <Text style={styles.titleText}>Booked Units</Text>

          <Text style={styles.subTitleText}>
            Booking Code : WFR/TB/3F/UN502
          </Text>

          <View style={styles.subContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleContainerText}>
                Waterfall Residences
              </Text>
            </View>

            <Carousel
              ref={isCarousel}
              data={data}
              renderItem={renderItem}
              sliderWidth={Dimensions.get('window').width - 40}
              itemWidth={Dimensions.get('window').width - 40}
              onSnapToItem={index => setIndex(index)}
            />
            <Pagination
              dotsLength={data.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Colors.activeDotColor,
              }}
              inactiveDotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: Colors.borderColor,
              }}
              tappableDots={true}
              inactiveDotOpacity={1}
              inactiveDotScale={0.8}
            />

            <Text numberOfLines={3} style={styles.discriptionText}>
              {
                "Japanese landscaping emphasizes natural elements, eschewing artificial ornamentation."
              }
            </Text>

            <View style={styles.boxContainer}>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Project Type</Text>
                <Text style={styles.boxSubTitleText}>3 LDK</Text>
              </View>
              <View style={styles.verticalDivider}></View>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Unit Type</Text>
                <Text style={styles.boxSubTitleText}>3 BHK</Text>
              </View>
              <View style={styles.verticalDivider}></View>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Unit No</Text>
                <Text style={styles.boxSubTitleText}>UN502</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => { }}>
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

          <View style={styles.subContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleContainerText}>
                Waterfall Residences
              </Text>
            </View>

            <Image
              style={{
                height: 110,
                borderRadius: 10,
                margin: 10,
                resizeMode: 'cover',
              }}
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
              }}
            ></Image>

            <Text numberOfLines={3} style={styles.discriptionText}>
              {
                "Japanese landscaping emphasizes natural elements, eschewing artificial ornamentation."
              }
            </Text>

            <View style={styles.boxContainer}>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Project Type</Text>
                <Text style={styles.boxSubTitleText}>3 LDK</Text>
              </View>
              <View style={styles.verticalDivider}></View>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Unit Type</Text>
                <Text style={styles.boxSubTitleText}>3 BHK</Text>
              </View>
              <View style={styles.verticalDivider}></View>
              <View style={styles.boxSubContainer}>
                <Text style={styles.boxTitleText}>Unit No</Text>
                <Text style={styles.boxSubTitleText}>UN502</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => { }}>
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
