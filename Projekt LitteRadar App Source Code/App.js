import React from "react";

import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import Admin from "./src/components/Admin";
import GoogleMapComponent from "./src/components/GoogleMapComponent";
import HomeScreen from "./src/components/HomeScreen";
import Login from "./src/components/Login";
import LogoutButton from "./src/components/LogoutButton";
import Proponent from "./src/components/Proponent";
import ScanningArea from "./src/components/ScanningArea";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Map"
          component={GoogleMapComponent}
          options={({ navigation }) => ({
            title: "BIN LOCATION",
            headerTitleAlign: "center",
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  // Your custom action
                  navigation.navigate("Home");
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={({ navigation }) => ({
            title: "Admin",
            headerTitleAlign: "center",
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  // Your custom action
                  navigation.navigate("Home");
                }}
              />
            ),
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Scan"
          component={ScanningArea}
          options={{ headerShown: false }} // This hides the header
        />
        <Stack.Screen
          name="Proponent"
          component={Proponent}
          options={{
            title: "Proponents",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
