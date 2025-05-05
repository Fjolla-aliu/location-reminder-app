import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ReminderItem({ item, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.time}>
        {item.time?.toDate
          ? item.time.toDate().toLocaleString()
          : new Date(item.time).toLocaleString()}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.button}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id, item.notificationId)}
          style={styles.button}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 1,
  },
  text: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  editText: {
    color: "blue",
    fontSize: 14,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
