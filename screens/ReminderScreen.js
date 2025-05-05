import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import ReminderInput from "../components/Reminder/ReminderInput";
import ReminderModalPicker from "../components/Reminder/ReminderModalPicker";
import ReminderList from "../components/Reminder/ReminderList";

export default function ReminderScreen() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [time, setTime] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedYear, setSelectedYear] = useState(time.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(time.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(time.getDate());
  const [selectedHour, setSelectedHour] = useState(time.getHours());
  const [selectedMinute, setSelectedMinute] = useState(time.getMinutes());

  const previousRemindersRef = useRef([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reminders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const newReminders = data.filter(
        (reminder) =>
          !previousRemindersRef.current.some((prev) => prev.id === reminder.id)
      );

      newReminders.forEach((reminder) => {
        Notifications.scheduleNotificationAsync({
          content: { title: "New Reminder", body: reminder.text, sound: true },
          trigger: null,
        });
      });

      previousRemindersRef.current = data;
      setReminders(data);
    });
    return unsubscribe;
  }, []);

  const scheduleNotification = async (text, time) => {
    if (time <= new Date()) {
      alert("Pick a future time.");
      return null;
    }
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: { title: "Reminder", body: text, sound: true },
        trigger: time,
      });
      return identifier;
    } catch (e) {
      console.error("Notification error:", e);
      return null;
    }
  };

  const handleAddOrEdit = async () => {
    if (!text) return alert("Text is required.");

    const pickedTime = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay,
      selectedHour,
      selectedMinute
    );

    const notificationId = await scheduleNotification(text, pickedTime);
    if (!notificationId) return;

    const data = { text, time: pickedTime, notificationId };

    try {
      if (editingId) {
        await updateDoc(doc(db, "reminders", editingId), data);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "reminders"), data);
      }
      setText("");
      setTime(new Date());
    } catch (e) {
      console.error("Add/Edit error:", e);
    }
  };

  const handleDelete = async (id, notificationId) => {
    try {
      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        console.log(`Notification with ID ${notificationId} canceled.`);
      } else {
        console.warn(
          "Notification ID is null. Skipping notification cancellation."
        );
      }

      await deleteDoc(doc(db, "reminders", id));
      console.log(`Reminder with ID ${id} deleted from Firestore.`);
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleEditInit = (reminder) => {
    const parsed = reminder.time?.toDate?.() || new Date(reminder.time);
    setText(reminder.text);
    setTime(parsed);
    setSelectedYear(parsed.getFullYear());
    setSelectedMonth(parsed.getMonth() + 1);
    setSelectedDay(parsed.getDate());
    setSelectedHour(parsed.getHours());
    setSelectedMinute(parsed.getMinutes());
    setEditingId(reminder.id);
  };

  return (
    <View style={{ padding: 20 }}>
      <ReminderInput
        text={text}
        setText={setText}
        time={time}
        onShowPicker={() => setPickerVisible(true)}
      />
      <ReminderModalPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onConfirm={() => {
          setTime(
            new Date(
              selectedYear,
              selectedMonth - 1,
              selectedDay,
              selectedHour,
              selectedMinute
            )
          );
          setPickerVisible(false);
        }}
        {...{
          selectedYear,
          selectedMonth,
          selectedDay,
          selectedHour,
          selectedMinute,
        }}
        {...{
          setSelectedYear,
          setSelectedMonth,
          setSelectedDay,
          setSelectedHour,
          setSelectedMinute,
        }}
      />
      <Button title={editingId ? "Update" : "Add"} onPress={handleAddOrEdit} />
      <ReminderList
        reminders={reminders}
        onEdit={handleEditInit}
        onDelete={handleDelete}
      />
    </View>
  );
}
