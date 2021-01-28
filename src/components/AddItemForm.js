import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import Background from "../components/Background";
import Button from "./Button";
import TextInput from "./TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { theme } from "../core/theme";
import Icon from "react-native-ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { Context } from "../context/ExpiredContext";
import moment from "moment";

const AddItemForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [product, setProduct] = useState(initialValues.product);
  const [category, setCategory] = useState(initialValues.category);
  const [expiry, setExpiry] = useState(initialValues.expiry);
  const [dateExpire, setDateExpire] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [
    isDatePickerVisibleNotification,
    setDatePickerVisibilityNotification,
  ] = useState(false);
  const { state, getCategories } = useContext(Context);
  const [notifications, setNotifications] = useState([]);
  // console.log("Edit");

  //console.log("Sudhanshu " + JSON.stringify(initialValues.notifications));
  // var text = JSON.parse(initialValues.notifications);
  useEffect(() => {
    const urls = initialValues.notifications.map(
      (notification) =>
        setNotifications([
          ...notifications,
          { timestamp: notification.timestamp },
        ])

      //console.log("Namaste " + notification.timestamp)
    );
  }, []);

  //useEffect(() => {
  //getCategories();

  // const listener = navigation.addListener("didFocus", () => {
  //   getCategories();
  // });

  // return () => {
  //   listener.remove();
  // };
  //}, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDatePickerNotification = () => {
    setDatePickerVisibilityNotification(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideDatePickerNotification = () => {
    setDatePickerVisibilityNotification(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    //setNotifications([...notifications, { timestamp: date }]);
    setExpiry(moment(date).format("MMM Do YY"));
    setDateExpire(date);
    console.log(date);
  };

  const handleConfirmNotification = (date) => {
    hideDatePickerNotification();
    setNotifications([...notifications, { timestamp: date }]);

    console.log(notifications);
  };

  const item = [
    {
      label: "Insurance",
      value: "Insurance",
    },
    {
      label: "Clothes",
      value: "Clothes",
    },
    {
      label: "Accessories",
      value: "Accessories",
      //icon: () => <Icon name="flag" size={18} color="#900" />,
    },
  ];

  return (
    <ScrollView>
      <Background>
        {/* <Header>Create Account</Header> */}
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name}
          onChangeText={(text) => setName(text)}
          // error={!!name.error}
          // errorText={name.error}
        />

        <DropDownPicker
          items={item}
          defaultValue={category}
          containerStyle={{ height: 60 }}
          style={{
            backgroundColor: "#fafafa",
            width: 375,
            borderColor: theme.colors.secondary,
            marginTop: 5,
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          //onChangeText={(text) => setCategory(text)}
          onChangeItem={(item) => setCategory(item.value)}
        />

        <TextInput
          label="Product"
          returnKeyType="next"
          value={product}
          onChangeText={(text) => setProduct(text)}
          // error={!!price.error}
          // errorText={price.error}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          displayFormat="DD/MM/YYYY"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisibleNotification}
          mode="date"
          displayFormat="DD/MM/YYYY"
          onConfirm={handleConfirmNotification}
          onCancel={hideDatePickerNotification}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "87%" }}>
            <TextInput
              label="Expiry Date(optional)"
              returnKeyType="next"
              value={expiry}
              //onChangeText={(text) => setExpiry(text)}
            />
          </View>
          <View style={styles.expiry}>
            <Icon
              onPress={showDatePicker}
              name="add"
              style={styles.icon}
              backgroundColor="#548e59"
              color="#fff"
            />
          </View>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={showDatePickerNotification}
        >
          Set Reminder
        </Button>
        <FlatList
          style={{ flex: 1 }}
          data={notifications}
          keyExtractor={(notification) => notification.timestamp}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{moment(item.timestamp).format("MMM Do YY")}</Text>
              </View>
            );
          }}
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() =>
            onSubmit(
              name,
              product,
              category,
              dateExpire,
              //moment(dateExpire).format(),
              "",
              notifications
            )
          }
        >
          Add Item
        </Button>
      </Background>
    </ScrollView>
  );
};

AddItemForm.defaultProps = {
  initialValues: {
    name: "",
    product: "",
    category: "",
    expiry: "",
    photo: "",
    notifications: [],
  },
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  expiry: {
    width: "10%",
    height: 40,
    backgroundColor: "#000",
    borderRadius: 50,
    marginTop: 25,
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    marginLeft: 10,
  },
  icon: {
    width: "100%",
    marginRight: 15,
    borderRadius: 50,
    color: "#FFFFFF",
  },
});

export default AddItemForm;
