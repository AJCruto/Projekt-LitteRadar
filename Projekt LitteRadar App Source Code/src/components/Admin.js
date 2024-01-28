import React from "react";

import { View, Text } from "react-native";
import GoogleMapComponent from "./GoogleMapComponent";

const Admin = () => {
  return (<GoogleMapComponent isAdmin={true} />);
};

export default Admin;
