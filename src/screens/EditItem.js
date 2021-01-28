import React, { useContext, useEffect } from "react";
import { Context } from "../context/ExpiredContext";
import { StyleSheet } from "react-native";
import AddItemForm from "../components/AddItemForm";
import moment from "moment";
import { HeaderBackButton } from "react-navigation-stack";

const EditItem = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);
  const blogPost = state.find((blogPost) => blogPost._id === id);
  const _id = blogPost._id;
  console.log("Sudaasdsdn fas + ", _id);

  return (
    <AddItemForm
      initialValues={{
        name: blogPost.name,
        product: blogPost.product,
        category: blogPost.category,
        expiry: moment(blogPost.expiry).format("MMM Do YY"),
        notifications: blogPost.notifications,
      }}
      onSubmit={(name, product, category, expiry, notifications) => {
        editBlogPost(_id, name, product, category, expiry, notifications, () =>
          //navigation.pop()
          navigation.navigate("Home")
        );
      }}
    />
  );
};

EditItem.navigationOptions = ({ navigation }) => {
  return {
    //header: () => false,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.navigate("Home")} />
    ),
  };
};

const styles = StyleSheet.create({});

export default EditItem;
