import { StyleSheet } from "react-native";
import Responsive from "./Responsive";
import Colors from "./Colors";

export default StyleSheet.create({
  alignSelfCenter: { alignSelf: "center" },
  centerView: { alignItems: "center", justifyContent: "center" },
  fullHeight: { height: "100%" },
  fullWidth: { width: "100%" },
  lineStyle: {
    alignSelf: "center",
    backgroundColor: Colors.borderLine,
    height: Responsive.widthPercentageToDP("0.3%"),
    width: "100%",
  },
  positionCenterAsyncImage: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  rawFlexDirection: { flexDirection: "row" },
  resizeModeStyle: {
    resizeMode: "cover",
  },
  shadowStyle: {
    borderWidth: 0,
    elevation: 0,
    shadowColor: Colors.lineTopBottom,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});
