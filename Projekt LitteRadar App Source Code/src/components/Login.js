import React, { useState, useEffect } from "react";

import { globalStyles } from "./styles/styles";
import { Input } from "react-native-elements";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import LitteradarLogo from "../../assets/images/litteradar-logo.png";
import useTokenValidityCheck from "./useTokenValidityCheck";

const Login = ({ navigation }) => {
  const { checkTokenValidity, cancelTokenRequest } = useTokenValidityCheck();
  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const appUrl = "https://litteradar.bucocu.net";

  useEffect(() => {
    (async () => {
      const tokenIsValid = await checkTokenValidity();
      if (tokenIsValid) {
        navigation.navigate("Admin");
      }
    })();

    return () => {
      cancelTokenRequest();
    };
  }, []);

  const handleLogin = async () => {
    try {
      setisLoading(true);
      const response = await axios.post(`${appUrl}/api/login`, {
        email,
        password,
      });

      const token = response.data?.token;
      await AsyncStorage.setItem("authToken", token);
      navigation.navigate("Admin");
    } catch (error) {
      Alert.alert(
        "Wrong credentials",
        "Please check your username or password.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LitteradarLogo} style={styles.image} />
      <Input
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={isLoading ? true : false}
      >
        <Text style={styles.buttonText}>{isLoading ? "..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    marginBottom: 100,
  },
  ...globalStyles,
});

export default Login;
