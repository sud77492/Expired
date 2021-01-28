import React, { memo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const DatePicker = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    <TouchableOpacity>
      <Text>Selectt Expiryy Date</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 12,
    alignItems: "center",
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(DatePicker);
