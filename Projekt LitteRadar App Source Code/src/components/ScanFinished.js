import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import BinSuccess from '../../assets/images/bin-success.png';

const ScanFinished = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan Finished!</Text>
      <Image
        source={BinSuccess}
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

export default ScanFinished;
