import React, { useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet } from "react-native";
import RoutePolyline from "./RoutePolyline";

const MapViewComponent = ({ mapRef, currentLocation, routeCoords }) => {
  useEffect(() => {
    if (mapRef?.current && routeCoords.length > 0) {
      mapRef.current.fitToCoordinates(routeCoords, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [routeCoords]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={{
        latitude: currentLocation?.latitude || 42.6629,
        longitude: currentLocation?.longitude || 21.1655,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {currentLocation && (
        <Marker coordinate={currentLocation} title="Current Location" />
      )}
      {routeCoords.length > 0 && (
        <>
          <Marker
            coordinate={routeCoords[routeCoords.length - 1]}
            title="Destination"
          />
          <RoutePolyline coordinates={routeCoords} />
        </>
      )}
    </MapView>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
