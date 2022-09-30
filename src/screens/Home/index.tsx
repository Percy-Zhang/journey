import React, { useContext } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { HomeScreenNavigationProps } from "../../types/NativeStackParamsList";

import Header from "../../components/Header";
import MyContext, { theme } from "../../components/MyContext";
import RecentCard from "./RecentCard";
import RandomCard from "./RandomCard";
import YearCard from "./YearCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primaryLighter,
  },
  footer: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 20,
  },
  addBox: {
    position: "absolute",
    right: 25,
    bottom: 25,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.secondary,
    borderRadius: 50,
    elevation: 3,
  },
  addText: {
    fontWeight: "300",
    fontSize: 30,
  },
});

export default function Home() {
  const { journal } = useContext(MyContext);
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const onPress = () => navigation.navigate("NewDay");

  const journalEmpty = Object.keys(journal).length === 0;
  const showRecentCard = () => RecentCard(journal);
  const showRandomCard = () => RandomCard(journal);
  const showYearCard = () => Object.keys(journal).map(year => YearCard(year, journal));

  const showSettings = () => SettingsIcon(navigation);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.primaryDark} barStyle={"dark-content"} animated />
      <Header title={"Journey"} home rightIcon={showSettings} />
      {journalEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Write your first entry</Text>
          <View />
        </View>
      ) : (
        <ScrollView>
          {showRecentCard()}
          {showRandomCard()}
          {showYearCard()}
          <View style={styles.footer} />
        </ScrollView>
      )}
      <TouchableOpacity style={styles.addBox} onPress={onPress}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles2 = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  icon: {
    textAlign: "right",
    fontSize: 14,
  },
});

const SettingsIcon = (navigation: HomeScreenNavigationProps) => {
  const goToSettings = () => navigation.navigate("Settings");

  return (
    <TouchableOpacity style={styles2.iconWrapper} onPress={goToSettings}>
      <Text style={styles2.icon}>Settings</Text>
    </TouchableOpacity>
  );
};
