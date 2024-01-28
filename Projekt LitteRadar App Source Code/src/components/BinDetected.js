import React from "react";

import { globalStyles } from "./styles/styles";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import BinFailed from "../../assets/images/bin-failed.png";
import BinSuccess from "../../assets/images/bin-success.png";
import WarningSign from "../../assets/images/warning.png";

const BinDetected = (props) => {
  const { bins, navigation, handleScanAgain } = props;

  const handleExit = () => {
    navigation.navigate("Home");
  };

  const handleNavigate = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      <Image source={WarningSign} style={styles.warningSign} />
      <Text style={styles.text}>
        {bins.length > 0 ? "Bin Detected" : "No Bin Detected"}
      </Text>

      <Image
        source={bins.length > 0 ? BinSuccess : BinFailed}
        style={styles.image}
      />

      {bins.length > 0 ? (
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>NAVIGATE</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={handleScanAgain} style={styles.button}>
            <Text style={styles.buttonText}>SCAN AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExit} style={styles.button}>
            <Text style={styles.buttonText}>EXIT</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
  },
  text: {
    color: "#2a6d6e",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  warningSign: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
  ...globalStyles,
});

export default BinDetected;
