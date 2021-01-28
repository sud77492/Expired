import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
//import { Notifications } from "expo";
//import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const ResolveAuthScreen = () => {
  const { tryLocalSignin, updateUser } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  // const registerForPushNotifications = async () => {
  //   try {
  //     const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     if (!permission.granted) return;
  //     const token = await Notifications.getExpoPushTokenAsync();
  //     console.log(token);
  //   } catch (error) {
  //     console.log("Error getting a token", error);
  //   }
  // };

  useEffect(() => {
    tryLocalSignin();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    const fetchData = async () => {
      const email = await AsyncStorage.getItem("email");
      console.log(email);
      console.log("token -" + expoPushToken);
    };
    fetchData();

    // console.log("token " + expoPushToken);
    // updateUser(email, token);
    //registerForPushNotifications();
  }, []);

  return null;
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default ResolveAuthScreen;
