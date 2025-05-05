import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const LocationInputs = ({
  origin,
  destination,
  onChangeOrigin,
  onChangeDestination,
  editable,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={origin}
        onChangeText={onChangeOrigin}
        editable={editable}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={onChangeDestination}
      />
    </View>
  );
};

export default LocationInputs;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
});
