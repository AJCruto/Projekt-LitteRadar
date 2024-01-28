import React, { useState, useEffect } from "react";

import axios from "axios";
import BinDetected from "./BinDetected";
import Constants from "expo-constants";
import Scan from "./Scan";
import { filteredBins } from "../utils/garbageBin";

const ScanningArea = ({ navigation }) => {
  const [isScanning, setisScanning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [bins, setBins] = useState([]);
  const [scanAgainTrigger, setScanAgainTrigger] = useState(0);
  const appUrl = Constants.manifest.extra.appUrl;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchBins = async () => {
      try {
        const response = await axios.get(`${appUrl}/api/garbage-bin/get`, {
          cancelToken: source.token, // Pass the cancel token to the request
        });
        let bins = response.data;
        const binsOutsideTheRadius = filteredBins(bins, true);

        if (binsOutsideTheRadius.length >= 3) {
          bins = [];
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setBins(bins);
        setIsFinished(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setisScanning(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBins();

    // Cleanup function to cancel the request when the component unmounts
    return () => {
      source.cancel("Request canceled due to component unmounting");
    };
  }, [scanAgainTrigger]);

  const handleScanAgain = () => {
    setScanAgainTrigger(scanAgainTrigger + 1);
    setisScanning(true);
    setIsFinished(false);
  };

  return isScanning ? (
    <Scan finished={isFinished} />
  ) : (
    <BinDetected
      bins={bins}
      navigation={navigation}
      handleScanAgain={handleScanAgain}
    />
  );
};

export default ScanningArea;
