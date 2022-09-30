import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { months, theme } from "../../components/MyContext";
import { YearScreenNavigationProps } from "../../types/NativeStackParamsList";
import { getDayOfDate, getSavedEntry } from "../../helpers";

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
  dayHeading: {
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
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

export default function RandomCard(journal: Journal) {
  const navigation = useNavigation<YearScreenNavigationProps>();
  const [date, setDate] = useState(getRandomDate(journal));
  const { year, month, day } = date;

  useFocusEffect(
    useCallback(() => {
      setDate(getRandomDate(journal));
    }, [journal]),
  );

  const shortMonth = months[parseInt(month, 10) - 1].slice(0, 3);
  const randomDate = new Date(`${day}-${shortMonth}-${year}`);
  const { title, body, important } = getSavedEntry(journal, randomDate);

  const importantColor = important ? { backgroundColor: theme.primaryDark } : {};
  const dayOfWeek = getDayOfDate(randomDate).slice(0, 3);

  const onPress = () => {
    const todayDate = new Date().getDate().toString();
    if (day === todayDate) navigation.navigate("NewDay");
    else navigation.navigate("Day", { day, month, year });
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.dayContainer, importantColor]}>
      <Text style={styles.dayHeading}>Random</Text>
      <Text style={styles.dayText}>
        {shortMonth} {day} {dayOfWeek} {important && `\u2605`}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={3}>{body}</Text>
    </TouchableOpacity>
  );
}

const getRandomKey = (obj: Object) => {
  const keys = Object.keys(obj).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  return keys[Math.floor(Math.random() * keys.length)];
};

const getRandomDate = (journal: Journal) => {
  const year = getRandomKey(journal);
  const month = getRandomKey(journal[year]);
  const day = getRandomKey(journal[year][month]);
  return { year, month, day };
};
