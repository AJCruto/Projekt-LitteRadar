import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2a6d6e",

    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center", // Center horizontally within the button
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center", // Center the text within the button horizontally
  },
  noConnection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF6347", // Set your desired background color
    padding: 10,
    zIndex: 9,
  },
  noConnectionText: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
});
