import React, { useState, useEffect } from "react";

import {View, Text, Image, FlatList, Dimensions, StyleSheet } from "react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function Proponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const appUrl = "https://litteradar.bucocu.net";

  useEffect(() => {
    // Create a cancel token source
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/api/users/get`, {
          cancelToken: source.token, // Pass the cancel token to the request
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel the request when the component unmounts
    return () => {
      source.cancel("Request canceled due to component unmounting");
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: item.photo }} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  item: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});
