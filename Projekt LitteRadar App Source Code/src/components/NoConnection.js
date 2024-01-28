import React from "react";

import { globalStyles } from "./styles/styles";
import { View, StyleSheet, Text } from "react-native";

const NoConnection = () => {
  return (
    <View style={styles.noConnection}>
      <Text style={styles.noConnectionText}>
        No internet connection. Please check your network settings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...globalStyles,
});

export default NoConnection;
