import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

interface InputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 30,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingBottom: 0,
  },
});

const validNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export default function Input({ title, value, setValue }: InputProps) {
  const onChangeText = (newValue: string) => {
    for (let letter of newValue.split("")) {
      if (!validNums.includes(letter)) return;
    }
    setValue(newValue);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.textInput]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={"number-pad"}
        maxLength={6}
        secureTextEntry
      />
    </View>
  );
}
