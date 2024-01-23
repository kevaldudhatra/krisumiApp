import Axios from "axios";
import Constants from "../../Theme/Constants";

export function getToken(email, password) {
  return Axios.get(Constants.API.getTokenApi + `${email}&apiKey=${password}`)
    .then(function (response) {
      console.log("getToken api call success => ", JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      console.log("getToken api call fail => ", JSON.stringify(error.response));
      return error.response;
    });
}

export function getCustomerDetails(param) {
  return Axios.post(Constants.API.getBasicCustomerDetails, param)
    .then(function (response) {
      console.log(
        "getCustomerDetails api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "getCustomerDetails api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function getBookingDetails(param) {
  return Axios.post(Constants.API.getBookingDetails, param)
    .then(function (response) {
      console.log(
        "getBookingDetails api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "getBookingDetails api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function getUnitSummaryDetails(param) {
  return Axios.post(Constants.API.getUnitSummaryDetails, param)
    .then(function (response) {
      console.log(
        "getUnitSummaryDetails api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "getUnitSummaryDetails api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function getPaymentPlanDetails(param) {
  return Axios.post(Constants.API.getPaymentPlanDetails, param)
    .then(function (response) {
      console.log(
        "getPaymentPlanDetails api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "getPaymentPlanDetails api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function getStatementSummaryDetails(param) {
  return Axios.post(Constants.API.getStatementSummaryDetails, param)
    .then(function (response) {
      console.log(
        "getStatementSummaryDetails api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "getStatementSummaryDetails api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function addContactUsRequest(param) {
  return Axios.post(Constants.API.addContactUsRequest, param)
    .then(function (response) {
      console.log(
        "addContactUsRequest api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "addContactUsRequest api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}

export function raiseTicketRequest(param) {
  return Axios.post(Constants.API.raiseTicketRequest, param)
    .then(function (response) {
      console.log(
        "raiseTicketRequest api call success => ",
        JSON.stringify(response)
      );
      return response;
    })
    .catch(function (error) {
      console.log(
        "raiseTicketRequest api call fail => ",
        JSON.stringify(error.response)
      );
      return error.response;
    });
}
