import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/ExpiredContext";
import { navigate } from "../navigationRef";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsMenu from "react-native-option-menu";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { useWindowDimensions } from "react-native";

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
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
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
    setVisible(false);
    //navigate("EditItem", { id: item.id });
  };

  const deleteItem = (item) => {
    //navigate("EditItem", { id: item.id });
    //deleteBlogPost(item._id);
    console.log(item);
  };

  const selectText = (item) => {
    console.log(item); // will print Text Pressed
    //alert(item);
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

const UptoDateRoute = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPostsGreater } = useContext(Context);
  useEffect(() => {
    getBlogPostsGreater();

    // const listener = navigation.addListener("didFocus", () => {
    //   getBlogPosts();
    // });

    // return () => {
    //   listener.remove();
    // };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={state}
        keyExtractor={(blogPost) => blogPost.name}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
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
  elevatedElement: {
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
});

export default UptoDateRoute;
