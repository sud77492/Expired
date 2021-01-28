import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/ExpiredContext";
import { navigate } from "../navigationRef";
import { MaterialIcons } from "@expo/vector-icons";
import OptionsMenu from "react-native-option-menu";

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
  editItem = () => {
    navigate("EditItem", { id: item.id });
  };

  deleteItem = () => {
    //navigate("EditItem", { id: item.id });
    deleteBlogPost(item._id);
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
      <OptionsMenu
        customButton={myIcon}
        destructiveIndex={1}
        options={["Edit", "Delete", "Cancel"]}
        actions={[editItem, deleteItem]}
      />
      {/* <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigate("EditItem", { id: item.id })}
      >
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
}

const AllListRoute = ({ navigation }) => {
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
        keyExtractor={(blogPost) => blogPost.name}
        renderItem={({ item }) => {
          editItem = () => {
            navigate("EditItem", { id: item.id });
          };

          deleteItem = () => {
            //navigate("EditItem", { id: item.id });
            deleteBlogPost(item._id);
          };
          return (
            <TouchableOpacity onPress={() => navigate("AddItem")}>
              <Item item={item} />
              {/* <View style={styles.listItem}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.thought}</Text>
                  <Text>{item.name}</Text>
                </View>
                <OptionsMenu
                  customButton={myIcon}
                  destructiveIndex={1}
                  options={["Edit", "Delete", "Cancel"]}
                  actions={[editItem, deleteItem]}
                />
              </View>*/}
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
});

export default AllListRoute;
