import React, { useEffect } from "react";
import { Router, Scene, Stack, Actions } from "react-native-router-flux";
import { Colors, ScreenName } from "../Theme/Index";
import { BackHandler } from "react-native";

// screen list
import SplashScreen from "../Container/MainFlow/SplashScreen";
import LoginScreen from "../Container/MainFlow/LoginScreen";
import RaiseTicketScreen from "../Container/MainFlow/RaiseTicketScreen";
import HomeScreen from "../Container/MainFlow/HomeScreen";
import ContactUsScreen from "../Container/MainFlow/ContactUsScreen";
import BookingScreen from "../Container/MainFlow/BookingScreen";

export default function RouterComponent({ isAuthed }) {
  const backAction = () => {
    let screeName = Actions.currentScene;
    if (screeName === ScreenName.SplashScreen) {
      BackHandler.exitApp();
    } else if (screeName === ScreenName.LoginScreen) {
      BackHandler.exitApp();
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Router sceneStyle={{ backgroundColor: Colors.white }}>
      <Stack>
        <Scene hideNavBar key="auth" initial={!isAuthed}>
          <Scene
            key={ScreenName.SplashScreen}
            component={SplashScreen}
            isAuth={isAuthed}
            initial
          />
        </Scene>

        <Scene hideNavBar key="root" gesturesEnabled={false} initial={isAuthed}>
          <Stack>
            <Scene
              key={ScreenName.LoginScreen}
              component={LoginScreen}
              hideNavBar={true}
            />
            <Scene
              key={ScreenName.RaiseTicketScreen}
              component={RaiseTicketScreen}
              hideNavBar={true}
            />
            <Scene
              key={ScreenName.HomeScreen}
              component={HomeScreen}
              hideNavBar={true}
            />
            <Scene
              key={ScreenName.ContactUsScreen}
              component={ContactUsScreen}
              hideNavBar={true}
            />
            <Scene
              key={ScreenName.BookingScreen}
              component={BookingScreen}
              hideNavBar={true}
            />
          </Stack>
        </Scene>
      </Stack>
    </Router>
  );
}
