import { useEffect, useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useTokenValidityCheck = () => {
  const cancelTokenSourceRef = useRef(null);
  const appUrl = "https://litteradar.bucocu.net";

  const checkTokenValidity = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const response = await axios.get(`${appUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: cancelTokenSourceRef.current?.token, // Pass the cancel token to the request
        });

        const isTokenValid = response.data.user ? true : false;
        console.log("AsyncStorage", token, "isTokenValid", isTokenValid);

        return isTokenValid;
      }

      return false;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, no need to handle the error
      } else {
        console.log("Token check error:", error);
      }
    }
    return false; // Return false for other error cases
  };

  // Function to cancel the ongoing request
  const cancelTokenRequest = () => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel(
        "Request canceled due to component unmounting"
      );
    }
  };

  useEffect(() => {
    // Create a cancel token source
    cancelTokenSourceRef.current = axios.CancelToken.source();

    return () => {
      // Cleanup function to cancel the request when the component unmounts
      cancelTokenRequest();
    };
  }, []);

  return { checkTokenValidity, cancelTokenRequest };
};

export default useTokenValidityCheck;
