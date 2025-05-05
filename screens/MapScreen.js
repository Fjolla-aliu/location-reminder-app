import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import polyline from "@mapbox/polyline";

import LocationInputs from "../components/Map/LocationInputs";
import RouteButton from "../components/Map/RouteButton";
import MapViewComponent from "../components/Map/MapViewComponent";

const GOOGLE_API_KEY =
  process.env.GOOGLE_API_KEY || "AIzaSyCpi6IwBQ7zqMF5ObGgTmqqX1_LYipOpp4";

const MapScreen = () => {
  const mapRef = useRef(null);
  const { permissionGranted, currentLocation } = useSelector(
    (state) => state.location
  );

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    if (permissionGranted && currentLocation) {
      const autoOrigin = `${currentLocation.latitude}, ${currentLocation.longitude}`;
      setOrigin(autoOrigin);
    } else {
      setOrigin("");
    }
  }, [permissionGranted, currentLocation]);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.results?.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return `${lat},${lng}`;
      } else {
        console.warn("Geocoding failed:", data);
        throw new Error("Failed to geocode address.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  };

  const decodePolyline = (encoded) => {
    return polyline.decode(encoded).map(([latitude, longitude]) => ({
      latitude,
      longitude,
    }));
  };

  const fitMapToRoute = (coords) => {
    if (mapRef.current && coords.length > 1) {
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: { top: 60, bottom: 60, left: 60, right: 60 },
        animated: true,
      });
    }
  };

  const handleRoute = async () => {
    if (!origin || !destination) return;

    try {
      const formattedOrigin = origin.includes(",")
        ? origin
        : await geocodeAddress(origin);
      const formattedDestination = destination.includes(",")
        ? destination
        : await geocodeAddress(destination);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
          formattedOrigin
        )}&destination=${encodeURIComponent(
          formattedDestination
        )}&mode=driving&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();

      if (data.routes?.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRouteCoords(points);
        fitMapToRoute(points);
      } else {
        console.warn("No route found.");
      }
    } catch (error) {
      console.error("Failed to fetch route:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LocationInputs
        origin={origin}
        destination={destination}
        onChangeOrigin={setOrigin}
        onChangeDestination={setDestination}
        editable={!permissionGranted}
      />
      <RouteButton onPress={handleRoute} />
      <MapViewComponent
        mapRef={mapRef}
        currentLocation={currentLocation}
        routeCoords={routeCoords}
        permissionGranted={permissionGranted}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
