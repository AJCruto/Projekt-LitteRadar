import React, { useState, useEffect } from "react";

import { globalStyles } from "./styles/styles";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import LitteradarLogo from "../../assets/images/litteradar-logo.png";
import NetInfo from "@react-native-community/netinfo";
import NoConnection from "./NoConnection";
import useTokenValidityCheck from "./useTokenValidityCheck";

const HomeScreen = ({ navigation }) => {
  const { checkTokenValidity } = useTokenValidityCheck();
  const [isConnected, setIsConnected] = useState(true);

  // check internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleScanPress = async () => {
    navigation.navigate("Scan");
  };

  return (
    <View style={styles.container}>
      {!isConnected && <NoConnection />}
      <Image source={LitteradarLogo} style={styles.image} />
      <TouchableOpacity onPress={handleScanPress} style={styles.button}>
        <Text style={styles.buttonText}>SCAN FOR NEARBY GARBAGE BINS</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const tokenIsValid = await checkTokenValidity();
          console.log("tokenIsValidfromHome", tokenIsValid);
          navigation.navigate(tokenIsValid ? "Admin" : "Login");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>LOGIN AS ADMIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    marginBottom: 100,
  },
  ...globalStyles,
});

export default HomeScreen;
