import { showAlert } from "../Functions/Alerts";
var { EventEmitter } = require("fbemitter");

export const baseURL = {
  URL: "https://erp.krisumi.in/SalesCustomer/api/CustomerDetail",
};

export const API = {
  getTokenApi: `${baseURL.URL}/GetSecurityToken?apiUser=`,
  getBasicCustomerDetails: baseURL.URL + "/GetBasicCustomerDetails",
  getBookingDetails: baseURL.URL + "/GetBookingDetails",
  getUnitSummaryDetails: baseURL.URL + "/GetUnitSummaryDetails",
  getPaymentPlanDetails: baseURL.URL + "/GetPaymentPlanDetails",
  getStatementSummaryDetails: baseURL.URL + "/GetStatementSummaryDetails",
  getReceiptSummaryDetails: baseURL.URL + "/GetReceiptSummaryDetails",
  addContactUsRequest: "https://krisumi.virvainfotech.com/api/v1/add/enquiry",
  raiseTicketRequest: "https://krisumi.virvainfotech.com/api/v1/add/ticket",
};

export const commonConstant = {
  appName: "Krisumi",
  email: "Krisumi@In4",
  password: "Kr2is0um1i9!",
  currentUseremail: null,
  currentUserPassword: null,
  currentUserBookingId: null,
  currentUserCustomerCode: null,
  emitter: new EventEmitter(),
};

export const eventListenerKeys = {};

export const asyncStorageKeys = {};

export const apiResponse = {
  success: 200,
  fail: 500,
  status: "success",
};

export function errorHandle(response) {
  if (response && response.data && response.data.message) {
    showAlert(response.data.message);
  } else {
    showAlert("Oops something went wrong please try again!");
  }
}

export default {
  API,
  commonConstant,
  eventListenerKeys,
  asyncStorageKeys,
  apiResponse,
  errorHandle,
};
