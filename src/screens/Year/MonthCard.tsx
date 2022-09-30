import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { theme, months } from "../../components/MyContext";
import { YearScreenNavigationProps } from "../../types/NativeStackParamsList";

const styles = StyleSheet.create({
  monthContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: theme.secondary,
    elevation: 5,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function MonthCard(month: string, year: string, journal: Journal) {
  const navigation = useNavigation<YearScreenNavigationProps>();

  const onPress = () => {
    navigation.navigate("Month", { year, month });
  };

  const numEntries = useMemo((): string => {
    let numberOfEntries = 0;
    numberOfEntries += Object.keys(journal[year][month]).length;
    return numberOfEntries.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal[year][month]]);

  const numImportant = useMemo((): string => {
    let num = 0;
    for (let day in journal[year][month]) {
      if (journal[year][month][day].important) num++;
    }
    return num.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal[year][month]]);

  const plural = numEntries !== "1";
  const hasImportant = parseInt(numImportant, 10) > 0;

  return (
    <TouchableOpacity key={month} onPress={onPress} style={styles.monthContainer}>
      <Text style={styles.monthText}>{months[parseInt(month, 10) - 1]}</Text>
      <View style={styles.infoTextWrapper}>
        <Text>
          {numEntries} day{plural && "s"} recorded
        </Text>
        {hasImportant && (
          <Text>
            {numImportant} {`\u2605`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
