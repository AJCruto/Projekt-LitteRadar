import React, { useEffect, useState, useRef } from "react";

import { decode } from "@mapbox/polyline";
import {
  filteredBins,
  generateAlertText,
  filteredByMovingBins,
  areBinsMovedRecently,
} from "../utils/garbageBin";
import { initialRegion } from "./Utils";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, { Marker, Polyline } from "react-native-maps";
import Modal from "react-native-modal";
import Logo from "../../assets/images/litteradar-logo-bin.png";
import NoConnection from "./NoConnection";
import NetInfo from "@react-native-community/netinfo";

const fetchDataInterval = 15000; // 15 seconds in milliseconds

const GoogleMapComponent = ({ isAdmin = false }) => {
  // const appUrl = Constants.manifest.extra.appUrl;
  // const googleApiKey = Constants.manifest.android.config.googleMaps.apiKey;
  const appUrl = "https://litteradar.bucocu.net";
  const googleApiKey = "AIzaSyDtcq6LsyKsuiR85ruTFhn6lbnbbxkCiQc";
  const mapRef = useRef();

  const [heading, setHeading] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [garbageBins, setGarbageBins] = useState([]);
  const [notificationText, setNotificationText] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const generateNotification = async (data) => {
    const notifications = filteredByMovingBins(data);
    console.log(notifications);

    const hasMovingBin = notifications.some((item) => item.is_moving === 1);
    const someBinsMovedRecently = areBinsMovedRecently(data);
    if (hasMovingBin && someBinsMovedRecently) {
      setNotificationText(notifications);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setModalVisible(true);
    }
  };

  const checkIfSomeBinIsOutsideTheRadius = async (data) => {
    const binsOutsideTheRadius = filteredBins(data, true);

    if (binsOutsideTheRadius.length > 0) {
      const alertText = generateAlertText(binsOutsideTheRadius);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      Alert.alert("Bin Notification", alertText);
    }
  };

  // check internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  // get garbage bins
  useEffect(() => {
    // Create a cancel token source
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`${appUrl}/api/garbage-bin/get`, {
          cancelToken: source.token,
        });

        const binInsideTheRadius = filteredBins(response.data);

        if (binInsideTheRadius.length > 0) {
          setGarbageBins(binInsideTheRadius);
        }

        if (isAdmin) {
          checkIfSomeBinIsOutsideTheRadius(response.data);
          generateNotification(response.data);
        }
      } catch (error) {
        console.log("Error fetching garbage bins:", error);
      }
    };

    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, fetchDataInterval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      source.cancel("Request canceled: Component unmounted");
    };
  }, []);

  // request for location
  useEffect(() => {
    (async () => {
      // Request for location permission (if required)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      // Get the current location
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        setCurrentPosition({ latitude, longitude });
        animateMap(
          {
            latitude,
            longitude,
          },
          {
            coords: {
              latitude,
              longitude,
            },
          }
        );
      } catch (error) {
        console.log("Error getting current location:", error);
      }

      let headingSubscription;
      try {
        // Subscribe to heading updates
        headingSubscription = await Location.watchHeadingAsync((newHeading) => {
          setHeading(newHeading.magHeading);
        });
      } catch (e) {
        console.error(e);
      }

      // Subscribe to location updates
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1, // Update location every 1 meter
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentPosition({ latitude, longitude });
        }
      );

      // Clean up the location subscription when the component unmounts
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
        // Remember to unsubscribe from updates
        if (headingSubscription) {
          headingSubscription.remove();
        }
      };
    })();
  }, []);

  const animateMap = (location, destination, reset = true) => {
    let newLat = (location.latitude + destination.coords.latitude) / 2;
    let newLon = (location.longitude + destination.coords.longitude) / 2;
    let newLatDelta =
      Math.abs(location.latitude - destination.coords.latitude) * 1.2;
    let newLonDelta =
      Math.abs(location.longitude - destination.coords.longitude) * 1.2;

    if (reset) {
      newLat = location.latitude;
      newLon = location.longitude;
      newLatDelta = 0.005;
      newLonDelta = 0.005;
    }

    mapRef.current.animateToRegion(
      {
        latitude: newLat,
        longitude: newLon,
        latitudeDelta: newLonDelta,
        longitudeDelta: newLatDelta,
      },
      1000
    );
  };

  const setDestination = async (destination) => {
    if (!currentPosition) {
      return;
    }

    if (polylinePoints.name === destination.name) {
      setPolylinePoints({ ...polylinePoints, name: null });
      animateMap(currentPosition, destination);
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${currentPosition.latitude},${currentPosition.longitude}&destination=${destination.coords.latitude},${destination.coords.longitude}&mode=walking&key=${googleApiKey}`
      );

      const { data } = response;

      if (data.status === "OK") {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decode(points);
        const polylineCoordinates = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setPolylinePoints({
          name: destination.name,
          coords: polylineCoordinates,
        });

        animateMap(currentPosition, destination, false);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
      <View style={styles.container}>
        {!isConnected && <NoConnection />}
        <Modal isVisible={isModalVisible}>
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}
          >
            <Image
              source={Logo} // Provide the path to your image
              style={{ width: 50, height: 50, alignSelf: "center" }}
            />
            <View style={{ marginVertical: 10 }}>
              {notificationText &&
                notificationText.map((notification) => (
                  <Text key={notification.id}>
                    {notification.name}:
                    <Text
                      style={{
                        color: notification.is_moving ? "red" : "green",
                      }}
                    >
                      {notification.description}
                    </Text>
                  </Text>
                ))}
            </View>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={toggleModal}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <MapView style={styles.map} initialRegion={initialRegion} ref={mapRef}>
          {currentPosition && (
            <Marker
              coordinate={currentPosition}
              title="My Location"
              description="You are here"
              rotation={heading}
            >
              <Icon
                name="map-marker"
                size={32}
                color="#77A1D3"
                style={styles.markerIcon}
              />
            </Marker>
          )}
          {garbageBins.map((bin, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: bin.latitude,
                longitude: bin.longitude,
              }}
              title={bin.name}
              onPress={() => {
                setDestination({
                  name: bin.name,
                  coords: {
                    latitude: bin.latitude,
                    longitude: bin.longitude,
                  },
                });
              }}
            >
              <View style={styles.trashBin}>
                <Icon name="trash" size={18} color="#FFF" />
              </View>
            </Marker>
          ))}
          {polylinePoints.name && (
            <Polyline
              coordinates={polylinePoints.coords}
              strokeWidth={10}
              strokeColor="#24527a"
              lineDashPattern={[2, 40]}
            />
          )}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  trashBin: {
    width: 32,
    height: 32,
    borderRadius: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  markerIcon: {
    transform: [{ rotate: "180deg" }],
  },
});

export default GoogleMapComponent;
