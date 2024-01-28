import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import Bin from '../../assets/icon.png';
import BinSuccess from "../../assets/images/bin-success.png";

const Scan = (props) => {
  const { finished } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {finished ? "Scan Finished!" : "Scanning in progress..."}
      </Text>
      <Image
        source={finished ? BinSuccess : Bin}
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
    paddingTop: 250,
    paddingBottom: 250,
  },
  text: {
    color: "#2a6d6e",
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
});

export default Scan;
