import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ReminderItem from "./ReminderItem";

export default function ReminderList({ reminders, onEdit, onDelete }) {
  const sortedReminders = [...reminders].sort((a, b) => {
    const aTime = a.time?.toDate?.() ?? new Date(a.time);
    const bTime = b.time?.toDate?.() ?? new Date(b.time);
    return bTime - aTime;
  });

  return (
    <FlatList
      data={sortedReminders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemWrapper}>
          <ReminderItem item={item} onEdit={onEdit} onDelete={onDelete} />
        </View>
      )}
      contentContainerStyle={styles.container}
      ListFooterComponent={<View style={{ height: 80 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // paddingBottom: 100,
  },
  itemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
