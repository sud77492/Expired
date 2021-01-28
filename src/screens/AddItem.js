import React, { useContext, useEffect } from "react";
import { Context } from "../context/ExpiredContext";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import AddItemForm from "../components/AddItemForm";
import { HeaderBackButton } from "react-navigation-stack";

const AddItem = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);
  return (
    <AddItemForm
      onSubmit={(name, product, category, expiry, photo, notifications) => {
        console.log(notifications);
        addBlogPost(
          name,
          product,
          category,
          expiry,
          "https://randomuser.me/api/portraits/women/44.jpg",
          notifications,
          () => navigation.navigate("Home") //navigation.pop()
        );
      }}
    />
    // <View style={styles.container}>
    //   <View style={styles.buttonContainer}>
    //     <Button title="Button 1" />
    //   </View>
    //   <View style={styles.buttonContainer}>
    //     <Button title="Button 2" />
    //   </View>
    // </View>
  );
};

AddItem.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.navigate("Home")} />
    ),
  };
};

const styles = StyleSheet.create({});

export default AddItem;
