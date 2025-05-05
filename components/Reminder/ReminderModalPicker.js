import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ReminderModalPicker({
  visible,
  onClose,
  onConfirm,
  selectedYear,
  selectedMonth,
  selectedDay,
  selectedHour,
  selectedMinute,
  setSelectedYear,
  setSelectedMonth,
  setSelectedDay,
  setSelectedHour,
  setSelectedMinute,
}) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <PickerGroup
            label="Year"
            selected={selectedYear}
            set={setSelectedYear}
            range={5}
            base={new Date().getFullYear()}
          />
          <PickerGroup
            label="Month"
            selected={selectedMonth}
            set={setSelectedMonth}
            range={12}
            base={1}
          />
          <PickerGroup
            label="Day"
            selected={selectedDay}
            set={setSelectedDay}
            range={31}
            base={1}
          />
          <PickerGroup
            label="Hour"
            selected={selectedHour}
            set={setSelectedHour}
            range={24}
            base={0}
          />
          <PickerGroup
            label="Minute"
            selected={selectedMinute}
            set={setSelectedMinute}
            range={60}
            base={0}
          />
          <Button title="Confirm" onPress={onConfirm} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const PickerGroup = ({ label, selected, set, range, base }) => (
  <>
    <Text style={styles.pickerLabel}>{label}</Text>
    <Picker selectedValue={selected} onValueChange={set}>
      {Array.from({ length: range }, (_, i) => (
        <Picker.Item key={i} label={(base + i).toString()} value={base + i} />
      ))}
    </Picker>
  </>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
