import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import Logo from '../../assets/images/litteradar-logo-bin.png';

const ScanInProgress = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scanning in progress...</Text>
      <Image
        source={Logo}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 200,
    paddingBottom: 200,
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
});

export default ScanInProgress;
