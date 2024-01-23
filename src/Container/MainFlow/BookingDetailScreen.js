import React, { useState, useEffect } from "react";
import { Colors, Fonts, Images, Constant } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import Loader from "../../Component/Loader";
import {
  getToken,
  getPaymentPlanDetails,
  getUnitSummaryDetails,
  getStatementSummaryDetails,
} from "../Action/actions";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";

export default function BookingDetailScreen(props) {
  const [tabIndex, setTabIndex] = useState(1);
  const [unitDetails, setUnitDetails] = useState({});
  const [paymentPlanDetails, setPaymentPlanDetails] = useState({});
  const [statementSummaryDetails, setStatementSummaryDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const tabData = [
    {
      id: 1,
      tabName: "Booking Detail",
    },
    {
      id: 2,
      tabName: "Unit Summary",
    },
    {
      id: 3,
      tabName: "Payment History",
    },
    {
      id: 4,
      tabName: "Statement Summary",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 55,
          backgroundColor:
            item.id == tabIndex ? Colors.lightOrange : Colors.white,
          paddingHorizontal: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setTabIndex(item.id);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.RobotoMedium,
              color: item.id == tabIndex ? Colors.arrowColor : Colors.black,
              alignSelf: "center",
            }}
          >
            {item.tabName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  async function getUnitDetailsAPI() {
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
      const newResponse = await getUnitSummaryDetails({
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
        setUnitDetails(newResponse.data[0].message[0]);
      } else {
        setIsLoading(false);
        setUnitDetails(null);
      }
    } else {
      setIsLoading(false);
      Constant.errorHandle(response);
    }
  }

  async function getPaymentPlanDetailsAPI() {
    const response = await getToken(
      Constant.commonConstant.email,
      Constant.commonConstant.password
    );
    if (
      response &&
      response.status === Constant.apiResponse.success &&
      response.data.status == Constant.apiResponse.status
    ) {
      const newResponse = await getPaymentPlanDetails({
        tokenId: response.data.tokenId,
        customerCode: Constant.commonConstant.currentUserCustomerCode,
        bookingId: Constant.commonConstant.currentUserBookingId,
      });
      if (
        newResponse &&
        newResponse.status === Constant.apiResponse.success &&
        newResponse.data[0].status == Constant.apiResponse.status
      ) {
        setPaymentPlanDetails(newResponse.data[0].message[0]);
      } else {
        setPaymentPlanDetails(null);
      }
    } else {
      Constant.errorHandle(response);
    }
  }

  async function getStatementSummaryDetailsAPI() {
    const response = await getToken(
      Constant.commonConstant.email,
      Constant.commonConstant.password
    );
    if (
      response &&
      response.status === Constant.apiResponse.success &&
      response.data.status == Constant.apiResponse.status
    ) {
      const newResponse = await getStatementSummaryDetails({
        tokenId: response.data.tokenId,
        customerCode: Constant.commonConstant.currentUserCustomerCode,
        bookingId: Constant.commonConstant.currentUserBookingId,
      });
      if (
        newResponse &&
        newResponse.status === Constant.apiResponse.success &&
        newResponse.data[0].status == Constant.apiResponse.status
      ) {
        setStatementSummaryDetails(newResponse.data[0].message[0]);
      } else {
        setStatementSummaryDetails(null);
      }
    } else {
      Constant.errorHandle(response);
    }
  }

  function renderPlanDetailsData(item) {
    return (
      <View style={styles.paymentHistoryContainer}>
        <View style={styles.mainBoxContainer}>
          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Payment Mode</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>{item.item.paymentMode}</Text>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>

          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Paid Amount</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>
                {parseFloat(item.item.totalScheduleReceivedAmount).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>

          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Pending Payment</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>
                {parseFloat(item.item.totalScheduleOutstandingAmount).toFixed(
                  2
                )}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>

          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Payment Plan</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>
                {paymentPlanDetails.paymentPlan}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    getUnitDetailsAPI();
    getPaymentPlanDetailsAPI();
    getStatementSummaryDetailsAPI();
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

            {tabIndex != 2 && (
              <Text style={styles.titleText}>{unitDetails.project}</Text>
            )}

            <Text style={styles.subTitleText}>
              {`Customer Code : ${unitDetails.customerCode}`}
            </Text>

            <View style={{ height: 70 }}>
              <FlatList
                paddingTop={15}
                showsHorizontalScrollIndicator={false}
                data={tabData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>

            <View style={{ height: 1, backgroundColor: Colors.black }}></View>

            {tabIndex == 1 ? (
              <Text style={styles.reportDateText}></Text>
            ) : (
              <Text style={styles.reportDateText}>
                {`Report Generated On - ${new Date(Date.now())
                  .toLocaleString("en-US", { month: "short" })
                  .toString()} ${new Date(Date.now())
                  .getDate()
                  .toString()}, ${new Date(Date.now())
                  .getFullYear()
                  .toString()}`}
              </Text>
            )}

            <View>
              {tabIndex == 1 ? (
                <View style={styles.mainBoxContainer}>
                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Booking Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.bookingDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Allotment Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.allotmentDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Agreement Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.agreementDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Payment Plan</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.paymentPlan}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Payment Source</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.paymentSource}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Bank / F.I. Name</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {props.bankOrFinanceInstitutionName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Loan Amount</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(props.loanAmount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : tabIndex == 2 ? (
                <View style={styles.mainBoxContainer}>
                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Project Type</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>Residential</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Unit Type</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {unitDetails.unitType}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Unit No</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {unitDetails.unitNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Area sq.ft</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(unitDetails.areaSqFt).toFixed(0)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>
                  <>
                    <FlatList
                      data={unitDetails.chargeDetails}
                      renderItem={({ item, index }) => (
                        <>
                          <View style={styles.mainBoxSection}>
                            <View style={styles.subBoxContainer}>
                              <Text style={styles.boxText1}>
                                {item.chargeName}
                              </Text>
                            </View>
                            <View style={styles.verticalDivider}></View>
                            <View style={styles.subBoxContainer}>
                              <Text style={styles.boxText2}>
                                {parseFloat(item.amount).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                          {unitDetails.chargeDetails.length - 1 ===
                          index ? null : (
                            <View style={styles.horizontalDivider}></View>
                          )}
                        </>
                      )}
                      extraData={unitDetails.chargeDetails}
                      keyExtractor={(item, index) => String(index)}
                      scrollEnabled={true}
                      onEndReachedThreshold={1}
                    />
                  </>
                </View>
              ) : tabIndex == 3 ? (
                <View>
                  <FlatList
                    data={paymentPlanDetails.eventDetails}
                    renderItem={(item) => renderPlanDetailsData(item)}
                    extraData={paymentPlanDetails.eventDetails}
                    keyExtractor={(item, index) => String(index)}
                    scrollEnabled={true}
                    onEndReachedThreshold={1}
                  />
                </View>
              ) : tabIndex == 4 ? (
                <View style={styles.mainBoxContainer}>
                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Total Dues</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(
                          statementSummaryDetails.totalDueAmount
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Total Receipts</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(
                          statementSummaryDetails.totalReceivedAmount
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Outstanding Balance</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(
                          statementSummaryDetails.totalOutstandingAmount
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.mainBoxContainer}>
                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Booking Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.bookingDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Allotment Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.allotmentDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Agreement Date</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.agreementDate}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Payment Plan</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.paymentPlan}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Payment Source</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>{props.paymentSource}</Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Bank / F.I. Name</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {props.bankOrFinanceInstitutionName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.horizontalDivider}></View>

                  <View style={styles.mainBoxSection}>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText1}>Loan Amount</Text>
                    </View>
                    <View style={styles.verticalDivider}></View>
                    <View style={styles.subBoxContainer}>
                      <Text style={styles.boxText2}>
                        {parseFloat(props.loanAmount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

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
              <Image
                style={styles.whatsAppIcon}
                source={Images.whatsAppIcon}
              ></Image>
              <Image style={styles.phoneIcon} source={Images.phoneIcon}></Image>
            </View>
          </View>
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
  mainBoxContainer: {
    backgroundColor: Colors.backgroundColor,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 10,
  },
  mainBoxSection: {
    height: 60,
    width: Dimensions.get("window").width - 40,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  subBoxContainer: {
    flex: 0.5,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  boxText1: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  boxText2: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.goldColorText,
  },
  verticalDivider: {
    height: 60,
    width: 1,
    backgroundColor: Colors.borderColor,
  },
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
  paymentHistoryContainer: {
    marginBottom: 15,
  },
  whatsAppIcon: { height: 35, width: 35, marginBottom: 15 },
  phoneIcon: { height: 35, width: 35 },
});
