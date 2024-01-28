import React, { useState } from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutButton = ({ navigation }) => {
  const [buttonText, setButtonText] = useState("Logout");

  const handleLogout = async () => {
    setButtonText("...");
    await AsyncStorage.removeItem("authToken");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setButtonText("Logout");
    navigation.navigate("Home");
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent", // Make the background transparent
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 20,
  },
});

export default LogoutButton;
