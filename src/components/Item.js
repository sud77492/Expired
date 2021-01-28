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

export default Item;
