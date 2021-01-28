import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/ExpiredContext";
import { navigate } from "../navigationRef";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import { Icon } from "react-native-elements";

const myIcon = (
  <MaterialIcons
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
    }}
    name="more-vert"
    size={24}
    color="white"
  />
);

const headerIconClick = () => {
  AsyncStorage.removeItem("token");
  navigate("loginFlow");
};

function Item({ item }) {
  const { deleteBlogPost, getBlogPosts } = useContext(Context);
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
        color="white"
      />
    </TouchableOpacity>
  );

  const editItem = (item) => {
    console.log(item);
    setVisible(false);
    navigate("EditItem", { id: item._id });
  };

  const deleteItem = (item) => {
    //navigate("EditItem", { id: item.id });
    setVisible(false);
    deleteBlogPost(item._id);
    getBlogPosts();
    console.log(item);
  };

  const cancel = () => {
    setVisible(false);
    //alert(item);
  };

  return (
    // <View style={[styles.item, getColor(item)]}>

    <View style={[styles.item, getColor(item)]}>
      <View style={styles.circle}>
        <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
          {item.daysCount}
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.textItem}>{item.name}</Text>
        <Text style={styles.textItem}>{item.product}</Text>
        <Text style={styles.textItem}>{item.category}</Text>
      </View>

      <Menu visible={visible} onDismiss={closeMenu} anchor={myIconNew}>
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
        <Menu.Item
          onPress={() => {
            cancel();
          }}
          title="Cancel"
        />
      </Menu>
    </View>
  );
}

const getColor = (item) => {
  switch (item.daysCount < 0) {
    case false:
      return styles.listItemGreen;
    case true:
      return styles.listItemRed;
    default:
      return styles.listItemGreen;
  }
};

const Home = ({ navigation }) => {
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

  // navigation.setOptions({
  //   title: "Home",
  // });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "Filter Meals",
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={state}
        keyExtractor={(blogPost) => blogPost.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Item item={item} />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity onPress={() => navigate("AddItem")} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

Home.navigationOptions = {
  title: "Home",
  headerRight: (
    <TouchableOpacity
      onPress={() => headerIconClick()}
      style={{ paddingLeft: 10 }}
    >
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "log-out-outline" : "log-out-outline"}
      />
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  title: {
    fontSize: 32,
  },
  view: {
    alignItems: "center",
    flex: 1,
  },
  textItem: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  listItemRed: {
    margin: 10,
    padding: 10,
    backgroundColor: "red",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  listItemGreen: {
    margin: 10,
    padding: 10,
    backgroundColor: "green",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "white",
    borderStyle: "solid",
    justifyContent: "center",
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
