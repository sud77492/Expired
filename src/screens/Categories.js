import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { navigate } from "../navigationRef";
import { Context } from "../context/ExpiredContext";

const Categories = ({ navigation }) => {
  const { state, getCategories } = useContext(Context);
  useEffect(() => {
    getCategories();

    const listener = navigation.addListener("didFocus", () => {
      getCategories();
    });

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={false}
        numColumns={2}
        data={state}
        keyExtractor={(blogPost) => blogPost.name}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Categories;

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
    height: 100,
    alignItems: "center",
    backgroundColor: "#FFC0CB",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
