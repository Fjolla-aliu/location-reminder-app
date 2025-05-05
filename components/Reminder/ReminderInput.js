import React from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";

export default function ReminderInput({ text, setText, time, onShowPicker }) {
  return (
    <>
      <TextInput
        placeholder="Enter reminder text"
        value={text}
        onChangeText={setText}
        style={{
          borderColor: "gray",
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity onPress={onShowPicker}>
        <TextInput
          placeholder="Pick time"
          value={time.toLocaleString()}
          editable={false}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
          }}
        />
      </TouchableOpacity>
    </>
  );
}
