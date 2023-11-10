import { Alert } from "react-native";
import { commonConstant } from "../Theme/Constants";

export function showAlert(
  message,
  title = commonConstant.appName,
  buttonTitle = "OK"
) {
  setTimeout(() => {
    Alert.alert(title, message, [{ text: buttonTitle }]);
  }, 500);
}

export function showAlertWithYes(message, firstButtonTitle, firstCallback) {
  setTimeout(() => {
    Alert.alert(
      commonConstant.appName,
      message,
      [
        {
          text: firstButtonTitle,
          onPress: () => {
            firstCallback();
          },
        },
      ],
      { cancelable: false }
    );
  }, 500);
}

export function showAlertWithTwoCallback(
  message,
  title = commonConstant.appName,
  firstButtonTitle,
  secondButtonTitle,
  firstCallback,
  secondCallback
) {
  setTimeout(() => {
    Alert.alert(
      title,
      message,
      [
        {
          text: firstButtonTitle,
          onPress: () => {
            firstCallback();
          },
        },
        {
          text: secondButtonTitle,
          onPress: () => {
            secondCallback();
          },
        },
      ],
      { cancelable: false }
    );
  }, 500);
}
