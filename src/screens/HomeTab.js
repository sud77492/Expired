import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Provider } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";
import AllListRoute from "./AllList";
import UptoDateRoute from "./UptoDateList";
import ExpiryRoute from "./ExpiredList";
import { navigate } from "../navigationRef";
import SigninScreen from "./SigninScreen";

const initialLayout = { width: Dimensions.get("window").width };

const Home = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "AllListRoute", title: "Products" },
    { key: "UptoDateRoute", title: "Upto Date" },
    { key: "ExpiryRoute", title: "Expired" },
  ]);

  const renderScene = SceneMap({
    AllListRoute: AllListRoute,
    UptoDateRoute: UptoDateRoute,
    ExpiryRoute: ExpiryRoute,
  });
  return (
      <SafeAreaView style={styles.container}>
        <TabView
          navigationState={{ index, routes, navigation }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        <TouchableOpacity
          onPress={() => navigate("AddItem")}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
  );
};

Home.navigationOptions = {
  title: "Home",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 22,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
});

export default Home;
