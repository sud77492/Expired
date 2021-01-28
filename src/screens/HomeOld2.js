import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { TabView, SceneMap } from "react-native-tab-view";
//import AllListRoute from "./AllList";
//import UptoDateRoute from "./UptoDateList";
//import ExpiryRoute from "./ExpiredList";
import { navigate } from "../navigationRef";
import { Context } from "../context/ExpiredContext";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsMenu from "react-native-option-menu";
import { Menu, Divider, Provider } from "react-native-paper";

const initialLayout = { width: Dimensions.get("window").width };

const myIcon = (
  <MaterialIcons
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    }}
    name="more-vert"
    size={24}
    color="black"
  />
);

function Item({ item }) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const myIconNew = (
    <TouchableOpacity onPress={openMenu}>
      <MaterialIcons
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
        name="more-vert"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );

  console.log(item);
  const editItem = (item) => {
    console.log(item);
    //navigate("EditItem", { id: item.id });
  };

  const deleteItem = (item) => {
    //navigate("EditItem", { id: item.id });
    //deleteBlogPost(item._id);
    console.log(item);
  };

  return (
    <View style={styles.listItem}>
      <Image
        source={{ uri: item.photo }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item.thought}</Text>
        <Text>{item.name}</Text>
      </View>
      {/* <OptionsMenu
        customButton={myIcon}
        destructiveIndex={1}
        options={["Edit", "Delete", "Cancel"]}
        actions={[editItem(item), deleteItem(item)]}
      /> */}
      <Menu
        optionsContainerStyle={{ marginLeft: -20 }}
        visible={visible}
        onDismiss={closeMenu}
        //anchor={{ x: windowWidth, y: 100 }}
        anchor={myIconNew}
      >
        <Menu.Item
          onPress={() => {
            editItem(item);
          }}
          title="Edit"
        />
        <Menu.Item
          onPress={() => {
            deleteItem(item);
          }}
          title="Delete"
        />
        <Divider />
        <Menu.Item onPress={() => {}} title="Cancel" />
      </Menu>
    </View>
  );
}

const Home = ({ navigation }) => {
  useEffect(() => {
    registerForPushNotification().then((token) => console.log(token));
    //.catch((err) => console.log(Err));
  }, []);
  async function registerForPushNotification() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status != "granted") {
      alert("Fail to get the push token");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "AllListRoute", title: "Products" },
    { key: "UptoDateRoute", title: "Upto Date" },
    { key: "ExpiryRoute", title: "Expired" },
  ]);

  const AllListRoute = () => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
    useEffect(() => {
      getBlogPosts();

      const listener = navigation.addListener("didFocus", () => {
        getBlogPosts();
      });

      return () => {
        listener.remove();
      };
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={state}
          keyExtractor={(blogPost) => blogPost._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigate("AddItem")}>
                <Item item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  };

  const UptoDateRoute = () => {
    const { state, deleteBlogPost, getBlogPostsGreater } = useContext(Context);
    useEffect(() => {
      getBlogPostsGreater();

      const listener = navigation.addListener("didFocus", () => {
        getBlogPostsGreater();
      });

      return () => {
        listener.remove();
      };
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={state}
          keyExtractor={(blogPost) => blogPost._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigate("AddItem")}>
                <Item item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  };

  const ExpiryRoute = () => {
    const { state, deleteBlogPost, getBlogPostsLess } = useContext(Context);
    useEffect(() => {
      getBlogPostsLess();

      const listener = navigation.addListener("didFocus", () => {
        getBlogPostsLess();
      });

      return () => {
        listener.remove();
      };
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={state}
          keyExtractor={(blogPost) => blogPost._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => navigate("AddItem")}>
                <Item item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  };

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
      <TouchableOpacity onPress={() => navigate("AddItem")} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
    // <View>
    //   <Text>Sudhanshu</Text>
    // </View>
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
  title: {
    fontSize: 32,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
});

export default Home;
