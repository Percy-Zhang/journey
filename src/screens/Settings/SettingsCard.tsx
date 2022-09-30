import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { theme } from "../../components/MyContext";

interface SettingsCardProps {
  title: string;
  body: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    width: "50%",
  },
  container: {
    backgroundColor: theme.primaryLight,
    marginHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function SettingsCard({ title, body, onPress }: SettingsCardProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text>{body}</Text>
      </TouchableOpacity>
    </View>
  );
}
