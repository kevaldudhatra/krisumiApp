import React, { useState, useEffect } from "react";
import { Colors, Fonts, Images, Constant } from "../../Theme/Index";
import { Actions } from "react-native-router-flux";
import Loader from "../../Component/Loader";
import {
  getToken,
  getPaymentPlanDetails,
  getUnitSummaryDetails,
  getStatementSummaryDetails,
  getReceiptSummaryDetails,
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
  const [receiptSummaryDetails, setReceiptSummaryDetails] = useState([]);
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
    {
      id: 5,
      tabName: "Payment Plan & Schedule",
    },
    {
      id: 6,
      tabName: "Receipt information status",
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

  async function getReceiptSummaryDetailsAPI() {
    const response = await getToken(
      Constant.commonConstant.email,
      Constant.commonConstant.password
    );
    if (
      response &&
      response.status === Constant.apiResponse.success &&
      response.data.status == Constant.apiResponse.status
    ) {
      const newResponse = await getReceiptSummaryDetails({
        tokenId: response.data.tokenId,
        customerCode: Constant.commonConstant.currentUserCustomerCode,
        bookingId: Constant.commonConstant.currentUserBookingId,
      });
      if (
        newResponse &&
        newResponse.status === Constant.apiResponse.success &&
        newResponse.data[0].status == Constant.apiResponse.status
      ) {
        setReceiptSummaryDetails(newResponse.data[0].message[0].receiptDetails);
      } else {
        setReceiptSummaryDetails(null);
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
                {`₹ ${parseFloat(
                  item.item.totalScheduleReceivedAmount
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  currency: "INR",
                })}`}
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
                {`₹ ${parseFloat(
                  item.item.totalScheduleOutstandingAmount
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  currency: "INR",
                })}`}
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

  function renderPlanAndScheduleData(item) {
    return (
      <View style={styles.paymentHistoryContainer}>
        <View style={styles.mainBoxContainer}>
          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Event Name</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>{item.item.eventName}</Text>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>

          <View style={styles.mainBoxSection}>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText1}>Payment Due Date</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>{item.item.paymentDueDate}</Text>
            </View>
          </View>
          <View style={styles.horizontalDivider}></View>

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
              <Text style={styles.boxText1}>Total Schedule Amount</Text>
            </View>
            <View style={styles.verticalDivider}></View>
            <View style={styles.subBoxContainer}>
              <Text style={styles.boxText2}>
                {`₹ ${parseFloat(item.item.totalScheduleAmount).toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 2,
                    currency: "INR",
                  }
                )}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderReceiptSummaryData(item, index) {
    return (
      <>
        <View style={styles.mainBoxSection}>
          <View style={styles.receiptSubBoxContainer}>
            <Text style={styles.boxText2}>{item.receiptDisplayNo}</Text>
          </View>
          <View style={styles.verticalDivider}></View>
          <View style={styles.receiptSubBoxContainer}>
            <Text style={styles.boxText2}>{item.paymentMode}</Text>
          </View>
          <View style={styles.verticalDivider}></View>
          <View style={styles.receiptSubBoxContainer}>
            <Text style={styles.boxText2}>{item.receiptStatus}</Text>
          </View>
        </View>
        {receiptSummaryDetails.length - 1 === index ? null : (
          <View style={styles.horizontalDivider}></View>
        )}
      </>
    );
  }

  useEffect(() => {
    getUnitDetailsAPI();
    getPaymentPlanDetailsAPI();
    getStatementSummaryDetailsAPI();
    getReceiptSummaryDetailsAPI();
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

            <Text style={styles.titleText}>{unitDetails.project}</Text>

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
                <>
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
                        <Text style={styles.boxText2}>
                          {props.allotmentDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.horizontalDivider}></View>

                    <View style={styles.mainBoxSection}>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText1}>Agreement Date</Text>
                      </View>
                      <View style={styles.verticalDivider}></View>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText2}>
                          {props.agreementDate}
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
                        <Text style={styles.boxText2}>
                          {props.paymentSource}
                        </Text>
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
                          {`₹ ${parseFloat(props.loanAmount).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                              currency: "INR",
                            }
                          )}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.notesText}>Notes :</Text>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Discrepancies if any, should be brought to the notice of
                      the company immediately
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Applicant details or any other information doesn't entitle
                      user/applicant/customer(s) to claim ownership of aforesaid
                      property unless the conveyance deed is executed in favour
                      of the user/applicant/customer(s) by the company.
                    </Text>
                  </View>
                </>
              ) : tabIndex == 2 ? (
                <>
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
                          {`₹ ${parseFloat(unitDetails.areaSqFt).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                              currency: "INR",
                            }
                          )}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ height: 20 }}></View>
                  <View style={styles.mainBoxContainer}>
                    <FlatList
                      data={unitDetails.chargeDetails}
                      renderItem={({ item, index }) => (
                        <>
                          {item.chargeName == "SGST-SGST @2.5%" ? null : (
                            <View style={styles.mainBoxSection}>
                              <View style={styles.subBoxContainer}>
                                <Text style={styles.boxText1}>
                                  {item.chargeName == "IFMS"
                                    ? "Interest Free Maintenance Security Deposit (IFMSD)"
                                    : item.chargeName == "Other Charges"
                                    ? "Other Charges (Electricity, Water, Gas Connection & Meter Charges)"
                                    : item.chargeName == "CGST-CGST @2.5%"
                                    ? "Goods & Service Tex * (GST)"
                                    : item.chargeName}
                                </Text>
                              </View>
                              <View style={styles.verticalDivider}></View>
                              <View style={styles.subBoxContainer}>
                                <Text style={styles.boxText2}>
                                  {item.chargeName == "CGST-CGST @2.5%"
                                    ? `₹ ${parseFloat(
                                        item.amount * 2
                                      ).toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        currency: "INR",
                                      })}`
                                    : `₹ ${parseFloat(
                                        item.amount
                                      ).toLocaleString("en-IN", {
                                        maximumFractionDigits: 2,
                                        currency: "INR",
                                      })}`}
                                </Text>
                              </View>
                            </View>
                          )}
                          {item.chargeName ==
                          "SGST-SGST @2.5%" ? null : unitDetails.chargeDetails
                              .length -
                              2 ===
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
                  </View>
                </>
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
                <>
                  <View style={styles.mainBoxContainer}>
                    <View style={styles.mainBoxSection}>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText1}>Total Dues</Text>
                      </View>
                      <View style={styles.verticalDivider}></View>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText2}>
                          {`₹ ${parseFloat(
                            statementSummaryDetails.totalDueAmount
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            currency: "INR",
                          })}`}
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
                          {`₹ ${parseFloat(
                            statementSummaryDetails.totalReceivedAmount
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            currency: "INR",
                          })}`}
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
                          {`₹ ${parseFloat(
                            statementSummaryDetails.totalOutstandingAmount
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            currency: "INR",
                          })}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.notesText}>Notes :</Text>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      If the payments is made through cheque then the payment is
                      subject to realization of the same.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      The Total Dues is inclusive of installment amount Due till
                      date + interest amount accumulated and due on the unit.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      TDS Credit has been given only for those certificates
                      which has been submitted in original.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      {`Interest accumulated as on date is Rs ${parseFloat(
                        statementSummaryDetails.totalInterestOutstandingAmount
                      ).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        currency: "INR",
                      })} /- (excluding GST), on all non-timely payments. You are requested to clear your interest dues along with installment dues. You can raise request with our Customer Services Team to share detailed interest sheet for your record.`}
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      The rate of interest on delayed payments shall vary from
                      time to time as per the State Bank of India highest
                      marginal cost of lending rate plus 2% (two percent).
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      For more details kindly raise a request with our customer
                      services team for the detailed statement of accounts for
                      your own record.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Discrepancies if any, should be brought to the notice of
                      the company immediately.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Applicant details or any other information doesn't entitle
                      user/applicant/customer(s) to claim ownership of aforesaid
                      property unless the conveyance deed is executed in favour
                      of the user/applicant/customer(s) by the company.
                    </Text>
                  </View>
                </>
              ) : tabIndex == 5 ? (
                <View>
                  <FlatList
                    data={paymentPlanDetails.eventDetails}
                    renderItem={(item) => renderPlanAndScheduleData(item)}
                    extraData={paymentPlanDetails.eventDetails}
                    keyExtractor={(item, index) => String(index)}
                    scrollEnabled={true}
                    onEndReachedThreshold={1}
                  />
                </View>
              ) : tabIndex == 6 ? (
                <View style={styles.paymentHistoryContainer}>
                  <View style={styles.mainBoxContainer}>
                    <View style={styles.mainBoxSection}>
                      <View style={styles.receiptSubBoxContainer}>
                        <Text style={styles.boxText1}>Receipt No</Text>
                      </View>
                      <View style={styles.verticalDivider}></View>
                      <View style={styles.receiptSubBoxContainer}>
                        <Text style={styles.boxText1}>Mode</Text>
                      </View>
                      <View style={styles.verticalDivider}></View>
                      <View style={styles.receiptSubBoxContainer}>
                        <Text style={styles.boxText1}>Payment Status</Text>
                      </View>
                    </View>
                    <View style={styles.horizontalDivider}></View>
                    <View>
                      <FlatList
                        data={receiptSummaryDetails}
                        renderItem={({ item, index }) =>
                          renderReceiptSummaryData(item, index)
                        }
                        extraData={receiptSummaryDetails}
                        keyExtractor={(item, index) => String(index)}
                        scrollEnabled={true}
                        onEndReachedThreshold={1}
                      />
                    </View>
                  </View>
                  <Text style={styles.notesText}>Notes :</Text>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      If the Payments is made through cheque then the payment in
                      subject to the realization of the same.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      TDS credit has been given only for those certificates
                      which has been submitted in original.
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Discrepancies if any, should be brought to the notice of
                      the company immediately Applicant details or any other
                      information doesn't entitle user/applicant/customer(s) to
                      claim ownership of aforesaid property unless the
                      conveyance deed is executed in favour of the
                      user/applicant/customer(s) by the company.
                    </Text>
                  </View>
                </View>
              ) : (
                <>
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
                        <Text style={styles.boxText2}>
                          {props.allotmentDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.horizontalDivider}></View>

                    <View style={styles.mainBoxSection}>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText1}>Agreement Date</Text>
                      </View>
                      <View style={styles.verticalDivider}></View>
                      <View style={styles.subBoxContainer}>
                        <Text style={styles.boxText2}>
                          {props.agreementDate}
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
                        <Text style={styles.boxText2}>
                          {props.paymentSource}
                        </Text>
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
                          {`₹ ${parseFloat(props.loanAmount).toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 2,
                              currency: "INR",
                            }
                          )}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.notesText}>Notes :</Text>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Discrepancies if any, should be brought to the notice of
                      the company immediately
                    </Text>
                  </View>
                  <View style={styles.notesTextSubView}>
                    <View style={styles.notesPoints}></View>
                    <Text style={styles.notesSubText}>
                      Applicant details or any other information doesn't entitle
                      user/applicant/customer(s) to claim ownership of aforesaid
                      property unless the conveyance deed is executed in favour
                      of the user/applicant/customer(s) by the company.
                    </Text>
                  </View>
                </>
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
    paddingHorizontal: 15,
  },
  receiptSubBoxContainer: {
    flex: 0.33,
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  boxText1: {
    alignSelf: "flex-start",
    fontSize: 13,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  boxText2: {
    alignSelf: "flex-start",
    fontSize: 13,
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
  notesText: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
    marginTop: 15,
  },
  notesTextSubView: {
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 15,
    marginTop: 10,
  },
  notesPoints: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginRight: 5,
    marginTop: 7,
    backgroundColor: Colors.black,
  },
  notesSubText: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontFamily: Fonts.RobotoMedium,
    color: Colors.black,
  },
  whatsAppIcon: { height: 35, width: 35, marginBottom: 15 },
  phoneIcon: { height: 35, width: 35 },
});
