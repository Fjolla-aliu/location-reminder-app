import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import {
  setPermissionGranted,
  setCurrentLocation,
} from "../store/locationSlice";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [isPermissionOn, setIsPermissionOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePermission = async (value) => {
    if (value) {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        dispatch(setPermissionGranted(true));
        setIsPermissionOn(true);

        Location.getCurrentPositionAsync({})
          .then((location) => {
            dispatch(setCurrentLocation(location.coords));
            Alert.alert(
              "Permission granted",
              "Location permission granted successfully."
            );
          })
          .catch((error) => {
            console.error("Failed to fetch location:", error);
            Alert.alert("Error", "Failed to fetch location.");
          })
          .finally(() => setIsLoading(false));
      } else {
        dispatch(setPermissionGranted(false));
        dispatch(setCurrentLocation(null));
        Alert.alert("Permission denied", "Location permission denied.");
        setIsPermissionOn(false);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      dispatch(setPermissionGranted(false));
      dispatch(setCurrentLocation(""));
      Alert.alert(
        "Permission revoked",
        "Location permission has been turned off."
      );
      setIsPermissionOn(false);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Permission</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{isPermissionOn ? "On" : "Off"}</Text>
        <Switch
          value={isPermissionOn}
          onValueChange={(value) => togglePermission(value)}
          disabled={isLoading}
        />
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
  },
});

export default SettingsScreen;
