import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../components/MyContext";
import { YearScreenNavigationProps } from "../../types/NativeStackParamsList";

const styles = StyleSheet.create({
  yearContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: theme.secondary,
    elevation: 5,
  },
  yearText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function YearCard(year: string, journal: Journal) {
  const navigation = useNavigation<YearScreenNavigationProps>();

  const onPress = () => {
    navigation.navigate("Year", { year });
  };

  const numEntries = useMemo((): string => {
    let num = 0;
    for (let month in journal[year]) {
      num += Object.keys(journal[year][month]).length;
    }
    return num.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal[year]]);

  const numImportant = useMemo((): string => {
    let num = 0;
    for (let month in journal[year]) {
      for (let day in journal[year][month]) {
        if (journal[year][month][day].important) num++;
      }
    }
    return num.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journal[year]]);

  const plural = numEntries !== "1";
  const hasImportant = parseInt(numImportant, 10) > 0;

  return (
    <TouchableOpacity key={year} onPress={onPress} style={styles.yearContainer}>
      <Text style={styles.yearText}>{year}</Text>
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
