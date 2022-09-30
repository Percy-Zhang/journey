import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DayScreenNavigationProps } from "../../types/NativeStackParamsList";

import { months, theme } from "../../components/MyContext";
import { getDayOfDate } from "../../helpers";

const styles = StyleSheet.create({
  dayContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: theme.secondary,
    elevation: 5,
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function DayCard(day: string, month: string, year: string, journal: Journal) {
  const navigation = useNavigation<DayScreenNavigationProps>();

  const onPress = () => {
    const todayDate = new Date().getDate().toString();
    const todayMonth = (new Date().getMonth() + 1).toString();
    const todayYear = new Date().getFullYear().toString();
    const sameDate = day === todayDate && month === todayMonth && year === todayYear;
    if (sameDate) navigation.navigate("NewDay");
    else navigation.navigate("Day", { day, month, year });
  };

  const { title, body, important } = journal[year][month][day];
  const shortMonth = months[parseInt(month, 10) - 1].slice(0, 3);
  const dayOfWeek = getDayOfDate(new Date(`${day}-${shortMonth}-${year}`)).slice(0, 3);
  const importantColor = important ? { backgroundColor: theme.primaryDark } : {};

  return (
    <TouchableOpacity key={day} onPress={onPress} style={[styles.dayContainer, importantColor]}>
      <Text style={styles.dayText}>
        {shortMonth} {day} {dayOfWeek} {important && `\u2605`}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={3}>{body}</Text>
    </TouchableOpacity>
  );
}
