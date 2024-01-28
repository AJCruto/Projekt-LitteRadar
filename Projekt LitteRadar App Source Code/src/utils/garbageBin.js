import { centerCoords, deploymentCoordinates } from "../components/Utils";
import moment from "moment-timezone";

const binsIsInsideTheCenter = (deploymentCoordinates, pointB) => {
  for (const coord of deploymentCoordinates) {
    const earthRadius = 6371 * 1000; // Radius of the Earth in meters
    const lat1 = coord.latitude * (Math.PI / 180);
    const lon1 = coord.longitude * (Math.PI / 180);
    const lat2 = pointB.latitude * (Math.PI / 180);
    const lon2 = pointB.longitude * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    if (distance <= coord.limit) {
      return true; // Point B is inside this deployment coordinate's limit
    }
  }
  return false; // Point B is not inside any deployment coordinate's limit
};

export const filteredBins = (bins, getAllOutsideTheRadius = false) => {
  const filteredBins = bins.filter((bin) => {
    // Filter bins by name and location using a custom function
    const isInsideCenter = binsIsInsideTheCenter(deploymentCoordinates, {
      latitude: parseFloat(bin.latitude),
      longitude: parseFloat(bin.longitude),
    });

    if (getAllOutsideTheRadius) {
      // Return bins outside the center if binsOutsideTheCenter is true
      return (
        (bin.name === "bin-1" ||
          bin.name === "bin-2" ||
          bin.name === "bin-3") &&
        !isInsideCenter
      );
    } else {
      // Return bins inside the center if binsOutsideTheCenter is false (default)
      return (
        (bin.name === "bin-1" ||
          bin.name === "bin-2" ||
          bin.name === "bin-3") &&
        isInsideCenter
      );
    }
  });

  const mappedBins = filteredBins.map((bin) => ({
    ...bin,
    latitude: parseFloat(bin.latitude),
    longitude: parseFloat(bin.longitude),
  }));

  return mappedBins;
};

export const generateAlertText = (bins) => {
  const binNames = bins.map((bin) => bin.name);
  console.log(binNames);

  if (binNames.length === 1) {
    return `${binNames[0]} is outside the radius`;
  } else if (binNames.length === 2) {
    return `${binNames[0]} and ${binNames[1]} are outside the radius`;
  } else if (binNames.length === 3) {
    return "All bins are outside the radius";
  } else {
    // Handle other cases if needed
    return "Multiple bins are outside the radius";
  }
};

export const areBinsMovedRecently = (bins) => {
  const hasMovedRecently = bins.some((bin) => {
    const timeZone = "Asia/Manila";
    const currentDate = moment().tz(timeZone);
    const movedDate = moment.tz(bin.moved_at, timeZone);

    // Calculate the time difference in minutes
    const timeDifferenceInMinutes = currentDate.diff(movedDate, "minutes");
    console.log("timeDifferenceInMinutes", timeDifferenceInMinutes);
    return timeDifferenceInMinutes <= 1;
  });

  console.log(
    hasMovedRecently ? "someBinsMovedRecently" : "noBinMovedRecently"
  );
  return hasMovedRecently;
};

export const filteredByMovingBins = (bins) => {
  return bins.map((bin) => ({
    id: bin.id,
    name: bin.name,
    is_moving: bin.is_moving,
    moved_at: bin.moved_at,
    description: bin.is_moving
      ? ` Moved ${bin.distance}m from its old position`
      : " Steady",
  }));
};
